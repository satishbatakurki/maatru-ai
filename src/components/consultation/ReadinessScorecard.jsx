import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  FileQuestion,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const ReadinessScorecard = ({ patient, onNavigateTab }) => {
  if (!patient) return null;

  const readiness = patient.consultationReadiness || {};
  const status = readiness.overallStatus || "Review Required";
  const score = readiness.scorePercent || 75;

  const statusConfig = {
    "Ready": {
      bg: "bg-emerald-500",
      text: "text-emerald-700",
      badge: "success",
      icon: CheckCircle2,
      label: "Consultation Ready",
      description: "All mandatory milestone documents indexed. No unreviewed discrepancies."
    },
    "Review Required": {
      bg: "bg-amber-500",
      text: "text-amber-800",
      badge: "warning",
      icon: AlertTriangle,
      label: "Review Discrepancies",
      description: "Documented information discrepancies require clinician verification."
    },
    "Incomplete Records": {
      bg: "bg-rose-500",
      text: "text-rose-700",
      badge: "danger",
      icon: FileQuestion,
      label: "Incomplete Records",
      description: "Crucial guideline records missing or unrecorded in maternal file."
    }
  };

  const current = statusConfig[status] || statusConfig["Review Required"];
  const StatusIcon = current.icon;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            status === 'Ready' ? 'bg-emerald-50 text-emerald-600' :
            status === 'Review Required' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
          }`}>
            <StatusIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base">{current.label}</h3>
              <Badge variant={current.badge} size="sm">
                {score}% Synthesized
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{current.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full md:w-56 shrink-0">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1.5">
            <span>Readiness Index</span>
            <span className="font-bold text-slate-800">{score}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${current.bg}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mini metric counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
        <div
          onClick={() => onNavigateTab && onNavigateTab('discrepancies')}
          className="p-3 rounded-lg bg-slate-50 hover:bg-amber-50/60 border border-slate-200/70 hover:border-amber-200 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Discrepancies</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-lg font-bold text-slate-800 mt-1">
            {readiness.unreviewedDiscrepanciesCount || 0}
          </div>
          <span className="text-[10px] text-slate-500">Unreviewed flags</span>
        </div>

        <div
          onClick={() => onNavigateTab && onNavigateTab('missing')}
          className="p-3 rounded-lg bg-slate-50 hover:bg-rose-50/60 border border-slate-200/70 hover:border-rose-200 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Missing Data</span>
            <FileQuestion className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-lg font-bold text-slate-800 mt-1">
            {readiness.missingMandatoryRecordsCount || 0}
          </div>
          <span className="text-[10px] text-slate-500">Milestone records</span>
        </div>

        <div
          onClick={() => onNavigateTab && onNavigateTab('actions')}
          className="p-3 rounded-lg bg-slate-50 hover:bg-sky-50/60 border border-slate-200/70 hover:border-sky-200 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Pending Tasks</span>
            <Clock className="w-3.5 h-3.5 text-sky-500" />
          </div>
          <div className="text-lg font-bold text-slate-800 mt-1">
            {readiness.pendingActionsCount || 0}
          </div>
          <span className="text-[10px] text-slate-500">Clinical actions</span>
        </div>

        <div
          onClick={() => onNavigateTab && onNavigateTab('documents')}
          className="p-3 rounded-lg bg-slate-50 hover:bg-sage-100/60 border border-slate-200/70 hover:border-sage-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Digitized</span>
            <FileText className="w-3.5 h-3.5 text-botanical" />
          </div>
          <div className="text-lg font-bold text-slate-800 mt-1">
            {readiness.digitizedDocumentsCount || 0}
          </div>
          <span className="text-[10px] text-slate-500">Source files</span>
        </div>
      </div>
    </div>
  );
};
