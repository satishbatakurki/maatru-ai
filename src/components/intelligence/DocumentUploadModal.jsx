import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Layers
} from 'lucide-react';
import { DOCUMENT_CATEGORIES } from '../../data/mockDocuments';
import { simulateOcrProcessing } from '../../services/mockOcrService';
import { patientStore } from '../../services/patientStore';

export const DocumentUploadModal = ({
  isOpen,
  onClose,
  patient,
  onDocumentUploaded
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Laboratory Report');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedResult, setExtractedResult] = useState(null);

  const samplePresets = [
    { title: "28w Automated CBC & Platelet Count", category: "Laboratory Report" },
    { title: "32w Growth & Doppler Ultrasound Scan", category: "Ultrasound Report" },
    { title: "Karnataka Taayi Card - Page 3 Immunizations", category: "Taayi / Mother Card" },
    { title: "PHC Taluk Hospital Prescription Slip", category: "Prescription" }
  ];

  const handleSelectPreset = (preset) => {
    setSelectedCategory(preset.category);
    setFileName(preset.title + ".pdf");
    setFile({ name: preset.title + ".pdf", size: 1840000, type: "application/pdf" });
  };

  const handleStartOcr = async () => {
    if (!file && !fileName) return;

    setIsProcessing(true);
    try {
      const activeFile = file || { name: fileName, size: 1500000, type: "application/pdf" };
      const result = await simulateOcrProcessing(activeFile, selectedCategory, patient);
      setExtractedResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmAdd = () => {
    if (!extractedResult) return;

    const newDoc = patientStore.addDocument({
      title: extractedResult.title,
      category: extractedResult.category,
      fileSize: extractedResult.fileSize,
      fileType: extractedResult.fileType,
      ocrStatus: "Extracted",
      ocrConfidence: extractedResult.ocrConfidence,
      extractedEntities: extractedResult.extractedEntities,
      fullOcrSnippet: extractedResult.fullOcrSnippet
    });

    onDocumentUploaded && onDocumentUploaded(newDoc);
    onClose();
    // Reset state
    setFile(null);
    setFileName('');
    setExtractedResult(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload & Digitize Maternal Document"
      subtitle={`Uploading record for: ${patient?.name} (${patient?.id})`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5 text-sm">
        {/* Preset Sample Picker for Fast Hackathon Evaluation */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
            Quick-Select Clinical Sample Artifact
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                  fileName.includes(preset.title)
                    ? 'border-botanical bg-botanical-soft font-semibold text-botanical'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="truncate mr-2">
                  <div className="font-semibold text-slate-800">{preset.title}</div>
                  <div className="text-[10px] text-slate-500">{preset.category}</div>
                </div>
                <FileText className="w-4 h-4 shrink-0 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Dropzone Simulation */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
            Or Choose / Drag File
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-botanical/60 transition-colors bg-slate-50/50">
            <UploadCloud className="w-8 h-8 text-botanical mx-auto mb-2" />
            <div className="text-xs text-slate-700 font-medium">
              {fileName ? (
                <span className="font-bold text-botanical">{fileName}</span>
              ) : (
                "Drag & drop maternal scan, Taayi card photo, or lab PDF"
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Supports PDF, JPG, PNG up to 25MB</p>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0]);
                  setFileName(e.target.files[0].name);
                }
              }}
            />
            <label
              htmlFor="file-upload"
              className="mt-3 inline-block cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs"
            >
              Browse Local Files
            </label>
          </div>
        </div>

        {/* Category selector */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
            Document Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-botanical bg-white"
          >
            {DOCUMENT_CATEGORIES.filter(c => c !== "All Documents").map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* OCR Button & Progress */}
        {!extractedResult && (
          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              disabled={(!file && !fileName) || isProcessing}
              onClick={handleStartOcr}
              icon={Sparkles}
            >
              {isProcessing ? "Processing Document OCR..." : "Extract Structured Entities"}
            </Button>
          </div>
        )}

        {/* Extracted Preview */}
        {extractedResult && (
          <div className="p-4 bg-sage-50/70 rounded-xl border border-sage-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-botanical flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                OCR Extraction Successful ({extractedResult.ocrConfidence}% confidence)
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {extractedResult.extractedEntities.length} fields found
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {extractedResult.extractedEntities.map((ent, idx) => (
                <div key={idx} className="p-2 bg-white rounded border border-slate-200/80">
                  <div className="text-[10px] text-slate-500">{ent.key}</div>
                  <div className="font-bold text-slate-800">{ent.value}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button size="sm" variant="secondary" onClick={() => setExtractedResult(null)}>
                Re-scan
              </Button>
              <Button size="sm" variant="primary" icon={FileCheck2} onClick={handleConfirmAdd}>
                Confirm & Add to Maternal Record
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
