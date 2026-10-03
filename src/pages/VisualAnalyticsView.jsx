import React from 'react';
import {
  LineChart as LineChartIcon,
  Activity,
  HeartPulse,
  TrendingUp,
  FileCheck2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { HbTrendChart } from '../components/analytics/HbTrendChart';
import { BloodPressureChart } from '../components/analytics/BloodPressureChart';
import { WeightTrendChart } from '../components/analytics/WeightTrendChart';
import { GlucoseTrendChart } from '../components/analytics/GlucoseTrendChart';
import { ScanBiometricsChart } from '../components/analytics/ScanBiometricsChart';
import { Badge } from '../components/common/Badge';

export const VisualAnalyticsView = ({ activePatient }) => {
  if (!activePatient) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-slate-900">Visual Analytics & Longitudinal Trends</h2>
            <Badge variant="sage" size="sm">
              {activePatient.name} &bull; {activePatient.obstetricFormula}
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Serial trend analysis of clinical vitals, biometrics, and laboratory parameters synthesized from documented records.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <Calendar className="w-3.5 h-3.5 text-botanical" />
          <span>Gestational Age: <strong>{activePatient.currentPregnancy?.gestationalAgeWeeks ? `${activePatient.currentPregnancy.gestationalAgeWeeks}w ${activePatient.currentPregnancy.gestationalAgeDays || 0}d` : activePatient.currentPregnancy?.currentStage}</strong></span>
        </div>
      </div>

      {/* Row 1: Hb & Blood Pressure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <HbTrendChart data={activePatient.longitudinalMetrics?.hemoglobin || []} />
        <BloodPressureChart data={activePatient.longitudinalMetrics?.bloodPressure || []} />
      </div>

      {/* Row 2: Weight & Glucose */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <WeightTrendChart
          data={activePatient.longitudinalMetrics?.weight || []}
          baselineWeight={activePatient.baselineVitals?.prePregnancyWeightKg || 58}
        />
        <GlucoseTrendChart data={activePatient.longitudinalMetrics?.glucose || []} />
      </div>

      {/* Row 3: Ultrasound Biometrics */}
      <ScanBiometricsChart data={activePatient.longitudinalMetrics?.ultrasounds || []} />
    </div>
  );
};
