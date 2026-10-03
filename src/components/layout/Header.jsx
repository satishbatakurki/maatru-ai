import React, { useState } from 'react';
import {
  Users,
  Search,
  Bell,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Calendar,
  Sparkles,
  Bot
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const Header = ({
  patients = [],
  activePatient,
  onSelectPatient,
  onOpenAssistant
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = searchQuery.trim()
    ? patients.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.rchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.taayiCardNo.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : patients;

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      <div className="px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Active Patient Switcher & Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <div className="relative flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 hidden sm:inline">
                Patient:
              </span>
              <div className="relative flex-1">
                <select
                  value={activePatient?.id || ''}
                  onChange={(e) => onSelectPatient(e.target.value)}
                  className="w-full bg-sage-50/70 border border-slate-200 hover:border-sage-400 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-botanical/20 cursor-pointer appearance-none pr-8 transition-colors"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.obstetricFormula} ({p.currentPregnancy?.gestationalAgeWeeks ? `${p.currentPregnancy.gestationalAgeWeeks}w` : p.currentPregnancy.currentStage}) • {p.taayiCardNo}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <Users className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center gap-2.5">
          {/* Active Patient Status Pill */}
          {activePatient && (
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Readiness:</span>
                <span className={`font-bold px-2 py-0.5 rounded-full ${
                  activePatient.consultationReadiness?.overallStatus === 'Ready'
                    ? 'bg-emerald-100 text-emerald-800'
                    : activePatient.consultationReadiness?.overallStatus === 'Review Required'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {activePatient.consultationReadiness?.scorePercent}% &bull; {activePatient.consultationReadiness?.overallStatus}
                </span>
              </div>
            </div>
          )}

          {/* Quick Assistant Launch Button */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-botanical-soft hover:bg-sage-100 text-botanical text-xs font-semibold transition-all border border-botanical-border shadow-xs"
            title="Open ASHA & Patient Assistant"
          >
            <Bot className="w-4 h-4 text-botanical" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>

          {/* Doctor Facility Tag */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Taluk Hospital &bull; Dr. Rekha Rao</span>
          </div>
        </div>
      </div>
    </header>
  );
};
