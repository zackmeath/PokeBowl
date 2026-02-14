import { useState, useCallback } from 'react';
import type { LeagueProfile, LeagueSettings, PokemonCategory } from '../types';
import { ProfileSelection } from '../components/ProfileSelection';
import { RulesConfiguration } from '../components/RulesConfiguration';
import { PokemonPoolConfiguration } from '../components/PokemonPoolConfiguration';
import { ScheduleConfiguration, type ScheduleState } from '../components/ScheduleConfiguration';
import { ReviewConfiguration } from '../components/ReviewConfiguration';
import { WizardStepIndicator } from '../components/ui/WizardStepIndicator';
import { Button } from '../components/ui/Button';
import { POKEMON_POOL } from '../data/pokemonPool';

const WIZARD_STEPS = [
  { id: 1, name: 'Profile' },
  { id: 2, name: 'Basics' },
  { id: 3, name: 'Rules' },
  { id: 4, name: 'Pokemon' },
  { id: 5, name: 'Schedule' },
  { id: 6, name: 'Review' },
];

interface WizardState {
  selectedProfile: LeagueProfile | null;
  leagueName: string;
  description: string;
  settings: LeagueSettings | null;
  enabledPokemon: Set<string>;
  schedule: ScheduleState;
}

const getDefaultSchedule = (): ScheduleState => ({
  draftDate: '',
  draftTime: '19:00',
  seasonStartDate: '',
  weeklyDeadlineDay: 'sunday',
  weeklyDeadlineTime: '23:59',
  playoffsEnabled: true,
  playoffTeams: 6,
});

// Initialize with default enabled Pokemon (those marked isEnabled: true in the pool)
const getDefaultEnabledPokemon = () => {
  return new Set(POKEMON_POOL.filter(p => p.isEnabled).map(p => p.id));
};

// Generate a random invite code
const generateInviteCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export function LeagueCreationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [wizardState, setWizardState] = useState<WizardState>({
    selectedProfile: null,
    leagueName: '',
    description: '',
    settings: null,
    enabledPokemon: getDefaultEnabledPokemon(),
    schedule: getDefaultSchedule(),
  });

  const handleSelectProfile = (profile: LeagueProfile) => {
    setWizardState(prev => ({
      ...prev,
      selectedProfile: profile,
      settings: { ...profile.settings },
    }));
  };

  const handleUpdateSettings = (settings: LeagueSettings) => {
    setWizardState(prev => ({ ...prev, settings }));
  };

  // Pokemon Pool handlers
  const handleTogglePokemon = useCallback((pokemonId: string) => {
    setWizardState(prev => {
      const newEnabled = new Set(prev.enabledPokemon);
      if (newEnabled.has(pokemonId)) {
        newEnabled.delete(pokemonId);
      } else {
        newEnabled.add(pokemonId);
      }
      return { ...prev, enabledPokemon: newEnabled };
    });
  }, []);

  const handleBulkToggle = useCallback((pokemonIds: string[], enabled: boolean) => {
    setWizardState(prev => {
      const newEnabled = new Set(prev.enabledPokemon);
      pokemonIds.forEach(id => {
        if (enabled) {
          newEnabled.add(id);
        } else {
          newEnabled.delete(id);
        }
      });
      return { ...prev, enabledPokemon: newEnabled };
    });
  }, []);

  const handleToggleCategory = useCallback((category: PokemonCategory, enabled: boolean) => {
    const categoryPokemon = POKEMON_POOL.filter(p => p.category === category).map(p => p.id);
    handleBulkToggle(categoryPokemon, enabled);
  }, [handleBulkToggle]);

  const handleToggleGeneration = useCallback((generation: number, enabled: boolean) => {
    const genPokemon = POKEMON_POOL.filter(p => p.generation === generation).map(p => p.id);
    handleBulkToggle(genPokemon, enabled);
  }, [handleBulkToggle]);

  const handleResetPokemonToDefaults = useCallback(() => {
    setWizardState(prev => ({ ...prev, enabledPokemon: getDefaultEnabledPokemon() }));
  }, []);

  const handleUpdateSchedule = (schedule: ScheduleState) => {
    setWizardState(prev => ({ ...prev, schedule }));
  };

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleCreateLeague = async () => {
    setIsCreating(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate invite code
    const code = generateInviteCode();
    setInviteCode(code);
    setIsCreating(false);
    setShowSuccess(true);
  };

  const handleCopyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = inviteCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return wizardState.selectedProfile !== null;
      case 2:
        return wizardState.leagueName.length >= 3 && wizardState.leagueName.length <= 50;
      case 3:
        return wizardState.settings !== null && wizardState.settings.budget > 0;
      case 5:
        return wizardState.schedule.draftDate !== '' && wizardState.schedule.seasonStartDate !== '';
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProfileSelection
            selectedProfile={wizardState.selectedProfile}
            onSelectProfile={handleSelectProfile}
          />
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                League Details
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Name your league and add an optional description
              </p>
            </div>
            <div>
              <label htmlFor="leagueName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                League Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="leagueName"
                value={wizardState.leagueName}
                onChange={(e) => setWizardState(prev => ({ ...prev, leagueName: e.target.value }))}
                placeholder="e.g., NKO Season 3"
                maxLength={50}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {wizardState.leagueName.length}/50 characters
              </p>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (optional)
              </label>
              <textarea
                id="description"
                value={wizardState.description}
                onChange={(e) => setWizardState(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Tell players what this league is about..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        );
      case 3:
        return wizardState.settings ? (
          <RulesConfiguration
            settings={wizardState.settings}
            onUpdateSettings={handleUpdateSettings}
          />
        ) : null;
      case 4:
        return (
          <PokemonPoolConfiguration
            enabledPokemon={wizardState.enabledPokemon}
            onTogglePokemon={handleTogglePokemon}
            onBulkToggle={handleBulkToggle}
            onToggleCategory={handleToggleCategory}
            onToggleGeneration={handleToggleGeneration}
            onResetToDefaults={handleResetPokemonToDefaults}
          />
        );
      case 5:
        return (
          <ScheduleConfiguration
            schedule={wizardState.schedule}
            weekCount={wizardState.settings?.weekCount ?? 10}
            onUpdateSchedule={handleUpdateSchedule}
          />
        );
      case 6:
        return wizardState.selectedProfile && wizardState.settings ? (
          <ReviewConfiguration
            profile={wizardState.selectedProfile}
            leagueName={wizardState.leagueName}
            description={wizardState.description}
            settings={wizardState.settings}
            enabledPokemon={wizardState.enabledPokemon}
            schedule={wizardState.schedule}
            onEditStep={setCurrentStep}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Create a League
          </h1>
        </div>

        <div className="mb-12">
          <WizardStepIndicator steps={WIZARD_STEPS} currentStep={currentStep} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          {currentStep === WIZARD_STEPS.length ? (
            <Button
              variant="primary"
              onClick={handleCreateLeague}
              disabled={isCreating}
            >
              {isCreating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create League'
              )}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Continue
            </Button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                League Created!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                <span className="font-semibold text-gray-900 dark:text-white">{wizardState.leagueName}</span> is ready.
                Share the invite code with your players.
              </p>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
                  Invite Code
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-mono font-bold tracking-wider text-gray-900 dark:text-white">
                    {inviteCode}
                  </span>
                  <button
                    onClick={handleCopyInviteCode}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Copied to clipboard!
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  onClick={() => {
                    // In a real app, this would navigate to the league page
                    window.location.reload();
                  }}
                  className="w-full"
                >
                  Go to League
                </Button>
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Create Another League
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
