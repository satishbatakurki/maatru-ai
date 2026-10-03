import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SafetyBadge } from './SafetyBadge';
import { AshaAssistantDrawer } from '../assistant/AshaAssistantDrawer';
import { Bot, MessageSquare } from 'lucide-react';

export const MainLayout = ({
  children,
  currentRoute,
  onRouteChange,
  patients,
  activePatient,
  onSelectPatient
}) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F7F4] flex flex-col antialiased">
      {/* Persistent Safety Boundary Banner */}
      <SafetyBadge />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          currentRoute={currentRoute}
          onRouteChange={onRouteChange}
          activePatient={activePatient}
        />

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Header
            patients={patients}
            activePatient={activePatient}
            onSelectPatient={onSelectPatient}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />

          <main className="flex-1 p-4 lg:p-6 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Floating Assistant Drawer Component */}
      <AshaAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        activePatient={activePatient}
      />
    </div>
  );
};
