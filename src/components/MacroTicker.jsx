import React, { useState } from 'react';
import { Clock, Layers, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { MACRO_DATA } from '../data/macro';
import { useView } from '../context/ViewContext';

export default function MacroTicker({ activeAnchor, setActiveAnchor, onSelectTicker }) {
  const [showRippleDetails, setShowRippleDetails] = useState(false);
  const { isMobile } = useView();

  return (
    <div className="bg-[#0D1322] border border-slate-800/80 rounded-2xl p-4 shadow-card space-y-3.5">
      {/* Anchor Date Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-800/60 pb-3">
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-slate-400">Anchor Window: </span>
            <span className="font-semibold text-slate-200">
              {activeAnchor.timestamp}
            </span>
          </div>
        </div>

        {/* Time Window Segmented Control */}
        <div className="flex items-center space-x-1 bg-slate-900/90 border border-slate-800 rounded-xl p-1">
          {MACRO_DATA.anchors.map((anchor) => (
            <button
              key={anchor.id}
              onClick={() => setActiveAnchor(anchor)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeAnchor.id === anchor.id
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {anchor.label}
            </button>
          ))}
        </div>
      </div>

      {/* Benchmark Metric Cards */}
      <div className={`grid gap-2.5 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>
        {MACRO_DATA.benchmarks.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-xl border transition-all ${
              item.id === 'steel_hrc'
                ? 'bg-amber-500/5 border-amber-500/30'
                : 'bg-slate-900/50 border-slate-800/80'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
              <span className="font-medium text-slate-300 truncate">{item.name}</span>
              {item.tag && (
                <span className="px-1.5 py-0.2 bg-amber-500/15 text-amber-300 text-[9px] rounded font-mono font-medium">
                  {item.tag}
                </span>
              )}
            </div>

            <div className="flex items-baseline justify-between">
              <span className="font-mono font-bold text-sm text-white tracking-tight">{item.value}</span>
              <span
                className={`text-xs font-mono font-semibold flex items-center ${
                  item.isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {item.isPositive ? (
                  <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                )}
                {item.delta}
              </span>
            </div>

            {item.note && !isMobile && (
              <p className="text-[10px] text-slate-400 mt-1.5 line-clamp-1">
                {item.note}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Upstream Ripple Insight Banner */}
      <div className="bg-[#11182B] border border-blue-500/25 rounded-xl p-3.5 transition-all">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5 border border-blue-500/20">
              <Layers className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-blue-300 tracking-wide">
                  Supply-Chain Ripple Insight
                </span>
                <span className="px-1.5 py-0.2 bg-blue-500/15 text-blue-300 text-[10px] font-mono rounded">
                  Steel & Energy
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Domestic HRC Steel softened <strong className="text-rose-400 font-semibold">-2.3%</strong> this week.
                Direct margin relief for <span className="text-blue-400 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('LT')}>L&T</span> and <span className="text-blue-400 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('TATAMOTORS')}>Tata Motors</span>; realization pressure for <span className="text-amber-400 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('TATASTEEL')}>Tata Steel</span>.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowRippleDetails(!showRippleDetails)}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center shrink-0 pt-0.5"
          >
            {showRippleDetails ? 'Hide' : 'Details'}
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showRippleDetails ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {showRippleDetails && (
          <div className={`mt-3 pt-3 border-t border-slate-800 grid gap-2.5 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                <span>Infrastructure & EPC</span>
                <span className="text-emerald-400 font-semibold">+40-60 bps</span>
              </div>
              <p className="text-slate-200 font-semibold text-xs">Larsen & Toubro (LT)</p>
              <p className="text-[11px] text-slate-400 mt-1">Fixed-price contracts capture immediate raw material procurement spread.</p>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                <span>Automotive Assembler</span>
                <span className="text-emerald-400 font-semibold">+35 bps</span>
              </div>
              <p className="text-slate-200 font-semibold text-xs">Tata Motors (TATAMOTORS)</p>
              <p className="text-[11px] text-slate-400 mt-1">Commercial vehicle chassis body steel input costs ease.</p>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                <span>Primary Metals</span>
                <span className="text-rose-400 font-semibold">-₹1,150/t</span>
              </div>
              <p className="text-slate-200 font-semibold text-xs">Tata Steel (TATASTEEL)</p>
              <p className="text-[11px] text-slate-400 mt-1">Domestic realization per tonne compressed by cheap Asian imports.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
