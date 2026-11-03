import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useView } from '../context/ViewContext';

export default function ResultsCard({ filing, stock, onDeepDive }) {
  const { financials, keyTakeaway, title, timestamp } = filing;
  const { isMobile } = useView();

  const metrics = [
    { label: 'Revenue', data: financials.revenue },
    { label: 'EBITDA', data: financials.ebitda },
    { label: 'PBT', data: financials.pbt },
    { label: 'PAT (Net Profit)', data: financials.pat },
  ];

  return (
    <div className="bg-[#0D1322] border border-blue-500/30 rounded-2xl p-4 sm:p-5 shadow-card hover:border-blue-500/50 transition-all space-y-3.5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/20">
            {stock.ticker}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-white">{stock.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {financials.quarter} RESULTS
              </span>
            </div>
            <span className="text-[11px] text-slate-400">{timestamp} • {stock.sector}</span>
          </div>
        </div>

        <button
          onClick={() => onDeepDive(stock.ticker)}
          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1 transition-colors shrink-0 shadow-sm"
        >
          <span>Deep Dive</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-xs text-slate-200 font-medium leading-relaxed">
        {title}
      </p>

      {/* 4 Financial Metrics Grid (2 columns on mobile, 4 on desktop) */}
      <div className={`grid gap-2.5 pt-1 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
              <span className="font-medium text-slate-300">{m.label}</span>
              {m.data.status === 'beat' && (
                <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">Beat</span>
              )}
              {m.data.status === 'miss' && (
                <span className="text-[9px] font-semibold text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded">Miss</span>
              )}
              {m.data.status === 'inline' && (
                <span className="text-[9px] font-semibold text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">In-line</span>
              )}
            </div>

            <div className="font-mono font-bold text-sm sm:text-base text-white tracking-tight">
              {m.data.current}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono mt-2 pt-2 border-t border-slate-800/80">
              <span className="text-slate-400">
                QoQ: <strong className={m.data.qoq.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}>{m.data.qoq}</strong>
              </span>
              <span className="text-slate-400">
                YoY: <strong className={m.data.yoy.startsWith('+') ? 'text-emerald-400' : m.data.yoy === 'Turnaround' ? 'text-emerald-400' : 'text-rose-400'}>{m.data.yoy}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* First-Cut Takeaway */}
      {keyTakeaway && (
        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80 flex items-start space-x-2.5">
          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-slate-100 font-semibold">First-Cut Takeaway: </strong>
            {keyTakeaway}
          </p>
        </div>
      )}
    </div>
  );
}
