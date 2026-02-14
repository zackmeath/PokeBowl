import { LEAGUE_PROFILES } from '../data/leagueProfiles';
import type { LeagueProfile } from '../types';
import { ProfileCard } from './ProfileCard';

interface ProfileSelectionProps {
  selectedProfile: LeagueProfile | null;
  onSelectProfile: (profile: LeagueProfile) => void;
}

export function ProfileSelection({ selectedProfile, onSelectProfile }: ProfileSelectionProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Choose a League Profile
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Select a preset to pre-fill rules, or start from scratch with Custom
        </p>
      </div>

      <div className="grid gap-3">
        {LEAGUE_PROFILES.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            isSelected={selectedProfile?.id === profile.id}
            onSelect={onSelectProfile}
          />
        ))}
      </div>
    </div>
  );
}
