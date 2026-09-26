import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { RMU_SAFE_ZONES } from '../data/mockData';
import { 
  X, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  AlertTriangle,
  Building,
  CheckCircle2
} from 'lucide-react';

export const CampusMapSafeZonesModal: React.FC = () => {
  const { isSafeZonesOpen, setIsSafeZonesOpen } = useMarketplace();

  if (!isSafeZonesOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900">RMU Campus Safe Exchange Zones</h2>
              <p className="text-xs text-slate-500">Security-monitored locations & appliance testing outlets</p>
            </div>
          </div>
          <button
            onClick={() => setIsSafeZonesOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-5 text-xs flex-1">
          {/* Important Security Notice */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-xs">RMU Campus Security Protocol</span>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Never invite unknown buyers into private hostel rooms after hours. Always meet at one of the 4 designated zones below where university security or library staff are present.
              </p>
            </div>
          </div>

          {/* Safe Zones List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RMU_SAFE_ZONES.map((zone, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500/80 transition-all space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{zone.name}</span>
                  </div>
                  {zone.hasPowerOutlet && (
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-bold text-[10px] px-2 py-0.5 rounded-full shrink-0">
                      <Zap className="w-3 h-3 text-amber-600" />
                      Power Socket Available
                    </span>
                  )}
                </div>

                <p className="text-slate-600 text-xs leading-relaxed">
                  {zone.desc}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Operating Hours: <strong className="text-slate-700">{zone.hours}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Best For: <strong className="text-slate-700">{zone.recommendedFor}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How testing works */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>How To Test Heavy Appliances (Refrigerators & Cookers)</span>
            </h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              When meeting at the <strong>RMU Main Gate Security Station</strong>, notify the security officer on duty that you are conducting a student peer marketplace inspection. The gate house provides an external grounded AC wall socket. Plug in the refrigerator for 10-15 minutes to confirm the compressor kicks in cold before concluding the cash or Mobile Money (MoMo) transfer.
            </p>
          </div>

          {/* Security Hotline */}
          <div className="flex items-center justify-between p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-900">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-blue-700" />
              <div>
                <span className="font-bold text-xs block">RMU Campus Security Desk (24/7)</span>
                <span className="text-[11px] text-blue-700 font-mono">+233 (0) 302 712343 / Internal Ext: 202</span>
              </div>
            </div>
            <button
              onClick={() => setIsSafeZonesOpen(false)}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
