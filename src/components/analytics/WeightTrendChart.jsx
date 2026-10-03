import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const WeightTrendChart = ({ data = [], baselineWeight = 58 }) => {
  const chartData = data.map(d => ({
    name: d.gaWeeks === 0 ? 'Pre-preg' : `${d.gaWeeks}w`,
    date: d.date,
    weight: d.weightKg,
    gain: (d.weightKg - baselineWeight).toFixed(1),
    note: d.note || ''
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-md text-xs">
          <p className="font-bold text-slate-800">{label} ({item.date})</p>
          <p className="text-slate-800 font-semibold mt-1">Weight: {item.weight} kg</p>
          <p className="text-botanical font-semibold">Total Gain: +{item.gain} kg</p>
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
          <h4 className="font-bold text-slate-800 text-sm">Maternal Weight Progression</h4>
          <p className="text-xs text-slate-500">Gestational weight gain from pre-pregnancy baseline ({baselineWeight} kg)</p>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-botanical-soft text-botanical font-semibold">
          Gain: +{(data[data.length - 1]?.weightKg - baselineWeight || 0).toFixed(1)} kg
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f3f1" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
            <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#64748b" fontSize={11} unit=" kg" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#5F8D5E"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#5F8D5E', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Baseline: {baselineWeight} kg</span>
        <span className="text-[11px] text-slate-500">IOM Guideline: 11.5–16 kg total recommended gain for normal BMI</span>
      </div>
    </div>
  );
};
