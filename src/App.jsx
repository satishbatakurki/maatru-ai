import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { PatientRegistry } from './pages/PatientRegistry';
import { PatientJourneyView } from './pages/PatientJourneyView';
import { DocumentIntelligenceView } from './pages/DocumentIntelligenceView';
import { VisualAnalyticsView } from './pages/VisualAnalyticsView';
import { AshaAssistantView } from './pages/AshaAssistantView';
import { SettingsView } from './pages/SettingsView';
import { patientStore } from './services/patientStore';

export function App() {
  const [currentRoute, setCurrentRoute] = useState('dashboard');
  const [patients, setPatients] = useState(patientStore.getAllPatients());
  const [activePatient, setActivePatient] = useState(patientStore.getActivePatient());
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = patientStore.subscribe(() => {
      setPatients([...patientStore.getAllPatients()]);
      setActivePatient(patientStore.getActivePatient());
      setVersion(v => v + 1);
    });
    return unsubscribe;
  }, []);

  const handleSelectPatient = (id) => {
    patientStore.setActivePatient(id);
    setActivePatient(patientStore.getActivePatient());
  };

  const handleDataReset = () => {
    setPatients([...patientStore.getAllPatients()]);
    setActivePatient(patientStore.getActivePatient());
  };

  return (
    <MainLayout
      currentRoute={currentRoute}
      onRouteChange={setCurrentRoute}
      patients={patients}
      activePatient={activePatient}
      onSelectPatient={handleSelectPatient}
    >
      {currentRoute === 'dashboard' && (
        <DoctorDashboard
          patients={patients}
          onSelectPatient={handleSelectPatient}
          onNavigate={setCurrentRoute}
        />
      )}

      {currentRoute === 'patients' && (
        <PatientRegistry
          patients={patients}
          onSelectPatient={handleSelectPatient}
          onNavigate={setCurrentRoute}
        />
      )}

      {currentRoute === 'journey' && (
        <PatientJourneyView
          key={`${activePatient?.id}-${version}`}
          patient={activePatient}
          onPatientUpdated={() => setVersion(v => v + 1)}
          onNavigate={setCurrentRoute}
        />
      )}

      {currentRoute === 'documents' && (
        <DocumentIntelligenceView
          key={`${activePatient?.id}-${version}`}
          activePatient={activePatient}
          onNavigate={setCurrentRoute}
        />
      )}

      {currentRoute === 'analytics' && (
        <VisualAnalyticsView
          key={`${activePatient?.id}-${version}`}
          activePatient={activePatient}
        />
      )}

      {currentRoute === 'assistant' && (
        <AshaAssistantView
          activePatient={activePatient}
        />
      )}

      {currentRoute === 'settings' && (
        <SettingsView
          onResetData={handleDataReset}
        />
      )}
    </MainLayout>
  );
}

export default App;
