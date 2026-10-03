import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Baby,
  Calendar,
  Building2,
  FileText
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const PatientRegistry = ({
  patients = [],
  onSelectPatient,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedReadiness, setSelectedReadiness] = useState('all');

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.rchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.taayiCardNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStage =
      selectedStage === 'all' ||
      patient.currentPregnancy?.currentStage.toLowerCase().includes(selectedStage.toLowerCase());

    const matchesReadiness =
      selectedReadiness === 'all' ||
      patient.consultationReadiness?.overallStatus.toLowerCase().includes(selectedReadiness.toLowerCase());

    return matchesSearch && matchesStage && matchesReadiness;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-xl border border-slate-200/80 shadow-soft-card">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Maternal Patient Registry</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Longitudinal records indexed across public health centers & digital uploads ({patients.length} cases)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="botanical" size="md">
            Health-a-thon 2026 Synthetic Cohort
          </Badge>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-soft-card flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[260px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, RCH ID, or Taayi No..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-botanical"
            />
          </div>

          {/* Stage Filter */}
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none text-slate-700 font-medium"
          >
            <option value="all">All Stages</option>
            <option value="trimester 1">Trimester 1</option>
            <option value="trimester 2">Trimester 2</option>
            <option value="trimester 3">Trimester 3</option>
            <option value="post-natal">Post-natal</option>
          </select>

          {/* Readiness Filter */}
          <select
            value={selectedReadiness}
            onChange={(e) => setSelectedReadiness(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none text-slate-700 font-medium"
          >
            <option value="all">All Readiness States</option>
            <option value="ready">Ready</option>
            <option value="review required">Review Required</option>
            <option value="incomplete records">Incomplete Records</option>
          </select>
        </div>

        <span className="text-slate-500 font-medium">
          Showing {filteredPatients.length} of {patients.length} patients
        </span>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPatients.map((patient) => {
          const readiness = patient.consultationReadiness || {};
          const ga = patient.currentPregnancy?.gestationalAgeWeeks;
          const gaDays = patient.currentPregnancy?.gestationalAgeDays || 0;
          const stage = patient.currentPregnancy?.currentStage;

          return (
            <div
              key={patient.id}
              onClick={() => {
                onSelectPatient(patient.id);
                onNavigate('journey');
              }}
              className="bg-white rounded-xl border border-slate-200/90 shadow-soft-card p-5 hover:border-sage-300 hover:shadow-elevated-card transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base hover:text-botanical transition-colors">
                        {patient.name}
                      </h3>
                      <span className="text-xs text-slate-500">({patient.age}y)</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                      <span className="font-semibold text-slate-700">{patient.obstetricFormula}</span>
                      <span>&bull;</span>
                      <span>{patient.taayiCardNo}</span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    readiness.overallStatus === 'Ready'
                      ? 'bg-emerald-100 text-emerald-800'
                      : readiness.overallStatus === 'Review Required'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {readiness.overallStatus} ({readiness.scorePercent}%)
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-3 text-xs border-b border-slate-100">
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-[10px] text-slate-500 block uppercase">Stage / Gestation</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">
                      {ga ? `${ga}w ${gaDays}d` : stage}
                    </span>
                  </div>

                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-[10px] text-slate-500 block uppercase">Blood Group & Rh</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">
                      {patient.bloodGroup}
                    </span>
                  </div>

                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-[10px] text-slate-500 block uppercase">Facility</span>
                    <span className="font-medium text-slate-800 mt-0.5 block truncate">
                      {patient.phc.split(' ')[0]} {patient.phc.split(' ')[1] || ''}
                    </span>
                  </div>
                </div>

                {/* High Attention Factors */}
                {patient.currentPregnancy?.highAttentionReasons?.length > 0 && (
                  <div className="py-2.5 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Documented Focus
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {patient.currentPregnancy.highAttentionReasons.map((r, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-medium truncate max-w-full"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom footer */}
              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>{readiness.digitizedDocumentsCount} files &bull; {patient.visits?.length || 0} visits</span>
                </div>

                <div className="flex items-center gap-1 font-semibold text-botanical">
                  <span>View Smart Journey</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
