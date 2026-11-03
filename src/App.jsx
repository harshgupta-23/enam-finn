import React, { useState } from 'react';
import { ViewProvider } from './context/ViewContext';
import DeviceContainer from './components/DeviceContainer';
import PushFeed from './components/PushFeed';
import PullResearch from './components/PullResearch';
import PortfolioView from './components/PortfolioView';
import { PORTFOLIO_STOCKS } from './data/portfolio';
import { MACRO_DATA } from './data/macro';
import { generateAdHocAnalysis } from './data/adhocResearch';
import { Bell, Search, Briefcase } from 'lucide-react';

function MainApp() {
  const [activeTab, setActiveTab] = useState('push'); // 'push', 'pull', or 'portfolio'
  const [activeAnchor, setActiveAnchor] = useState(MACRO_DATA.anchors[0]);
  const [selectedTicker, setSelectedTicker] = useState('LT');

  // Dynamic Portfolio State with LocalStorage Persistence
  const [portfolio, setPortfolio] = useState(() => {
    try {
      const saved = localStorage.getItem('finn_portfolio_stocks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return PORTFOLIO_STOCKS;
  });

  const handleDeepDive = (ticker) => {
    setSelectedTicker(ticker);
    setActiveTab('pull');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddStock = (tickerInput) => {
    const clean = tickerInput.trim().toUpperCase().replace('.NS', '').replace('.BO', '');
    if (!clean) return;

    // Check if stock exists in pre-seeded database
    const existingInBaseline = PORTFOLIO_STOCKS.find((s) => s.ticker === clean);
    let newStock;

    if (existingInBaseline) {
      newStock = existingInBaseline;
    } else {
      // Synthesize primary research data and real-looking corporate filing
      const base = generateAdHocAnalysis(clean);
      newStock = {
        ...base,
        isPricePositive: true,
        volumeMultiple: 1.9,
        filings: [
          {
            id: `${clean.toLowerCase()}-filing-custom-1`,
            category: 'results',
            priority: 'high',
            timestamp: 'Today, 11:15 IST',
            title: `Q2 FY25 Consolidated Financial Results`,
            summary: `${base.name} reports healthy revenue growth driven by domestic demand with resilient operating profitability.`,
            financials: {
              quarter: 'Q2 FY25',
              revenue: { current: '₹14,850 Cr', qoq: '+5.8%', yoy: '+16.2%', status: 'beat' },
              ebitda: { current: '₹2,640 Cr', qoq: '+4.2%', yoy: '+13.8%', status: 'inline' },
              pbt: { current: '₹2,120 Cr', qoq: '+6.1%', yoy: '+12.4%', status: 'inline' },
              pat: { current: '₹1,580 Cr', qoq: '+8.3%', yoy: '+17.0%', status: 'beat' }
            },
            keyTakeaway: `Core operating margins expanded by 45 bps with strong cash conversion above 80%.`
          }
        ]
      };
    }

    const updated = [newStock, ...portfolio.filter((s) => s.ticker !== clean)];
    setPortfolio(updated);
    try {
      localStorage.setItem('finn_portfolio_stocks', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleRemoveStock = (ticker) => {
    const updated = portfolio.filter((s) => s.ticker !== ticker);
    setPortfolio(updated);
    try {
      localStorage.setItem('finn_portfolio_stocks', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleResetPortfolio = () => {
    setPortfolio(PORTFOLIO_STOCKS);
    try {
      localStorage.removeItem('finn_portfolio_stocks');
    } catch (e) {}
  };

  return (
    <DeviceContainer activeTab={activeTab} setActiveTab={setActiveTab} portfolioCount={portfolio.length}>
      <div className="space-y-4 pb-12">
        {/* Unified 3-Tab Mode Switcher (Clean, Spacious, ZERO Truncation) */}
        <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-1.5 shadow-sm">
          <div className="grid grid-cols-3 gap-1.5 w-full text-xs">
            {/* Tab 1: Morning Radar */}
            <button
              onClick={() => setActiveTab('push')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl transition-all ${
                activeTab === 'push'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
              }`}
            >
              <Bell className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap font-medium">Morning Radar</span>
            </button>

            {/* Tab 2: Company X-Ray */}
            <button
              onClick={() => setActiveTab('pull')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl transition-all ${
                activeTab === 'pull'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
              }`}
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap font-medium">Company X-Ray</span>
            </button>

            {/* Tab 3: In-App Portfolio View */}
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap font-medium">Portfolio ({portfolio.length})</span>
            </button>
          </div>
        </div>

        {/* View 1: Push Triage (Morning Radar) */}
        {activeTab === 'push' && (
          <PushFeed
            portfolio={portfolio}
            onSelectTicker={handleDeepDive}
            activeAnchor={activeAnchor}
            setActiveAnchor={setActiveAnchor}
            onOpenManagePortfolio={() => setActiveTab('portfolio')}
          />
        )}

        {/* View 2: Pull Research (Company X-Ray) */}
        {activeTab === 'pull' && (
          <PullResearch
            portfolio={portfolio}
            selectedTicker={selectedTicker}
            onSelectTicker={handleDeepDive}
          />
        )}

        {/* View 3: Native In-App Portfolio View (No popup dialogs!) */}
        {activeTab === 'portfolio' && (
          <PortfolioView
            portfolio={portfolio}
            onAddStock={handleAddStock}
            onRemoveStock={handleRemoveStock}
            onResetPortfolio={handleResetPortfolio}
            onSelectTicker={handleDeepDive}
          />
        )}
      </div>
    </DeviceContainer>
  );
}

export default function App() {
  return (
    <ViewProvider>
      <MainApp />
    </ViewProvider>
  );
}
