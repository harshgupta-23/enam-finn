import React, { useState } from 'react';
import { ViewProvider } from './context/ViewContext';
import DeviceContainer from './components/DeviceContainer';
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
      <div className="space-y-4 pb-12">
        {/* Top Tab Mode Switcher (Clean, calm, monochrome) */}
        <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-1.5 shadow-sm">
          <div className="grid grid-cols-2 gap-1.5 w-full">
            <button
              onClick={() => setActiveTab('push')}
              className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs transition-all ${
                activeTab === 'push'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Push Digest</span>
              <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-900 font-mono font-bold">
                16 Stocks
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pull')}
              className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs transition-all ${
                activeTab === 'pull'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#181B26]'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Pull Research</span>
              <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] bg-[#222636] text-slate-300 font-mono">
                Drivers
              </span>
            </button>
          </div>
        </div>

        {/* Active View: Push Triage vs Pull Deep Dive */}
        {activeTab === 'push' ? (
          <PushFeed
            portfolio={PORTFOLIO_STOCKS}
            onSelectTicker={handleDeepDive}
            activeAnchor={activeAnchor}
            setActiveAnchor={setActiveAnchor}
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
