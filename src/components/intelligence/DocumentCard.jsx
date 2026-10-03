import React from 'react';
import {
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Tag
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const DocumentCard = ({ document, onInspect }) => {
  if (!document) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-soft-card p-4 transition-all hover:border-sage-300 hover:shadow-elevated-card flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="sage" size="sm">
            {document.category}
          </Badge>
          <div className="flex items-center gap-1.5">
            {document.ocrConfidence && (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                {document.ocrConfidence}% OCR
              </span>
            )}
            {document.verifiedByClinician ? (
              <span className="text-[10px] font-semibold text-botanical flex items-center gap-1" title="Clinician Verified">
                <CheckCircle2 className="w-3.5 h-3.5 text-botanical" />
              </span>
            ) : (
              <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                Unverified
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h4 className="font-bold text-slate-800 text-sm mb-1 leading-snug line-clamp-2">
          {document.title}
        </h4>

        {/* Metadata */}
        <div className="text-xs text-slate-500 space-y-1 my-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Uploaded: {document.uploadDate}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            {document.fileSize} &bull; {document.uploadedBy}
          </div>
        </div>

        {/* Extracted preview tags */}
        {document.extractedEntities?.length > 0 && (
          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
            {document.extractedEntities.slice(0, 3).map((entity, i) => (
              <span
                key={i}
                className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200/60 truncate max-w-[150px]"
              >
                {entity.key}: <strong>{entity.value}</strong>
              </span>
            ))}
            {document.extractedEntities.length > 3 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{document.extractedEntities.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action button */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">{document.id}</span>
        <Button
          size="xs"
          variant="outline"
          icon={ExternalLink}
          onClick={() => onInspect(document)}
        >
          Inspect OCR
        </Button>
      </div>
    </div>
  );
};
