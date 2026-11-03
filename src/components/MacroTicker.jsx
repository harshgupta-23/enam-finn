import React, { useState } from 'react';
import { Clock, Layers, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { MACRO_DATA } from '../data/macro';
import { useView } from '../context/ViewContext';

export default function MacroTicker({ activeAnchor, setActiveAnchor, onSelectTicker }) {
  const [showRippleDetails, setShowRippleDetails] = useState(false);
  const { isMobile } = useView();

  return (
    <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      {/* Anchor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E2230] pb-3.5">
        <div className="flex items-center space-x-2.5 text-xs text-slate-300">
          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Anchor Window:</span>
          <strong className="text-white font-medium">{activeAnchor?.timestamp || 'Latest Market Close'}</strong>
        </div>

        {/* Anchor Selector */}
        <div className="flex items-center space-x-1.5 bg-[#181B26] border border-[#262B3C] rounded-xl p-1 overflow-x-auto scrollbar-none">
          {MACRO_DATA.anchors.map((anchor) => (
            <button
              key={anchor.id}
              onClick={() => setActiveAnchor(anchor)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                activeAnchor?.id === anchor.id
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {anchor.label}
            </button>
          ))}
        </div>
      </div>

      {/* Macro Indicators: Clean grid with guaranteed vertical separation between Value & Delta */}
      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>
        {MACRO_DATA.benchmarks.map((item) => {
          const currentDelta = item.deltas?.[activeAnchor?.id || '24h'] || { delta: item.delta || '+0.0%', isPositive: true };
          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border bg-[#171A24] border-[#252A3C] flex flex-col justify-between space-y-2.5 shadow-sm min-w-0"
            >
              {/* Header: Name + Tag cleanly stacked */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-200 leading-snug truncate">
                  {item.name}
                </div>
                {item.tag && (
                  <div>
                    <span className="inline-block px-1.5 py-0.5 bg-amber-500/10 text-amber-300 text-[10px] rounded font-mono font-medium border border-amber-500/20">
                      {item.tag}
                    </span>
                  </div>
                )}
              </div>

              {/* Value & Delta: Clear visual separation with dedicated badge, NEVER collides */}
              <div className="space-y-1.5 pt-0.5">
                <div className="font-mono font-bold text-base text-white tracking-tight break-words">
                  {item.value}
                </div>

                <div>
                  <span
                    className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                      currentDelta.isPositive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {currentDelta.isPositive ? (
                      <TrendingUp className="w-3 h-3 shrink-0" />
                    ) : (
                      <TrendingDown className="w-3 h-3 shrink-0" />
                    )}
                    <span>{currentDelta.delta}</span>
                  </span>
                </div>
              </div>

              {/* Note shown cleanly without cutoffs on desktop */}
              {!isMobile && item.note && (
                <p className="text-[11px] text-slate-400 pt-1.5 border-t border-[#202536] line-clamp-2">
                  {item.note}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Upstream Ripple Insight */}
      <div className="bg-[#171A26] border border-[#262B3C] rounded-xl p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3 min-w-0">
            <div className="p-2 rounded-lg bg-[#202534] text-slate-200 shrink-0 mt-0.5 border border-[#2B3246]">
              <Layers className="w-4 h-4 text-blue-400" />
            </div>
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-white tracking-wide">
                  Upstream Supply-Chain Ripple Insight
                </span>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-mono rounded">
                  Steel & Energy
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Domestic HRC Steel softened <strong className="text-rose-400 font-semibold">-2.3%</strong> this week.
                Direct margin relief for <span className="text-blue-400 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('LT')}>L&T</span> and <span className="text-blue-400 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('TATAMOTORS')}>Tata Motors</span>; realization compression for <span className="text-amber-400 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('TATASTEEL')}>Tata Steel</span>.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowRippleDetails(!showRippleDetails)}
            className="text-xs text-slate-300 hover:text-white font-medium flex items-center shrink-0 pt-0.5"
          >
            {showRippleDetails ? 'Collapse' : 'Details'}
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showRippleDetails ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {showRippleDetails && (
          <div className={`mt-4 pt-3 border-t border-[#232738] grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            <div className="bg-[#12141C] p-3 rounded-lg border border-[#222636]">
              <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                <span>Infrastructure & EPC</span>
                <span className="text-emerald-400 font-semibold">+40-60 bps</span>
              </div>
              <p className="text-white font-semibold text-xs">Larsen & Toubro (LT)</p>
              <p className="text-xs text-slate-400 mt-1">Fixed-price contracts capture instant procurement spread.</p>
            </div>
            <div className="bg-[#12141C] p-3 rounded-lg border border-[#222636]">
              <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                <span>Automotive Assembler</span>
                <span className="text-emerald-400 font-semibold">+35 bps</span>
              </div>
              <p className="text-white font-semibold text-xs">Tata Motors (TATAMOTORS)</p>
              <p className="text-xs text-slate-400 mt-1">Commercial vehicle chassis body steel input costs ease.</p>
            </div>
            <div className="bg-[#12141C] p-3 rounded-lg border border-[#222636]">
              <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                <span>Primary Metals</span>
                <span className="text-rose-400 font-semibold">-₹1,150/t</span>
              </div>
              <p className="text-white font-semibold text-xs">Tata Steel (TATASTEEL)</p>
              <p className="text-xs text-slate-400 mt-1">Domestic realization per tonne compressed by cheap Asian imports.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
