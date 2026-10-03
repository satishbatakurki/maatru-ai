import React from 'react';
import { MATERNAL_STAGES } from '../../data/clinicalGuidelines';
import { Check, CircleDot, Clock, Baby } from 'lucide-react';

export const TrimesterStepper = ({
  activeStageId,
  onSelectStage,
  patient
}) => {
  const currentStage = patient?.currentPregnancy?.currentStage || "Trimester 3";

  // Map stages to numerical progression
  const stageWeights = {
    "Pre-conception": 0,
    "Trimester 1": 1,
    "Trimester 2": 2,
    "Trimester 3": 3,
    "Delivery": 4,
    "Post-natal": 5
  };

  const currentWeight = stageWeights[currentStage] ?? 3;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card p-4">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Smart Longitudinal Continuum
        </span>
        <span className="text-xs text-botanical font-semibold">
          Active: {currentStage} {patient?.currentPregnancy?.gestationalAgeWeeks ? `(${patient.currentPregnancy.gestationalAgeWeeks}w ${patient.currentPregnancy.gestationalAgeDays || 0}d)` : ''}
        </span>
      </div>

      {/* Stepper Bar */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0 hidden md:block" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 relative z-10">
          {MATERNAL_STAGES.map((stage, idx) => {
            const isCompleted = idx < currentWeight;
            const isCurrent = currentStage.toLowerCase().includes(stage.id.replace('trimester-', 'trimester '));
            const isSelected = activeStageId === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(stage.id)}
                className={`text-left p-2.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-botanical bg-botanical-soft ring-1 ring-botanical shadow-xs'
                    : isCurrent
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : isCompleted
                    ? 'border-slate-200 bg-slate-50/60'
                    : 'border-slate-100 bg-white opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isSelected
                      ? 'bg-botanical text-white'
                      : isCurrent
                      ? 'bg-emerald-600 text-white'
                      : isCompleted
                      ? 'bg-sage-200 text-sage-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>

                <div className="font-bold text-xs text-slate-800 truncate">
                  {stage.label.split(' ')[0]} {stage.label.split(' ')[1] || ''}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {stage.id === 'trimester-1' ? '0–12w' :
                   stage.id === 'trimester-2' ? '13–27w' :
                   stage.id === 'trimester-3' ? '28–40w' :
                   stage.id === 'delivery' ? 'Intrapartum' :
                   stage.id === 'post-natal' ? '0–42d' : 'Baseline'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
