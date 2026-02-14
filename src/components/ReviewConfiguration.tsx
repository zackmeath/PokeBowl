import type { LeagueProfile, LeagueSettings } from '../types';
import type { ScheduleState } from './ScheduleConfiguration';
import { POKEMON_POOL } from '../data/pokemonPool';

interface ReviewConfigurationProps {
  profile: LeagueProfile;
  leagueName: string;
  description: string;
  settings: LeagueSettings;
  enabledPokemon: Set<string>;
  schedule: ScheduleState;
  onEditStep: (step: number) => void;
}

export function ReviewConfiguration({
  profile,
  leagueName,
  description,
  settings,
  enabledPokemon,
  schedule,
  onEditStep,
}: ReviewConfigurationProps) {
  const enabledCount = enabledPokemon.size;
  const totalCount = POKEMON_POOL.length;

  // Count Pokemon by tier
  const tierCounts = POKEMON_POOL.reduce((acc, p) => {
    if (enabledPokemon.has(p.id)) {
      acc[p.tier] = (acc[p.tier] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not set';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Review Your League
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Confirm everything looks good before creating
        </p>
      </div>

      {/* League Basics */}
      <ReviewSection title="League Details" onEdit={() => onEditStep(2)}>
        <ReviewRow label="Name" value={leagueName} />
        <ReviewRow label="Description" value={description || 'No description'} muted={!description} />
        <ReviewRow label="Profile" value={profile.name} />
      </ReviewSection>

      {/* Rules */}
      <ReviewSection title="Rules" onEdit={() => onEditStep(3)}>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <ReviewRow label="Budget" value={`${settings.budget} points`} />
          <ReviewRow label="Roster Size" value={`${settings.rosterSize.min}-${settings.rosterSize.max} Pokemon`} />
          <ReviewRow label="Draft Order" value={settings.draftOrder.charAt(0).toUpperCase() + settings.draftOrder.slice(1)} />
          <ReviewRow label="Pick Timer" value={`${settings.pickTimerSeconds} seconds`} />
          <ReviewRow label="Season Length" value={`${settings.weekCount} weeks`} />
          <ReviewRow label="Trade Cutoff" value={`After Week ${settings.tradeCutoffWeek}`} />
          <ReviewRow label="Species Clause" value={settings.speciesClause ? 'Enabled' : 'Disabled'} />
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Tier Caps</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(settings.tierCaps).map(([tier, cap]) => (
              <span
                key={tier}
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                {tier}: {cap === -1 ? 'No limit' : `Max ${cap}`}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Trade Limits</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Free Agent: {settings.tradeLimits.freeAgent}</span>
            <span className="text-gray-600 dark:text-gray-400">Coach-to-Coach: {settings.tradeLimits.coachToCoach}</span>
            <span className="text-gray-600 dark:text-gray-400">Grace Period: {settings.tradeLimits.gracePeriod}</span>
            <span className="text-gray-600 dark:text-gray-400">Mega Trades: {settings.tradeLimits.megaTradesPerSeason}</span>
          </div>
        </div>
      </ReviewSection>

      {/* Pokemon Pool */}
      <ReviewSection title="Pokemon Pool" onEdit={() => onEditStep(4)}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-green-600 dark:text-green-400">{enabledCount}</span> of {totalCount} Pokemon enabled
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {totalCount - enabledCount} disabled
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(tierCounts)
            .sort(([a], [b]) => {
              const order = ['Mega-1', 'Mega-2', 'Mega-3', 'A', 'B', 'C', 'D', 'E', 'F', 'Mythical', 'UB'];
              return order.indexOf(a) - order.indexOf(b);
            })
            .map(([tier, count]) => (
              <span
                key={tier}
                className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded"
              >
                {tier}: {count}
              </span>
            ))}
        </div>
      </ReviewSection>

      {/* Schedule */}
      <ReviewSection title="Schedule" onEdit={() => onEditStep(5)}>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase mb-1">Draft</h4>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {formatDate(schedule.draftDate)} at {formatTime(schedule.draftTime)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <ReviewRow label="Season Start" value={formatDate(schedule.seasonStartDate)} />
            </div>
            <div>
              <ReviewRow
                label="Weekly Deadline"
                value={`${schedule.weeklyDeadlineDay.charAt(0).toUpperCase() + schedule.weeklyDeadlineDay.slice(1)} at ${formatTime(schedule.weeklyDeadlineTime)}`}
              />
            </div>
          </div>

          <ReviewRow
            label="Playoffs"
            value={schedule.playoffsEnabled ? `${schedule.playoffTeams} teams` : 'Disabled'}
          />
        </div>
      </ReviewSection>

      {/* Banned Content Summary */}
      {(settings.bannedMoves.length > 0 || settings.bannedAbilities.length > 0 || settings.bannedItems.length > 0) && (
        <ReviewSection title="Banned Content" onEdit={() => onEditStep(3)}>
          {settings.bannedMoves.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Moves ({settings.bannedMoves.length})</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {settings.bannedMoves.slice(0, 5).join(', ')}
                {settings.bannedMoves.length > 5 && ` +${settings.bannedMoves.length - 5} more`}
              </p>
            </div>
          )}
          {settings.bannedAbilities.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Abilities ({settings.bannedAbilities.length})</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {settings.bannedAbilities.join(', ')}
              </p>
            </div>
          )}
          {settings.bannedItems.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Items ({settings.bannedItems.length})</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {settings.bannedItems.join(', ')}
              </p>
            </div>
          )}
        </ReviewSection>
      )}

      {/* Ready to Create */}
      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-100">Ready to create!</h3>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Click "Create League" to finish setup. You'll receive an invite code to share with players.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ReviewSectionProps {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}

function ReviewSection({ title, onEdit, children }: ReviewSectionProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
        <button
          onClick={onEdit}
          className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Edit
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

interface ReviewRowProps {
  label: string;
  value: string;
  muted?: boolean;
}

function ReviewRow({ label, value, muted }: ReviewRowProps) {
  return (
    <div className="flex justify-between items-start py-1">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className={`text-sm font-medium text-right ${muted ? 'text-gray-400 dark:text-gray-500 italic' : 'text-gray-900 dark:text-white'}`}>
        {value}
      </span>
    </div>
  );
}
