import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Search, ShieldCheck, MapPin, Zap } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    setIsSafeZonesOpen, 
    setIsVerificationModalOpen 
  } = useMarketplace();

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <div className="bg-slate-900 text-white pt-7 pb-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        {/* Concise heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Regional Maritime University Marketplace
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Buy and sell used textbooks, refrigerators, cookers, and cadet gear directly with verified peers.
        </p>

        {/* Clean, prominent search bar */}
        <div className="mt-4 max-w-xl mx-auto">
          <div className="relative flex items-center bg-white rounded-xl shadow-lg p-1 border border-slate-100 focus-within:ring-2 focus-within:ring-blue-600">
            <div className="pl-3 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search appliances, textbooks, course code (e.g. MENG 301)..."
              className="w-full px-2.5 py-1.5 text-slate-900 text-xs sm:text-sm placeholder-slate-400 bg-transparent border-0 focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2 text-xs font-semibold text-slate-400 hover:text-slate-600 mr-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => {}}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg font-bold text-xs transition-colors shrink-0"
            >
              Search
            </button>
          </div>

          {/* Quick search tags */}
          <div className="mt-2.5 flex items-center justify-center flex-wrap gap-1.5 text-xs text-slate-400">
            {['Fridges', 'Reed’s Marine', 'Bowditch', 'Electric Cookers', 'Rechargeable Fans', 'Cadet Uniforms'].map(tag => (
              <button
                key={tag}
                onClick={() => handleQuickTagClick(tag)}
                className="bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 px-2 py-0.5 rounded text-[11px] border border-slate-700/80 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Minimalist Trust Assurance Row (No heavy cards) */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-xs text-slate-300">
          <button 
            onClick={() => setIsVerificationModalOpen(true)}
            className="hover:text-blue-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Verified Student Profiles</span>
          </button>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>In-Chat Price Offers</span>
          </span>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <button 
            onClick={() => setIsSafeZonesOpen(true)}
            className="hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Campus Testing Safe Zones</span>
          </button>
        </div>
      </div>
    </div>
  );
};
