import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, Activity, CheckCircle2 } from 'lucide-react';

export const ChangesSinceLastVisit = ({ patient }) => {
  if (!patient || !patient.changesSinceLastVisit) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card p-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 text-sky-700">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Changes Since Previous Visit</h4>
            <p className="text-[11px] text-slate-500">Auto-detected delta across consecutive documented records</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
          Live Delta
        </span>
      </div>

      <ul className="space-y-2">
        {patient.changesSinceLastVisit.map((change, index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 text-xs text-slate-700 p-2.5 rounded-lg bg-slate-50/80 border border-slate-100 leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-botanical mt-1.5 shrink-0" />
            <span>{change}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
