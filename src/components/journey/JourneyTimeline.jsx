import React, { useState } from 'react';
import { VisitRecordCard } from './VisitRecordCard';
import {
  Calendar,
  Activity,
  FileText,
  Clock,
  Sparkles,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const JourneyTimeline = ({ patient, onInspectDoc }) => {
  const [filterType, setFilterType] = useState('all');

  if (!patient) return null;

  const visits = patient.visits || [];

  return (
    <div className="space-y-4">
      {/* Timeline Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-soft-card">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-botanical" />
          <h4 className="font-bold text-slate-800 text-sm">Longitudinal Visit Record</h4>
          <span className="text-xs text-slate-500">({visits.length} documented encounters)</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium">Filter:</span>
          {['all', 'antenatal', 'scans', 'labs'].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterType(filter)}
              className={`px-2.5 py-1 rounded-md font-semibold capitalize transition-all ${
                filterType === filter
                  ? 'bg-botanical text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Chronological Visit Cards */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 before:hidden sm:before:block">
        {visits.map((visit, index) => (
          <div key={visit.id || index} className="relative sm:pl-10">
            {/* Timeline node icon */}
            <div className="hidden sm:flex absolute left-3 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-botanical border-4 border-white shadow-xs items-center justify-center" />

            <VisitRecordCard
              visit={visit}
              onInspectDoc={onInspectDoc}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
