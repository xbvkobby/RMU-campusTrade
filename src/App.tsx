import React from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FiltersBar } from './components/FiltersBar';
import { ListingCard } from './components/ListingCard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { ChatModal } from './components/ChatModal';
import { NewListingModal } from './components/NewListingModal';
import { VerificationModal } from './components/VerificationModal';
import { CampusMapSafeZonesModal } from './components/CampusMapSafeZonesModal';
import { SafetyGuideModal } from './components/SafetyGuideModal';
import { PlusCircle, Search, Anchor, Heart, ArrowLeft } from 'lucide-react';

const MarketplaceContent: React.FC = () => {
  const { 
    listings, 
    selectedCategory, 
    selectedCondition, 
    selectedHostel, 
    maxPrice, 
    verifiedOnly, 
    searchQuery, 
    sortBy,
    setSearchQuery,
    setSelectedCategory,
    setIsNewListingModalOpen,
    setIsVerificationModalOpen,
    setIsSafeZonesOpen,
    setIsSafetyGuideOpen,
    showFavoritesOnly,
    setShowFavoritesOnly,
    isFavorite,
    favoritesCount
  } = useMarketplace();

  // Apply filtering
  const filteredListings = listings.filter((item) => {
    // Favorites only filter
    if (showFavoritesOnly && !isFavorite(item.id)) {
      return false;
    }

    // Category
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // Condition
    if (selectedCondition !== 'all' && item.condition !== selectedCondition) {
      return false;
    }

    // Hostel location
    if (selectedHostel !== 'all') {
      const matchHostel = item.location.toLowerCase().includes(selectedHostel.toLowerCase()) ||
                          item.seller.hostel.toLowerCase().includes(selectedHostel.toLowerCase());
      if (!matchHostel) return false;
    }

    // Price
    if (item.price > maxPrice) {
      return false;
    }

    // Verified only
    if (verifiedOnly && !item.seller.isVerified) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
      const matchCourse = item.courseCode?.toLowerCase().includes(q);
      const matchLocation = item.location.toLowerCase().includes(q);
      const matchSeller = item.seller.name.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchTags && !matchCourse && !matchLocation && !matchSeller) {
        return false;
      }
    }

    return true;
  });

  // Apply sorting
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'popular') return b.viewsCount - a.viewsCount;
    // default recent
    if (a.status === 'sold' && b.status !== 'sold') return 1;
    if (a.status !== 'sold' && b.status === 'sold') return -1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans antialiased">
      {/* Navigation */}
      <Navbar />

      {/* Simplified, compact Hero Banner */}
      <HeroBanner />

      {/* Clean Category & Filter Bar */}
      <FiltersBar />

      {/* Main Listings Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {showFavoritesOnly ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFavoritesOnly(false)}
                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
                  title="Back to all items"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    Saved Favorites
                  </h2>
                </div>
              </div>
            ) : (
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Campus Listings
              </h2>
            )}
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {sortedListings.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {showFavoritesOnly && (
              <button
                onClick={() => setShowFavoritesOnly(false)}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold px-2 py-1"
              >
                View All Items
              </button>
            )}
            <button
              onClick={() => setIsNewListingModalOpen(true)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post Item</span>
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        {sortedListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {sortedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : showFavoritesOnly ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-sm mx-auto my-12 space-y-3">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center">
              <Heart className="w-5 h-5 fill-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">No saved favorites yet</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tap the heart on any listing card to track textbooks, refrigerators, or cookers you want to buy.
              </p>
            </div>
            <button
              onClick={() => setShowFavoritesOnly(false)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Browse Campus Listings
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-sm mx-auto my-12 space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">No items match your search</h3>
              <p className="text-xs text-slate-500 mt-0.5">Try clearing filters or search terms</p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Clean, Simple Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 text-slate-500 text-xs py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-700 flex items-center justify-center text-amber-300">
              <Anchor className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">
              RMU CampusTrade
            </span>
            <span className="text-slate-400">• Regional Maritime University (Nungua, Accra)</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button onClick={() => setIsSafeZonesOpen(true)} className="hover:text-blue-600 transition-colors">
              Safe Zones
            </button>
            <button onClick={() => setIsSafetyGuideOpen(true)} className="hover:text-blue-600 transition-colors">
              Safety Rules
            </button>
            <button onClick={() => setIsVerificationModalOpen(true)} className="hover:text-blue-600 transition-colors">
              Verify Student ID
            </button>
          </div>
        </div>
      </footer>

      {/* Modals with all features retained */}
      <ListingDetailModal />
      <ChatModal />
      <NewListingModal />
      <VerificationModal />
      <CampusMapSafeZonesModal />
      <SafetyGuideModal />
    </div>
  );
};

export default function App() {
  return (
    <MarketplaceProvider>
      <MarketplaceContent />
    </MarketplaceProvider>
  );
}
