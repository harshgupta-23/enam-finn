import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  RotateCcw, 
  ArrowUpRight, 
  Briefcase, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Layers, 
  Building2 
} from 'lucide-react';

export default function PortfolioView({ 
  portfolio, 
  onAddStock, 
  onRemoveStock, 
  onResetPortfolio, 
  onSelectTicker 
}) {
  const [tickerInput, setTickerInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const popularSuggestions = [
    { ticker: 'INFY', name: 'Infosys' },
    { ticker: 'ITC', name: 'ITC' },
    { ticker: 'BEL', name: 'Bharat Electronics' },
    { ticker: 'SBIN', name: 'SBI' },
    { ticker: 'DMART', name: 'Avenue Supermarts' }
  ];

  const handleAdd = (tickerToAdd) => {
    const cleanTicker = (tickerToAdd || tickerInput).trim().toUpperCase().replace('.NS', '').replace('.BO', '');
    if (!cleanTicker) return;

    if (portfolio.some((s) => s.ticker === cleanTicker)) {
      setErrorMsg(`${cleanTicker} is already in your portfolio!`);
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }

    onAddStock(cleanTicker);
    setTickerInput('');
    setErrorMsg('');
  };

  // Compute portfolio coverage stats
  const uniqueSectors = new Set(portfolio.map((s) => s.sector)).size;
  const anomalyCount = portfolio.filter((s) => s.volumeMultiple >= 2.0 || Math.abs(parseFloat(s.priceDelta)) >= 3.0).length;

  return (
    <div className="space-y-4">
      {/* 1. Portfolio Header & Stats Bar */}
      <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E2230] pb-3">
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm text-white tracking-tight flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span>Tracked Portfolio & Watchlist</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Live companies monitored by FINN for earnings releases, leadership shifts, and sudden volume spikes.
            </p>
          </div>

          <button
            onClick={onResetPortfolio}
            className="self-start sm:self-auto text-xs text-blue-400 hover:text-white flex items-center space-x-1 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default (16)</span>
          </button>
        </div>

        {/* 3 Executive Stat Tiles */}
        <div className="grid grid-cols-3 gap-2.5 pt-0.5">
          <div className="bg-[#171B26] border border-[#252A3C] rounded-xl p-3 text-center">
            <div className="text-[10px] text-slate-400 font-mono uppercase">Tracked</div>
            <div className="text-base sm:text-lg font-bold font-mono text-white mt-0.5">
              {portfolio.length}
            </div>
            <div className="text-[10px] text-slate-500">Companies</div>
          </div>

          <div className="bg-[#171B26] border border-[#252A3C] rounded-xl p-3 text-center">
            <div className="text-[10px] text-slate-400 font-mono uppercase">Sectors</div>
            <div className="text-base sm:text-lg font-bold font-mono text-blue-400 mt-0.5">
              {uniqueSectors}
            </div>
            <div className="text-[10px] text-slate-500">Categories</div>
          </div>

          <div className="bg-[#171B26] border border-[#252A3C] rounded-xl p-3 text-center">
            <div className="text-[10px] text-slate-400 font-mono uppercase">Anomalies</div>
            <div className="text-base sm:text-lg font-bold font-mono text-amber-400 mt-0.5">
              {anomalyCount}
            </div>
            <div className="text-[10px] text-slate-500">High Volume</div>
          </div>
        </div>
      </div>

      {/* 2. Add Stock Input & Quick Suggestions */}
      <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Add any NSE Ticker (e.g. INFY, ITC, BEL, SBIN)..."
            value={tickerInput}
            onChange={(e) => {
              setTickerInput(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            className="flex-1 bg-[#181D2B] border border-[#262D42] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500 transition-colors uppercase"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Stock</span>
          </button>
        </form>

        {errorMsg && (
          <p className="text-xs text-rose-400 flex items-center space-x-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMsg}</span>
          </p>
        )}

        {/* Quick Add Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-400 mr-1">Quick Add:</span>
          {popularSuggestions.map((sug) => {
            const alreadyAdded = portfolio.some((s) => s.ticker === sug.ticker);
            if (alreadyAdded) return null;
            return (
              <button
                key={sug.ticker}
                type="button"
                onClick={() => handleAdd(sug.ticker)}
                className="px-2.5 py-1 rounded-lg bg-[#181D2B] hover:bg-[#20273A] border border-[#273046] text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center space-x-1"
              >
                <Plus className="w-3 h-3 text-blue-400" />
                <span>{sug.ticker}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Tracked Stocks List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 text-xs text-slate-400">
          <span className="font-semibold text-slate-300 uppercase tracking-wider">
            All Tracked Companies ({portfolio.length})
          </span>
          <span>Tap X-Ray to deep dive</span>
        </div>

        <div className="space-y-2.5">
          {portfolio.map((stock) => (
            <div
              key={stock.ticker}
              className="bg-[#12141C] border border-[#232736] hover:border-slate-600 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm transition-all group"
            >
              {/* Left: Stock info */}
              <div className="space-y-1 min-w-0">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono font-bold text-xs bg-[#1A1D2A] text-slate-200 px-2.5 py-1 rounded-md border border-[#2A3044]">
                    {stock.ticker}
                  </span>
                  <h4 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors truncate">
                    {stock.name}
                  </h4>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    • {stock.sector}
                  </span>
                </div>
                <p className="text-xs text-slate-400 pl-0.5">
                  P/E: <strong className="text-slate-200 font-mono">{stock.pe}x</strong> • M-Cap: <strong className="text-slate-200 font-mono">{stock.marketCap}</strong>
                </p>
              </div>

              {/* Right: Price + Actions */}
              <div className="flex items-center justify-between sm:justify-end space-x-3 pt-2 sm:pt-0 border-t sm:border-0 border-[#1E2230]">
                {/* Price & Delta */}
                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-white">
                    ₹{stock.price ? stock.price.toLocaleString('en-IN') : '1,420'}
                  </div>
                  <div
                    className={`text-[11px] font-mono font-semibold flex items-center justify-end ${
                      stock.isPricePositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {stock.isPricePositive ? (
                      <TrendingUp className="w-3 h-3 mr-0.5 shrink-0" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-0.5 shrink-0" />
                    )}
                    <span>
                      {stock.isPricePositive ? '+' : ''}
                      {stock.priceDelta}
                    </span>
                  </div>
                </div>

                {/* Inspect in X-Ray Button */}
                <button
                  onClick={() => onSelectTicker(stock.ticker)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-900 text-xs font-semibold flex items-center space-x-1 shadow-sm shrink-0 transition-all"
                >
                  <span>X-Ray</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {/* Remove from Portfolio Button */}
                <button
                  onClick={() => onRemoveStock(stock.ticker)}
                  title={`Remove ${stock.ticker} from portfolio`}
                  className="p-2 rounded-xl bg-[#171B26] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-[#272F44] hover:border-rose-500/30 transition-all shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
