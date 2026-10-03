import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Activity,
  AlertTriangle,
  FileQuestion,
  FileText,
  Pill,
  Clock,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  UploadCloud,
  ArrowRightLeft,
  Sparkles,
  User,
  HeartPulse,
  Baby
} from 'lucide-react';
import { TrimesterStepper } from '../components/journey/TrimesterStepper';
import { JourneyTimeline } from '../components/journey/JourneyTimeline';
import { ReadinessScorecard } from '../components/consultation/ReadinessScorecard';
import { ConsultationSummaryCard } from '../components/consultation/ConsultationSummaryCard';
import { ChangesSinceLastVisit } from '../components/consultation/ChangesSinceLastVisit';
import { PendingActionsList } from '../components/consultation/PendingActionsList';
import { DiscrepancyNotice } from '../components/safety/DiscrepancyNotice';
import { MissingInfoAlert } from '../components/safety/MissingInfoAlert';
import { HbTrendChart } from '../components/analytics/HbTrendChart';
import { BloodPressureChart } from '../components/analytics/BloodPressureChart';
import { WeightTrendChart } from '../components/analytics/WeightTrendChart';
import { GlucoseTrendChart } from '../components/analytics/GlucoseTrendChart';
import { ScanBiometricsChart } from '../components/analytics/ScanBiometricsChart';
import { DocumentCard } from '../components/intelligence/DocumentCard';
import { DocumentViewerSplit } from '../components/intelligence/DocumentViewerSplit';
import { DocumentUploadModal } from '../components/intelligence/DocumentUploadModal';
import { TabNav } from '../components/common/TabNav';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { patientStore } from '../services/patientStore';

