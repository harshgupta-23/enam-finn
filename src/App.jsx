import React, { useState } from 'react';
import DeviceContainer from './components/DeviceContainer';
import MacroTicker from './components/MacroTicker';
import PushFeed from './components/PushFeed';
import PullResearch from './components/PullResearch';
import { PORTFOLIO_STOCKS } from './data/portfolio';
import { MACRO_DATA } from './data/macro';
import { Bell, Search, BarChart3, Layers, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('push'); // 'push' or 'pull'
  const [activeAnchor, setActiveAnchor] = useState(MACRO_DATA.anchors[0]);
  const [selectedTicker, setSelectedTicker] = useState('LT');

  const handleDeepDive = (ticker) => {
    setSelectedTicker(ticker);
    setActiveTab('pull');
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DeviceContainer activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-4 pb-12">
        {/* Mode Selector Tabs (Top) */}
        <div className="flex items-center justify-between bg-[#101626] border border-slate-800 rounded-2xl p-1.5 shadow-md">
          <div className="grid grid-cols-2 gap-1 w-full">
            <button
              onClick={() => setActiveTab('push')}
              className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'push'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Push Digest</span>
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-blue-500/30 text-blue-200">
                Live
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pull')}
              className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pull'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Pull Research</span>
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
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

        {/* Tab Content */}
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
