import { useState, useMemo } from 'react';
import type { Pokemon, PokemonCategory } from '../types';
import { POKEMON_POOL } from '../data/pokemonPool';
import { POKEMON_TYPES, GENERATIONS } from '../types/pokemon';

interface PokemonPoolConfigurationProps {
  enabledPokemon: Set<string>;
  onTogglePokemon: (pokemonId: string) => void;
  onBulkToggle: (pokemonIds: string[], enabled: boolean) => void;
  onToggleCategory: (category: PokemonCategory, enabled: boolean) => void;
  onToggleGeneration: (generation: number, enabled: boolean) => void;
  onResetToDefaults: () => void;
}

type FilterStatus = 'all' | 'enabled' | 'disabled';

const TIERS = ['Mega-1', 'Mega-2', 'Mega-3', 'A', 'B', 'C', 'D', 'E', 'F', 'Mythical', 'UB'];

const CATEGORY_LABELS: Record<PokemonCategory, string> = {
  standard: 'Standard',
  legendary: 'Legendary',
  mythical: 'Mythical',
  ultra_beast: 'Ultra Beast',
};

export function PokemonPoolConfiguration({
  enabledPokemon,
  onTogglePokemon,
  onBulkToggle,
  onToggleCategory,
  onToggleGeneration,
  onResetToDefaults,
}: PokemonPoolConfigurationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<string | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<PokemonCategory | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  // Filter Pokemon based on current filters
  const filteredPokemon = useMemo(() => {
    return POKEMON_POOL.filter(pokemon => {
      // Search filter
      if (searchQuery && !pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Generation filter
      if (selectedGeneration !== 'all' && pokemon.generation !== selectedGeneration) {
        return false;
      }
      // Type filter
      if (selectedType !== 'all' && !pokemon.types.includes(selectedType)) {
        return false;
      }
      // Tier filter
      if (selectedTier !== 'all' && pokemon.tier !== selectedTier) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && pokemon.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (filterStatus === 'enabled' && !enabledPokemon.has(pokemon.id)) {
        return false;
      }
      if (filterStatus === 'disabled' && enabledPokemon.has(pokemon.id)) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedGeneration, selectedType, selectedTier, selectedCategory, filterStatus, enabledPokemon]);

  const enabledCount = POKEMON_POOL.filter(p => enabledPokemon.has(p.id)).length;
  const filteredEnabledCount = filteredPokemon.filter(p => enabledPokemon.has(p.id)).length;

  const handleEnableAllVisible = () => {
    const ids = filteredPokemon.map(p => p.id);
    onBulkToggle(ids, true);
  };

  const handleDisableAllVisible = () => {
    const ids = filteredPokemon.map(p => p.id);
    onBulkToggle(ids, false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Pokemon Pool
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Toggle which Pokemon are available for drafting
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <select
          value={selectedGeneration}
          onChange={(e) => setSelectedGeneration(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Gens</option>
          {GENERATIONS.map(gen => (
            <option key={gen} value={gen}>Gen {gen}</option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          {POKEMON_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Tiers</option>
          {TIERS.map(tier => (
            <option key={tier} value={tier}>{tier}</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as PokemonCategory | 'all')}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {(Object.entries(CATEGORY_LABELS) as [PokemonCategory, string][]).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      {/* Bulk Actions */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <button
          onClick={handleEnableAllVisible}
          className="px-3 py-1.5 text-sm font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
        >
          Enable All Visible ({filteredPokemon.length - filteredEnabledCount})
        </button>
        <button
          onClick={handleDisableAllVisible}
          className="px-3 py-1.5 text-sm font-medium text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
        >
          Disable All Visible ({filteredEnabledCount})
        </button>
        <div className="border-l border-gray-300 dark:border-gray-600 mx-2" />
        <button
          onClick={() => onToggleCategory('legendary', false)}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Disable Legendaries
        </button>
        <button
          onClick={() => onToggleCategory('mythical', false)}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Disable Mythicals
        </button>
        <button
          onClick={() => onToggleCategory('ultra_beast', false)}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Disable Ultra Beasts
        </button>
        <div className="border-l border-gray-300 dark:border-gray-600 mx-2" />
        <button
          onClick={onResetToDefaults}
          className="px-3 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          Reset to Defaults
        </button>
      </div>

      {/* Generation Quick Toggles */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 py-1">Quick Gen Toggle:</span>
        {GENERATIONS.map(gen => {
          const genPokemon = POKEMON_POOL.filter(p => p.generation === gen);
          const genEnabled = genPokemon.filter(p => enabledPokemon.has(p.id)).length;
          const allEnabled = genEnabled === genPokemon.length;
          return (
            <button
              key={gen}
              onClick={() => onToggleGeneration(gen, !allEnabled)}
              className={`
                px-2 py-1 text-xs font-medium rounded transition-colors
                ${allEnabled
                  ? 'bg-blue-500 text-white'
                  : genEnabled > 0
                    ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }
              `}
            >
              Gen {gen}
            </button>
          );
        })}
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredPokemon.length} of {POKEMON_POOL.length} Pokemon
        {' • '}
        <span className="text-green-600 dark:text-green-400">{enabledCount} enabled</span>
        {' • '}
        <span className="text-red-600 dark:text-red-400">{POKEMON_POOL.length - enabledCount} disabled</span>
      </div>

      {/* Pokemon Grid */}
      <div className="max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-2">
          {filteredPokemon.map(pokemon => (
            <PokemonToggleRow
              key={pokemon.id}
              pokemon={pokemon}
              isEnabled={enabledPokemon.has(pokemon.id)}
              onToggle={() => onTogglePokemon(pokemon.id)}
            />
          ))}
        </div>
        {filteredPokemon.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No Pokemon match your filters
          </div>
        )}
      </div>
    </div>
  );
}

interface PokemonToggleRowProps {
  pokemon: Pokemon;
  isEnabled: boolean;
  onToggle: () => void;
}

function PokemonToggleRow({ pokemon, isEnabled, onToggle }: PokemonToggleRowProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        flex items-center justify-between p-2 rounded-lg text-left transition-all
        ${isEnabled
          ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'
          : 'bg-gray-100 dark:bg-gray-800/50 opacity-60 hover:opacity-80'
        }
      `}
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className={`
          w-4 h-4 rounded border-2 flex items-center justify-center shrink-0
          ${isEnabled
            ? 'border-green-500 bg-green-500'
            : 'border-gray-300 dark:border-gray-600'
          }
        `}>
          {isEnabled && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <span className={`font-medium truncate ${isEnabled ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
          {pokemon.name}
        </span>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {pokemon.types.map(type => (
          <TypeBadge key={type} type={type} />
        ))}
        <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
          {pokemon.tier}
        </span>
        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
          {pokemon.points}pts
        </span>
      </div>
    </button>
  );
}

const TYPE_COLORS: Record<string, string> = {
  Normal: 'bg-gray-400',
  Fire: 'bg-orange-500',
  Water: 'bg-blue-500',
  Electric: 'bg-yellow-400',
  Grass: 'bg-green-500',
  Ice: 'bg-cyan-400',
  Fighting: 'bg-red-600',
  Poison: 'bg-purple-500',
  Ground: 'bg-amber-600',
  Flying: 'bg-indigo-400',
  Psychic: 'bg-pink-500',
  Bug: 'bg-lime-500',
  Rock: 'bg-stone-500',
  Ghost: 'bg-purple-700',
  Dragon: 'bg-violet-600',
  Dark: 'bg-gray-700',
  Steel: 'bg-slate-400',
  Fairy: 'bg-pink-400',
};

function TypeBadge({ type }: { type: string }) {
  return (
    <span className={`px-1.5 py-0.5 text-xs font-medium text-white rounded ${TYPE_COLORS[type] || 'bg-gray-500'}`}>
      {type.substring(0, 3)}
    </span>
  );
}