export const PatientJourneyView = ({
  patient,
  onPatientUpdated,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [activeStageId, setActiveStageId] = useState('trimester-3');
  const [selectedDocForInspect, setSelectedDocForInspect] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  if (!patient) return null;

  const documents = patientStore.getDocumentsForPatient(patient.id);
  const ga = patient.currentPregnancy?.gestationalAgeWeeks;
  const gaDays = patient.currentPregnancy?.gestationalAgeDays || 0;
  const stage = patient.currentPregnancy?.currentStage;

  const handleInspectDoc = (docId) => {
    const doc = patientStore.getDocumentById(docId);
    if (doc) {
      setSelectedDocForInspect(doc);
      setActiveTab('documents');
    }
  };

  const tabs = [
    { id: 'summary', label: 'Consultation Briefing', icon: Compass },
    { id: 'timeline', label: 'Visit History', icon: Calendar, count: patient.visits?.length || 0 },
    { id: 'analytics', label: 'Visual Analytics', icon: Activity },
    {
      id: 'discrepancies',
      label: 'Discrepancies',
      icon: AlertTriangle,
      count: patient.discrepancies?.filter(d => d.status !== 'Resolved by Clinician').length || 0
    },
    {
      id: 'missing',
      label: 'Missing Records',
      icon: FileQuestion,
      count: patient.missingInformation?.length || 0
    },
    { id: 'medications', label: 'Medications', icon: Pill, count: patient.activeMedications?.length || 0 },
    { id: 'documents', label: 'Documents & OCR', icon: FileText, count: documents.length }
  ];

  return (
    <div className="space-y-6">
      {/* Patient Hero Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-card p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-botanical-soft text-botanical border border-botanical-border">
                {patient.id}
              </span>
              <span className="text-xs text-slate-500 font-medium">Taayi: {patient.taayiCardNo}</span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">RCH: {patient.rchId}</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {patient.name}
              </h1>
              <span className="text-sm font-semibold text-slate-600">
                {patient.age} years &bull; {patient.gender}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-sage-100 text-botanical">
                {patient.obstetricFormula}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
              <span>{patient.address}</span>
              <span>&bull;</span>
              <span>ASHA: <strong>{patient.ashaWorker?.name}</strong> ({patient.ashaWorker?.phone})</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0">
            <Button
              size="sm"
              variant="secondary"
              icon={UploadCloud}
              onClick={() => setIsUploadOpen(true)}
            >
              Upload Record
            </Button>
            <Button
              size="sm"
              variant="primary"
              icon={Activity}
              onClick={() => setActiveTab('analytics')}
            >
              View Trends
            </Button>
          </div>
        </div>

        {/* Quick Obstetric Chips Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Gestational Stage</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">
              {ga ? `${ga}w ${gaDays}d` : stage}
            </span>
            <span className="text-slate-500 text-[11px]">{stage}</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Maternal Blood Group</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">
              {patient.bloodGroup}
            </span>
            <span className="text-slate-500 text-[11px]">Rh Factor: {patient.rhFactor}</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">LMP & Estimated EDD</span>
            <span className="font-bold text-slate-800 text-xs mt-0.5 block">
              EDD: {patient.currentPregnancy?.eddUsg || patient.currentPregnancy?.eddLmp}
            </span>
            <span className="text-slate-500 text-[11px]">LMP: {patient.currentPregnancy?.lmpDate}</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Consultation Readiness</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`font-bold text-xs px-2 py-0.5 rounded-full ${
                patient.consultationReadiness?.overallStatus === 'Ready'
                  ? 'bg-emerald-100 text-emerald-800'
                  : patient.consultationReadiness?.overallStatus === 'Review Required'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {patient.consultationReadiness?.overallStatus} ({patient.consultationReadiness?.scorePercent}%)
              </span>
            </div>
            <span className="text-slate-500 text-[10px]">
              {patient.consultationReadiness?.digitizedDocumentsCount} documents indexed
            </span>
          </div>
        </div>
      </div>

      {/* Smart Longitudinal Continuum Stepper */}
      <TrimesterStepper
        activeStageId={activeStageId}
        onSelectStage={setActiveStageId}
        patient={patient}
      />

      {/* Tab Navigation */}
      <TabNav
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab 1: Consultation Briefing & Summary */}
      {activeTab === 'summary' && (
        <div className="space-y-5">
          <ReadinessScorecard
            patient={patient}
            onNavigateTab={setActiveTab}
          />

          <ConsultationSummaryCard patient={patient} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ChangesSinceLastVisit patient={patient} />
            <PendingActionsList
              patient={patient}
              onActionUpdated={onPatientUpdated}
            />
          </div>
        </div>
      )}

      {/* Tab 2: Chronological Visit History */}
      {activeTab === 'timeline' && (
        <JourneyTimeline
          patient={patient}
          onInspectDoc={handleInspectDoc}
        />
      )}

      {/* Tab 3: Visual Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <HbTrendChart data={patient.longitudinalMetrics?.hemoglobin || []} />
            <BloodPressureChart data={patient.longitudinalMetrics?.bloodPressure || []} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <WeightTrendChart
              data={patient.longitudinalMetrics?.weight || []}
              baselineWeight={patient.baselineVitals?.prePregnancyWeightKg || 58}
            />
            <GlucoseTrendChart data={patient.longitudinalMetrics?.glucose || []} />
          </div>

          <ScanBiometricsChart data={patient.longitudinalMetrics?.ultrasounds || []} />
        </div>
      )}

      {/* Tab 4: Information Inconsistencies & Discrepancies */}
      {activeTab === 'discrepancies' && (
        <div className="space-y-4">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sm block mb-1">
                Discrepancy Detection & Neutral Clinical Reconciliation
              </span>
              <p className="leading-relaxed text-slate-700">
                MaatruAI automatically flags differing dates, tests, or values across uploaded source documents using neutral protocol. Clinicians can review the original sources side-by-side and record their authoritative clinical reconciliation.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {patient.discrepancies?.map((discrepancy) => (
              <DiscrepancyNotice
                key={discrepancy.id}
                discrepancy={discrepancy}
                patient={patient}
                onReconciled={onPatientUpdated}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Missing Information & Milestone Gaps */}
      {activeTab === 'missing' && (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex items-start gap-3">
            <FileQuestion className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sm block mb-1">
                Guideline-Recommended Missing Information
              </span>
              <p className="leading-relaxed text-slate-600">
                Based on current gestation ({ga ? `${ga}w` : stage}), the following national guideline milestones lack documented verification slips in the maternal file. MaatruAI does not fabricate synthetic values for missing tests.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {patient.missingInformation?.map((item) => (
              <MissingInfoAlert
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Medications & Supplementation History */}
      {activeTab === 'medications' && (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm md:text-base">Maternal Medication & Supplementation Log</h3>
              <p className="text-xs text-slate-500">Documented prophylactic and therapeutic intake</p>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-botanical-soft text-botanical font-semibold">
              {patient.activeMedications?.filter(m => m.status === 'Active').length} Active
            </span>
          </div>

          <div className="space-y-3">
            {patient.activeMedications?.map((med) => (
              <div
                key={med.id}
                className={`p-4 rounded-xl border text-xs transition-all ${
                  med.status === 'Active'
                    ? 'bg-slate-50/60 border-slate-200/80'
                    : 'bg-rose-50/40 border-rose-200 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Pill className={`w-4 h-4 ${med.status === 'Active' ? 'text-botanical' : 'text-rose-600'}`} />
                    <span className="font-bold text-slate-900 text-sm">{med.name}</span>
                    <Badge variant={med.status === 'Active' ? 'success' : 'danger'} size="sm">
                      {med.status}
                    </Badge>
                  </div>
                  <span className="text-slate-500 text-[11px]">Started: {med.startedAt}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 mb-2">
                  <div><strong>Dose:</strong> {med.dose}</div>
                  <div><strong>Frequency:</strong> {med.frequency}</div>
                </div>

                {med.adherenceNote && (
                  <div className="p-2 bg-white rounded border border-slate-100 text-slate-600 text-[11px]">
                    <strong>Documented Adherence:</strong> {med.adherenceNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Document Intelligence & OCR Viewer */}
      {activeTab === 'documents' && (
        <div className="space-y-5">
          {/* Split viewer if doc is selected */}
          {selectedDocForInspect && (
            <DocumentViewerSplit
              document={selectedDocForInspect}
              onClose={() => setSelectedDocForInspect(null)}
            />
          )}

          {/* Document Cards Grid */}
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm md:text-base">
                Digitized Maternal Documents ({documents.length})
              </h3>
              <p className="text-xs text-slate-500">Source artifacts with verified OCR confidence</p>
            </div>
            <Button
              size="xs"
              variant="primary"
              icon={UploadCloud}
              onClick={() => setIsUploadOpen(true)}
            >
              Upload New Record
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onInspect={(d) => setSelectedDocForInspect(d)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        patient={patient}
        onDocumentUploaded={() => {
          onPatientUpdated && onPatientUpdated();
          setActiveTab('documents');
        }}
      />
    </div>
  );
};
