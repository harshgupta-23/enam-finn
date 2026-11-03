import React, { useState } from 'react';
import { ViewProvider } from './context/ViewContext';
import DeviceContainer from './components/DeviceContainer';
import PushFeed from './components/PushFeed';
import PullResearch from './components/PullResearch';
import PortfolioModal from './components/PortfolioModal';
import { PORTFOLIO_STOCKS } from './data/portfolio';
import { MACRO_DATA } from './data/macro';
import { generateAdHocAnalysis } from './data/adhocResearch';
import { Bell, Search, SlidersHorizontal, Plus } from 'lucide-react';

function MainApp() {
  const [activeTab, setActiveTab] = useState('push'); // 'push' or 'pull'
  const [activeAnchor, setActiveAnchor] = useState(MACRO_DATA.anchors[0]);
  const [selectedTicker, setSelectedTicker] = useState('LT');
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

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
    <DeviceContainer activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-4 pb-12">
        {/* Top Tab Mode Switcher + Portfolio Manage Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 bg-[#12141C] border border-[#232736] rounded-2xl p-1.5 shadow-sm">
            <div className="grid grid-cols-2 gap-1.5 w-full">
              <button
                onClick={() => setActiveTab('push')}
                className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs transition-all ${
                  activeTab === 'push'
                    ? 'bg-white text-slate-900 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
                }`}
              >
                <Bell className="w-4 h-4 shrink-0" />
                <span className="truncate">Morning Radar</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-900 font-mono font-bold shrink-0">
                  {portfolio.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('pull')}
                className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs transition-all ${
                  activeTab === 'pull'
                    ? 'bg-white text-slate-900 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
                }`}
              >
                <Search className="w-4 h-4 shrink-0" />
                <span className="truncate">Company X-Ray</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-[#222636] text-slate-300 font-mono shrink-0">
                  Research
                </span>
              </button>
            </div>
          </div>

          {/* Quick Manage Portfolio Button */}
          <button
            onClick={() => setIsPortfolioModalOpen(true)}
            title="Manage tracked companies in portfolio"
            className="bg-[#12141C] hover:bg-[#181B26] border border-[#232736] hover:border-[#353D54] px-3.5 py-2.5 rounded-2xl text-slate-300 hover:text-white transition-all shadow-sm flex items-center space-x-1.5 shrink-0 text-xs font-semibold"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Portfolio</span>
          </button>
        </div>

        {/* Active View: Push Triage vs Pull Deep Dive */}
        {activeTab === 'push' ? (
          <PushFeed
            portfolio={portfolio}
            onSelectTicker={handleDeepDive}
            activeAnchor={activeAnchor}
            setActiveAnchor={setActiveAnchor}
            onOpenManagePortfolio={() => setIsPortfolioModalOpen(true)}
          />
        ) : (
          <PullResearch
            portfolio={portfolio}
            selectedTicker={selectedTicker}
            onSelectTicker={handleDeepDive}
          />
        )}
      </div>

      {/* Portfolio Management Modal */}
      <PortfolioModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        portfolio={portfolio}
        onAddStock={handleAddStock}
        onRemoveStock={handleRemoveStock}
        onResetPortfolio={handleResetPortfolio}
      />
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
