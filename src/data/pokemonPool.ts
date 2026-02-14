import type { Pokemon } from '../types';

// Sample Pokemon pool - in production this would come from an API/database
export const POKEMON_POOL: Pokemon[] = [
  // Mega Tier
  { id: 'charizard-mega-x', name: 'Charizard-Mega-X', tier: 'Mega-1', points: 20, baseSpecies: 'Charizard', formType: 'mega', generation: 1, category: 'standard', types: ['Fire', 'Dragon'], isEnabled: true },
  { id: 'charizard-mega-y', name: 'Charizard-Mega-Y', tier: 'Mega-1', points: 20, baseSpecies: 'Charizard', formType: 'mega', generation: 1, category: 'standard', types: ['Fire', 'Flying'], isEnabled: true },
  { id: 'blaziken-mega', name: 'Blaziken-Mega', tier: 'Mega-1', points: 20, baseSpecies: 'Blaziken', formType: 'mega', generation: 3, category: 'standard', types: ['Fire', 'Fighting'], isEnabled: true },
  { id: 'garchomp-mega', name: 'Garchomp-Mega', tier: 'Mega-2', points: 18, baseSpecies: 'Garchomp', formType: 'mega', generation: 4, category: 'standard', types: ['Dragon', 'Ground'], isEnabled: true },
  { id: 'scizor-mega', name: 'Scizor-Mega', tier: 'Mega-2', points: 18, baseSpecies: 'Scizor', formType: 'mega', generation: 2, category: 'standard', types: ['Bug', 'Steel'], isEnabled: true },
  { id: 'mawile-mega', name: 'Mawile-Mega', tier: 'Mega-2', points: 18, baseSpecies: 'Mawile', formType: 'mega', generation: 3, category: 'standard', types: ['Steel', 'Fairy'], isEnabled: true },
  { id: 'lopunny-mega', name: 'Lopunny-Mega', tier: 'Mega-3', points: 16, baseSpecies: 'Lopunny', formType: 'mega', generation: 4, category: 'standard', types: ['Normal', 'Fighting'], isEnabled: true },
  { id: 'venusaur-mega', name: 'Venusaur-Mega', tier: 'Mega-3', points: 16, baseSpecies: 'Venusaur', formType: 'mega', generation: 1, category: 'standard', types: ['Grass', 'Poison'], isEnabled: true },

  // A Tier
  { id: 'dragapult', name: 'Dragapult', tier: 'A', points: 16, baseSpecies: 'Dragapult', formType: 'base', generation: 8, category: 'standard', types: ['Dragon', 'Ghost'], isEnabled: true },
  { id: 'kingambit', name: 'Kingambit', tier: 'A', points: 16, baseSpecies: 'Kingambit', formType: 'base', generation: 9, category: 'standard', types: ['Dark', 'Steel'], isEnabled: true },
  { id: 'landorus-therian', name: 'Landorus-Therian', tier: 'A', points: 16, baseSpecies: 'Landorus', formType: 'other', generation: 5, category: 'legendary', types: ['Ground', 'Flying'], isEnabled: true },
  { id: 'garchomp', name: 'Garchomp', tier: 'A', points: 16, baseSpecies: 'Garchomp', formType: 'base', generation: 4, category: 'standard', types: ['Dragon', 'Ground'], isEnabled: true },
  { id: 'volcarona', name: 'Volcarona', tier: 'A', points: 16, baseSpecies: 'Volcarona', formType: 'base', generation: 5, category: 'standard', types: ['Bug', 'Fire'], isEnabled: true },
  { id: 'heatran', name: 'Heatran', tier: 'A', points: 16, baseSpecies: 'Heatran', formType: 'base', generation: 4, category: 'legendary', types: ['Fire', 'Steel'], isEnabled: true },

  // B Tier
  { id: 'toxapex', name: 'Toxapex', tier: 'B', points: 12, baseSpecies: 'Toxapex', formType: 'base', generation: 7, category: 'standard', types: ['Poison', 'Water'], isEnabled: true },
  { id: 'ferrothorn', name: 'Ferrothorn', tier: 'B', points: 12, baseSpecies: 'Ferrothorn', formType: 'base', generation: 5, category: 'standard', types: ['Grass', 'Steel'], isEnabled: true },
  { id: 'clefable', name: 'Clefable', tier: 'B', points: 12, baseSpecies: 'Clefable', formType: 'base', generation: 1, category: 'standard', types: ['Fairy'], isEnabled: true },
  { id: 'rotom-wash', name: 'Rotom-Wash', tier: 'B', points: 12, baseSpecies: 'Rotom', formType: 'other', generation: 4, category: 'standard', types: ['Electric', 'Water'], isEnabled: true },
  { id: 'weavile', name: 'Weavile', tier: 'B', points: 12, baseSpecies: 'Weavile', formType: 'base', generation: 4, category: 'standard', types: ['Dark', 'Ice'], isEnabled: true },
  { id: 'urshifu', name: 'Urshifu', tier: 'B', points: 12, baseSpecies: 'Urshifu', formType: 'base', generation: 8, category: 'legendary', types: ['Fighting', 'Dark'], isEnabled: true },
  { id: 'urshifu-rapid-strike', name: 'Urshifu-Rapid-Strike', tier: 'B', points: 12, baseSpecies: 'Urshifu', formType: 'other', generation: 8, category: 'legendary', types: ['Fighting', 'Water'], isEnabled: true },
  { id: 'rillaboom', name: 'Rillaboom', tier: 'B', points: 12, baseSpecies: 'Rillaboom', formType: 'base', generation: 8, category: 'standard', types: ['Grass'], isEnabled: true },

  // C Tier
  { id: 'slowking-galar', name: 'Slowking-Galar', tier: 'C', points: 10, baseSpecies: 'Slowking', formType: 'regional', generation: 8, category: 'standard', types: ['Poison', 'Psychic'], isEnabled: true },
  { id: 'magnezone', name: 'Magnezone', tier: 'C', points: 10, baseSpecies: 'Magnezone', formType: 'base', generation: 4, category: 'standard', types: ['Electric', 'Steel'], isEnabled: true },
  { id: 'excadrill', name: 'Excadrill', tier: 'C', points: 10, baseSpecies: 'Excadrill', formType: 'base', generation: 5, category: 'standard', types: ['Ground', 'Steel'], isEnabled: true },
  { id: 'dragonite', name: 'Dragonite', tier: 'C', points: 10, baseSpecies: 'Dragonite', formType: 'base', generation: 1, category: 'standard', types: ['Dragon', 'Flying'], isEnabled: true },
  { id: 'zapdos', name: 'Zapdos', tier: 'C', points: 10, baseSpecies: 'Zapdos', formType: 'base', generation: 1, category: 'legendary', types: ['Electric', 'Flying'], isEnabled: true },
  { id: 'moltres', name: 'Moltres', tier: 'C', points: 10, baseSpecies: 'Moltres', formType: 'base', generation: 1, category: 'legendary', types: ['Fire', 'Flying'], isEnabled: true },
  { id: 'articuno', name: 'Articuno', tier: 'C', points: 10, baseSpecies: 'Articuno', formType: 'base', generation: 1, category: 'legendary', types: ['Ice', 'Flying'], isEnabled: true },
  { id: 'ninetales-alola', name: 'Ninetales-Alola', tier: 'C', points: 10, baseSpecies: 'Ninetales', formType: 'regional', generation: 7, category: 'standard', types: ['Ice', 'Fairy'], isEnabled: true },

  // D Tier
  { id: 'scizor', name: 'Scizor', tier: 'D', points: 8, baseSpecies: 'Scizor', formType: 'base', generation: 2, category: 'standard', types: ['Bug', 'Steel'], isEnabled: true },
  { id: 'alakazam', name: 'Alakazam', tier: 'D', points: 8, baseSpecies: 'Alakazam', formType: 'base', generation: 1, category: 'standard', types: ['Psychic'], isEnabled: true },
  { id: 'gengar', name: 'Gengar', tier: 'D', points: 8, baseSpecies: 'Gengar', formType: 'base', generation: 1, category: 'standard', types: ['Ghost', 'Poison'], isEnabled: true },
  { id: 'gyarados', name: 'Gyarados', tier: 'D', points: 8, baseSpecies: 'Gyarados', formType: 'base', generation: 1, category: 'standard', types: ['Water', 'Flying'], isEnabled: true },
  { id: 'tyranitar', name: 'Tyranitar', tier: 'D', points: 8, baseSpecies: 'Tyranitar', formType: 'base', generation: 2, category: 'standard', types: ['Rock', 'Dark'], isEnabled: true },
  { id: 'hydreigon', name: 'Hydreigon', tier: 'D', points: 8, baseSpecies: 'Hydreigon', formType: 'base', generation: 5, category: 'standard', types: ['Dark', 'Dragon'], isEnabled: true },
  { id: 'blissey', name: 'Blissey', tier: 'D', points: 8, baseSpecies: 'Blissey', formType: 'base', generation: 2, category: 'standard', types: ['Normal'], isEnabled: true },
  { id: 'hippowdon', name: 'Hippowdon', tier: 'D', points: 8, baseSpecies: 'Hippowdon', formType: 'base', generation: 4, category: 'standard', types: ['Ground'], isEnabled: true },

  // E Tier
  { id: 'azumarill', name: 'Azumarill', tier: 'E', points: 6, baseSpecies: 'Azumarill', formType: 'base', generation: 2, category: 'standard', types: ['Water', 'Fairy'], isEnabled: true },
  { id: 'torkoal', name: 'Torkoal', tier: 'E', points: 6, baseSpecies: 'Torkoal', formType: 'base', generation: 3, category: 'standard', types: ['Fire'], isEnabled: true },
  { id: 'pelipper', name: 'Pelipper', tier: 'E', points: 6, baseSpecies: 'Pelipper', formType: 'base', generation: 3, category: 'standard', types: ['Water', 'Flying'], isEnabled: true },
  { id: 'amoonguss', name: 'Amoonguss', tier: 'E', points: 6, baseSpecies: 'Amoonguss', formType: 'base', generation: 5, category: 'standard', types: ['Grass', 'Poison'], isEnabled: true },
  { id: 'quagsire', name: 'Quagsire', tier: 'E', points: 6, baseSpecies: 'Quagsire', formType: 'base', generation: 2, category: 'standard', types: ['Water', 'Ground'], isEnabled: true },
  { id: 'ditto', name: 'Ditto', tier: 'E', points: 6, baseSpecies: 'Ditto', formType: 'base', generation: 1, category: 'standard', types: ['Normal'], isEnabled: true },

  // F Tier
  { id: 'dugtrio', name: 'Dugtrio', tier: 'F', points: 4, baseSpecies: 'Dugtrio', formType: 'base', generation: 1, category: 'standard', types: ['Ground'], isEnabled: true },
  { id: 'perrserker', name: 'Perrserker', tier: 'F', points: 4, baseSpecies: 'Perrserker', formType: 'base', generation: 8, category: 'standard', types: ['Steel'], isEnabled: true },
  { id: 'zoroark', name: 'Zoroark', tier: 'F', points: 4, baseSpecies: 'Zoroark', formType: 'base', generation: 5, category: 'standard', types: ['Dark'], isEnabled: true },
  { id: 'zoroark-hisui', name: 'Zoroark-Hisui', tier: 'F', points: 4, baseSpecies: 'Zoroark', formType: 'regional', generation: 8, category: 'standard', types: ['Normal', 'Ghost'], isEnabled: true },
  { id: 'breloom', name: 'Breloom', tier: 'F', points: 4, baseSpecies: 'Breloom', formType: 'base', generation: 3, category: 'standard', types: ['Grass', 'Fighting'], isEnabled: true },

  // Mythicals (usually disabled by default in NKO)
  { id: 'mew', name: 'Mew', tier: 'Mythical', points: 20, baseSpecies: 'Mew', formType: 'base', generation: 1, category: 'mythical', types: ['Psychic'], isEnabled: false },
  { id: 'celebi', name: 'Celebi', tier: 'Mythical', points: 18, baseSpecies: 'Celebi', formType: 'base', generation: 2, category: 'mythical', types: ['Psychic', 'Grass'], isEnabled: false },
  { id: 'jirachi', name: 'Jirachi', tier: 'Mythical', points: 18, baseSpecies: 'Jirachi', formType: 'base', generation: 3, category: 'mythical', types: ['Steel', 'Psychic'], isEnabled: false },
  { id: 'victini', name: 'Victini', tier: 'Mythical', points: 18, baseSpecies: 'Victini', formType: 'base', generation: 5, category: 'mythical', types: ['Psychic', 'Fire'], isEnabled: false },

  // Ultra Beasts
  { id: 'nihilego', name: 'Nihilego', tier: 'UB', points: 14, baseSpecies: 'Nihilego', formType: 'base', generation: 7, category: 'ultra_beast', types: ['Rock', 'Poison'], isEnabled: false },
  { id: 'buzzwole', name: 'Buzzwole', tier: 'UB', points: 14, baseSpecies: 'Buzzwole', formType: 'base', generation: 7, category: 'ultra_beast', types: ['Bug', 'Fighting'], isEnabled: false },
  { id: 'pheromosa', name: 'Pheromosa', tier: 'UB', points: 16, baseSpecies: 'Pheromosa', formType: 'base', generation: 7, category: 'ultra_beast', types: ['Bug', 'Fighting'], isEnabled: false },
  { id: 'kartana', name: 'Kartana', tier: 'UB', points: 16, baseSpecies: 'Kartana', formType: 'base', generation: 7, category: 'ultra_beast', types: ['Grass', 'Steel'], isEnabled: false },
  { id: 'naganadel', name: 'Naganadel', tier: 'UB', points: 16, baseSpecies: 'Naganadel', formType: 'base', generation: 7, category: 'ultra_beast', types: ['Poison', 'Dragon'], isEnabled: false },
];

export function getPokemonById(id: string): Pokemon | undefined {
  return POKEMON_POOL.find(p => p.id === id);
}

export function getPokemonByTier(tier: string): Pokemon[] {
  return POKEMON_POOL.filter(p => p.tier === tier);
}

export function getPokemonByGeneration(gen: number): Pokemon[] {
  return POKEMON_POOL.filter(p => p.generation === gen);
}

export function getPokemonByCategory(category: string): Pokemon[] {
  return POKEMON_POOL.filter(p => p.category === category);
}

export function getPokemonByType(type: string): Pokemon[] {
  return POKEMON_POOL.filter(p => p.types.includes(type));
}
