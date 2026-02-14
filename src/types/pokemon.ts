export type PokemonCategory = 'standard' | 'legendary' | 'mythical' | 'ultra_beast';
export type FormType = 'base' | 'mega' | 'regional' | 'other';

export interface Pokemon {
  id: string;
  name: string;
  tier: string;
  points: number;
  baseSpecies: string;
  formType: FormType;
  generation: number;
  category: PokemonCategory;
  types: string[];
  isEnabled: boolean;
}

export interface PokemonPoolConfig {
  enabledPokemonIds: string[];
  disabledCategories: PokemonCategory[];
  disabledGenerations: number[];
  customBans: string[];
}

export const POKEMON_TYPES = [
  'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy',
] as const;

export type PokemonType = typeof POKEMON_TYPES[number];

export const GENERATIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type Generation = typeof GENERATIONS[number];
