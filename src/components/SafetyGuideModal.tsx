import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  X, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Zap, 
  CreditCard 
} from 'lucide-react';

export const SafetyGuideModal: React.FC = () => {
  const { isSafetyGuideOpen, setIsSafetyGuideOpen, setIsSafeZonesOpen } = useMarketplace();

  if (!isSafetyGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900">Student Peer Safety & Trading Rules</h2>
              <p className="text-xs text-slate-500">Protecting RMU students against hostel scams and faulty gear</p>
            </div>
          </div>
          <button
            onClick={() => setIsSafetyGuideOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-5 text-xs flex-1">
          {/* Rule 1: No advance payments */}
          <div className="p-4 rounded-xl border border-red-200 bg-red-50/50 space-y-2">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
              <XCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>Rule 1: Never Pay Advance Mobile Money (MoMo) Deposits</span>
            </div>
            <p className="text-red-900 text-xs leading-relaxed">
              Legitimate RMU student peers will <strong>never</strong> demand upfront "commitment fee" or transport deposit before meeting you on campus. Only pay when holding and inspecting the item in person.
            </p>
          </div>

          {/* Rule 2: Inspect in safe daylight zones */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Rule 2: Exchange at Campus Safe Zones</span>
            </div>
            <p className="text-emerald-900 text-xs leading-relaxed">
              Always choose designated campus zones like the <strong>RMU Library Foyer</strong> or <strong>Main Gate Security</strong>. For heavy items like table-top fridges, the Main Gate Security has verified grounded AC sockets to plug in the fridge for 10 minutes to verify refrigerant cooling.
            </p>
          </div>

          {/* Rule 3: Verify the student's profile */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
            <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Rule 3: Check RMU Student Index & Department Badge</span>
            </div>
            <p className="text-blue-900 text-xs leading-relaxed">
              Look for the <strong>RMU Verified</strong> badge next to the student's name. You can check their university department (Nautical Science, Marine Engineering, Ports & Shipping) and level on their profile.
            </p>
          </div>

          {/* Rule 4: Inspection checklist */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <Zap className="w-5 h-5 text-amber-500 shrink-0" />
              <span>Rule 4: Appliance Checklist</span>
            </div>
            <ul className="space-y-1 text-slate-700 pl-1 list-disc list-inside text-[11px]">
              <li><strong>Tabletop Refrigerators:</strong> Check compressor sound, door rubber seal tightness, ice freezer compartment.</li>
              <li><strong>Infrared / Induction Cookers:</strong> Test both burners on an approved wall socket; confirm heat indicator glow.</li>
              <li><strong>Rechargeable Fans:</strong> Unplug from wall to confirm battery runs independently without flickering.</li>
              <li><strong>Textbooks & Navigation:</strong> Verify textbook edition, binding integrity, and included chart tables.</li>
            </ul>
          </div>

          {/* Footer action */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => {
                setIsSafetyGuideOpen(false);
                setIsSafeZonesOpen(true);
              }}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline"
            >
              See RMU Testing Outlets on Campus Map →
            </button>
            <button
              onClick={() => setIsSafetyGuideOpen(false)}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
