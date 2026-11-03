import React, { useState } from 'react';
import { X, Plus, Trash2, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { PORTFOLIO_STOCKS } from '../data/portfolio';
import { generateAdHocAnalysis } from '../data/adhocResearch';

export default function PortfolioModal({ isOpen, onClose, portfolio, onAddStock, onRemoveStock, onResetPortfolio }) {
  const [tickerInput, setTickerInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const popularSuggestions = [
    { ticker: 'INFY', name: 'Infosys Ltd', sector: 'IT Services' },
    { ticker: 'ITC', name: 'ITC Ltd', sector: 'FMCG & Hotels' },
    { ticker: 'BEL', name: 'Bharat Electronics', sector: 'Defense Electronics' },
    { ticker: 'SBIN', name: 'State Bank of India', sector: 'PSU Banking' },
    { ticker: 'DMART', name: 'Avenue Supermarts', sector: 'Consumer Retail' }
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#0E111A] border border-[#23293C] rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#1E2333] flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                💼
              </div>
              <h3 className="font-bold text-base text-white tracking-tight">
                Manage Tracked Portfolio
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Active watchlist monitored by Morning Radar for filings & volume anomalies.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#171B26] hover:bg-[#202534] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Add Ticker Input */}
        <div className="p-4 sm:p-5 border-b border-[#1A1F2E] bg-[#121622] space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Add NSE Symbol (e.g. INFY, ITC, BEL, SBIN)..."
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

          {/* Quick Add Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
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

        {/* Tracked Stocks List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
            <span className="font-semibold uppercase tracking-wider text-slate-300">
              Tracked Watchlist ({portfolio.length} Companies)
            </span>
            <button
              onClick={onResetPortfolio}
              className="text-[11px] text-blue-400 hover:underline flex items-center space-x-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Default (16)</span>
            </button>
          </div>

          <div className="space-y-2">
            {portfolio.map((stock) => (
              <div
                key={stock.ticker}
                className="bg-[#141824] border border-[#22283A] hover:border-[#2C344C] rounded-xl p-3 flex items-center justify-between gap-3 transition-colors group"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-xs bg-[#1C2130] text-slate-200 px-2 py-0.5 rounded border border-[#2A3246]">
                      {stock.ticker}
                    </span>
                    <h4 className="font-bold text-xs text-white truncate">
                      {stock.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {stock.sector} • ₹{stock.price ? stock.price.toLocaleString('en-IN') : '1,420'} ({stock.priceDelta || '+0.0%'})
                  </p>
                </div>

                <button
                  onClick={() => onRemoveStock(stock.ticker)}
                  title={`Remove ${stock.ticker} from portfolio`}
                  className="p-2 rounded-lg bg-[#1B202D] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-[#272F44] hover:border-rose-500/30 transition-all shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1E2333] bg-[#0B0E17] flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Changes immediately update Morning Radar and Company X-Ray.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-900 text-xs font-bold transition-all shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
