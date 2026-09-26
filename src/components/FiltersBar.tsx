import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ItemCategory } from '../types';
import { 
  SlidersHorizontal, 
  Check, 
  ShieldCheck, 
  X,
  ChevronDown,
  Heart
} from 'lucide-react';

const CATEGORIES: { id: ItemCategory; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'appliances', label: 'Appliances (Fridges/Cookers)' },
  { id: 'textbooks', label: 'Textbooks & Charts' },
  { id: 'cadet_gear', label: 'Cadet Gear' },
  { id: 'electronics', label: 'Electronics & Fans' },
  { id: 'study_tools', label: 'Study Tools' },
  { id: 'hostel_furniture', label: 'Furniture' },
];

export const FiltersBar: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedCondition,
    setSelectedCondition,
    selectedHostel,
    setSelectedHostel,
    maxPrice,
    setMaxPrice,
    verifiedOnly,
    setVerifiedOnly,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    showFavoritesOnly,
    setShowFavoritesOnly,
    favoritesCount
  } = useMarketplace();

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const activeFiltersCount = 
    (selectedCondition !== 'all' ? 1 : 0) +
    (selectedHostel !== 'all' ? 1 : 0) +
    (maxPrice < 3000 ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  const resetFilters = () => {
    setSelectedCondition('all');
    setSelectedHostel('all');
    setMaxPrice(3000);
    setVerifiedOnly(false);
  };

  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none flex-1">
            {/* Favorites Filter Tab */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                showFavoritesOnly
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-white text-white' : 'text-red-500'}`} />
              <span>Favorites {favoritesCount > 0 ? `(${favoritesCount})` : ''}</span>
            </button>

            {CATEGORIES.map(cat => {
              const isSelected = !showFavoritesOnly && selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Filter Toggle & Sort */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Filter Drawer Toggle */}
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isFilterPanelOpen || activeFiltersCount > 0
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs font-medium cursor-pointer focus:outline-hidden"
            >
              <option value="recent">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {isFilterPanelOpen && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs animate-in slide-in-from-top-1 duration-150">
            {/* Condition */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Condition</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="all">Any Condition</option>
                <option value="Brand New">Brand New</option>
                <option value="Like New (Flawless)">Like New</option>
                <option value="Good (Minor wear)">Good</option>
                <option value="Fair (Fully functional)">Fair</option>
              </select>
            </div>

            {/* Hostel */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Hostel Pickup</label>
              <select
                value={selectedHostel}
                onChange={(e) => setSelectedHostel(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="all">All RMU Hostels</option>
                <option value="Titanic Hostel">Titanic Hostel</option>
                <option value="Cadet Block A">Cadet Block A</option>
                <option value="Cadet Block B">Cadet Block B</option>
                <option value="Mandela Hostel">Mandela Hostel</option>
                <option value="Off-Campus">Off-Campus</option>
              </select>
            </div>

            {/* Price Cap */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                <span>Max Price</span>
                <span className="text-blue-700">GH₵ {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Verified toggle & Reset */}
            <div className="flex items-end justify-between gap-2">
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  verifiedOnly
                    ? 'bg-blue-50 border-blue-300 text-blue-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Verified Only</span>
                {verifiedOnly && <Check className="w-3 h-3 text-blue-600" />}
              </button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-red-600 hover:underline px-1 py-1.5"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
