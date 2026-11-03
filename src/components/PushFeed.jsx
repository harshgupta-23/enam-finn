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

export default function PushFeed({ portfolio, onSelectTicker, activeAnchor, setActiveAnchor }) {
  // Sub-tabs to avoid throwing everything at once on one screen
  const [subView, setSubView] = useState('filings'); // 'filings', 'anomalies', 'macro'
  const [showNoiseDrawer, setShowNoiseDrawer] = useState(false);

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

  const anomalyStocks = portfolio.filter(
    (s) => s.volumeMultiple >= 2.0 || Math.abs(parseFloat(s.priceDelta)) >= 3.0
  );

  const materialFilings = allFilings.filter((f) => f.priority === 'high' || f.priority === 'medium');
  const routineFilings = allFilings.filter((f) => f.priority === 'low');

  return (
    <div className="space-y-4">
      {/* Focused Navigation Pills: Allows the user to view one topic at a time */}
      <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-2 shadow-sm">
        <div className="grid grid-cols-3 gap-1.5 text-xs font-medium">
          <button
            onClick={() => setSubView('filings')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              subView === 'filings'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="truncate">Results & Filings ({materialFilings.length})</span>
          </button>

          <button
            onClick={() => setSubView('anomalies')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              subView === 'anomalies'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="truncate">Anomalies ({anomalyStocks.length})</span>
          </button>

          <button
            onClick={() => setSubView('macro')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              subView === 'macro'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="truncate">Macro & Supply Chain</span>
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
            <span>Since {activeAnchor.timestamp}</span>
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
                  className="bg-[#12141C] border border-[#232736] rounded-2xl p-5 shadow-sm space-y-3.5 transition-all"
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
                      <span>Deep Dive</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed bg-[#171A24] border border-[#262B3C] p-3.5 rounded-xl">
                    {item.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Noise Reduction Collapsible Drawer */}
          <div className="bg-[#0F1118] border border-[#212534] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <EyeOff className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-xs font-bold text-slate-200">
                    Noise Reduction Filter
                  </span>
                  <p className="text-[11px] text-slate-400">
                    {routineFilings.length} routine compliance filings hidden (ESOPs, registrar notices, newspaper ads)
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

      {/* VIEW 2: MARKET ANOMALIES (CLEAN, SPACIOUS LIST) */}
      {subView === 'anomalies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1 text-xs text-slate-400">
            <span className="font-semibold text-slate-300 uppercase tracking-wider">
              Volume & Price Movements Beyond Threshold
            </span>
            <span className="font-mono text-amber-400">&gt; 2.0x Vol / ±3% Price</span>
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
                  <div className="text-left sm:text-right">
                    <div className="font-mono font-bold text-sm text-white">
                      ₹{stock.price.toLocaleString('en-IN')}
                    </div>
                    <div className={`font-mono text-xs font-semibold ${stock.isPricePositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {stock.isPricePositive ? '+' : ''}{stock.priceDelta}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                      {stock.volumeMultiple}x Vol
                    </span>
                    <span className="text-slate-400 group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: MACRO & SUPPLY CHAIN */}
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
