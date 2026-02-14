import { Input } from './ui/Input';
import { Select } from './ui/Select';

interface ScheduleState {
  draftDate: string;
  draftTime: string;
  seasonStartDate: string;
  weeklyDeadlineDay: string;
  weeklyDeadlineTime: string;
  playoffsEnabled: boolean;
  playoffTeams: number;
}

interface ScheduleConfigurationProps {
  schedule: ScheduleState;
  weekCount: number;
  onUpdateSchedule: (schedule: ScheduleState) => void;
}

const DAYS_OF_WEEK = [
  { value: 'sunday', label: 'Sunday' },
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
];

export function ScheduleConfiguration({
  schedule,
  weekCount,
  onUpdateSchedule,
}: ScheduleConfigurationProps) {
  const updateField = <K extends keyof ScheduleState>(field: K, value: ScheduleState[K]) => {
    onUpdateSchedule({ ...schedule, [field]: value });
  };

  // Calculate season end date based on start date and week count
  const getSeasonEndDate = () => {
    if (!schedule.seasonStartDate) return null;
    const start = new Date(schedule.seasonStartDate);
    const end = new Date(start);
    end.setDate(end.getDate() + (weekCount * 7));
    return end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get minimum season start date (day after draft)
  const getMinSeasonStartDate = () => {
    if (!schedule.draftDate) return getMinDate();
    const draftDate = new Date(schedule.draftDate);
    draftDate.setDate(draftDate.getDate() + 1);
    return draftDate.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Schedule
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Set your draft date and season timeline
        </p>
      </div>

      {/* Draft Schedule */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
          Draft
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="draftDate"
            label="Draft Date"
            type="date"
            min={getMinDate()}
            value={schedule.draftDate}
            onChange={(e) => updateField('draftDate', e.target.value)}
            required
          />
          <Input
            id="draftTime"
            label="Draft Time"
            type="time"
            value={schedule.draftTime}
            onChange={(e) => updateField('draftTime', e.target.value)}
            hint="Local time"
            required
          />
        </div>
        {schedule.draftDate && schedule.draftTime && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Draft scheduled for{' '}
              <span className="font-semibold">
                {new Date(schedule.draftDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              {' at '}
              <span className="font-semibold">
                {new Date(`2000-01-01T${schedule.draftTime}`).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </span>
            </p>
          </div>
        )}
      </section>

      {/* Season Schedule */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
          Season
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="seasonStartDate"
            label="Season Start Date"
            type="date"
            min={getMinSeasonStartDate()}
            value={schedule.seasonStartDate}
            onChange={(e) => updateField('seasonStartDate', e.target.value)}
            hint="Week 1 begins on this date"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Season Length
            </label>
            <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
              {weekCount} weeks
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Configured in Rules step
            </p>
          </div>
        </div>

        {schedule.seasonStartDate && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Season Timeline</h4>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <span className="font-medium">Week 1:</span>{' '}
                {new Date(schedule.seasonStartDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p>
                <span className="font-medium">Week {weekCount}:</span>{' '}
                {(() => {
                  const start = new Date(schedule.seasonStartDate);
                  start.setDate(start.getDate() + ((weekCount - 1) * 7));
                  return start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                })()}
              </p>
              <p>
                <span className="font-medium">Season Ends:</span>{' '}
                {getSeasonEndDate()}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Weekly Deadlines */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
          Weekly Match Deadlines
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            id="weeklyDeadlineDay"
            label="Deadline Day"
            value={schedule.weeklyDeadlineDay}
            onChange={(e) => updateField('weeklyDeadlineDay', e.target.value)}
            options={DAYS_OF_WEEK}
          />
          <Input
            id="weeklyDeadlineTime"
            label="Deadline Time"
            type="time"
            value={schedule.weeklyDeadlineTime}
            onChange={(e) => updateField('weeklyDeadlineTime', e.target.value)}
            hint="Results must be reported by this time"
          />
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Each week runs from Monday 12:00am to {DAYS_OF_WEEK.find(d => d.value === schedule.weeklyDeadlineDay)?.label || 'Sunday'} at{' '}
          {schedule.weeklyDeadlineTime
            ? new Date(`2000-01-01T${schedule.weeklyDeadlineTime}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })
            : '11:59pm'
          }
        </p>
      </section>

      {/* Playoffs */}
      <section>
        <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Playoffs</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Top teams compete in a bracket after the regular season
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={schedule.playoffsEnabled}
            onClick={() => updateField('playoffsEnabled', !schedule.playoffsEnabled)}
            className={`
              relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
              transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${schedule.playoffsEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}
            `}
          >
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                transition duration-200 ease-in-out
                ${schedule.playoffsEnabled ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </button>
        </div>

        {schedule.playoffsEnabled && (
          <div className="mt-4">
            <Select
              id="playoffTeams"
              label="Playoff Teams"
              value={String(schedule.playoffTeams)}
              onChange={(e) => updateField('playoffTeams', Number(e.target.value))}
              options={[
                { value: '4', label: '4 teams (2 rounds)' },
                { value: '6', label: '6 teams (top 2 get bye)' },
                { value: '8', label: '8 teams (3 rounds)' },
              ]}
            />
          </div>
        )}
      </section>

      {/* Summary Card */}
      {schedule.draftDate && schedule.seasonStartDate && (
        <section className="p-4 border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3">Schedule Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-600 dark:text-blue-400">Draft Day</span>
              <p className="font-medium text-blue-900 dark:text-blue-100">
                {new Date(schedule.draftDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <span className="text-blue-600 dark:text-blue-400">Season Start</span>
              <p className="font-medium text-blue-900 dark:text-blue-100">
                {new Date(schedule.seasonStartDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <span className="text-blue-600 dark:text-blue-400">Regular Season</span>
              <p className="font-medium text-blue-900 dark:text-blue-100">{weekCount} weeks</p>
            </div>
            <div>
              <span className="text-blue-600 dark:text-blue-400">Playoffs</span>
              <p className="font-medium text-blue-900 dark:text-blue-100">
                {schedule.playoffsEnabled ? `${schedule.playoffTeams} teams` : 'Disabled'}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export type { ScheduleState };
