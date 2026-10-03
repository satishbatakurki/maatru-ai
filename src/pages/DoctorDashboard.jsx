import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  FileQuestion,
  Clock,
  FileText,
  Calendar,
  ArrowRight,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { DiscrepancyNotice } from '../components/safety/DiscrepancyNotice';
import { DocumentUploadModal } from '../components/intelligence/DocumentUploadModal';

export const DoctorDashboard = ({
  patients = [],
  onSelectPatient,
  onNavigate
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const totalPatients = patients.length;
  const readyPatients = patients.filter(p => p.consultationReadiness?.overallStatus === 'Ready').length;
  const reviewRequired = patients.filter(p => p.consultationReadiness?.overallStatus === 'Review Required').length;
  const highAttention = patients.filter(p => p.currentPregnancy?.isHighAttention).length;

  // Flatten pending discrepancies
  const allDiscrepancies = patients.flatMap(p =>
    (p.discrepancies || [])
      .filter(d => d.status !== 'Resolved by Clinician')
      .map(d => ({ ...d, patient: p }))
  );

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    p.taayiCardNo.toLowerCase().includes(filterQuery.toLowerCase()) ||
    p.rchId.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner: Clinical Consultation Readiness */}
      <div className="bg-gradient-to-r from-botanical via-botanical-light to-sage-700 rounded-2xl p-6 text-white shadow-soft-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              Antenatal Consultation Desk
            </span>
            <span className="text-xs text-white/80">&bull; Today's Clinic: {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Consultation Readiness & Maternal Journey Review
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
            Automated multi-source synthesis across Taayi Cards, lab slips, ultrasound scans, and consultation notes.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsUploadOpen(true)}
            icon={FileText}
            className="bg-white text-botanical hover:bg-emerald-50 border-0 shadow-sm"
          >
            Digitize Document
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('patients')}
            className="text-white border-white/40 hover:bg-white/10"
          >
            All Patients
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Cohort"
          value={totalPatients}
          subtitle="Registered maternal cases"
          icon={Users}
          colorScheme="sage"
          onClick={() => onNavigate('patients')}
        />
        <StatCard
          title="Consultation Ready"
          value={readyPatients}
          subtitle={`${Math.round((readyPatients / (totalPatients || 1)) * 100)}% fully synthesized`}
          icon={CheckCircle2}
          colorScheme="emerald"
        />
        <StatCard
          title="Review Required"
          value={reviewRequired}
          subtitle="Conflicting records flagged"
          icon={AlertTriangle}
          colorScheme="amber"
        />
        <StatCard
          title="High Attention"
          value={highAttention}
          subtitle="Documented clinical factors"
          icon={ShieldCheck}
          colorScheme="rose"
        />
      </div>

      {/* Priority Discrepancy Alerts (If any exist) */}
      {allDiscrepancies.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-5 shadow-soft-card">
          <div className="flex items-center justify-between pb-3 border-b border-amber-200/70 mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-amber-950 text-sm md:text-base">
                Discrepancies Requiring Clinician Verification ({allDiscrepancies.length})
              </h3>
            </div>
            <span className="text-xs text-amber-800 font-medium">Neutral Protocol Enforced</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {allDiscrepancies.slice(0, 2).map((disc) => (
              <div
                key={disc.id}
                className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-900">{disc.patient?.name} ({disc.patient?.obstetricFormula})</span>
                    <Badge variant="warning" size="sm">{disc.field}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                    {disc.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Taayi: {disc.patient?.taayiCardNo}</span>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => {
                      onSelectPatient(disc.patient.id);
                      onNavigate('journey');
                    }}
                  >
                    Review in Journey
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Consultation Roster & Readiness Overview */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-botanical" />
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">Consultation Schedule & Case Readiness</h3>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by name or Taayi No..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-botanical"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Table of Patients */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Patient / Obstetric Info</th>
                <th className="py-3 px-4">Stage / Gestation</th>
                <th className="py-3 px-4">Blood Group / Rh</th>
                <th className="py-3 px-4">Documented Focus</th>
                <th className="py-3 px-4">Readiness Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => {
                const readiness = patient.consultationReadiness || {};
                const stage = patient.currentPregnancy?.currentStage;
                const ga = patient.currentPregnancy?.gestationalAgeWeeks;
                const gaDays = patient.currentPregnancy?.gestationalAgeDays || 0;

                return (
                  <tr
                    key={patient.id}
                    className="hover:bg-sage-50/50 transition-colors group cursor-pointer"
                    onClick={() => {
                      onSelectPatient(patient.id);
                      onNavigate('journey');
                    }}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 group-hover:text-botanical transition-colors">
                        {patient.name}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className="font-semibold text-slate-700">{patient.obstetricFormula}</span>
                        <span>&bull;</span>
                        <span>{patient.taayiCardNo}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">
                        {ga ? `${ga}w ${gaDays}d` : stage}
                      </div>
                      <div className="text-[11px] text-slate-500">{stage}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800">{patient.bloodGroup}</span>
                      <div className="text-[11px] text-slate-500">Rh: {patient.rhFactor}</div>
                    </td>

                    <td className="py-3 px-4">
                      {patient.currentPregnancy?.highAttentionReasons?.length > 0 ? (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {patient.currentPregnancy.highAttentionReasons.slice(0, 2).map((r, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 px-1.5 py-0.5 rounded truncate max-w-[180px]"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-medium">Routine Antenatal Care</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          readiness.overallStatus === 'Ready'
                            ? 'bg-emerald-100 text-emerald-800'
                            : readiness.overallStatus === 'Review Required'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {readiness.overallStatus} ({readiness.scorePercent}%)
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {readiness.unreviewedDiscrepanciesCount ? `${readiness.unreviewedDiscrepanciesCount} disc.` : ''} {readiness.missingMandatoryRecordsCount ? `${readiness.missingMandatoryRecordsCount} missing` : ''}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPatient(patient.id);
                          onNavigate('journey');
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-botanical hover:text-botanical-dark bg-botanical-soft hover:bg-sage-100 px-3 py-1.5 rounded-lg border border-botanical-border transition-colors"
                      >
                        <span>Review</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        patient={patients[0]}
        onDocumentUploaded={() => {}}
      />
    </div>
  );
};
