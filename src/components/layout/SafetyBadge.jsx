import React, { useState } from 'react';
import { ShieldCheck, Info, ChevronDown, ChevronUp } from 'lucide-react';

export const SafetyBadge = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside aria-label="Clinical AI Safety Notice" className="bg-sage-900 text-white text-xs border-b border-sage-800">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
          </div>
          <span className="font-semibold text-emerald-300">Assistive Clinical Prototype:</span>
          <span className="text-slate-200 hidden sm:inline">
            Synthesizes documented facts with source provenance. AI does not diagnose, prescribe, or calculate risk.
          </span>
          <span className="text-slate-200 sm:hidden">
            Document synthesis only. Non-diagnostic.
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-[11px] text-emerald-300/80 hover:text-emerald-200 transition-colors"
        >
          <span>Safety Boundaries</span>
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {isExpanded && (
        <div className="bg-sage-950 px-4 py-3 border-t border-sage-800 text-[11px] text-slate-300 leading-relaxed">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-sage-900/60 p-2.5 rounded-lg border border-sage-800/80">
              <span className="font-semibold text-emerald-400 block mb-1">Clinician Authority</span>
              All clinical evaluations, diagnosis, staging, and therapeutic interventions remain exclusively under the discretion of the examining clinician.
            </div>
            <div className="bg-sage-900/60 p-2.5 rounded-lg border border-sage-800/80">
              <span className="font-semibold text-emerald-400 block mb-1">Neutral Discrepancy Protocol</span>
              When conflicting records exist, MaatruAI reports: <em>"Information discrepancy detected — clinician verification required."</em> without autonomous arbitration.
            </div>
            <div className="bg-sage-900/60 p-2.5 rounded-lg border border-sage-800/80">
              <span className="font-semibold text-emerald-400 block mb-1">No Synthetic Fabrication</span>
              Missing data is explicitly flagged as unrecorded. No clinical values or vitals are imputed or guessed.
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
