import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const ScanBiometricsChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card p-5 text-center text-xs text-slate-500 py-12">
        No ultrasound biometry scans documented.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-soft-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Ultrasound Biometry & Fetal Growth</h4>
          <p className="text-xs text-slate-500">Documented sonographic measurements across trimesters</p>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-botanical-soft text-botanical font-semibold">
          {data.length} Scans Indexed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((scan, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
              <span className="font-bold text-slate-900">{scan.scanType}</span>
              <span className="text-slate-500">{scan.date} ({scan.gaWeeks}w)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
              {scan.crlMm && (
                <div className="p-2 bg-white rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase">CRL</span>
                  <span className="font-bold text-slate-800 text-sm">{scan.crlMm} mm</span>
                </div>
              )}
              {scan.bpdMm && (
                <div className="p-2 bg-white rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase">BPD</span>
                  <span className="font-bold text-slate-800 text-sm">{scan.bpdMm} mm</span>
                </div>
              )}
              {scan.flMm && (
                <div className="p-2 bg-white rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase">FL</span>
                  <span className="font-bold text-slate-800 text-sm">{scan.flMm} mm</span>
                </div>
              )}
              {scan.acMm && (
                <div className="p-2 bg-white rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase">AC</span>
                  <span className="font-bold text-slate-800 text-sm">{scan.acMm} mm</span>
                </div>
              )}
              {scan.efwGrams && (
                <div className="p-2 bg-white rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase">EFW</span>
                  <span className="font-bold text-slate-800 text-sm">{scan.efwGrams} g</span>
                </div>
              )}
              {scan.afiCm && (
                <div className="p-2 bg-white rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase">AFI</span>
                  <span className="font-bold text-slate-800 text-sm">{scan.afiCm} cm</span>
                </div>
              )}
            </div>

            <div className="space-y-1 text-slate-600 text-[11px]">
              <div><strong>Placenta:</strong> {scan.placenta}</div>
              <div><strong>EDD by Scan:</strong> {scan.eddScan}</div>
              <div className="text-slate-800 pt-1"><strong>Sonologist Impression:</strong> {scan.impression}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
