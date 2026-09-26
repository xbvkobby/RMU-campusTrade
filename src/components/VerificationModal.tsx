import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Department, AcademicLevel } from '../types';
import { 
  X, 
  ShieldCheck, 
  CheckCircle, 
  Anchor, 
  Upload, 
  CreditCard, 
  Building, 
  GraduationCap, 
  Sparkles,
  Lock
} from 'lucide-react';

const DEPARTMENTS: Department[] = [
  'Nautical Science',
  'Marine Engineering',
  'Ports & Shipping Administration',
  'Marine Electrical & Electronics',
  'Computer Science & IT',
  'Logistics & Supply Chain'
];

const LEVELS: AcademicLevel[] = [
  'Level 100',
  'Level 200',
  'Level 300',
  'Level 400',
  'Postgraduate'
];

export const VerificationModal: React.FC = () => {
  const { 
    isVerificationModalOpen, 
    setIsVerificationModalOpen, 
    currentUser, 
    verifyCurrentStudent 
  } = useMarketplace();

  const [indexNumber, setIndexNumber] = useState(currentUser.indexNumber || 'RMU/23/ENG/045');
  const [department, setDepartment] = useState<Department>(currentUser.department || 'Marine Engineering');
  const [level, setLevel] = useState<AcademicLevel>(currentUser.level || 'Level 300');
  const [email, setEmail] = useState(currentUser.email || 'student@st.rmu.edu.gh');
  const [isVerifying, setIsVerifying] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  if (!isVerificationModalOpen) return null;

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      verifyCurrentStudent(indexNumber, department, level);
      setIsVerifying(false);
      setSuccessNotice(true);
      setTimeout(() => setSuccessNotice(false), 3000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900">RMU Verified Student ID Program</h2>
              <p className="text-xs text-slate-500">Official student authentication & peer trust badges</p>
            </div>
          </div>
          <button
            onClick={() => setIsVerificationModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-xs">
          {/* Digital RMU Student ID Card Mockup */}
          <div className="relative rounded-2xl p-5 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white shadow-xl overflow-hidden border border-blue-400/30">
            {/* Watermark Crest */}
            <div className="absolute right-2 -bottom-6 opacity-10 pointer-events-none">
              <Anchor className="w-48 h-48 text-white" />
            </div>

            {/* Top ID Card Bar */}
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-xs">
                  RMU
                </div>
                <div>
                  <div className="font-black text-xs tracking-wider uppercase">Regional Maritime University</div>
                  <div className="text-[10px] text-blue-200">Republic of Ghana • Nungua Campus</div>
                </div>
              </div>

              {/* Holographic Verification Badge */}
              <div className="flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-300/40 px-2 py-0.5 rounded-full font-bold text-[10px]">
                <ShieldCheck className="w-3 h-3 text-amber-300" />
                <span>{currentUser.isVerified ? 'VERIFIED CADET/STUDENT' : 'STATUS PENDING'}</span>
              </div>
            </div>

            {/* Main ID Details */}
            <div className="mt-4 flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-amber-400/60 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white ring-2 ring-slate-900">
                  <ShieldCheck className="w-3 h-3 text-amber-300" />
                </span>
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="font-extrabold text-base tracking-tight text-white truncate">
                  {currentUser.name}
                </div>
                <div className="text-xs text-sky-200 font-semibold truncate">
                  {currentUser.department}
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-300 font-mono">
                  <span>INDEX: <strong className="text-white">{currentUser.indexNumber}</strong></span>
                  <span>·</span>
                  <span>{currentUser.level}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Hall: {currentUser.hostel} • Trust Rating: ★ {currentUser.trustScore}
                </div>
              </div>
            </div>
          </div>

          {successNotice && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl flex items-center gap-2 font-bold animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Student profile successfully verified with RMU Index Authentication!</span>
            </div>
          )}

          {/* Verification Form */}
          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <div className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Update / Re-verify Student Credentials
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  RMU Student Index Number *
                </label>
                <input
                  type="text"
                  required
                  value={indexNumber}
                  onChange={(e) => setIndexNumber(e.target.value)}
                  placeholder="e.g. RMU/22/MENG/041"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono uppercase focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Format: RMU / [Year] / [Dept] / [No]</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Institutional Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="username@st.rmu.edu.gh"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Academic Department *
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as Department)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                >
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Academic Level *
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as AcademicLevel)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                >
                  {LEVELS.map(lvl => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Why Verification Matters */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-slate-600">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-600" />
                <span>Why We Verify Every RMU Student</span>
              </div>
              <ul className="space-y-1 pl-1 text-[11px] list-disc list-inside">
                <li>Eliminates anonymous external scammers and stolen goods on campus.</li>
                <li>Ensures all buyers and sellers are traceable to university halls and faculties.</li>
                <li>Grants the blue shield trust badge on all your listings and negotiation threads.</li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsVerificationModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={isVerifying}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>{isVerifying ? 'Authenticating...' : 'Confirm Student Verification'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
