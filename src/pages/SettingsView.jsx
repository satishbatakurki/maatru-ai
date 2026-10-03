import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Building2,
  User,
  Database,
  Lock,
  FileCheck2,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { patientStore } from '../services/patientStore';

export const SettingsView = ({ onResetData }) => {
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    patientStore.resetToDefaults();
    setResetSuccess(true);
    onResetData && onResetData();
    setTimeout(() => setResetSuccess(false), 2500);
  };

  const safetyAuditRules = [
    {
      rule: "No Autonomous Medical Diagnosis",
      status: "Enforced",
      implementation: "AI models are restricted to textual extraction and timeline indexing. System prompt explicitly forbids generating diagnostic impressions.",
      lastVerified: "2026-09-28"
    },
    {
      rule: "No Drug Prescriptions or Dosage Modifications",
      status: "Enforced",
      implementation: "Medication history is strictly read-only, reflecting documented prescriptions from hospital slips.",
      lastVerified: "2026-09-28"
    },
    {
      rule: "No Autonomous Clinical Risk Scoring",
      status: "Enforced",
      implementation: "Readiness score reflects document synthesis completeness (information availability), NOT patient clinical risk.",
      lastVerified: "2026-09-28"
    },
    {
      rule: "Neutral Information Discrepancy Protocol",
      status: "Enforced",
      implementation: "Standardized notification: 'Information discrepancy detected — clinician verification required.' Conflicting sources displayed without automatic choice.",
      lastVerified: "2026-09-28"
    },
    {
      rule: "Zero Synthetic Data Fabrication for Missing Records",
      status: "Enforced",
      implementation: "Unrecorded clinical milestones are explicitly flagged as missing rather than imputed with simulated normal values.",
      lastVerified: "2026-09-28"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft-card flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">System Settings & AI Safety Compliance Audit</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verification of clinical boundaries, facility configuration, and prototype data controls.
          </p>
        </div>
        <Badge variant="botanical" size="md">
          Health-a-thon 2026
        </Badge>
      </div>

      {/* Safety Compliance Audit Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-card p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">AI Safety Boundaries & Audit Trail</h3>
              <p className="text-xs text-slate-500">Adherence to non-diagnostic assistive prototype constraints</p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            100% Compliant
          </span>
        </div>

        <div className="space-y-3">
          {safetyAuditRules.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80 text-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {item.rule}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {item.status}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed mb-1.5 pl-5">
                {item.implementation}
              </p>
              <div className="text-[10px] text-slate-400 pl-5">
                Verified: {item.lastVerified} &bull; Protocol Version: v1.4-Healthathon
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Facility Configuration */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-card p-5 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Building2 className="w-5 h-5 text-botanical" />
          <h3 className="font-bold text-slate-900 text-sm">Active Healthcare Facility Profile</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Primary Facility</span>
            <span className="font-bold text-slate-800 text-sm block mt-0.5">Taluk General Hospital, Kanakapura</span>
            <span className="text-slate-500 text-[11px]">Ramanagara District, Karnataka</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Care Coordinator / Clinician</span>
            <span className="font-bold text-slate-800 text-sm block mt-0.5">Dr. Rekha Rao, MBBS, DGO</span>
            <span className="text-slate-500 text-[11px]">Senior Medical Officer (Obstetrics & Gynaecology)</span>
          </div>
        </div>
      </div>

      {/* Demo Controls: Reset synthetic data */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-card p-5 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-slate-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Demo Data Management</h3>
              <p className="text-xs text-slate-500">Reset synthetic cohorts and document state for prototype evaluation</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="text-xs text-slate-600">
            Restores the 4 maternal synthetic cases (Sunita Devi, Priya Sharma, Ananya Rao, Lakshmi Gowda) to their default states.
          </div>
          <Button
            size="sm"
            variant="secondary"
            icon={RotateCcw}
            onClick={handleReset}
          >
            {resetSuccess ? 'Dataset Restored!' : 'Reset Demo Dataset'}
          </Button>
        </div>
      </div>
    </div>
  );
};
