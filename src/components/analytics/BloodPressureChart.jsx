import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

export const BloodPressureChart = ({ data = [] }) => {
  const chartData = data.map(d => ({
    name: d.gaWeeks ? `${d.gaWeeks}w` : d.date,
    date: d.date,
    systolic: d.systolic,
    diastolic: d.diastolic
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-md text-xs">
          <p className="font-bold text-slate-800">{label} ({item.date})</p>
          <p className="text-sky-700 font-semibold mt-1">Systolic: {item.systolic} mmHg</p>
          <p className="text-teal-700 font-semibold">Diastolic: {item.diastolic} mmHg</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Blood Pressure Longitudinal Profile</h4>
          <p className="text-xs text-slate-500">Systolic & Diastolic tracking across antenatal visits</p>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
          Threshold: 140/90
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f3f1" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
            <YAxis domain={[50, 160]} stroke="#64748b" fontSize={11} unit=" mmHg" />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={140} stroke="#f59e0b" strokeDasharray="3 3" />
            <ReferenceLine y={90} stroke="#f59e0b" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="systolic"
              name="Systolic"
              stroke="#0284c7"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#0284c7', stroke: '#fff', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              name="Diastolic"
              stroke="#0d9488"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#0d9488', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sky-700 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span> Systolic BP
          </span>
          <span className="flex items-center gap-1.5 text-teal-700 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span> Diastolic BP
          </span>
        </div>
        <span className="text-[11px] text-amber-700">Guide: 140/90 mmHg Cut-off</span>
      </div>
    </div>
  );
};
