import type { LeagueProfile } from '../types';

interface ProfileCardProps {
  profile: LeagueProfile;
  isSelected: boolean;
  onSelect: (profile: LeagueProfile) => void;
}

export function ProfileCard({ profile, isSelected, onSelect }: ProfileCardProps) {
  const { settings } = profile;

  const tierCapsDisplay = Object.entries(settings.tierCaps)
    .filter(([, cap]) => cap !== -1)
    .slice(0, 3)
    .map(([tier, cap]) => `${cap} ${tier}`)
    .join(', ');

  return (
    <button
      type="button"
      onClick={() => onSelect(profile)}
      className={`
        w-full p-4 rounded-lg border-2 text-left transition-all
        ${isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {profile.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {profile.description}
          </p>
        </div>
        <div className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-4
          ${isSelected
            ? 'border-blue-500 bg-blue-500'
            : 'border-gray-300 dark:border-gray-600'
          }
        `}>
          {isSelected && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>

      {profile.id !== 'custom' && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {settings.budget} pts
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {settings.rosterSize.min}-{settings.rosterSize.max} roster
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {settings.draftOrder} draft
          </span>
          {tierCapsDisplay && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {tierCapsDisplay}
            </span>
          )}
        </div>
      )}
    </button>
  );
}
