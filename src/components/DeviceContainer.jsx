import React, { useState } from 'react';
import { Smartphone, Monitor, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export default function DeviceContainer({ children, activeTab, setActiveTab }) {
  // viewMode: 'mobile' (simulated phone) or 'desktop' (full width expanded)
  const [viewMode, setViewMode] = useState('desktop');

  return (
    <div className="min-h-screen bg-[#070A10] text-slate-100 flex flex-col font-sans">
      {/* Top Testing Utility Bar for PC & Mobile */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            F
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-sm tracking-tight text-white">FINN</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                v1.0 • ENAM
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              AI Investment Agent • Primary-Source Intelligence
            </p>
          </div>
        </div>

        {/* Device Switcher for easy testing on PC */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === 'desktop'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Full-width PC layout (Two-column dashboard)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop View</span>
            <span className="sm:hidden">PC</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === 'mobile'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Simulated iPhone/Android mobile frame"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Phone Preview</span>
            <span className="sm:hidden">Phone</span>
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-3 text-slate-400">
          <span className="flex items-center space-x-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>16 NSE Stocks Live</span>
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center py-2 sm:py-4 px-2 sm:px-4">
        {viewMode === 'mobile' ? (
          /* Simulated Mobile Device Frame */
          <div className="w-full max-w-[430px] bg-[#0B0F19] border border-slate-800 rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[880px] my-auto relative">
            {/* Phone Notch/Island */}
            <div className="w-full bg-[#0B0F19] pt-3 pb-2 px-6 flex justify-between items-center text-[11px] text-slate-400 border-b border-slate-800/40 select-none">
              <span className="font-semibold text-slate-300">09:41</span>
              <div className="w-20 h-4 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500/80 mr-1.5"></div>
                <span className="text-[9px] text-slate-400">FINN</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-400">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Scrollable Phone Screen */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 space-y-4">
              {children}
            </div>

            {/* Simulated Phone Home Bar */}
            <div className="py-2 flex justify-center bg-[#0B0F19] border-t border-slate-800/40">
              <div className="w-32 h-1 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        ) : (
          /* Desktop Expanded Layout (Zero Lag, high density) */
          <div className="w-full max-w-7xl mx-auto space-y-4">
            {children}
          </div>
        )}
      </main>
    </div>
  );
}
