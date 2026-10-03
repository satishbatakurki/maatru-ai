// In-memory + LocalStorage reactive state store for MaatruAI prototype
import { SYNTHETIC_PATIENTS } from '../data/syntheticPatients';
import { MOCK_DOCUMENTS } from '../data/mockDocuments';

const STORAGE_KEY_PATIENTS = 'maatru_patients_v1';
const STORAGE_KEY_DOCS = 'maatru_docs_v1';
const STORAGE_KEY_ACTIVE_PATIENT = 'maatru_active_patient_id';

class PatientStore {
  constructor() {
    this.listeners = new Set();
    this.init();
  }

  init() {
    try {
      const storedPatients = localStorage.getItem(STORAGE_KEY_PATIENTS);
      const storedDocs = localStorage.getItem(STORAGE_KEY_DOCS);
      const storedActiveId = localStorage.getItem(STORAGE_KEY_ACTIVE_PATIENT);

      this.patients = storedPatients ? JSON.parse(storedPatients) : JSON.parse(JSON.stringify(SYNTHETIC_PATIENTS));
      this.documents = storedDocs ? JSON.parse(storedDocs) : JSON.parse(JSON.stringify(MOCK_DOCUMENTS));
      this.activePatientId = storedActiveId || this.patients[0]?.id || 'PAT-2026-081';
    } catch (e) {
      console.error('Error initializing store from localStorage:', e);
      this.patients = JSON.parse(JSON.stringify(SYNTHETIC_PATIENTS));
      this.documents = JSON.parse(JSON.stringify(MOCK_DOCUMENTS));
      this.activePatientId = this.patients[0]?.id || 'PAT-2026-081';
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY_PATIENTS, JSON.stringify(this.patients));
      localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(this.documents));
      localStorage.setItem(STORAGE_KEY_ACTIVE_PATIENT, this.activePatientId);
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    this.notify();
  }

  resetToDefaults() {
    this.patients = JSON.parse(JSON.stringify(SYNTHETIC_PATIENTS));
    this.documents = JSON.parse(JSON.stringify(MOCK_DOCUMENTS));
    this.activePatientId = this.patients[0]?.id || 'PAT-2026-081';
    this.save();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  getAllPatients() {
    return this.patients;
  }

  getActivePatient() {
    return this.patients.find(p => p.id === this.activePatientId) || this.patients[0];
  }

  getPatientById(id) {
    return this.patients.find(p => p.id === id);
  }

  setActivePatient(id) {
    if (this.patients.some(p => p.id === id)) {
      this.activePatientId = id;
      this.save();
    }
  }

  getDocumentsForPatient(patientId) {
    return this.documents.filter(d => d.patientId === patientId);
  }

  getDocumentById(docId) {
    return this.documents.find(d => d.id === docId);
  }

  reconcileDiscrepancy(patientId, discrepancyId, resolution) {
    const patient = this.patients.find(p => p.id === patientId);
    if (!patient) return false;

    const discrepancy = patient.discrepancies.find(d => d.id === discrepancyId);
    if (!discrepancy) return false;

    discrepancy.status = "Resolved by Clinician";
    discrepancy.clinicianResolution = {
      reconciledValue: resolution.value,
      clinicianName: resolution.clinicianName || "Dr. Consultation Clinician",
      timestamp: new Date().toISOString(),
      notes: resolution.notes || "Reconciled during pre-consultation review."
    };

    // Update readiness counters
    patient.consultationReadiness.unreviewedDiscrepanciesCount = Math.max(
      0,
      patient.consultationReadiness.unreviewedDiscrepanciesCount - 1
    );

    // Boost score if resolved
    patient.consultationReadiness.scorePercent = Math.min(
      98,
      patient.consultationReadiness.scorePercent + 8
    );

    if (patient.consultationReadiness.unreviewedDiscrepanciesCount === 0 && patient.consultationReadiness.missingMandatoryRecordsCount === 0) {
      patient.consultationReadiness.overallStatus = "Ready";
    }

    this.save();
    return true;
  }

  resolvePendingAction(patientId, actionId) {
    const patient = this.patients.find(p => p.id === patientId);
    if (!patient) return false;

    const action = patient.pendingDocumentedActions.find(a => a.id === actionId);
    if (action) {
      action.status = "Completed";
      patient.consultationReadiness.pendingActionsCount = Math.max(
        0,
        patient.consultationReadiness.pendingActionsCount - 1
      );
      this.save();
      return true;
    }
    return false;
  }

  addDocument(docData) {
    const newDoc = {
      id: `DOC-${Date.now().toString().slice(-6)}`,
      patientId: this.activePatientId,
      uploadDate: new Date().toISOString().split('T')[0],
      fileType: docData.fileType || "application/pdf",
      fileSize: docData.fileSize || "1.5 MB",
      uploadedBy: "Care Team / Doctor",
      verifiedByClinician: false,
      ocrStatus: "Extracted",
      ocrConfidence: 96.5,
      ...docData
    };

    this.documents.unshift(newDoc);

    // Increment patient's digitized document count
    const patient = this.getActivePatient();
    if (patient) {
      patient.consultationReadiness.digitizedDocumentsCount = (patient.consultationReadiness.digitizedDocumentsCount || 0) + 1;
      patient.consultationReadiness.scorePercent = Math.min(100, patient.consultationReadiness.scorePercent + 4);
    }

    this.save();
    return newDoc;
  }

  addVisit(patientId, visitData) {
    const patient = this.patients.find(p => p.id === patientId);
    if (!patient) return false;

    const newVisit = {
      id: `VIS-${patient.id.replace('PAT-', '')}-${patient.visits.length + 1}`,
      visitNumber: patient.visits.length + 1,
      date: new Date().toISOString().split('T')[0],
      ...visitData
    };

    patient.visits.push(newVisit);

    // If vitals provided, add to longitudinal curves
    if (visitData.vitals?.weightKg) {
      patient.longitudinalMetrics.weight.push({
        date: newVisit.date,
        gaWeeks: newVisit.gestationalAgeWeeks,
        weightKg: Number(visitData.vitals.weightKg),
        note: `ANC ${newVisit.visitNumber}`
      });
    }

    if (visitData.vitals?.systolicBP && visitData.vitals?.diastolicBP) {
      patient.longitudinalMetrics.bloodPressure.push({
        date: newVisit.date,
        gaWeeks: newVisit.gestationalAgeWeeks,
        systolic: Number(visitData.vitals.systolicBP),
        diastolic: Number(visitData.vitals.diastolicBP)
      });
    }

    this.save();
    return newVisit;
  }
}

export const patientStore = new PatientStore();
