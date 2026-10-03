import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronRight, FileText, ArrowRightLeft } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ClinicianReconcileModal } from './ClinicianReconcileModal';

export const DiscrepancyNotice = ({
  discrepancy,
  patient,
  onReconciled,
  compact = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isResolved = discrepancy.status === "Resolved by Clinician";

  if (compact) {
    return (
      <div className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-3 ${
        isResolved ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-amber-50/80 border-amber-200 text-amber-900'
      }`}>
        <div className="flex items-center gap-2 min-w-0">
          {isResolved ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span className="font-semibold truncate">{discrepancy.field}:</span>
          <span className="truncate text-slate-600">
            {isResolved
              ? `Reconciled: ${discrepancy.clinicianResolution?.reconciledValue}`
              : discrepancy.neutralAdvisory}
          </span>
        </div>
        {!isResolved && (
          <Button size="xs" variant="outline" onClick={() => setIsModalOpen(true)}>
            Reconcile
          </Button>
        )}
        <ClinicianReconcileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          discrepancy={discrepancy}
          patient={patient}
          onReconciled={onReconciled}
        />
      </div>
    );
  }

  return (
    <div className={`rounded-xl border p-4 transition-all ${
      isResolved
        ? 'bg-emerald-50/40 border-emerald-200'
        : 'bg-white border-amber-200 shadow-sm'
    }`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {isResolved ? (
            <span className="p-1 rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          ) : (
            <span className="p-1 rounded-full bg-amber-100 text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </span>
          )}
          <h4 className="font-bold text-slate-800 text-sm">{discrepancy.field}</h4>
          <Badge variant={isResolved ? "success" : "warning"} size="sm">
            {discrepancy.status}
          </Badge>
        </div>

        {!isResolved && (
          <Button
            size="sm"
            variant="outline"
            icon={ArrowRightLeft}
            onClick={() => setIsModalOpen(true)}
          >
            Review & Reconcile
          </Button>
        )}
      </div>

      {/* Neutral Advisory Banner */}
      {!isResolved && (
        <div className="p-2.5 bg-amber-50/90 rounded-lg border border-amber-200/80 text-xs text-amber-900 font-medium mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Information discrepancy detected — clinician verification required.</span>
        </div>
      )}

      {/* Description */}
      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
        {discrepancy.description}
      </p>

      {/* Conflicting Sources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
        {discrepancy.sources?.map((source, index) => (
          <div key={index} className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/80 text-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="font-medium text-slate-700">{source.docType}</span>
              <span>{source.date}</span>
            </div>
            <div className="font-semibold text-slate-900 text-xs mb-1">
              {source.reportedValue}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
              <FileText className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{source.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Resolution summary if resolved */}
      {isResolved && discrepancy.clinicianResolution && (
        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-950">
          <div className="font-semibold text-emerald-900 mb-0.5">
            Clinician Determination: {discrepancy.clinicianResolution.reconciledValue}
          </div>
          <div className="text-emerald-800 text-[11px]">
            Verified by {discrepancy.clinicianResolution.clinicianName} &bull; Rationale: {discrepancy.clinicianResolution.notes}
          </div>
        </div>
      )}

      {/* Prompt if unresolved */}
      {!isResolved && discrepancy.clinicianActionPrompt && (
        <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-botanical shrink-0" />
          <span><strong>Action Prompt:</strong> {discrepancy.clinicianActionPrompt}</span>
        </div>
      )}

      <ClinicianReconcileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        discrepancy={discrepancy}
        patient={patient}
        onReconciled={onReconciled}
      />
    </div>
  );
};
