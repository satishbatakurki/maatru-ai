import React from 'react';
import {
  LayoutDashboard,
  Users,
  Compass,
  FileText,
  LineChart,
  Bot,
  Settings,
  HeartPulse,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({
  currentRoute = 'dashboard',
  onRouteChange,
  activePatient
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'patients', label: 'Patients', icon: Users, badge: '4' },
    {
      id: 'journey',
      label: 'Patient Journey',
      icon: Compass,
      highlight: true,
      badge: activePatient ? `${activePatient.currentPregnancy?.gestationalAgeWeeks ? activePatient.currentPregnancy.gestationalAgeWeeks + 'w' : activePatient.currentPregnancy?.currentStage}` : null
    },
    { id: 'documents', label: 'Documents & OCR', icon: FileText, badge: activePatient?.consultationReadiness?.digitizedDocumentsCount || '6' },
    { id: 'analytics', label: 'Visual Analytics', icon: LineChart, badge: null },
    { id: 'assistant', label: 'ASHA / Patient Assistant', icon: Bot, badge: 'Multilingual' },
    { id: 'settings', label: 'Settings & Audit', icon: Settings, badge: null },
  ];

  return (
    <aside aria-label="Main Navigation" className="w-64 bg-white border-r border-slate-200/80 flex flex-col shrink-0 h-screen sticky top-0 shadow-xs z-40">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-botanical flex items-center justify-center text-white shadow-sm">
            <HeartPulse className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-sage-900">Maatru<span className="text-botanical">AI</span></span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-sage-100 text-botanical rounded uppercase">2026</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Maternal Care Continuity</p>
          </div>
        </div>
      </div>

      {/* Active Patient Mini Card */}
      {activePatient && (
        <div className="mx-3 my-3 p-3 bg-sage-50/80 rounded-xl border border-sage-200/70">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Active Case</span>
            <span className="text-[10px] font-semibold text-botanical bg-white px-1.5 py-0.5 rounded border border-sage-200">
              {activePatient.obstetricFormula}
            </span>
          </div>
          <div className="font-bold text-slate-900 text-sm truncate">{activePatient.name}</div>
          <div className="text-[11px] text-slate-600 flex items-center justify-between mt-1">
            <span>{activePatient.taayiCardNo}</span>
            <span className="font-medium text-slate-700">
              {activePatient.currentPregnancy?.gestationalAgeWeeks
                ? `${activePatient.currentPregnancy.gestationalAgeWeeks}w ${activePatient.currentPregnancy.gestationalAgeDays || 0}d`
                : activePatient.currentPregnancy?.currentStage}
            </span>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
          Clinical Continuity
        </div>
        {navItems.map((item) => {
          const isActive = currentRoute === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onRouteChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-botanical text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-sage-50/90'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Safety Compliance Footnote */}
      <div className="p-3 m-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5 text-botanical font-bold mb-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Health-a-thon 2026</span>
        </div>
        <p className="leading-tight text-[10px]">
          Assistive tool only. Neutral discrepancy detection. No clinical risk scores or prescriptions.
        </p>
      </div>
    </aside>
  );
};
