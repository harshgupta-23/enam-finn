import React from 'react';
import { Sparkles, TrendingUp, TrendingDown, ArrowRight, Zap, Layers } from 'lucide-react';

export default function MorningSummaryCard({ activeAnchor, onSelectTab, onSelectTicker }) {
  return (
    <div className="bg-gradient-to-br from-[#141926] via-[#101420] to-[#0D101A] border border-[#262F44] rounded-2xl p-4 sm:p-5 shadow-md space-y-3.5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#202738] pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white tracking-tight flex items-center space-x-2">
              <span>Morning Executive Brief</span>
              <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/20">
                AI Synthesis
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Anchored to {activeAnchor.timestamp} • 16 Portfolio Stocks Watched
            </p>
          </div>
        </div>

        <span className="text-[11px] text-slate-400 hidden sm:inline font-mono">
          3-Min Read
        </span>
      </div>

      {/* 3 Executive Bullet Insights */}
      <div className="space-y-2.5 text-xs">
        {/* Bullet 1: Earnings */}
        <div className="bg-[#141824] border border-[#222A3E] rounded-xl p-3 flex items-start space-x-3">
          <span className="text-base leading-none mt-0.5">📄</span>
          <div className="space-y-0.5">
            <p className="text-slate-200 leading-relaxed">
              <strong className="text-white">Earnings Scorecard: </strong>
              <span className="text-blue-400 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('LT')}>L&T</span> beat on revenue (+20% YoY) though legacy Gulf orders compressed margins. <span className="text-blue-400 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('TATAMOTORS')}>Tata Motors</span> JLR cash flow reached £751M, while <span className="text-blue-400 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('TATASTEEL')}>Tata Steel</span> turned PAT positive as European restructuring charges ceased.
            </p>
          </div>
        </div>

        {/* Bullet 2: Raw Material Ripple */}
        <div className="bg-[#141824] border border-[#222A3E] rounded-xl p-3 flex items-start space-x-3">
          <span className="text-base leading-none mt-0.5">🔗</span>
          <div className="space-y-0.5">
            <p className="text-slate-200 leading-relaxed">
              <strong className="text-white">Supply Chain Ripple: </strong>
              Domestic HRC Steel softened <strong className="text-rose-400">-2.3%</strong> this week. This is an immediate gross margin tailwind for <span className="text-blue-400 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('LT')}>L&T</span> and auto chassis assemblers, while capping realization gains for primary steelmakers.
            </p>
          </div>
        </div>

        {/* Bullet 3: Volume Anomalies */}
        <div className="bg-[#141824] border border-[#222A3E] rounded-xl p-3 flex items-start space-x-3">
          <span className="text-base leading-none mt-0.5">⚡</span>
          <div className="space-y-0.5">
            <p className="text-slate-200 leading-relaxed">
              <strong className="text-white">Sudden Movers: </strong>
              Heavy accumulation triggered in <span className="text-amber-400 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('ZOMATO')}>Zomato</span> (3.2× Vol) on ₹8,500 Cr QIP approval, and <span className="text-amber-400 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('TRENT')}>Trent</span> (2.8× Vol, +4.1%) ahead of festive retail sales.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSelectTab('filings')}
            className="px-3 py-1.5 rounded-lg bg-[#181E2E] hover:bg-[#20273C] text-slate-200 text-xs font-medium border border-[#27324A] transition-colors"
          >
            Inspect Earnings →
          </button>
          <button
            onClick={() => onSelectTab('anomalies')}
            className="px-3 py-1.5 rounded-lg bg-[#181E2E] hover:bg-[#20273C] text-slate-200 text-xs font-medium border border-[#27324A] transition-colors"
          >
            View Movers →
          </button>
        </div>

        <span className="text-[11px] text-slate-400">
          Tip: Tap any stock name to open its deep dive
        </span>
      </div>
    </div>
  );
}

