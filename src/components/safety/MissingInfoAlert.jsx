import React from 'react';
import { HelpCircle, Clock, Calendar, CheckSquare } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const MissingInfoAlert = ({ item, onActionClick }) => {
  const isHigh = item.criticality === "High";

  return (
    <div className={`p-4 rounded-xl border transition-all ${
      isHigh
        ? 'bg-amber-50/50 border-amber-200/90'
        : 'bg-slate-50/70 border-slate-200/80'
    }`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <HelpCircle className={`w-4 h-4 shrink-0 ${isHigh ? 'text-amber-600' : 'text-slate-500'}`} />
          <h4 className="font-semibold text-slate-800 text-sm">{item.title}</h4>
          <Badge variant={isHigh ? "warning" : "default"} size="sm">
            {item.criticality} Priority
          </Badge>
        </div>
        <Badge variant="sage" size="sm">
          {item.category}
        </Badge>
      </div>

      <p className="text-xs text-slate-600 mb-2.5 leading-relaxed">
        {item.clinicalContext}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>Recommended Window: {item.recommendedWindow}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-botanical font-medium bg-botanical-soft px-2 py-0.5 rounded">
            {item.suggestedAction}
          </span>
          {onActionClick && (
            <Button size="xs" variant="outline" onClick={onActionClick}>
              Create Task
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
