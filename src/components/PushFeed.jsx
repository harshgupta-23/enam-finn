import React, { useState } from 'react';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  ChevronDown, 
  ChevronUp, 
  EyeOff,
  ArrowRight,
  Filter
} from 'lucide-react';
import ResultsCard from './ResultsCard';
import ManagementChangeCard from './ManagementChangeCard';
import { useView } from '../context/ViewContext';

export default function PushFeed({ portfolio, onSelectTicker }) {
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'high', 'anomalies'
  const [showNoiseDrawer, setShowNoiseDrawer] = useState(false);
  const [volumeThreshold] = useState(2.0);
  const { isMobile } = useView();

  // Aggregate filings across portfolio
  const allFilings = [];
  portfolio.forEach((stock) => {
    stock.filings.forEach((f) => {
      allFilings.push({
        ...f,
        stockRef: stock
      });
    });
  });

  // Filter anomalies (Volume >= 2.0x OR daily price swing >= 3%)
  const anomalyStocks = portfolio.filter(
    (s) => s.volumeMultiple >= volumeThreshold || Math.abs(parseFloat(s.priceDelta)) >= 3.0
  );

  const materialFilings = allFilings.filter((f) => f.priority === 'high' || f.priority === 'medium');
  const routineFilings = allFilings.filter((f) => f.priority === 'low');

  let displayedFilings = materialFilings;
  if (filterMode === 'high') {
    displayedFilings = allFilings.filter((f) => f.priority === 'high');
  }

  return (
    <div className="space-y-4">
      {/* Triage Filter Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0D1322] p-3 rounded-2xl border border-slate-800/80 shadow-sm">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterMode === 'all'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
            }`}
          >
            All Signals ({materialFilings.length})
          </button>

          <button
            onClick={() => setFilterMode('high')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
              filterMode === 'high'
                ? 'bg-rose-600 text-white shadow-sm font-semibold'
                : 'text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            <span>High Impact Only</span>
          </button>

          <button
            onClick={() => setFilterMode('anomalies')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
              filterMode === 'anomalies'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Anomalies ({anomalyStocks.length})</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
          Trigger: &gt;2x Vol / ±3% Price
        </div>
      </div>

      {/* Market Anomaly Section */}
      <div className="bg-[#0D1322] border border-slate-800/80 rounded-2xl p-4 shadow-card space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                End-of-Day Anomaly Radar
              </h3>
              <p className="text-[11px] text-slate-400">
                {anomalyStocks.length} stocks triggered abnormal volume or price moves
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Active Watch
          </span>
        </div>

        {/* Anomaly Cards Grid: STRICTLY 1 COLUMN IN MOBILE, 2 OR 3 IN DESKTOP */}
        <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
          {anomalyStocks.map((stock) => (
            <div
              key={stock.ticker}
              onClick={() => onSelectTicker(stock.ticker)}
              className="bg-[#11182B] hover:bg-[#151E36] border border-slate-800/90 hover:border-blue-500/50 rounded-xl p-3.5 cursor-pointer transition-all shadow-sm flex flex-col justify-between space-y-2.5 group"
            >
              {/* Row 1: Ticker + Price */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                      {stock.ticker}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {stock.sector}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mt-1 truncate max-w-[200px]">
                    {stock.name}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-sm text-white">
                    ₹{stock.price.toLocaleString('en-IN')}
                  </div>
                  <div
                    className={`font-mono text-xs font-semibold flex items-center justify-end ${
                      stock.isPricePositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {stock.isPricePositive ? '+' : ''}{stock.priceDelta}
                  </div>
                </div>
              </div>

              {/* Row 2: Volume badge and deep dive trigger */}
              <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between text-xs">
                <span className="inline-flex items-center space-x-1.5 text-slate-400 text-[11px]">
                  <span>Volume:</span>
                  <span className={`font-mono font-semibold px-1.5 py-0.5 rounded text-[10px] ${
                    stock.volumeMultiple >= 2.0
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {stock.volumeMultiple}x 20D Avg
                  </span>
                </span>

                <span className="text-blue-400 text-xs font-medium flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Analyze</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Triage Feed (Results, Management, M&A) */}
      {filterMode !== 'anomalies' && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Material Filings & Earnings ({displayedFilings.length})
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

            // General Material Announcement Card
            return (
              <div
                key={item.id}
                className="bg-[#0D1322] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4 shadow-card transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-slate-200 flex items-center justify-center font-bold text-xs border border-slate-800">
                      {item.stockRef.ticker}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-white">{item.stockRef.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                          {item.category.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{item.timestamp} • {item.stockRef.sector}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectTicker(item.stockRef.ticker)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 transition-colors shrink-0"
                  >
                    Deep Dive
                  </button>
                </div>

                <h4 className="text-xs font-semibold text-slate-100 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  {item.summary}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Collapsed Routine Noise Reduction Drawer */}
      <div className="bg-[#0A0F1D] border border-slate-800/60 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <EyeOff className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-xs font-bold text-slate-300">
                Noise Reduction Filter
              </span>
              <p className="text-[11px] text-slate-400">
                {routineFilings.length} routine compliance filings filtered out (ESOPs, registrar notices, newspaper ads)
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowNoiseDrawer(!showNoiseDrawer)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 font-medium transition-all"
          >
            <span>{showNoiseDrawer ? 'Collapse' : `Inspect (${routineFilings.length})`}</span>
            {showNoiseDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showNoiseDrawer && (
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <p className="text-[11px] text-slate-400 italic">
              These filings were classified as low-relevance statutory paperwork and collapsed to preserve focus:
            </p>
            {routineFilings.map((rf) => (
              <div
                key={rf.id}
                className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-3 text-xs flex items-start justify-between gap-2"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-200">{rf.stockRef.ticker}</span>
                    <span className="text-[10px] text-slate-400">{rf.timestamp}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-800 text-slate-400 font-mono">
                      Statutory Paperwork
                    </span>
                  </div>
                  <p className="text-slate-300 font-medium mt-1">{rf.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{rf.summary}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
