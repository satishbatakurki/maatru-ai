import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { CheckCircle2, FileText, AlertTriangle } from 'lucide-react';
import { patientStore } from '../../services/patientStore';

export const ClinicianReconcileModal = ({
  isOpen,
  onClose,
  discrepancy,
  patient,
  onReconciled
}) => {
  const [reconciledValue, setReconciledValue] = useState('');
  const [clinicianName, setClinicianName] = useState('Dr. Rekha Rao, MBBS, DGO');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!discrepancy) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reconciledValue) return;

    setIsSubmitting(true);
    patientStore.reconcileDiscrepancy(patient.id, discrepancy.id, {
      value: reconciledValue,
      clinicianName,
      notes: notes || "Reconciled upon clinical review."
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onReconciled && onReconciled();
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Clinician Information Reconciliation"
      subtitle={`Case: ${patient?.name} (${patient?.id}) — ${discrepancy.field}`}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-sm">
        {/* Neutral Safety Banner */}
        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/90 text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-semibold block mb-0.5">Information discrepancy detected — clinician verification required.</span>
            MaatruAI highlights conflicting sources neutrally. Select or enter the clinically validated value to update the longitudinal record.
          </div>
        </div>

        {/* Source comparison */}
        <div>
          <label className="font-semibold text-slate-700 block mb-2 text-xs uppercase tracking-wider">
            Conflicting Documented Sources
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {discrepancy.sources?.map((source, idx) => (
              <div
                key={idx}
                onClick={() => setReconciledValue(source.reportedValue)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  reconciledValue === source.reportedValue
                    ? 'border-botanical bg-botanical-soft ring-1 ring-botanical'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-medium text-slate-600">{source.docType}</span>
                  <span>{source.date}</span>
                </div>
                <div className="font-bold text-slate-800 text-sm mb-1">{source.reportedValue}</div>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="truncate">{source.title}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reconciled Value Input */}
        <div>
          <label className="font-semibold text-slate-700 block mb-1.5 text-xs uppercase tracking-wider">
            Clinically Validated Determination *
          </label>
          <input
            type="text"
            required
            value={reconciledValue}
            onChange={(e) => setReconciledValue(e.target.value)}
            placeholder="e.g. EDD: 23-March-2027 by first-trimester CRL dating scan"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-botanical focus:border-botanical"
          />
        </div>

        {/* Clinician & Audit notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1 text-xs">
              Verifying Clinician
            </label>
            <input
              type="text"
              required
              value={clinicianName}
              onChange={(e) => setClinicianName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-botanical"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1 text-xs">
              Verification Basis / Clinical Rationale
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. T1 scan CRL takes precedence when LMP differs by >7d"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-botanical"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!reconciledValue || isSubmitting}
            icon={CheckCircle2}
          >
            {isSubmitting ? 'Recording...' : 'Confirm Clinical Determination'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
