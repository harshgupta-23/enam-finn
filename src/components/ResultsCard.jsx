import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function ResultsCard({ filing, stock, onDeepDive }) {
  const { financials, keyTakeaway, title, timestamp } = filing;
  const [showNumbers, setShowNumbers] = useState(false);

  const metrics = [
    { label: 'Revenue', data: financials.revenue },
    { label: 'EBITDA', data: financials.ebitda },
    { label: 'PBT', data: financials.pbt },
    { label: 'PAT (Net Profit)', data: financials.pat },
  ];

  return (
    <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 transition-all">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E2230] pb-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-bold text-xs bg-[#1A1D2A] text-slate-200 px-2.5 py-1 rounded-md border border-[#2A3044]">
              {stock.ticker}
            </span>
            <h3 className="font-bold text-base text-white tracking-tight">
              {stock.name}
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {financials.quarter} Results
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {timestamp} • {stock.sector}
          </p>
        </div>

        <button
          onClick={() => onDeepDive(stock.ticker)}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-900 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm shrink-0"
        >
          <span>Company X-Ray</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Headline */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-100 leading-snug">
          {title}
        </h4>

        {/* Compact, Zero-Wasted-Space "Why Should I Care?" Callout */}
        {keyTakeaway && (
          <div className="bg-amber-950/20 border border-amber-500/35 rounded-xl p-3 text-xs leading-relaxed space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/35">
                <span>💡 Why Should I Care?</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Impact Analysis</span>
            </div>
            <p className="text-amber-100/95 font-medium leading-relaxed pl-0.5">
              {keyTakeaway}
            </p>
          </div>
        )}
      </div>

      {/* Progressive Disclosure: Toggle to View Detailed Financials */}
      <div className="pt-1">
        <button
          onClick={() => setShowNumbers(!showNumbers)}
          className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-[#171A26] hover:bg-[#1C2030] border border-[#252A3C] text-xs text-slate-300 font-medium transition-colors"
        >
          <span className="flex items-center space-x-2">
            <span>📊 Detailed Financials (Revenue, EBITDA, PBT, PAT)</span>
          </span>
          <span className="flex items-center space-x-1 text-slate-400">
            <span>{showNumbers ? 'Hide Metrics' : 'Inspect 2×2 Metrics'}</span>
            {showNumbers ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>

        {/* Clean, Spacious 2×2 Grid requested by user */}
        {showNumbers && (
          <div className="grid grid-cols-2 gap-3 mt-3 pt-1">
            {metrics.map((m, idx) => (
              <div key={idx} className="bg-[#181B26] border border-[#262B3C] rounded-xl p-3.5 flex flex-col justify-between space-y-2 shadow-sm min-w-0">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold truncate">{m.label}</span>
                  {m.data.status === 'beat' && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded shrink-0">Beat</span>
                  )}
                  {m.data.status === 'miss' && (
                    <span className="text-[10px] font-bold text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded shrink-0">Miss</span>
                  )}
                  {m.data.status === 'inline' && (
                    <span className="text-[10px] font-bold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded shrink-0">In-line</span>
                  )}
                </div>

                <div className="font-mono font-bold text-base sm:text-lg text-white tracking-tight break-words">
                  {m.data.current}
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#232738] text-slate-400">
                  <span>QoQ <strong className={`ml-0.5 ${m.data.qoq.startsWith('+') ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}`}>{m.data.qoq}</strong></span>
                  <span>YoY <strong className={`ml-0.5 ${m.data.yoy.startsWith('+') ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}`}>{m.data.yoy}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
