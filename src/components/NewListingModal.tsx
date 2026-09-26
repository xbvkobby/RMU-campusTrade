import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ItemCategory, ItemCondition } from '../types';
import { 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Tag, 
  Refrigerator, 
  BookOpen, 
  Anchor 
} from 'lucide-react';

const PRESET_IMAGES = [
  { 
    label: 'Smart Television (TV)', 
    keywords: ['tv', 'television', 'screen', 'monitor', 'led tv', 'smart tv', 'nasco tv'], 
    url: '/src/assets/images/smart_television_1790426755451.jpg',
    category: 'electronics' as ItemCategory
  },
  { 
    label: 'Tabletop Refrigerator', 
    keywords: ['fridge', 'refrigerator', 'freezer', 'cooler', 'chiller', 'tabletop'], 
    url: '/src/assets/images/compact_refrigerator_1790426743265.jpg',
    category: 'appliances' as ItemCategory
  },
  { 
    label: 'Electric Hot Plate Cooker', 
    keywords: ['cooker', 'hot plate', 'stove', 'burner', 'induction', 'infrared', 'hotplate'], 
    url: '/src/assets/images/electric_cooker_1790426766525.jpg',
    category: 'appliances' as ItemCategory
  },
  { 
    label: 'Marine Engineering Book', 
    keywords: ['book', 'reeds', 'textbook', 'engineering', 'manual', 'notes', 'bowditch', 'navigator'], 
    url: '/src/assets/images/marine_textbook_1790426777333.jpg',
    category: 'textbooks' as ItemCategory
  },
  { 
    label: 'Rechargeable Standing Fan', 
    keywords: ['fan', 'standing fan', 'rechargeable fan', 'blower'], 
    url: '/src/assets/images/rechargeable_fan_1790426788984.jpg',
    category: 'electronics' as ItemCategory
  },
  { 
    label: 'Scientific Calculator', 
    keywords: ['calculator', 'casio', 'classwiz', 'scientific'], 
    url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
    category: 'study_tools' as ItemCategory
  },
  { 
    label: 'Cadet White Uniform', 
    keywords: ['uniform', 'drill', 'cadet', 'tunic', 'peaked cap', 'epaulette'], 
    url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    category: 'cadet_gear' as ItemCategory
  },
  { 
    label: 'Heavy Duty Boiler Suit', 
    keywords: ['suit', 'boilersuit', 'coverall', 'overalls', 'workshop', 'overalls'], 
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    category: 'cadet_gear' as ItemCategory
  }
];

