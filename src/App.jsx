import React, { useState } from 'react';
import { ViewProvider } from './context/ViewContext';
import DeviceContainer from './components/DeviceContainer';
import MacroTicker from './components/MacroTicker';
import PushFeed from './components/PushFeed';
import PullResearch from './components/PullResearch';
import { PORTFOLIO_STOCKS } from './data/portfolio';
import { MACRO_DATA } from './data/macro';
import { Bell, Search } from 'lucide-react';

function MainApp() {
  const [activeTab, setActiveTab] = useState('push'); // 'push' or 'pull'
  const [activeAnchor, setActiveAnchor] = useState(MACRO_DATA.anchors[0]);
  const [selectedTicker, setSelectedTicker] = useState('LT');

  const handleDeepDive = (ticker) => {
    setSelectedTicker(ticker);
    setActiveTab('pull');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DeviceContainer activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-4 pb-10">
        {/* Top Tab Mode Switcher (Visible in Desktop view or as backup in phone view) */}
        <div className="flex items-center justify-between bg-[#0D1322] border border-slate-800/80 rounded-2xl p-1.5 shadow-card">
          <div className="grid grid-cols-2 gap-1.5 w-full">
            <button
              onClick={() => setActiveTab('push')}
              className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'push'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Push Digest</span>
              <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] bg-blue-500/25 text-blue-200 font-mono">
                16 Stocks
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pull')}
              className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pull'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Pull Research</span>
              <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
                Drivers
              </span>
            </button>
          </div>
        </div>

        {/* Macro Ticker & Upstream Commodity Pulse */}
        <MacroTicker
          activeAnchor={activeAnchor}
          setActiveAnchor={setActiveAnchor}
          onSelectTicker={handleDeepDive}
        />

        {/* Active View: Push Triage vs Pull Deep Dive */}
        {activeTab === 'push' ? (
          <PushFeed
            portfolio={PORTFOLIO_STOCKS}
            onSelectTicker={handleDeepDive}
          />
        ) : (
          <PullResearch
            portfolio={PORTFOLIO_STOCKS}
            selectedTicker={selectedTicker}
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
