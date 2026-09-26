import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  Anchor, 
  ShieldCheck, 
  MessageSquare, 
  PlusCircle, 
  MapPin, 
  ShieldAlert, 
  UserCheck, 
  ChevronDown,
  Layers,
  Heart
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    users, 
    switchUserById, 
    unreadCountTotal, 
    setIsChatModalOpen, 
    setIsNewListingModalOpen, 
    setIsVerificationModalOpen,
    setIsSafetyGuideOpen,
    setIsSafeZonesOpen,
    setActiveConversationId,
    conversations,
    favoritesCount,
    showFavoritesOnly,
    setShowFavoritesOnly
  } = useMarketplace();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleOpenMessages = () => {
    if (conversations.length > 0 && !conversations.find(c => c.id === currentUser.id)) {
      setActiveConversationId(conversations[0].id);
    }
    setIsChatModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white shadow-xs">
            <Anchor className="w-5 h-5 text-amber-300" />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold text-base tracking-tight text-slate-900">
              RMU <span className="text-blue-700">CampusTrade</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Regional Maritime University</div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Safe Zones link */}
          <button
            onClick={() => setIsSafeZonesOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Safe Zones</span>
          </button>

          {/* Quick Safety Guide link */}
          <button
            onClick={() => setIsSafetyGuideOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>Safety</span>
          </button>

          {/* Favorites / Saved Button */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              showFavoritesOnly
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Saved Favorites"
          >
            <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
            <span className="hidden sm:inline">Saved</span>
            {favoritesCount > 0 && (
              <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                showFavoritesOnly ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Messages / Negotiations */}
          <button
            onClick={handleOpenMessages}
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="Negotiations & Messages"
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Messages</span>
            {unreadCountTotal > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCountTotal}
              </span>
            )}
          </button>

          {/* Sell Button */}
          <button
            onClick={() => setIsNewListingModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-lg shadow-xs transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Sell</span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
            >
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                  referrerPolicy="no-referrer"
                />
                {currentUser.isVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 bg-white rounded-full absolute -bottom-0.5 -right-0.5" />
                )}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isUserMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800 animate-in fade-in duration-100"
                onClick={() => setIsUserMenuOpen(false)}
              >
                {/* Profile Card */}
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 truncate">{currentUser.name}</span>
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                      {currentUser.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{currentUser.department}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{currentUser.indexNumber}</div>
                </div>

                {/* Actions */}
                <div className="py-1 border-b border-slate-100 text-xs">
                  <button
                    onClick={() => setIsVerificationModalOpen(true)}
                    className="w-full px-3.5 py-1.5 flex items-center gap-2 hover:bg-slate-50 text-slate-700 text-left font-medium"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Digital Student ID Card</span>
                  </button>
                  <button
                    onClick={() => setIsSafeZonesOpen(true)}
                    className="w-full px-3.5 py-1.5 flex items-center gap-2 hover:bg-slate-50 text-slate-700 text-left font-medium"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Campus Safe Zones & Outlets</span>
                  </button>
                  <button
                    onClick={() => setIsSafetyGuideOpen(true)}
                    className="w-full px-3.5 py-1.5 flex items-center gap-2 hover:bg-slate-50 text-slate-700 text-left font-medium"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    <span>Safety Checklist</span>
                  </button>
                </div>

                {/* Switcher */}
                <div className="p-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1.5 mb-1 flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    <span>Switch Peer Persona</span>
                  </div>
                  <div className="space-y-0.5">
                    {users.map(u => (
                      <button
                        key={u.id}
                        onClick={() => switchUserById(u.id)}
                        className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-xs transition-colors text-left ${
                          u.id === currentUser.id ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        <img 
                          src={u.avatar} 
                          alt={u.name} 
                          className="w-5 h-5 rounded-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        <span className="truncate flex-1">{u.name}</span>
                        {u.id === currentUser.id && <span className="text-[10px] text-blue-600">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
