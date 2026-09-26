import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  CheckCircle2, 
  Share2, 
  Trash2,
  CheckCheck,
  Heart
} from 'lucide-react';

export const ListingDetailModal: React.FC = () => {
  const { 
    selectedListing, 
    setSelectedListing, 
    openChatForListing, 
    currentUser, 
    markListingSold, 
    deleteListing,
    setIsSafeZonesOpen,
    toggleFavorite,
    isFavorite
  } = useMarketplace();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedListing) return null;

  const isMyListing = selectedListing.sellerId === currentUser.id;
  const isSold = selectedListing.status === 'sold';
  const isReserved = selectedListing.status === 'reserved';
  const favorited = isFavorite(selectedListing.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenNegotiation = () => {
    const listing = selectedListing;
    setSelectedListing(null);
    openChatForListing(listing);
  };

  const savings = selectedListing.originalPrice && selectedListing.originalPrice > selectedListing.price
    ? selectedListing.originalPrice - selectedListing.price
    : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-blue-600 capitalize">
              {selectedListing.category.replace('_', ' ')}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-medium">{selectedListing.condition}</span>
            {selectedListing.courseCode && (
              <>
                <span className="text-slate-300">·</span>
                <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                  {selectedListing.courseCode.split(' - ')[0]}
                </span>
              </>
            )}
          </div>
          <button
            onClick={() => setSelectedListing(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 space-y-5 flex-1 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Image & Meeting info */}
            <div className="space-y-3">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={selectedListing.images[selectedImageIndex] || selectedListing.images[0]}
                  alt={selectedListing.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {isSold && (
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                    <span className="bg-red-600 text-white font-bold text-xs px-3 py-1 rounded">
                      Sold
                    </span>
                  </div>
                )}
                {isReserved && !isSold && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-slate-900 font-bold text-[10px] uppercase px-2 py-0.5 rounded">
                    Reserved
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {selectedListing.images.length > 1 && (
                <div className="flex gap-2">
                  {selectedListing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden border transition-all ${
                        selectedImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 opacity-70'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt="thumbnail" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Clean Location Box */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Pickup: {selectedListing.location}</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Safe point: {selectedListing.safeZoneRecommended.split(' or ')[0]}</span>
                  <button 
                    onClick={() => setIsSafeZonesOpen(true)} 
                    className="text-blue-600 hover:underline font-medium ml-1"
                  >
                    View map
                  </button>
                </div>
              </div>
            </div>

            {/* Right Details & Seller */}
            <div className="space-y-4">
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {selectedListing.title}
                </h1>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    GH₵ {selectedListing.price.toLocaleString()}
                  </span>
                  {selectedListing.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      GH₵ {selectedListing.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {savings && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Save GH₵ {savings}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedListing.description}
                </p>
              </div>

              {/* Specs Table */}
              {selectedListing.specs && Object.keys(selectedListing.specs).length > 0 && (
                <div className="border border-slate-200 rounded-lg overflow-hidden text-[11px]">
                  <div className="divide-y divide-slate-100">
                    {Object.entries(selectedListing.specs).map(([key, val]) => (
                      <div key={key} className="px-3 py-1.5 flex justify-between gap-2">
                        <span className="text-slate-500 font-medium">{key}</span>
                        <span className="text-slate-900 font-semibold text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inspection Checklist */}
              {selectedListing.inspectionChecklist && selectedListing.inspectionChecklist.length > 0 && (
                <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-[11px] space-y-1">
                  <span className="font-bold text-blue-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Inspection Tips Before Payment</span>
                  </span>
                  <ul className="space-y-0.5 pl-1 text-slate-700">
                    {selectedListing.inspectionChecklist.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-500">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Seller info */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <img
                    src={selectedListing.seller.avatar}
                    alt={selectedListing.seller.name}
                    className="w-9 h-9 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-1">
                      <span>{selectedListing.seller.name}</span>
                      {selectedListing.seller.isVerified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {selectedListing.seller.department.split(' ')[0]} • ★ {selectedListing.seller.trustScore}
                    </div>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <div className="font-bold text-slate-800">{selectedListing.seller.dealsCompleted} deals</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Verified Peer</div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-1 flex gap-2">
                {!isMyListing ? (
                  <>
                    <button
                      onClick={handleOpenNegotiation}
                      disabled={isSold}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{isSold ? 'Sold' : 'Negotiate / Make Offer'}</span>
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedListing.id)}
                      className={`px-3 py-2.5 border rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        favorited 
                          ? 'border-red-200 bg-red-50 text-red-600' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                      title={favorited ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{favorited ? 'Saved' : 'Save'}</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="px-3 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs"
                      title="Share link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <div className="w-full flex items-center gap-2">
                    {!isSold && (
                      <button
                        onClick={() => markListingSold(selectedListing.id)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Mark Sold</span>
                      </button>
                    )}
                    <button
                      onClick={() => deleteListing(selectedListing.id)}
                      className="px-3 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
