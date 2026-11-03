import React, { useState } from 'react';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  Building2, 
  ExternalLink,
  Volume2,
  CheckCircle,
  EyeOff
} from 'lucide-react';
import ResultsCard from './ResultsCard';
import ManagementChangeCard from './ManagementChangeCard';

export default function PushFeed({ portfolio, onSelectTicker }) {
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'high', 'anomalies', 'noise'
  const [showNoiseDrawer, setShowNoiseDrawer] = useState(false);
  const [volumeThreshold, setVolumeThreshold] = useState(2.0); // > 2.0x is anomaly

  // Collect all filings across portfolio stocks
  const allFilings = [];
  portfolio.forEach((stock) => {
    stock.filings.forEach((f) => {
      allFilings.push({
        ...f,
        stockRef: stock
      });
    });
  });

  // Anomalies: stocks with volume > volumeThreshold OR price delta > 3%
  const anomalyStocks = portfolio.filter(
    (s) => s.volumeMultiple >= volumeThreshold || Math.abs(parseFloat(s.priceDelta)) >= 3.0
  );

  // Material filings (High & Medium priority) vs Low/Routine noise
  const materialFilings = allFilings.filter((f) => f.priority === 'high' || f.priority === 'medium');
  const routineFilings = allFilings.filter((f) => f.priority === 'low');

  // Filtered list based on active tab
  let displayedFilings = materialFilings;
  if (filterMode === 'high') {
    displayedFilings = allFilings.filter((f) => f.priority === 'high');
  } else if (filterMode === 'noise') {
    displayedFilings = routineFilings;
  }

  return (
    <div className="space-y-4">
      {/* Push Triage Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#101626] p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filterMode === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
            }`}
          >
            All Signals ({materialFilings.length})
          </button>
          <button
            onClick={() => setFilterMode('high')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
              filterMode === 'high'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            <span>High Impact Only</span>
          </button>
          <button
            onClick={() => setFilterMode('anomalies')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
              filterMode === 'anomalies'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/20'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>Volume & Price Anomalies ({anomalyStocks.length})</span>
          </button>
        </div>

        {/* Volume threshold pill */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className="hidden sm:inline">Anomaly Trigger:</span>
          <span className="font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[11px]">
            &gt; {volumeThreshold}x Vol / ±3%
          </span>
        </div>
      </div>

      {/* Top Section: End-of-Day Anomaly Radar (Volume Spikes & Price Breakouts) */}
      <div className="bg-[#101626] border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-white tracking-wide uppercase">
              End-of-Day Anomaly Radar ({anomalyStocks.length} Triggered)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Watched across 16 portfolio stocks</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {anomalyStocks.map((stock) => (
            <div
              key={stock.ticker}
              onClick={() => onSelectTicker(stock.ticker)}
              className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/40 rounded-xl p-3 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-sm text-white">{stock.ticker}</span>
                    <span className="text-[10px] text-slate-400 font-normal truncate max-w-[120px]">{stock.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{stock.sector}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-white">₹{stock.price.toLocaleString('en-IN')}</div>
                  <div className={`font-mono text-[11px] font-semibold ${stock.isPricePositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stock.priceDelta}
                  </div>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 flex items-center space-x-1">
                  <span>Volume:</span>
                  <strong className={`font-mono ${stock.volumeMultiple >= 2.0 ? 'text-amber-400' : 'text-slate-200'}`}>
                    {stock.volumeMultiple}x avg
                  </strong>
                </span>
                <span className="text-blue-400 text-[10px] font-medium hover:underline">
                  Analyze Drivers →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Triage Feed of Filings */}
      {filterMode !== 'anomalies' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Prioritized Actionable Announcements ({displayedFilings.length})
            </span>
            <span className="text-[11px] text-slate-400">
              Ranked by material earnings impact
            </span>
          </div>

          {displayedFilings.map((item) => {
            if (item.category === 'results' && item.financials) {
              return (
                <ResultsCard
                  key={item.id}
                  filing={item}
                  stock={item.stockRef}
                  onDeepDive={onSelectTicker}
                />
              );
            }

            if (item.category === 'management_change' && item.execBio) {
              return (
                <ManagementChangeCard
                  key={item.id}
                  filing={item}
                  stock={item.stockRef}
                  onDeepDive={onSelectTicker}
                />
              );
            }

            // General Material Announcement Card (M&A, CapEx, Fund Raise, Press Release)
            return (
              <div
                key={item.id}
                className="bg-[#101728] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 shadow-md transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs border border-slate-700">
                      {item.stockRef.ticker}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-white">{item.stockRef.name}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                          {item.category.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{item.timestamp} • {item.stockRef.sector}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectTicker(item.stockRef.ticker)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors shrink-0"
                  >
                    Deep Dive
                  </button>
                </div>

                <h4 className="text-xs font-semibold text-slate-100">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                  {item.summary}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Routine Noise Reduction Drawer (The Big Signal-to-Noise Win) */}
      <div className="bg-[#0D121F] border border-slate-800/80 rounded-2xl p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <EyeOff className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-xs font-bold text-slate-300">
                Noise Reduction Filter
              </span>
              <p className="text-[11px] text-slate-400">
                {routineFilings.length} routine compliance filings collapsed (ESOPs, registrar certificates, newspaper ads)
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowNoiseDrawer(!showNoiseDrawer)}
            className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 font-medium transition-all"
          >
            <span>{showNoiseDrawer ? 'Collapse Noise' : `Inspect (${routineFilings.length})`}</span>
            {showNoiseDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showNoiseDrawer && (
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="text-[11px] text-slate-400 mb-2 italic">
              These filings were classified as statutory non-material paperwork and suppressed from the main digest to save investor attention:
            </div>
            {routineFilings.map((rf) => (
              <div
                key={rf.id}
                className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-2.5 text-xs flex items-start justify-between gap-2"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-300">{rf.stockRef.ticker}</span>
                    <span className="text-[10px] text-slate-400">{rf.timestamp}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-800 text-slate-400 font-mono">
                      Statutory Paperwork
                    </span>
                  </div>
                  <p className="text-slate-300 font-medium mt-1">{rf.title}</p>
                  <p className="text-[11px] text-slate-400">{rf.summary}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
