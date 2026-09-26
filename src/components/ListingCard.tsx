import React from 'react';
import { Listing } from '../types';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  ShieldCheck, 
  MapPin, 
  Heart, 
  MessageSquare 
} from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { 
    setSelectedListing, 
    openChatForListing, 
    toggleFavorite,
    isFavorite,
    currentUser,
    incrementListingViews 
  } = useMarketplace();

  const handleCardClick = () => {
    incrementListingViews(listing.id);
    setSelectedListing(listing);
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openChatForListing(listing);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(listing.id);
  };

  const isSold = listing.status === 'sold';
  const isReserved = listing.status === 'reserved';
  const isMyListing = listing.sellerId === currentUser.id;
  const favorited = isFavorite(listing.id);

  return (
    <div 
      onClick={handleCardClick}
      className={`group bg-white border rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-150 cursor-pointer flex flex-col ${
        isSold ? 'border-slate-200 opacity-70' : 'border-slate-200 hover:border-blue-400'
      }`}
    >
      {/* Photo */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {isSold && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
            <span className="bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded">
              Sold
            </span>
          </div>
        )}

        {isReserved && !isSold && (
          <div className="absolute top-2 left-2 bg-amber-500 text-slate-900 font-bold text-[10px] uppercase px-1.5 py-0.5 rounded">
            Reserved
          </div>
        )}

        <div className="absolute bottom-2 left-2 bg-slate-900/75 backdrop-blur-xs text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
          {listing.condition}
        </div>

        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs transition-transform active:scale-90 ${
            favorited ? 'text-red-500 hover:text-red-600' : 'text-slate-500 hover:text-red-500'
          }`}
          title={favorited ? 'Remove from favorites' : 'Save to favorites'}
          aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 transition-colors ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-base font-extrabold text-slate-900">
              GH₵ {listing.price.toLocaleString()}
            </span>
            {listing.originalPrice && listing.originalPrice > listing.price && (
              <span className="text-xs text-slate-400 line-through">
                GH₵ {listing.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {listing.title}
          </h3>

          {/* Location */}
          <div className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-500">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{listing.location}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Seller */}
          <div className="flex items-center gap-1.5 min-w-0">
            <img
              src={listing.seller.avatar}
              alt={listing.seller.name}
              className="w-5 h-5 rounded-full object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs text-slate-700 truncate font-medium">
              {listing.seller.name.split(' ')[0]}
            </span>
            {listing.seller.isVerified && (
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleChatClick}
            disabled={isSold}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
              isSold
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3 h-3" />
            <span>{isMyListing ? 'Manage' : 'Negotiate'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
