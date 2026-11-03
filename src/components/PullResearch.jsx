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
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { generateAdHocAnalysis } from '../data/adhocResearch';
import { useView } from '../context/ViewContext';

export default function PullResearch({ portfolio, selectedTicker, onSelectTicker }) {
  const { isMobile } = useView();
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
      .catch(() => {
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

  // Grouped Quick Search Categories (Streamlined & Intuitive)
  const quickCategories = [
    {
      group: '⚡ Growth & Consumer',
      stocks: [
        { ticker: 'ZOMATO', label: 'Zomato' },
        { ticker: 'TRENT', label: 'Trent' },
        { ticker: 'DIXON', label: 'Dixon' }
      ]
    },
    {
      group: '🏗️ Capex & Industrial',
      stocks: [
        { ticker: 'LT', label: 'L&T' },
        { ticker: 'TATAMOTORS', label: 'Tata Motors' },
        { ticker: 'TATASTEEL', label: 'Tata Steel' }
      ]
    },
    {
      group: '🏦 Financials & Monopolies',
      stocks: [
        { ticker: 'CDSL', label: 'CDSL' },
        { ticker: 'BAJFINANCE', label: 'Bajaj Finance' }
      ]
    }
  ];

  // Helper for Priority Color Tint (Replaces circle dots with rich ambient tile tint)
  const getPriorityTheme = (weight) => {
    if (weight === 'Critical') {
      return {
        cardClass: 'bg-rose-950/20 border-rose-500/40 text-rose-100',
        badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        metricClass: 'bg-rose-950/40 text-rose-200 border-rose-500/30',
        label: 'Critical Lever'
      };
    }
    if (weight === 'High') {
      return {
        cardClass: 'bg-amber-950/20 border-amber-500/40 text-amber-100',
        badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        metricClass: 'bg-amber-950/40 text-amber-200 border-amber-500/30',
        label: 'High Priority'
      };
    }
    return {
      cardClass: 'bg-blue-950/20 border-blue-500/40 text-blue-100',
      badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      metricClass: 'bg-blue-950/40 text-blue-200 border-blue-500/30',
      label: 'Core Driver'
    };
  };

  return (
    <div className="space-y-4">
      {/* Search Input & Streamlined Quick Search Pills */}
      <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
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
            className="absolute right-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors"
          >
            Research
          </button>
        </form>

        {/* Grouped Quick Select Categories */}
        <div className="space-y-2 pt-1 border-t border-[#1E2230]">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick Stock X-Ray:
          </div>

          <div className="flex flex-wrap gap-3">
            {quickCategories.map((cat, idx) => (
              <div key={idx} className="flex items-center space-x-1.5 bg-[#171A24] border border-[#252A3C] rounded-xl p-1.5">
                <span className="text-[10px] text-slate-400 font-medium px-1.5 hidden sm:inline">
                  {cat.group}
                </span>
                <div className="flex items-center space-x-1">
                  {cat.stocks.map((st) => (
                    <button
                      key={st.ticker}
                      onClick={() => onSelectTicker(st.ticker)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                        activeStock.ticker === st.ticker
                          ? 'bg-white text-slate-900 font-bold shadow-sm'
                          : 'bg-[#1C202E] text-slate-300 hover:text-white hover:bg-[#252B3E]'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Overview Header */}
      <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-bold text-xs bg-[#1A1D2A] text-slate-200 px-2.5 py-1 rounded-md border border-[#2A3044]">
              {activeStock.ticker}
            </span>
            <h2 className="font-bold text-base sm:text-lg text-white tracking-tight">
              {activeStock.name}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {activeStock.exchange || 'NSE'}
            </span>
            {liveData?.fromCache && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ⚡ Cached
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
                <span>Concall Transcript</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </p>
        </div>

        <div className="flex items-center space-x-5">
          <div className="text-right">
            <div className="font-mono font-bold text-base sm:text-lg text-white">
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

      {/* Customer-Friendly Research Subtabs */}
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
            <Target className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Growth Levers</span>
          </button>

          <button
            onClick={() => setActiveResearchTab('supply')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeResearchTab === 'supply'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Cost Chain & Inputs</span>
          </button>

          <button
            onClick={() => setActiveResearchTab('reality')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeResearchTab === 'reality'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Did Management Deliver?</span>
          </button>

          <button
            onClick={() => setActiveResearchTab('bullbear')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeResearchTab === 'bullbear'
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Upside vs Risks</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: GROWTH LEVERS (COLOR-TINTED TILES - NO CIRCLES) */}
      {activeResearchTab === 'drivers' && (
        <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Core Growth Levers (What Actually Drives Valuation)
            </h3>
            <p className="text-xs text-slate-400">
              The pivotal operating metrics that dictate {activeStock.name}'s revenue and margins:
            </p>
          </div>

          {/* Color-Tinted Tiles (Replaces tiny circles with full background aura) */}
          <div className={`grid gap-3.5 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            {activeStock.valueDrivers.map((vd, i) => {
              const theme = getPriorityTheme(vd.weight);
              return (
                <div
                  key={i}
                  className={`border rounded-xl p-4 space-y-3 flex flex-col justify-between shadow-sm transition-all ${theme.cardClass}`}
                >
                  <div className="space-y-2">
                    {/* Header: Lever Number + Priority Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-300 font-semibold">
                        Lever #{i + 1}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${theme.badgeClass}`}>
                        {theme.label}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {vd.driver}
                    </h4>
                  </div>

                  {/* Highlighting Metric Box */}
                  <div className={`text-xs font-mono p-3 rounded-lg border leading-relaxed ${theme.metricClass}`}>
                    {vd.metric}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Market Layering (Color-Tinted Theme Boxes) */}
          <div className="pt-3 border-t border-[#1E2230] space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Market Layering & Player Intent
            </h4>

            <div className={`grid gap-3.5 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
              {/* Management Intent: Tinted Purple */}
              <div className="bg-purple-950/25 border border-purple-500/40 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-purple-300 flex items-center space-x-1.5">
                  <span>🏛️</span>
                  <span>Management Intent</span>
                </span>
                <p className="text-xs text-purple-100/90 leading-relaxed pt-1">
                  {activeStock.marketLayering.managementIntent}
                </p>
              </div>

              {/* Institutional Intent: Tinted Blue */}
              <div className="bg-blue-950/25 border border-blue-500/40 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-blue-300 flex items-center space-x-1.5">
                  <span>💼</span>
                  <span>Institutional Intent</span>
                </span>
                <p className="text-xs text-blue-100/90 leading-relaxed pt-1">
                  {activeStock.marketLayering.institutionalIntent}
                </p>
              </div>

              {/* Valuation Friction: Tinted Amber */}
              <div className="bg-amber-950/25 border border-amber-500/40 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-amber-300 flex items-center space-x-1.5">
                  <span>⚡</span>
                  <span>Valuation Friction</span>
                </span>
                <p className="text-xs text-amber-100/90 leading-relaxed pt-1">
                  {activeStock.marketLayering.marketFriction}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: COST CHAIN & INPUTS */}
      {activeResearchTab === 'supply' && (
        <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Raw Materials & Upstream Cost Backtracking
            </h3>
            <p className="text-xs text-slate-400">
              Tracing commodity cost shifts and pricing power back to primary suppliers:
            </p>
          </div>

          <div className="space-y-3">
            {activeStock.supplyChain.upstream.map((up, i) => {
              const isPos = up.impact === 'positive';
              return (
                <div
                  key={i}
                  className={`border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isPos
                      ? 'bg-emerald-950/20 border-emerald-500/35'
                      : 'bg-rose-950/20 border-rose-500/35'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-white">{up.item}</span>
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#10131B] text-slate-200 border border-[#242A3C]">
                        {up.trend}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {up.note}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-lg flex items-center space-x-1.5 ${
                      isPos
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}>
                      {isPos ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      <span className="capitalize">{up.impact} Margin Impact</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: DID MANAGEMENT DELIVER? */}
      {activeResearchTab === 'reality' && (
        <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E2230] pb-3">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Audited Numbers vs Concall Promises
              </h3>
              <p className="text-xs text-slate-400">
                Holding executive guidance accountable against audited BSE/NSE disclosures
              </p>
            </div>

            <span className={`self-start sm:self-auto px-3 py-1 rounded-lg text-xs font-bold ${
              activeStock.narrativeVsNumbers.verdictSeverity === 'positive'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}>
              Delivery Verdict: {activeStock.narrativeVsNumbers.verdict}
            </span>
          </div>

          <div className={`grid gap-3.5 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {/* Guidance Promise Tile (Blue Tinted) */}
            <div className="bg-blue-950/25 border border-blue-500/35 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wide">
                Primary Source: Concall Guidance Promise
              </span>
              <p className="text-xs text-blue-100/90 italic leading-relaxed">
                "{activeStock.narrativeVsNumbers.concallPromise}"
              </p>
            </div>

            {/* Audited Financial Delivery (Emerald Tinted) */}
            <div className="bg-emerald-950/25 border border-emerald-500/35 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                Primary Source: Audited Financial Delivery
              </span>
              <p className="text-xs text-emerald-100/95 leading-relaxed font-medium">
                {activeStock.narrativeVsNumbers.actualDelivery}
              </p>
            </div>
          </div>

          {/* Cash Flow Reality Check */}
          <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-3.5 flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-100 leading-relaxed">
              <strong className="text-emerald-300">Cash Flow Reality Check: </strong>
              {activeStock.narrativeVsNumbers.fcfCheck}
            </p>
          </div>
        </div>
      )}

      {/* SECTION 4: UPSIDE VS RISKS (BULL VS BEAR) */}
      {activeResearchTab === 'bullbear' && (
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {/* Bull Thesis: Emerald Tinted Tile */}
          <div className="bg-emerald-950/25 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold border-b border-emerald-500/30 pb-2.5">
              <TrendingUp className="w-4 h-4" />
              <span className="uppercase tracking-wide">Primary Bull Thesis</span>
            </div>
            <ul className="space-y-2.5 text-xs text-emerald-100/90">
              {activeStock.bullVsBear.bull.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bear Thesis: Rose Tinted Tile */}
          <div className="bg-rose-950/25 border border-rose-500/40 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-rose-300 text-xs font-bold border-b border-rose-500/30 pb-2.5">
              <TrendingDown className="w-4 h-4" />
              <span className="uppercase tracking-wide">Primary Bear Thesis & Key Risks</span>
            </div>
            <ul className="space-y-2.5 text-xs text-rose-100/90">
              {activeStock.bullVsBear.bear.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">⚠</span>
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
