import type { LeagueSettings, DraftOrderType } from '../types';
import { Input } from './ui/Input';
import { Select } from './ui/Select';

interface RulesConfigurationProps {
  settings: LeagueSettings;
  onUpdateSettings: (settings: LeagueSettings) => void;
}

export function RulesConfiguration({ settings, onUpdateSettings }: RulesConfigurationProps) {
  const updateField = <K extends keyof LeagueSettings>(field: K, value: LeagueSettings[K]) => {
    onUpdateSettings({ ...settings, [field]: value });
  };

  const updateTierCap = (tier: string, value: number) => {
    onUpdateSettings({
      ...settings,
      tierCaps: { ...settings.tierCaps, [tier]: value },
    });
  };

  const updateTierPoints = (tier: string, value: number) => {
    onUpdateSettings({
      ...settings,
      tierPoints: { ...settings.tierPoints, [tier]: value },
    });
  };

  const updateTradeLimits = (field: keyof typeof settings.tradeLimits, value: number) => {
    onUpdateSettings({
      ...settings,
      tradeLimits: { ...settings.tradeLimits, [field]: value },
    });
  };

  const tiers = Object.keys(settings.tierCaps);

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          League Rules
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Configure budget, roster size, and tier restrictions
        </p>
      </div>

      {/* Budget & Roster */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
          Budget & Roster
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            id="budget"
            label="Total Budget"
            type="number"
            min={50}
            max={500}
            value={settings.budget}
            onChange={(e) => updateField('budget', parseInt(e.target.value) || 0)}
            hint="Points available for drafting"
          />
          <Input
            id="rosterMin"
            label="Min Roster Size"
            type="number"
            min={6}
            max={20}
            value={settings.rosterSize.min}
            onChange={(e) => updateField('rosterSize', {
              ...settings.rosterSize,
              min: parseInt(e.target.value) || 6,
            })}
          />
          <Input
            id="rosterMax"
            label="Max Roster Size"
            type="number"
            min={6}
            max={20}
            value={settings.rosterSize.max}
            onChange={(e) => updateField('rosterSize', {
              ...settings.rosterSize,
              max: parseInt(e.target.value) || 12,
            })}
          />
        </div>
      </section>

      {/* Draft Settings */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
          Draft Settings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            id="draftOrder"
            label="Draft Order"
            value={settings.draftOrder}
            onChange={(e) => updateField('draftOrder', e.target.value as DraftOrderType)}
            options={[
              { value: 'snake', label: 'Snake (1-12, 12-1, 1-12...)' },
              { value: 'linear', label: 'Linear (1-12, 1-12...)' },
              { value: 'auction', label: 'Auction (bidding)' },
            ]}
          />
          <Input
            id="pickTimer"
            label="Pick Timer (seconds)"
            type="number"
            min={30}
            max={600}
            value={settings.pickTimerSeconds}
            onChange={(e) => updateField('pickTimerSeconds', parseInt(e.target.value) || 120)}
            hint="Time limit per pick"
          />
        </div>
      </section>

      {/* Tier Configuration */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
          Tier Caps & Points
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Set -1 for no cap on a tier
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Tier</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Max Count</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Point Cost</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier) => (
                <tr key={tier} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-2 font-medium text-gray-900 dark:text-white">{tier}</td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      min={-1}
                      max={12}
                      value={settings.tierCaps[tier]}
                      onChange={(e) => updateTierCap(tier, parseInt(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      min={0}
                      max={50}
                      value={settings.tierPoints[tier] || 0}
                      onChange={(e) => updateTierPoints(tier, parseInt(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Trade Limits */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
          Trade Limits
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Input
            id="freeAgentTrades"
            label="Free Agent"
            type="number"
            min={0}
            max={10}
            value={settings.tradeLimits.freeAgent}
            onChange={(e) => updateTradeLimits('freeAgent', parseInt(e.target.value) || 0)}
          />
          <Input
            id="coachTrades"
            label="Coach-to-Coach"
            type="number"
            min={0}
            max={10}
            value={settings.tradeLimits.coachToCoach}
            onChange={(e) => updateTradeLimits('coachToCoach', parseInt(e.target.value) || 0)}
          />
          <Input
            id="gracePeriodTrades"
            label="Grace Period"
            type="number"
            min={0}
            max={10}
            value={settings.tradeLimits.gracePeriod}
            onChange={(e) => updateTradeLimits('gracePeriod', parseInt(e.target.value) || 0)}
          />
          <Input
            id="megaTrades"
            label="Mega Trades"
            type="number"
            min={0}
            max={5}
            value={settings.tradeLimits.megaTradesPerSeason}
            onChange={(e) => updateTradeLimits('megaTradesPerSeason', parseInt(e.target.value) || 0)}
          />
        </div>
      </section>

      {/* Season Settings */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
          Season Settings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            id="weekCount"
            label="Season Length (weeks)"
            type="number"
            min={4}
            max={20}
            value={settings.weekCount}
            onChange={(e) => updateField('weekCount', parseInt(e.target.value) || 10)}
          />
          <Input
            id="tradeCutoff"
            label="Trade Cutoff Week"
            type="number"
            min={1}
            max={settings.weekCount}
            value={settings.tradeCutoffWeek}
            onChange={(e) => updateField('tradeCutoffWeek', parseInt(e.target.value) || 8)}
            hint="No trades after this week"
          />
          <Input
            id="gracePeriodHours"
            label="Grace Period (hours)"
            type="number"
            min={0}
            max={168}
            value={settings.gracePeriodHours}
            onChange={(e) => updateField('gracePeriodHours', parseInt(e.target.value) || 24)}
            hint="After draft completes"
          />
        </div>
      </section>

      {/* Species Clause */}
      <section>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Species Clause</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Prevent drafting multiple forms of the same Pokemon (e.g., Charizard-Mega-X and Charizard-Mega-Y)
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={settings.speciesClause}
            onClick={() => updateField('speciesClause', !settings.speciesClause)}
            className={`
              relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
              transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${settings.speciesClause ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}
            `}
          >
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                transition duration-200 ease-in-out
                ${settings.speciesClause ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </button>
        </div>
      </section>
    </div>
  );
}
