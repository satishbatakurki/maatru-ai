import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  Activity,
  Pill,
  AlertTriangle,
  UserCheck,
  CheckCircle,
  Copy,
  Printer
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const ConsultationSummaryCard = ({ patient }) => {
  const [copied, setCopied] = useState(false);

  if (!patient) return null;

  const currentVisit = patient.visits?.[patient.visits.length - 1];
  const lmp = patient.currentPregnancy?.lmpDate;
  const eddLmp = patient.currentPregnancy?.eddLmp;
  const eddUsg = patient.currentPregnancy?.eddUsg;
  const ga = patient.currentPregnancy?.gestationalAgeWeeks;
  const gaDays = patient.currentPregnancy?.gestationalAgeDays || 0;

  const handleCopySummary = () => {
    const text = `CONSULTATION BRIEFING - MAATRUAI\nPatient: ${patient.name} (${patient.age}y, ${patient.obstetricFormula})\nTaayi No: ${patient.taayiCardNo} | RCH: ${patient.rchId}\nGA: ${ga ? `${ga}w ${gaDays}d` : patient.currentPregnancy?.currentStage}\nBlood Group: ${patient.bloodGroup}\nLMP: ${lmp} | EDD (LMP): ${eddLmp} | EDD (USG): ${eddUsg || 'N/A'}\nLatest Vitals: BP ${currentVisit?.vitals?.systolicBP}/${currentVisit?.vitals?.diastolicBP} mmHg, Wt ${currentVisit?.vitals?.weightKg} kg, FHR ${currentVisit?.vitals?.fetalHeartRateBpm || 'N/A'} bpm\nActive Meds: ${patient.activeMedications?.map(m => m.name).join(', ')}\nPending Review: ${patient.discrepancies?.filter(d => d.status !== 'Resolved by Clinician').map(d => d.field).join(', ') || 'None'}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card p-5">
      {/* Header with Title and Copy */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-botanical-soft text-botanical">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Consultation-Ready Longitudinal Summary
            </h3>
            <p className="text-xs text-slate-500">
              Auto-synthesized from {patient.consultationReadiness?.digitizedDocumentsCount || 6} documented sources
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant="secondary"
            icon={copied ? CheckCircle : Copy}
            onClick={handleCopySummary}
          >
            {copied ? 'Copied' : 'Copy Briefing'}
          </Button>
          <Button
            size="xs"
            variant="secondary"
            icon={Printer}
            onClick={() => window.print()}
          >
            Print
          </Button>
        </div>
      </div>

      {/* Maternal Obstetric Snapshot Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-100 text-xs">
        <div className="p-2.5 rounded-lg bg-sage-50/70 border border-slate-200/60">
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Gestation & Formula</span>
          <span className="font-bold text-slate-900 text-sm block mt-0.5">
            {ga ? `${ga}w ${gaDays}d` : patient.currentPregnancy?.currentStage}
          </span>
          <span className="text-slate-600 text-[11px] font-medium">{patient.obstetricFormula}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-sage-50/70 border border-slate-200/60">
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Blood Group & Rh</span>
          <span className="font-bold text-slate-900 text-sm block mt-0.5">
            {patient.bloodGroup}
          </span>
          <span className="text-slate-600 text-[11px]">Rh Factor: {patient.rhFactor}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-sage-50/70 border border-slate-200/60">
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">LMP & Estimated Due Date</span>
          <span className="font-bold text-slate-900 text-xs block mt-0.5">
            EDD: {eddUsg || eddLmp}
          </span>
          <span className="text-slate-500 text-[11px]">LMP: {lmp}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-sage-50/70 border border-slate-200/60">
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Latest Documented Vitals</span>
          <span className="font-bold text-slate-900 text-xs block mt-0.5">
            BP {currentVisit?.vitals?.systolicBP}/{currentVisit?.vitals?.diastolicBP} &bull; Wt {currentVisit?.vitals?.weightKg}kg
          </span>
          <span className="text-slate-500 text-[11px]">
            FHR: {currentVisit?.vitals?.fetalHeartRateBpm ? `${currentVisit.vitals.fetalHeartRateBpm} bpm` : 'Postpartum / N/A'}
          </span>
        </div>
      </div>

      {/* High Attention Factors */}
      {patient.currentPregnancy?.highAttentionReasons?.length > 0 && (
        <div className="py-3 border-b border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
            Documented Clinical Focus Points
          </span>
          <div className="flex flex-wrap gap-2">
            {patient.currentPregnancy.highAttentionReasons.map((reason, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                {reason}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Synthesis Summary Paragraph */}
      <div className="pt-3">
        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/70">
          <strong className="text-slate-900 font-semibold">Clinical Synthesis: </strong>
          {patient.consultationReadiness?.summaryText}
        </p>
      </div>
    </div>
  );
};
