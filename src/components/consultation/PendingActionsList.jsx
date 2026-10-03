import React from 'react';
import { CheckCircle2, Circle, Clock, User, Calendar } from 'lucide-react';
import { Badge } from '../common/Badge';
import { patientStore } from '../../services/patientStore';

export const PendingActionsList = ({ patient, onActionUpdated }) => {
  if (!patient || !patient.pendingDocumentedActions) return null;

  const handleToggle = (actionId) => {
    patientStore.resolvePendingAction(patient.id, actionId);
    onActionUpdated && onActionUpdated();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card p-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-botanical-soft text-botanical">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Pending Documented Clinical Actions</h4>
            <p className="text-[11px] text-slate-500">Tasks logged from prior consultations & PHC notes</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-botanical bg-botanical-soft px-2 py-0.5 rounded-full">
          {patient.pendingDocumentedActions.filter(a => a.status === 'Pending').length} Pending
        </span>
      </div>

      <div className="space-y-2.5">
        {patient.pendingDocumentedActions.map((action) => {
          const isDone = action.status === 'Completed';
          return (
            <div
              key={action.id}
              className={`p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                isDone
                  ? 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-70'
                  : 'bg-white border-slate-200/90 hover:border-sage-300'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => handleToggle(action.id)}
                  className="mt-0.5 text-slate-400 hover:text-botanical transition-colors shrink-0"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </button>
                <div className="min-w-0">
                  <p className={`text-xs font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-800'} leading-snug`}>
                    {action.task}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {action.responsible}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Due: {action.dueDate}
                    </span>
                  </div>
                </div>
              </div>

              <Badge
                variant={isDone ? 'success' : action.status === 'Scheduled' ? 'info' : 'warning'}
                size="sm"
                className="shrink-0"
              >
                {action.status}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
};
