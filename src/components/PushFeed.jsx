import React, { useState } from 'react';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  ChevronDown, 
  ChevronUp, 
  EyeOff,
  ArrowRight,
  FileText,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import ResultsCard from './ResultsCard';
import ManagementChangeCard from './ManagementChangeCard';
import MacroTicker from './MacroTicker';
import MorningSummaryCard from './MorningSummaryCard';
import { useView } from '../context/ViewContext';

export default function PushFeed({ portfolio, onSelectTicker, activeAnchor, setActiveAnchor }) {
  const { isMobile } = useView();
  // Sub-tabs: 'filings', 'anomalies', 'macro'
  const [subView, setSubView] = useState('filings');
  const [showNoiseDrawer, setShowNoiseDrawer] = useState(false);

  // Configurable Anomaly Thresholds
  const [volumeThreshold, setVolumeThreshold] = useState(2.0);
  const [priceThreshold, setPriceThreshold] = useState(3.0);

  // Aggregate and dynamically filter filings based on active time window
  const allFilings = [];
  portfolio.forEach((stock) => {
    stock.filings.forEach((f) => {
      let inWindow = true;
      if (activeAnchor?.id === '24h') {
        inWindow = f.timestamp.includes('Today');
      } else if (activeAnchor?.id === '3d') {
        inWindow = f.timestamp.includes('Today') || f.timestamp.includes('Yesterday');
      }
      
      if (inWindow) {
        allFilings.push({
          ...f,
          stockRef: stock
        });
      }
    });
  });

  // Dynamically filter anomalies based on user-chosen thresholds
  const anomalyStocks = portfolio.filter(
    (s) => s.volumeMultiple >= volumeThreshold || Math.abs(parseFloat(s.priceDelta)) >= priceThreshold
  );

  const materialFilings = allFilings.filter((f) => f.priority === 'high' || f.priority === 'medium');
  const routineFilings = allFilings.filter((f) => f.priority === 'low');

  return (
    <div className="space-y-4">
      {/* 1. Morning Executive Summary Card (Always pinned at top of Morning Radar) */}
      <MorningSummaryCard
        activeAnchor={activeAnchor}
        onSelectTab={(tabKey) => setSubView(tabKey)}
        onSelectTicker={onSelectTicker}
      />

      {/* 2. Focused Sub-Navigation Pills (No truncation, smooth scrolling) */}
      <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-2 shadow-sm">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none py-0.5">
          <button
            onClick={() => setSubView('filings')}
            className={`py-2 px-3.5 rounded-xl transition-all flex items-center space-x-2 shrink-0 text-xs ${
              subView === 'filings'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Earnings & Filings ({materialFilings.length})</span>
          </button>

          <button
            onClick={() => setSubView('anomalies')}
            className={`py-2 px-3.5 rounded-xl transition-all flex items-center space-x-2 shrink-0 text-xs ${
              subView === 'anomalies'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Sudden Movers ({anomalyStocks.length})</span>
          </button>

          <button
            onClick={() => setSubView('macro')}
            className={`py-2 px-3.5 rounded-xl transition-all flex items-center space-x-2 shrink-0 text-xs ${
              subView === 'macro'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Market Pulse & Costs</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: MATERIAL FILINGS & EARNINGS */}
      {subView === 'filings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1 text-xs text-slate-400">
            <span className="font-semibold text-slate-300 uppercase tracking-wider">
              Material Corporate Announcements
            </span>
            <span>Since {activeAnchor?.timestamp || "Latest Close"}</span>
          </div>

          <div className="space-y-4">
            {materialFilings.map((item) => {
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

              // General Corporate Announcement Card
              return (
                <div
                  key={item.id}
                  className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E2230] pb-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-xs bg-[#1A1D2A] text-slate-200 px-2.5 py-1 rounded-md border border-[#2A3044]">
                          {item.stockRef.ticker}
                        </span>
                        <h3 className="font-bold text-base text-white tracking-tight">
                          {item.stockRef.name}
                        </h3>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                          {item.category.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {item.timestamp} • {item.stockRef.sector}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectTicker(item.stockRef.ticker)}
                      className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-900 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm shrink-0"
                    >
                      <span>Company X-Ray</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                    {item.title}
                  </h4>

                  {/* Compact Why Should I Care? Callout */}
                  <div className="bg-blue-950/20 border border-blue-500/35 rounded-xl p-3 text-xs leading-relaxed space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/35">
                        <span>💡 Why Should I Care?</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Strategic Impact</span>
                    </div>
                    <p className="text-blue-100/95 font-medium leading-relaxed pl-0.5">
                      {item.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Routine Noise Drawer */}
          <div className="bg-[#10131B] border border-[#1D212E] rounded-2xl p-4 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5 text-slate-400">
                <EyeOff className="w-4 h-4 text-slate-500" />
                <div>
                  <span className="font-semibold text-slate-300">
                    Routine Disclosures Collapsed ({routineFilings.length})
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Filtered ESOPs, compliance certificates, and loss of share certificates
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowNoiseDrawer(!showNoiseDrawer)}
                className="px-3 py-1.5 rounded-xl bg-[#181B26] border border-[#262B3C] hover:bg-[#202434] text-xs text-slate-300 font-medium transition-all"
              >
                {showNoiseDrawer ? 'Collapse' : `View Hidden (${routineFilings.length})`}
              </button>
            </div>

            {showNoiseDrawer && (
              <div className="pt-3 border-t border-[#202434] space-y-2">
                {routineFilings.map((rf) => (
                  <div
                    key={rf.id}
                    className="bg-[#141722] border border-[#222636] rounded-xl p-3 text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-300">{rf.stockRef.ticker}</span>
                      <span className="text-[10px] text-slate-400">{rf.timestamp}</span>
                      <span className="text-[10px] bg-[#1E2230] text-slate-400 px-2 py-0.2 rounded font-mono">
                        Routine Paperwork
                      </span>
                    </div>
                    <p className="text-slate-200 font-medium mt-1">{rf.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{rf.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: MARKET ANOMALIES (CLEAN, ZERO-COLLISION CONTROLS) */}
      {subView === 'anomalies' && (
        <div className="space-y-4">
          {/* Configurable Threshold Bar */}
          <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E2230] pb-3">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                  Alert Sensitivity Filters
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Automated scan for high volume spikes or sharp price swings
                </p>
              </div>
              <span className="self-start sm:self-auto text-[11px] font-mono text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-md border border-amber-500/25">
                Trigger: &ge;{volumeThreshold}x Vol or &ge;±{priceThreshold}% Swing
              </span>
            </div>

            {/* Threshold controls: Fully separated, flex-wrapped, NEVER COLLIDING */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
              {/* Volume Multiplier Pills */}
              <div className="space-y-1.5 min-w-0">
                <span className="text-[11px] font-semibold text-slate-300 block">
                  Volume Surge Threshold (vs 20D Avg):
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {[1.5, 2.0, 2.5, 3.0].map((v) => (
                    <button
                      key={v}
                      onClick={() => setVolumeThreshold(v)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                        volumeThreshold === v
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                          : 'bg-[#181B26] text-slate-300 hover:text-white border border-[#282E40]'
                      }`}
                    >
                      {v}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Swing Threshold Pills */}
              <div className="space-y-1.5 min-w-0">
                <span className="text-[11px] font-semibold text-slate-300 block">
                  Daily Price Swing:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {[2.0, 3.0, 4.0].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriceThreshold(p)}
                      className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all ${
                        priceThreshold === p
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                          : 'bg-[#181B26] text-slate-300 hover:text-white border border-[#282E40]'
                      }`}
                    >
                      &plusmn;{p}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-xs text-slate-400">
            <span className="font-semibold text-slate-300 uppercase tracking-wider">
              Anomalies Triggered ({anomalyStocks.length} Stocks)
            </span>
            <span className="text-slate-400">Portfolio Watchlist</span>
          </div>

          <div className="space-y-3">
            {anomalyStocks.map((stock) => (
              <div
                key={stock.ticker}
                onClick={() => onSelectTicker(stock.ticker)}
                className="bg-[#12141C] hover:bg-[#181B26] border border-[#232736] hover:border-slate-600 rounded-2xl p-4 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm group"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono font-bold text-xs bg-[#1A1D2A] text-slate-200 px-2.5 py-1 rounded-md border border-[#2A3044]">
                      {stock.ticker}
                    </span>
                    <h4 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                      {stock.name}
                    </h4>
                    <span className="text-xs text-slate-400">
                      • {stock.sector}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 pl-0.5">
                    P/E: <strong className="text-slate-200 font-mono">{stock.pe}x</strong> • M-Cap: <strong className="text-slate-200 font-mono">{stock.marketCap}</strong>
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-4 pt-2 sm:pt-0 border-t sm:border-0 border-[#1E2230]">
                  {/* Volume Badge */}
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-mono">Volume Surge</div>
                    <div
                      className={`text-xs font-mono font-bold ${
                        stock.volumeMultiple >= 2.5
                          ? 'text-amber-400 font-extrabold'
                          : stock.volumeMultiple >= 2.0
                          ? 'text-amber-300'
                          : 'text-slate-300'
                      }`}
                    >
                      {stock.volumeMultiple}x avg
                    </div>
                  </div>

                  {/* Price Swing Badge */}
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-mono">Price Swing</div>
                    <div
                      className={`text-xs font-mono font-bold flex items-center justify-end ${
                        stock.isPricePositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {stock.isPricePositive ? (
                        <TrendingUp className="w-3.5 h-3.5 mr-0.5 shrink-0" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 mr-0.5 shrink-0" />
                      )}
                      <span>
                        {stock.isPricePositive ? '+' : ''}
                        {stock.priceDelta}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all hidden sm:block shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: MACRO & COMMODITY PULSE */}
      {subView === 'macro' && (
        <MacroTicker
          activeAnchor={activeAnchor}
          setActiveAnchor={setActiveAnchor}
          onSelectTicker={onSelectTicker}
        />
      )}
    </div>
  );
}
