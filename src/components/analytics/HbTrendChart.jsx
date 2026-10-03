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
import { Activity } from 'lucide-react';

export const HbTrendChart = ({ data = [] }) => {
  const chartData = data.map(d => ({
    name: d.gaWeeks ? `${d.gaWeeks}w` : d.date,
    date: d.date,
    hb: d.value,
    threshold: 11.0,
    note: d.note || ''
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-md text-xs">
          <p className="font-bold text-slate-800">{label} ({item.date})</p>
          <p className="text-emerald-700 font-semibold mt-1">
            Hb: {item.hb} g/dL
          </p>
          <p className="text-[11px] text-slate-500">
            {item.hb < 11.0 ? 'Below reference threshold (< 11.0 g/dL)' : 'Within normal range'}
          </p>
          {item.note && <p className="text-[10px] text-slate-400 italic mt-0.5">{item.note}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Hemoglobin (Hb) Longitudinal Trajectory</h4>
          <p className="text-xs text-slate-500">Serial maternal CBC values with clinical anemia threshold (11.0 g/dL)</p>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-botanical-soft text-botanical font-semibold">
          Latest: {data[data.length - 1]?.value || '--'} g/dL
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f3f1" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
            <YAxis domain={[7, 14]} stroke="#64748b" fontSize={11} unit=" g/dL" />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={11.0}
              stroke="#e11d48"
              strokeDasharray="4 4"
              label={{ value: 'Anemia Threshold (11.0)', position: 'insideTopLeft', fill: '#e11d48', fontSize: 10 }}
            />
            <Line
              type="monotone"
              dataKey="hb"
              stroke="#2D5A43"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#2D5A43', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-botanical"></span>
          <span>Documented Hemoglobin</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-rose-500 border-dashed"></span>
          <span>Threshold 11.0 g/dL</span>
        </div>
      </div>
    </div>
  );
};
