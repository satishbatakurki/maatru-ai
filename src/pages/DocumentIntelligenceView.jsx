import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  Filter,
  Search,
  Layers,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { DocumentCard } from '../components/intelligence/DocumentCard';
import { DocumentViewerSplit } from '../components/intelligence/DocumentViewerSplit';
import { DocumentUploadModal } from '../components/intelligence/DocumentUploadModal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DOCUMENT_CATEGORIES } from '../data/mockDocuments';
import { patientStore } from '../services/patientStore';

export const DocumentIntelligenceView = ({
  activePatient,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const allDocuments = patientStore.documents || [];
  const patientDocs = allDocuments.filter(d => !activePatient || d.patientId === activePatient.id);

  const filteredDocs = patientDocs.filter((doc) => {
    const matchesCategory = selectedCategory === 'All Documents' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-slate-900">Document Intelligence & OCR Extraction</h2>
            <Badge variant="sage" size="sm">Vision-OCR Engine</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Automated extraction of obstetric entities from Taayi cards, ultrasound scans, lab slips, and discharge summaries for <strong>{activePatient?.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            size="sm"
            variant="primary"
            icon={UploadCloud}
            onClick={() => setIsUploadOpen(true)}
          >
            Upload & Digitize
          </Button>
        </div>
      </div>

      {/* Active Split Viewer if selected */}
      {selectedDoc && (
        <DocumentViewerSplit
          document={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}

      {/* Search and Category Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-soft-card flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[260px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search document title or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-botanical"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none text-slate-700 font-medium"
          >
            {DOCUMENT_CATEGORIES.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <span className="text-slate-500 font-medium">
          Showing {filteredDocs.length} files
        </span>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onInspect={(d) => setSelectedDoc(d)}
          />
        ))}
      </div>

      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        patient={activePatient}
        onDocumentUploaded={(newDoc) => {
          setSelectedDoc(newDoc);
        }}
      />
    </div>
  );
};
