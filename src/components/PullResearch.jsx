import React, { useState, useEffect } from 'react';
import { 
  Search, 
  GitBranch, 
  Target, 
  Users, 
  CheckCircle2, 
  FileCheck2, 
  TrendingUp, 
  TrendingDown, 
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { generateAdHocAnalysis } from '../data/adhocResearch';

export default function PullResearch({ portfolio, selectedTicker, onSelectTicker }) {
  const [searchInput, setSearchInput] = useState('');
  const [activeResearchTab, setActiveResearchTab] = useState('drivers'); // 'drivers', 'supply', 'reality', 'bullbear'
  const [liveData, setLiveData] = useState(null);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  // Default to local pre-seeded data for instant 0ms load
  let baseStock = portfolio.find((s) => s.ticker === selectedTicker);
  if (!baseStock) {
    baseStock = generateAdHocAnalysis(selectedTicker || 'LT');
  }

  // Active displayed stock merges baseStock with any live backend updates
  const activeStock = liveData || baseStock;

  // On ticker change, optionally fetch live data from backend with caching
  useEffect(() => {
    let isMounted = true;
    setLiveData(null);
    setIsLoadingLive(true);

    fetch('/api/research', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker: selectedTicker })
    })
      .then((res) => res.json())
      .then((json) => {
        if (isMounted && json.success && json.data) {
          setLiveData((prev) => ({
            ...baseStock,
            ...json.data
          }));
        }
      })
      .catch((err) => {
        // Graceful fallback to pre-seeded data if server is offline
      })
      .finally(() => {
        if (isMounted) setIsLoadingLive(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedTicker]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSelectTicker(searchInput.trim().toUpperCase());
      setSearchInput('');
    }
  };

  const quickTickers = [
    { ticker: 'LT', label: 'L&T (Infra)' },
    { ticker: 'TATAMOTORS', label: 'Tata Motors (Auto)' },
    { ticker: 'TRENT', label: 'Trent (Retail)' },
    { ticker: 'DIXON', label: 'Dixon (EMS)' },
    { ticker: 'CDSL', label: 'CDSL (Fintech)' },
    { ticker: 'TATASTEEL', label: 'Tata Steel (Metals)' },
    { ticker: 'ZOMATO', label: 'Zomato (Tech)' },
    { ticker: 'BAJFINANCE', label: 'Bajaj Finance' },
  ];

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 shadow-sm space-y-3">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            placeholder="Search any NSE stock (e.g. LT, TATAMOTORS, DIXON, BAJFINANCE)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-[#181B26] border border-[#282E40] rounded-xl pl-10 pr-24 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors font-mono"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors"
          >
            Research
          </button>
        </form>

        {/* Quick Tickers */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
          <span className="text-[11px] text-slate-400 font-medium shrink-0 mr-1">Quick Select:</span>
          {quickTickers.map((qt) => (
            <button
              key={qt.ticker}
              onClick={() => onSelectTicker(qt.ticker)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
                activeStock.ticker === qt.ticker
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'bg-[#181B26] text-slate-300 hover:text-white border border-[#282E40]'
              }`}
            >
              {qt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Overview Header */}
      <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-bold text-xs bg-[#1A1D2A] text-slate-200 px-2.5 py-1 rounded-md border border-[#2A3044]">
              {activeStock.ticker}
            </span>
            <h2 className="font-bold text-lg text-white tracking-tight">
              {activeStock.name}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {activeStock.exchange || 'NSE'}
            </span>
            {liveData?.fromCache && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ⚡ Cached (0ms / $0)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 flex items-center space-x-2">
            <span>{activeStock.sector}</span>
            {activeStock.fundamentals?.concallLink && (
              <a
                href={activeStock.fundamentals.concallLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline flex items-center space-x-1"
              >
                <span>Primary Concall Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </p>
        </div>

        <div className="flex items-center space-x-5">
          <div className="text-right">
            <div className="font-mono font-bold text-lg text-white">
              ₹{activeStock.price ? activeStock.price.toLocaleString('en-IN') : '1,420.00'}
            </div>
            <div className={`font-mono text-xs font-semibold ${activeStock.isPricePositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {activeStock.isPricePositive ? '+' : ''}{activeStock.priceDelta} EOD
            </div>
          </div>
          <div className="hidden sm:block border-l border-[#24293A] pl-4 text-xs text-slate-400 space-y-1">
            <div>P/E: <strong className="text-white font-mono">{activeStock.pe}x</strong></div>
            <div>M-Cap: <strong className="text-white font-mono">{activeStock.marketCap}</strong></div>
          </div>
        </div>
      </div>

      {/* Research View Switcher Tabs */}
      <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-2 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs font-medium">
          <button
            onClick={() => setActiveResearchTab('drivers')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeResearchTab === 'drivers'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Value Drivers</span>
          </button>

          <button
            onClick={() => setActiveResearchTab('supply')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeResearchTab === 'supply'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Supply Chain</span>
          </button>

          <button
            onClick={() => setActiveResearchTab('reality')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeResearchTab === 'reality'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Promise vs Reality</span>
          </button>

          <button
            onClick={() => setActiveResearchTab('bullbear')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeResearchTab === 'bullbear'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Bull vs Bear</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: VALUE DRIVERS */}
      {activeResearchTab === 'drivers' && (
        <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Core Value Drivers (What Actually Moves Earnings)
            </h3>
            <p className="text-xs text-slate-400">
              The 3 pivotal operating levers that dictate {activeStock.name}'s valuation:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeStock.valueDrivers.map((vd, i) => (
              <div key={i} className="bg-[#171A24] border border-[#252A3C] rounded-xl p-4 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#202534] text-slate-300">
                      Lever #{i + 1}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      vd.weight === 'Critical' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-[#202534] text-slate-300'
                    }`}>
                      {vd.weight} Priority
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">{vd.driver}</h4>
                </div>

                <div className="text-xs font-mono text-emerald-400 bg-[#11131B] p-3 rounded-lg border border-[#222636]">
                  {vd.metric}
                </div>
              </div>
            ))}
          </div>

          {/* Market Layering */}
          <div className="pt-2 border-t border-[#1E2230] space-y-2.5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Market Layering & Stakeholder Intent
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-[#171A24] border border-[#252A3C] rounded-xl p-3.5 space-y-1.5">
                <span className="text-xs font-bold text-purple-300">🏛️ Management Intent</span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeStock.marketLayering.managementIntent}</p>
              </div>
              <div className="bg-[#171A24] border border-[#252A3C] rounded-xl p-3.5 space-y-1.5">
                <span className="text-xs font-bold text-blue-300">💼 Institutional Intent</span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeStock.marketLayering.institutionalIntent}</p>
              </div>
              <div className="bg-[#171A24] border border-[#252A3C] rounded-xl p-3.5 space-y-1.5">
                <span className="text-xs font-bold text-amber-300">⚡ Valuation Friction</span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeStock.marketLayering.marketFriction}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: SUPPLY CHAIN BACKTRACKING */}
      {activeResearchTab === 'supply' && (
        <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Upstream Supply Chain & Input Commodity Backtracking
            </h3>
            <p className="text-xs text-slate-400">
              Tracing raw material costs, budgetary allocations, and upstream pricing ripples:
            </p>
          </div>

          <div className="space-y-3">
            {activeStock.supplyChain.upstream.map((up, i) => (
              <div key={i} className="bg-[#171A24] border border-[#252A3C] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white">{up.item}</span>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#202534] text-slate-300">
                      {up.trend}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {up.note}
                  </p>
                </div>

                <div className="shrink-0 flex items-center">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-lg flex items-center space-x-1.5 ${
                    up.impact === 'positive'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : up.impact === 'negative'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-[#202534] text-slate-300'
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
      )}

      {/* SECTION 3: PROMISE VS REALITY */}
      {activeResearchTab === 'reality' && (
        <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E2230] pb-3">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Narrative vs. Audited Numbers (Promise vs Delivery)
              </h3>
              <p className="text-xs text-slate-400">
                Grounding concall claims against audited exchange disclosures
              </p>
            </div>

            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
              activeStock.narrativeVsNumbers.verdictSeverity === 'positive'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
            }`}>
              Verdict: {activeStock.narrativeVsNumbers.verdict}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="bg-[#171A24] border border-[#252A3C] rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Primary Source: Concall Guidance Promise
              </span>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "{activeStock.narrativeVsNumbers.concallPromise}"
              </p>
            </div>

            <div className="bg-[#171A24] border border-[#252A3C] rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Primary Source: Audited Financial Delivery
              </span>
              <p className="text-xs text-slate-100 leading-relaxed font-medium">
                {activeStock.narrativeVsNumbers.actualDelivery}
              </p>
            </div>
          </div>

          <div className="bg-[#171A24] border border-[#252A3C] rounded-xl p-3.5 flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-200 leading-relaxed">
              <strong className="text-emerald-400">Cash Flow Reality Check: </strong>
              {activeStock.narrativeVsNumbers.fcfCheck}
            </p>
          </div>
        </div>
      )}

      {/* SECTION 4: BULL VS BEAR */}
      {activeResearchTab === 'bullbear' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
              <TrendingUp className="w-4 h-4" />
              <span className="uppercase tracking-wide">Primary Bull Thesis</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {activeStock.bullVsBear.bull.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold">
              <TrendingDown className="w-4 h-4" />
              <span className="uppercase tracking-wide">Primary Risk & Bear Thesis</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {activeStock.bullVsBear.bear.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
