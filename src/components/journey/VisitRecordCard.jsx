import React from 'react';
import {
  Calendar,
  Building2,
  User,
  HeartPulse,
  Activity,
  FileText,
  Pill,
  ExternalLink
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const VisitRecordCard = ({ visit, onInspectDoc }) => {
  if (!visit) return null;

  const vitals = visit.vitals || {};

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-soft-card p-5 transition-all hover:border-sage-300">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-botanical-soft text-botanical border border-botanical-border">
              {visit.visitNumber ? `Visit ${visit.visitNumber}` : 'Encounter'}
            </span>
            <span className="font-bold text-slate-900 text-sm">
              {visit.gestationalAgeWeeks ? `${visit.gestationalAgeWeeks}w ${visit.gestationalAgeDays || 0}d Gestation` : 'Postnatal Encounter'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {visit.date}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {visit.facility}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {visit.clinician}
            </span>
          </div>
        </div>

        {/* Source Citation Badge */}
        {visit.sourceDocumentId && (
          <button
            onClick={() => onInspectDoc && onInspectDoc(visit.sourceDocumentId)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Inspect source document OCR record"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Ref: {visit.sourceDocumentId}</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        )}
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 py-3 border-b border-slate-100 text-xs">
        <div className="p-2 rounded bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase font-medium block">Blood Pressure</span>
          <span className="font-bold text-slate-800 text-sm mt-0.5 block">
            {vitals.systolicBP}/{vitals.diastolicBP} <span className="text-[10px] font-normal text-slate-500">mmHg</span>
          </span>
        </div>

        <div className="p-2 rounded bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase font-medium block">Maternal Weight</span>
          <span className="font-bold text-slate-800 text-sm mt-0.5 block">
            {vitals.weightKg} <span className="text-[10px] font-normal text-slate-500">kg</span>
          </span>
        </div>

        <div className="p-2 rounded bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase font-medium block">Fetal Heart Rate</span>
          <span className="font-bold text-slate-800 text-sm mt-0.5 block">
            {vitals.fetalHeartRateBpm ? `${vitals.fetalHeartRateBpm} bpm` : 'N/A'}
          </span>
        </div>

        <div className="p-2 rounded bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase font-medium block">Fundal Height</span>
          <span className="font-bold text-slate-800 text-sm mt-0.5 block">
            {vitals.fundalHeightCm ? `${vitals.fundalHeightCm} cm` : 'N/A'}
          </span>
        </div>

        <div className="p-2 rounded bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase font-medium block">Pedal Edema</span>
          <span className={`font-semibold text-xs mt-0.5 block ${vitals.pedalEdema === 'Absent' ? 'text-slate-700' : 'text-amber-700'}`}>
            {vitals.pedalEdema || 'Absent'}
          </span>
        </div>

        <div className="p-2 rounded bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase font-medium block">Urine Alb/Sugar</span>
          <span className="font-semibold text-xs mt-0.5 block text-slate-700">
            {vitals.urineAlbumin || 'Nil'} / {vitals.urineSugar || 'Nil'}
          </span>
        </div>
      </div>

      {/* Clinical Notes & Observations */}
      <div className="pt-3 text-xs leading-relaxed space-y-2">
        {visit.documentedComplaints?.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="font-semibold text-slate-600 shrink-0">Complaints:</span>
            <span className="text-slate-700">{visit.documentedComplaints.join(', ')}</span>
          </div>
        )}

        {visit.notes && (
          <div className="flex items-start gap-2">
            <span className="font-semibold text-slate-600 shrink-0">Observations:</span>
            <span className="text-slate-800">{visit.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
};