export const NewListingModal: React.FC = () => {
  const { 
    isNewListingModalOpen, 
    setIsNewListingModalOpen, 
    addListing, 
    currentUser 
  } = useMarketplace();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('appliances');
  const [condition, setCondition] = useState<ItemCondition>('Like New (Flawless)');
  const [price, setPrice] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [courseCode, setCourseCode] = useState('');
  const [location, setLocation] = useState<string>(currentUser.hostel);
  const [safeZoneRecommended, setSafeZoneRecommended] = useState('RMU Main Gate Security Station or Library Forecourt');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [matchedPresetLabel, setMatchedPresetLabel] = useState<string>('Smart Television (TV)');
  const [inspectionTip1, setInspectionTip1] = useState('Plug into wall socket for 10 minutes to verify operation');
  const [inspectionTip2, setInspectionTip2] = useState('Inspect surface and all accessories thoroughly');

  // Smart auto-matching of image based on item title (e.g. typing television selects TV image)
  const handleTitleChange = (val: string) => {
    setTitle(val);
    const lower = val.toLowerCase().trim();
    if (!lower) return;

    for (const preset of PRESET_IMAGES) {
      if (preset.keywords.some(kw => lower.includes(kw))) {
        setImageUrl(preset.url);
        setMatchedPresetLabel(preset.label);
        setCategory(preset.category);
        break;
      }
    }
  };

  const handleCategoryChange = (newCat: ItemCategory) => {
    setCategory(newCat);
    const match = PRESET_IMAGES.find(p => p.category === newCat);
    if (match) {
      setImageUrl(match.url);
      setMatchedPresetLabel(match.label);
    }
  };

  if (!isNewListingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || Number(price) <= 0) return;

    addListing({
      title: title.trim(),
      category,
      condition,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      description: description.trim() || 'Listed by an RMU student. Item is verified and available for campus inspection.',
      images: [imageUrl],
      location: location || currentUser.hostel,
      safeZoneRecommended,
      tags: [category, condition.toLowerCase()],
      courseCode: courseCode.trim() || undefined,
      inspectionChecklist: [inspectionTip1, inspectionTip2].filter(Boolean)
    });

    setIsNewListingModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div>
            <h2 className="font-extrabold text-base text-slate-900">List an Item on RMU CampusTrade</h2>
            <p className="text-xs text-slate-500">Sell used textbooks, room essentials & cadet equipment to fellow peers</p>
          </div>
          <button
            onClick={() => setIsNewListingModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 text-xs flex-1">
          {/* Title */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Item Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Nasco 32-inch Television, Tabletop Refrigerator, or Infrared Cooker"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as ItemCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-blue-600"
              >
                <option value="appliances">Room Appliances (Fridges, Cookers, Fans)</option>
                <option value="textbooks">Textbooks & Nautical Charts</option>
                <option value="cadet_gear">Cadet Gear & Drill Uniforms</option>
                <option value="electronics">Tech & Electronics (TVs, Fans)</option>
                <option value="study_tools">Study & Drawing Tools</option>
                <option value="hostel_furniture">Hostel Furniture</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-blue-600"
              >
                <option value="Brand New">Brand New (Unused)</option>
                <option value="Like New (Flawless)">Like New (Flawless condition)</option>
                <option value="Good (Minor wear)">Good (Minor cosmetic wear, 100% works)</option>
                <option value="Fair (Fully functional)">Fair (Heavy use, fully functional)</option>
              </select>
            </div>
          </div>

          {/* Pricing in GH₵ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Asking Price (GH₵) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-400">GH₵</span>
                <input
                  type="number"
                  min="1"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="350"
                  className="w-full pl-12 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Original Retail Price (GH₵, optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-400">GH₵</span>
                <input
                  type="number"
                  min="1"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="500"
                  className="w-full pl-12 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Course Code / Dept (If textbook or tools) */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Target Course Code or Department (Optional)
            </label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="e.g. MENG 301 - Marine Auxiliary Machinery or NAUT 201"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          {/* Image Presets Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-700">
                Item Photo (Auto-detected from title or pick below) *
              </label>
              {matchedPresetLabel && (
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  ✓ Matching object: {matchedPresetLabel}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 mb-2">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setImageUrl(preset.url);
                    setMatchedPresetLabel(preset.label);
                  }}
                  className={`relative aspect-4/3 rounded-lg overflow-hidden border-2 transition-all ${
                    imageUrl === preset.url ? 'border-blue-600 ring-2 ring-blue-100 scale-102' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={preset.url} 
                    alt={preset.label} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-slate-900/85 text-white text-[9px] py-0.5 px-1 truncate text-center font-medium">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Or paste an image URL..."
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs font-mono"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Description & Condition Details *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mention how long you used it in the hostel, if all cables/power plugs are included, any cosmetic scratches, or whether it includes a power surge protector..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          {/* Campus Location & Safe Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Your Hostel / Pickup Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Titanic Hostel, Block B"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Recommended RMU Safe Meetup Point *
              </label>
              <select
                value={safeZoneRecommended}
                onChange={(e) => setSafeZoneRecommended(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-600"
              >
                <option value="RMU Main Gate Security Station or Library Forecourt">Main Gate Security (Power Outlet)</option>
                <option value="RMU Library Foyer & Quiet Study Hall">Library Foyer & Study Quad</option>
                <option value="Cadets Mess & Cafeteria Square">Cadets Mess Square</option>
                <option value="Maritime Safety Training Centre Lobby">Maritime Safety Training Centre</option>
              </select>
            </div>
          </div>

          {/* Inspection Tips for Buyer */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
            <span className="font-bold text-blue-900 block text-[11px] uppercase tracking-wider">
              Safety & Testing Checklist For Buyer (Builds Peer Trust)
            </span>
            <input
              type="text"
              value={inspectionTip1}
              onChange={(e) => setInspectionTip1(e.target.value)}
              placeholder="e.g. Plug in for 10 minutes at Main Gate socket to test compressor"
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
            />
            <input
              type="text"
              value={inspectionTip2}
              onChange={(e) => setInspectionTip2(e.target.value)}
              placeholder="e.g. Check all textbook binding and diagram fold-outs"
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsNewListingModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all"
            >
              Publish Item on RMU Marketplace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
