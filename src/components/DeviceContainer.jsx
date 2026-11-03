import React from 'react';
import { Smartphone, Monitor, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { useView } from '../context/ViewContext';

export default function DeviceContainer({ children, activeTab, setActiveTab }) {
  const { viewMode, setViewMode, isMobile } = useView();

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Professional Navigation & Device Switcher */}
      <header className="sticky top-0 z-50 bg-[#0B101D]/90 backdrop-blur-md border-b border-slate-800/90 px-4 sm:px-6 py-3 flex items-center justify-between text-xs shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">
            F
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm tracking-tight text-white">FINN</span>
              <span className="text-[10px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
                ENAM AI Build Challenge
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Financial Investment Agent • Primary-Source Intelligence
            </p>
          </div>
        </div>

        {/* Device Switcher for Testing on PC */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'desktop'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Full-width PC layout (Two-column dashboard)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop PC</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'mobile'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Simulated iPhone/Android phone viewport"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Phone View</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex justify-center py-4 px-3 sm:px-6">
        {viewMode === 'mobile' ? (
          /* Simulated High-End Mobile Device Frame */
          <div className="w-full max-w-[420px] bg-[#0A0E1A] border border-slate-800/90 rounded-[38px] shadow-2xl overflow-hidden flex flex-col h-[850px] my-auto relative ring-1 ring-slate-800">
            {/* Phone Notch/Island */}
            <div className="w-full bg-[#0A0E1A] pt-3.5 pb-2 px-6 flex justify-between items-center text-[11px] text-slate-400 border-b border-slate-800/50 select-none shrink-0">
              <span className="font-semibold text-slate-300">09:41</span>
              <div className="w-24 h-4 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5 animate-pulse"></span>
                <span className="text-[10px] text-slate-300 font-mono font-medium">FINN AGENT</span>
              </div>
              <div className="flex items-center space-x-1 text-slate-400 text-[10px]">
                <span>5G</span>
                <span>•</span>
                <span>100%</span>
              </div>
            </div>

            {/* Scrollable Phone Screen */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 scroll-smooth">
              {children}
            </div>

            {/* Mobile Bottom Navigation Bar (iOS / Android Native Pattern) */}
            <div className="bg-[#0B101D]/95 backdrop-blur-md border-t border-slate-800/80 px-6 py-2.5 flex items-center justify-around shrink-0 select-none">
              <button
                onClick={() => {
                  setActiveTab('push');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center space-y-1 transition-all ${
                  activeTab === 'push'
                    ? 'text-blue-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`w-8 h-1 rounded-full mb-1 transition-all ${activeTab === 'push' ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                <span className="text-xs">Morning Radar</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('pull');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center space-y-1 transition-all ${
                  activeTab === 'pull'
                    ? 'text-blue-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`w-8 h-1 rounded-full mb-1 transition-all ${activeTab === 'pull' ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                <span className="text-xs">Company X-Ray</span>
              </button>
            </div>

            {/* Phone Home Indicator */}
            <div className="pb-1.5 flex justify-center bg-[#0B101D]">
              <div className="w-28 h-1 bg-slate-700/80 rounded-full"></div>
            </div>
          </div>
        ) : (
          /* Desktop Expanded Layout (Zero Lag, wide format with spacious cards) */
          <div className="w-full max-w-6xl mx-auto space-y-5">
            {children}
          </div>
        )}
      </main>
    </div>
  );
}
