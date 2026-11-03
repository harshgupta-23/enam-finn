import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, AlertTriangle, Layers, ChevronRight, Info } from 'lucide-react';
import { MACRO_DATA } from '../data/macro';

export default function MacroTicker({ activeAnchor, setActiveAnchor, onSelectTicker }) {
  const [showRippleDetails, setShowRippleDetails] = useState(false);

  return (
    <div className="bg-[#101626] border border-slate-800 rounded-2xl p-3.5 shadow-md space-y-3">
      {/* Anchor Date Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center space-x-2 text-xs">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-slate-400">Anchor Window:</span>
          <span className="font-semibold text-slate-200">
            Since {activeAnchor.timestamp}
          </span>
        </div>

        {/* Time Window Pills */}
        <div className="flex items-center space-x-1 bg-slate-900/90 border border-slate-800 rounded-lg p-0.5">
          {MACRO_DATA.anchors.map((anchor) => (
            <button
              key={anchor.id}
              onClick={() => setActiveAnchor(anchor)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                activeAnchor.id === anchor.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {anchor.label}
            </button>
          ))}
        </div>
      </div>

      {/* Macro & Upstream Commodity Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {MACRO_DATA.benchmarks.map((item) => (
          <div
            key={item.id}
            className={`p-2.5 rounded-xl border transition-all ${
              item.id === 'steel_hrc'
                ? 'bg-amber-950/20 border-amber-500/30 ring-1 ring-amber-500/20'
                : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="font-medium text-slate-300 truncate">{item.name}</span>
              {item.tag && (
                <span className="px-1 py-0.2 bg-amber-500/20 text-amber-300 text-[9px] rounded font-mono font-semibold">
                  {item.tag}
                </span>
              )}
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono font-bold text-sm text-white">{item.value}</span>
              <span
                className={`text-[11px] font-mono font-semibold flex items-center ${
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
            {item.note && (
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                {item.note}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Upstream Supply-Chain Ripple Alert Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/20 border border-blue-500/30 rounded-xl p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start space-x-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 mt-0.5">
              <Layers className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-blue-300">
                  Upstream Supply-Chain Ripple Detected
                </span>
                <span className="px-1.5 py-0.2 bg-blue-500/20 text-blue-300 text-[10px] font-mono rounded">
                  Steel & Energy
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Domestic HRC Steel prices softened <strong className="text-rose-400">-2.3%</strong> this week.
                Direct margin relief for <span className="text-blue-300 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('LT')}>L&T</span> and <span className="text-blue-300 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('TATAMOTORS')}>Tata Motors</span>; realization margin drag for <span className="text-amber-300 font-semibold cursor-pointer underline hover:text-white" onClick={() => onSelectTicker('TATASTEEL')}>Tata Steel</span>.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowRippleDetails(!showRippleDetails)}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center font-medium shrink-0 pt-0.5"
          >
            {showRippleDetails ? 'Hide' : 'Details'}
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showRippleDetails ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {showRippleDetails && (
          <div className="mt-3 pt-3 border-t border-blue-500/20 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                <span>Infrastructure & EPC</span>
                <span className="text-emerald-400 font-semibold">+40-60 bps</span>
              </div>
              <p className="text-slate-300 font-medium">Larsen & Toubro (LT)</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Fixed-price contracts capture instant procurement spread.</p>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                <span>Automotive Assembler</span>
                <span className="text-emerald-400 font-semibold">+35 bps</span>
              </div>
              <p className="text-slate-300 font-medium">Tata Motors (TATAMOTORS)</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Commercial vehicle chassis body steel conversion cost eases.</p>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                <span>Primary Metals</span>
                <span className="text-rose-400 font-semibold">-₹1,150/t</span>
              </div>
              <p className="text-slate-300 font-medium">Tata Steel (TATASTEEL)</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Domestic realization per tonne compressed by cheap Asian imports.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
