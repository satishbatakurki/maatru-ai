import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  Calendar,
  Layers,
  ZoomIn,
  ZoomOut,
  Copy,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const DocumentViewerSplit = ({ document, onClose }) => {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [activeTab, setActiveTab] = useState('entities'); // 'entities' | 'raw_ocr'

  if (!document) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-elevated-card overflow-hidden">
      {/* Viewer Header */}
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-botanical-soft text-botanical">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm md:text-base">{document.title}</h3>
              <Badge variant="sage" size="sm">{document.category}</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ref: <span className="font-mono">{document.id}</span> &bull; Uploaded {document.uploadDate} by {document.uploadedBy}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {document.ocrConfidence && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              OCR Confidence: {document.ocrConfidence}%
            </span>
          )}
          {onClose && (
            <Button size="xs" variant="secondary" onClick={onClose}>
              Close Viewer
            </Button>
          )}
        </div>
      </div>

      {/* Split Viewer Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] border-b border-slate-200">
        {/* Left Pane: Simulated Scanned Document Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-slate-100/90 p-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3 bg-white/70 px-3 py-1.5 rounded-lg border border-slate-200/60">
            <span className="font-semibold text-slate-700">Physical Scanned Artifact View</span>
            <span>Click any extracted field on right to highlight</span>
          </div>

          {/* Document Sheet Simulation */}
          <div className="bg-white border border-slate-300 rounded-lg shadow-md p-6 max-w-xl mx-auto w-full relative min-h-[420px] font-sans text-xs">
            {/* Header Stamp Simulation */}
            <div className="border-b-2 border-slate-800 pb-3 mb-4 text-center">
              <p className="text-[10px] tracking-widest uppercase font-bold text-slate-500">Government of Karnataka &bull; Health Services</p>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight mt-0.5">{document.title}</h2>
              <div className="flex items-center justify-between text-[11px] text-slate-600 mt-2 pt-1 border-t border-dashed border-slate-200">
                <span>Doc Ref: {document.id}</span>
                <span>Date: {document.uploadDate}</span>
              </div>
            </div>

            {/* Document body text */}
            <div className="space-y-3 leading-relaxed text-slate-700 font-mono text-[11px]">
              {document.fullOcrSnippet ? (
                <div className="whitespace-pre-line bg-slate-50 p-3 rounded border border-slate-200/80">
                  {document.fullOcrSnippet}
                </div>
              ) : (
                <p className="italic text-slate-400">Scanned document preview rendered.</p>
              )}
            </div>

            {/* Simulated Stamp */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="border border-botanical/50 rounded p-1.5 text-[9px] text-botanical font-bold uppercase rotate-[-3deg] inline-block">
                VERIFIED & DIGITIZED &bull; MAATRU-AI
              </div>
              <div className="text-[10px] text-slate-400 font-sans">
                Signature / Stamp Verified
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-[11px] text-slate-400">
            Page 1 of {document.pageCount || 1} &bull; Native Resolution 300 DPI
          </div>
        </div>

        {/* Right Pane: Structured Extracted Entities (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 flex flex-col justify-between">
          <div>
            {/* Tab switch between extracted fields and raw OCR */}
            <div className="flex items-center gap-1 pb-3 mb-3 border-b border-slate-100">
              <button
                onClick={() => setActiveTab('entities')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'entities'
                    ? 'bg-botanical text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Extracted Fields ({document.extractedEntities?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('raw_ocr')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'raw_ocr'
                    ? 'bg-botanical text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Raw OCR Text
              </button>
            </div>

            {/* Extracted Entities List */}
            {activeTab === 'entities' ? (
              <div className="space-y-2 overflow-y-auto max-h-[380px] pr-1">
                {document.extractedEntities?.map((entity, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedEntity(entity)}
                    className={`p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                      selectedEntity?.key === entity.key
                        ? 'border-botanical bg-botanical-soft ring-1 ring-botanical'
                        : 'border-slate-200/80 hover:border-sage-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-600">{entity.key}</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {(entity.confidence * 100).toFixed(0)}% match
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      {entity.value}
                    </div>
                    {entity.flagged && (
                      <span className="mt-1 inline-block text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        Outside standard clinical range
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
                {document.fullOcrSnippet}
              </div>
            )}
          </div>

          {/* Provenance Footer */}
          <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1 text-botanical font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Source Provenance Verified
            </span>
            <span>OCR Engine: Vision-OCR v2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
