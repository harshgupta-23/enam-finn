import React, { useState } from 'react';
import { 
  Search, 
  GitBranch, 
  Target, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck2, 
  TrendingUp, 
  TrendingDown, 
  Compass, 
  ShieldAlert, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { generateAdHocAnalysis } from '../data/adhocResearch';

export default function PullResearch({ portfolio, selectedTicker, onSelectTicker }) {
  const [searchInput, setSearchInput] = useState('');

  // Find stock in portfolio or generate dynamic ad-hoc analysis
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
    { ticker: 'TATASTEEL', label: 'Tata Steel (Upstream)' },
    { ticker: 'ZOMATO', label: 'Zomato (Q-Commerce)' },
    { ticker: 'BAJFINANCE', label: 'Bajaj Fin (Ad-hoc)' },
    { ticker: 'BHARTIARTL', label: 'Airtel (Ad-hoc)' },
  ];

  return (
    <div className="space-y-4">
      {/* Search & Quick Selector Bar */}
      <div className="bg-[#101626] border border-slate-800 rounded-2xl p-3.5 space-y-3">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            placeholder="Enter any NSE ticker to research (e.g. LT, TATAMOTORS, DIXON, BAJFINANCE)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-24 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-mono"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
          >
            Research
          </button>
        </form>

        {/* Quick Ticker Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          <span className="text-[11px] text-slate-400 font-medium shrink-0 mr-1">Quick Select:</span>
          {quickTickers.map((qt) => (
            <button
              key={qt.ticker}
              onClick={() => onSelectTicker(qt.ticker)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
                activeStock.ticker === qt.ticker
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {qt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Overview Header */}
      <div className="bg-[#101728] border border-blue-500/30 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shadow-md">
            {activeStock.ticker}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-base text-white">{activeStock.name}</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {activeStock.exchange || 'NSE'}
              </span>
            </div>
            <p className="text-xs text-slate-400">{activeStock.sector}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="font-mono font-bold text-base text-white">
              ₹{activeStock.price ? activeStock.price.toLocaleString('en-IN') : '1,420.00'}
            </div>
            <div className={`font-mono text-xs font-semibold ${activeStock.isPricePositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {activeStock.priceDelta} EOD
            </div>
          </div>
          <div className="hidden sm:block border-l border-slate-800 pl-4 text-xs text-slate-400 space-y-0.5">
            <div>P/E: <strong className="text-slate-200 font-mono">{activeStock.pe}x</strong></div>
            <div>M-Cap: <strong className="text-slate-200 font-mono">{activeStock.marketCap}</strong></div>
          </div>
        </div>
      </div>

      {/* STEP 1: The Core Value Drivers ("First decide what points matter") */}
      <div className="bg-[#101626] border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Step 1: Core Value Drivers (What Actually Moves This Stock)
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Filtered down from hundreds of metrics to the 3 pivotal operating levers that dictate earnings growth:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {activeStock.valueDrivers.map((vd, i) => (
            <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Lever #{i + 1}
                </span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                  vd.weight === 'Critical' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-300'
                }`}>
                  {vd.weight} Priority
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-200 leading-snug">{vd.driver}</h4>
              <p className="text-xs font-mono text-emerald-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                {vd.metric}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 2: Upstream Backtracking & Supply Chain Links ("Like for construction, steel can be looked") */}
      <div className="bg-[#101626] border border-indigo-500/30 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GitBranch className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Step 2: Upstream Backtracking & Input Commodity Dependencies
            </h3>
          </div>
          <span className="text-[11px] text-indigo-300 font-mono">
            Supply Chain Ripple
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Backtracking to upstream raw material suppliers, government budgetary policy, and input commodity trends:
        </p>

        <div className="space-y-2.5">
          {activeStock.supplyChain.upstream.map((up, i) => (
            <div key={i} className="bg-slate-900/80 border border-slate-800/90 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs text-slate-200">{up.item}</span>
                  <span className="font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {up.trend}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {up.note}
                </p>
              </div>

              <div className="shrink-0 flex items-center space-x-1.5">
                <span className={`text-xs font-medium px-2 py-1 rounded-lg flex items-center space-x-1 ${
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

      {/* STEP 3: Player Intent & Market Layering ("What major people want and how they shape each layer") */}
      <div className="bg-[#101626] border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-purple-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Step 3: Market Layering & Stakeholder Intent
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Deciphering how management incentives, institutional capital flows, and economic friction shape current valuation:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-900/90 border border-purple-500/20 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center space-x-2 text-purple-300 text-xs font-bold">
              <span>🏛️ Management Intent</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeStock.marketLayering.managementIntent}
            </p>
          </div>

          <div className="bg-slate-900/90 border border-blue-500/20 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center space-x-2 text-blue-300 text-xs font-bold">
              <span>💼 Institutional / FII Intent</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeStock.marketLayering.institutionalIntent}
            </p>
          </div>

          <div className="bg-slate-900/90 border border-amber-500/20 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold">
              <span>⚡ Valuation Friction & Reality</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeStock.marketLayering.marketFriction}
            </p>
          </div>
        </div>
      </div>

      {/* STEP 4: Primary Evidence (Narrative vs. Numbers - Brief Highlight) */}
      <div className="bg-[#101728] border border-emerald-500/30 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Step 4: Primary Reality Check (Narrative vs. Audited Numbers)
            </h3>
          </div>
          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
            activeStock.narrativeVsNumbers.verdictSeverity === 'positive'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}>
            Verdict: {activeStock.narrativeVsNumbers.verdict}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
              Primary Source: Concall Guidance & Management Promise
            </span>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "{activeStock.narrativeVsNumbers.concallPromise}"
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
              Primary Source: Audited Financial Results Delivery
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {activeStock.narrativeVsNumbers.actualDelivery}
            </p>
          </div>
        </div>

        {/* Free Cash Flow / Cash Quality sanity check */}
        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-2.5 flex items-start space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-300 leading-relaxed">
            <strong>Cash Flow Reality Check: </strong>{activeStock.narrativeVsNumbers.fcfCheck}
          </p>
        </div>
      </div>

      {/* STEP 5: Fact-Grounded Bull vs. Bear Case */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-[#101626] border border-emerald-500/20 rounded-2xl p-4 space-y-2.5">
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

        <div className="bg-[#101626] border border-rose-500/20 rounded-2xl p-4 space-y-2.5">
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
