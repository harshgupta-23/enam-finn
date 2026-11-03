import React, { useState } from 'react';
import { 
  Search, 
  GitBranch, 
  Target, 
  Users, 
  CheckCircle2, 
  FileCheck2, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight
} from 'lucide-react';
import { generateAdHocAnalysis } from '../data/adhocResearch';
import { useView } from '../context/ViewContext';

export default function PullResearch({ portfolio, selectedTicker, onSelectTicker }) {
  const [searchInput, setSearchInput] = useState('');
  const { isMobile } = useView();

  let activeStock = portfolio.find((s) => s.ticker === selectedTicker);
  if (!activeStock) {
    activeStock = generateAdHocAnalysis(selectedTicker || 'LT');
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSelectTicker(searchInput.trim().toUpperCase());
      setSearchInput('');
    }
  };

  const quickTickers = [
    { ticker: 'LT', label: 'L&T (Infra/Steel)' },
    { ticker: 'TATAMOTORS', label: 'Tata Motors (Auto/EV)' },
    { ticker: 'TRENT', label: 'Trent (Retail)' },
    { ticker: 'DIXON', label: 'Dixon (EMS)' },
    { ticker: 'CDSL', label: 'CDSL (Fintech)' },
    { ticker: 'TATASTEEL', label: 'Tata Steel (Metals)' },
    { ticker: 'ZOMATO', label: 'Zomato (Q-Commerce)' },
    { ticker: 'BAJFINANCE', label: 'Bajaj Finance (Ad-hoc)' },
    { ticker: 'BHARTIARTL', label: 'Airtel (Ad-hoc)' },
  ];

  return (
    <div className="space-y-4">
      {/* Search & Quick Selector */}
      <div className="bg-[#0D1322] border border-slate-800/80 rounded-2xl p-4 shadow-card space-y-3.5">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            placeholder="Type any NSE ticker (e.g. LT, TATAMOTORS, DIXON, BAJFINANCE)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-24 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-mono"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
          >
            Research
          </button>
        </form>

        {/* Quick Tickers Carousel */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
          <span className="text-[11px] text-slate-400 font-medium shrink-0 mr-1">Quick Select:</span>
          {quickTickers.map((qt) => (
            <button
              key={qt.ticker}
              onClick={() => onSelectTicker(qt.ticker)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
                activeStock.ticker === qt.ticker
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {qt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Overview Header Card */}
      <div className="bg-[#0D1322] border border-blue-500/30 rounded-2xl p-4 sm:p-5 shadow-card flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">
            {activeStock.ticker}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-base text-white">{activeStock.name}</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {activeStock.exchange || 'NSE'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{activeStock.sector}</p>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <div className="text-right">
            <div className="font-mono font-bold text-base sm:text-lg text-white">
              ₹{activeStock.price ? activeStock.price.toLocaleString('en-IN') : '1,420.00'}
            </div>
            <div className={`font-mono text-xs font-semibold ${activeStock.isPricePositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {activeStock.priceDelta} EOD
            </div>
          </div>
          <div className="hidden sm:block border-l border-slate-800 pl-4 text-xs text-slate-400 space-y-1">
            <div>P/E: <strong className="text-slate-200 font-mono">{activeStock.pe}x</strong></div>
            <div>M-Cap: <strong className="text-slate-200 font-mono">{activeStock.marketCap}</strong></div>
          </div>
        </div>
      </div>

      {/* STEP 1: Core Value Drivers */}
      <div className="bg-[#0D1322] border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-card space-y-3.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Target className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Step 1: Core Value Drivers (What Actually Moves Earnings)
            </h3>
            <p className="text-[11px] text-slate-400">
              The 3 key operating levers that dictate this company's valuation
            </p>
          </div>
        </div>

        <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          {activeStock.valueDrivers.map((vd, i) => (
            <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Lever #{i + 1}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    vd.weight === 'Critical' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {vd.weight} Priority
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-100 leading-snug">{vd.driver}</h4>
              </div>

              <div className="text-xs font-mono text-emerald-400 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                {vd.metric}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 2: Upstream Backtracking */}
      <div className="bg-[#0D1322] border border-indigo-500/30 rounded-2xl p-4 sm:p-5 shadow-card space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-md bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <GitBranch className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Step 2: Upstream Backtracking & Input Commodity Dependencies
              </h3>
              <p className="text-[11px] text-slate-400">
                Tracing raw material costs, budgetary allocations, and upstream pricing ripples
              </p>
            </div>
          </div>
          <span className="text-[11px] text-indigo-300 font-mono hidden sm:inline">
            Supply Chain Ripple
          </span>
        </div>

        <div className="space-y-2.5">
          {activeStock.supplyChain.upstream.map((up, i) => (
            <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs text-slate-100">{up.item}</span>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {up.trend}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {up.note}
                </p>
              </div>

              <div className="shrink-0 flex items-center">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-lg flex items-center space-x-1.5 ${
                  up.impact === 'positive'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : up.impact === 'negative'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {up.impact === 'positive' && <TrendingUp className="w-3.5 h-3.5" />}
                  {up.impact === 'negative' && <TrendingDown className="w-3.5 h-3.5" />}
                  <span className="capitalize">{up.impact} Impact</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 3: Market Layering & Stakeholder Intent */}
      <div className="bg-[#0D1322] border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-card space-y-3.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded-md bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Step 3: Market Layering & Stakeholder Intent
            </h3>
            <p className="text-[11px] text-slate-400">
              Decoding management goals vs institutional capital demands vs valuation reality
            </p>
          </div>
        </div>

        <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          <div className="bg-slate-900/80 border border-purple-500/20 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-purple-300 text-xs font-bold">
              <span>🏛️ Management Intent</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeStock.marketLayering.managementIntent}
            </p>
          </div>

          <div className="bg-slate-900/80 border border-blue-500/20 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-blue-300 text-xs font-bold">
              <span>💼 Institutional / FII Intent</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeStock.marketLayering.institutionalIntent}
            </p>
          </div>

          <div className="bg-slate-900/80 border border-amber-500/20 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold">
              <span>⚡ Valuation Friction</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeStock.marketLayering.marketFriction}
            </p>
          </div>
        </div>
      </div>

      {/* STEP 4: Primary Evidence (Narrative vs. Reality) */}
      <div className="bg-[#0D1322] border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-card space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <FileCheck2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Step 4: Primary Reality Check (Narrative vs. Audited Numbers)
              </h3>
              <p className="text-[11px] text-slate-400">
                Grounding concall claims against audited exchange disclosures
              </p>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
            activeStock.narrativeVsNumbers.verdictSeverity === 'positive'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
          }`}>
            Verdict: {activeStock.narrativeVsNumbers.verdict}
          </span>
        </div>

        <div className={`grid gap-3 pt-1 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
              Primary Source: Concall Guidance & Management Promise
            </span>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "{activeStock.narrativeVsNumbers.concallPromise}"
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
              Primary Source: Audited Financial Results Delivery
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {activeStock.narrativeVsNumbers.actualDelivery}
            </p>
          </div>
        </div>

        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3 flex items-start space-x-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-300 leading-relaxed">
            <strong className="text-emerald-200">Cash Flow Reality Check: </strong>{activeStock.narrativeVsNumbers.fcfCheck}
          </p>
        </div>
      </div>

      {/* STEP 5: Fact-Grounded Bull vs. Bear Case */}
      <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        <div className="bg-[#0D1322] border border-emerald-500/20 rounded-2xl p-4 sm:p-5 shadow-card space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
            <TrendingUp className="w-4 h-4" />
            <span className="uppercase tracking-wide">Primary Bull Thesis (3 Points)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {activeStock.bullVsBear.bull.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#0D1322] border border-rose-500/20 rounded-2xl p-4 sm:p-5 shadow-card space-y-3">
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold">
            <TrendingDown className="w-4 h-4" />
            <span className="uppercase tracking-wide">Primary Risk & Bear Thesis (3 Points)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {activeStock.bullVsBear.bear.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
