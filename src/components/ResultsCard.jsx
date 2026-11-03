import React from 'react';
import { ArrowUpRight, ArrowDownRight, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ResultsCard({ filing, stock, onDeepDive }) {
  const { financials, keyTakeaway, title, timestamp } = filing;

  const metrics = [
    { label: 'Revenue', data: financials.revenue },
    { label: 'EBITDA', data: financials.ebitda },
    { label: 'PBT', data: financials.pbt },
    { label: 'PAT (Net Profit)', data: financials.pat },
  ];

  return (
    <div className="bg-[#101728] border border-blue-500/30 rounded-2xl p-4 shadow-lg hover:border-blue-500/50 transition-all space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30">
            {stock.ticker}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-white">{stock.name}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {financials.quarter} RESULTS
              </span>
            </div>
            <span className="text-[11px] text-slate-400">{timestamp} • {stock.sector}</span>
          </div>
        </div>

        <button
          onClick={() => onDeepDive(stock.ticker)}
          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center space-x-1 transition-colors shrink-0 shadow-sm"
        >
          <span>Deep Dive</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-xs text-slate-300 font-medium">
        {title}
      </p>

      {/* 4 Core Financial Metrics Grid with QoQ & YoY */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span>{m.label}</span>
              {m.data.status === 'beat' && (
                <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded">Beat</span>
              )}
              {m.data.status === 'miss' && (
                <span className="text-[9px] font-semibold text-rose-400 bg-rose-500/10 px-1 py-0.2 rounded">Miss</span>
              )}
              {m.data.status === 'inline' && (
                <span className="text-[9px] font-semibold text-slate-400 bg-slate-800 px-1 py-0.2 rounded">In-line</span>
              )}
            </div>
            
            <div className="font-mono font-bold text-sm sm:text-base text-white">
              {m.data.current}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono mt-2 pt-1.5 border-t border-slate-800/80">
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

      {/* Key Takeaway */}
      {keyTakeaway && (
        <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800 flex items-start space-x-2">
          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-slate-200">First-Cut Takeaway: </strong>
            {keyTakeaway}
          </p>
        </div>
      )}
    </div>
  );
}
