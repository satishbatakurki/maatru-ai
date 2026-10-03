import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from 'recharts';

export const GlucoseTrendChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card p-5 text-center text-xs text-slate-500 py-12">
        No glycemic measurements documented for this patient.
      </div>
    );
  }

  const chartData = data.map(d => ({
    name: `${d.type.split(' ')[0]} (${d.gaWeeks || 0}w)`,
    fullType: d.type,
    date: d.date,
    value: d.value,
    normalRef: d.normalRef,
    isElevated: d.value > (d.type.includes('Fasting') ? 92 : d.type.includes('1-Hour') ? 180 : 153)
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-md text-xs">
          <p className="font-bold text-slate-800">{item.fullType}</p>
          <p className="text-slate-500 text-[11px] mb-1">Date: {item.date}</p>
          <p className={`font-bold ${item.isElevated ? 'text-amber-600' : 'text-emerald-700'}`}>
            Value: {item.value} mg/dL
          </p>
          <p className="text-[11px] text-slate-500">Ref: {item.normalRef}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Blood Glucose & OGTT Profiles</h4>
          <p className="text-xs text-slate-500">Documented laboratory & self-monitoring glycemic values</p>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
          GDM Screening
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f3f1" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-15} textAnchor="end" />
            <YAxis domain={[50, 220]} stroke="#64748b" fontSize={11} unit=" mg/dL" />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={92} stroke="#f59e0b" strokeDasharray="2 2" />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isElevated ? '#f59e0b' : '#2D5A43'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-botanical"></span> Within Target</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500"></span> Outside Target</span>
        </div>
        <span className="text-[11px]">DIPSI / IADPSG Guidelines</span>
      </div>
    </div>
  );
};
