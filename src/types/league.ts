export type DraftOrderType = 'snake' | 'linear' | 'auction';

export interface TierCaps {
  [tier: string]: number;
}

export interface TierPoints {
  [tier: string]: number;
}

export interface ConditionalTierCap {
  condition: string;
  tier: string;
  newCap: number;
}

export interface TradeLimits {
  freeAgent: number;
  coachToCoach: number;
  gracePeriod: number;
  megaTradesPerSeason: number;
}

export interface BannedAbilityCombo {
  pokemon: string;
  ability: string;
}

export interface LeagueSettings {
  budget: number;
  rosterSize: { min: number; max: number };
  tierCaps: TierCaps;
  tierPoints: TierPoints;
  conditionalTierCaps: ConditionalTierCap[];
  draftOrder: DraftOrderType;
  weekCount: number;
  tradeLimits: TradeLimits;
  tradeCutoffWeek: number;
  gracePeriodHours: number;
  pickTimerSeconds: number;
  bannedMoves: string[];
  bannedAbilities: string[];
  bannedAbilityCombos: BannedAbilityCombo[];
  bannedItems: string[];
  speciesClause: boolean;
}

export interface LeagueProfile {
  id: string;
  name: string;
  description: string;
  isBuiltIn: boolean;
  settings: LeagueSettings;
}

export type LeagueStatus = 'setup' | 'drafting' | 'active' | 'completed';

export interface League {
  id: string;
  name: string;
  description?: string;
  inviteCode: string;
  status: LeagueStatus;
  settings: LeagueSettings;
  profileId?: string;
  commissionerId: string;
  createdAt: Date;
  startDate?: Date;
  draftOrder: string[];
  draftOrderLocked: boolean;
}
