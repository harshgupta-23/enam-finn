import React from 'react';
import { UserCheck, ArrowUpRight, Award, Briefcase } from 'lucide-react';

export default function ManagementChangeCard({ filing, stock, onDeepDive }) {
  const { execBio, title, timestamp } = filing;

  return (
    <div className="bg-[#101728] border border-indigo-500/30 rounded-2xl p-4 shadow-lg hover:border-indigo-500/50 transition-all space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
            {stock.ticker}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-white">{stock.name}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                LEADERSHIP APPOINTMENT
              </span>
            </div>
            <span className="text-[11px] text-slate-400">{timestamp} • {stock.sector}</span>
          </div>
        </div>

        <button
          onClick={() => onDeepDive(stock.ticker)}
          className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center space-x-1 transition-colors shrink-0 shadow-sm"
        >
          <span>Deep Dive</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-xs text-slate-200 font-medium">
        {title}
      </p>

      {/* Biographical Enrichment Card */}
      {execBio && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs">
                {execBio.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{execBio.name}</p>
                <p className="text-[11px] text-indigo-400 font-medium">{execBio.role}</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">
              Enriched Profile
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-start space-x-2">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-slate-300">
                <span className="text-slate-400">Previous Pedigree: </span>
                {execBio.previousRole}
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <Award className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-slate-300">
                <span className="text-slate-400">Track Record: </span>
                {execBio.experience}
              </p>
            </div>
          </div>

          <div className="bg-indigo-950/30 rounded-lg p-2 border border-indigo-500/20 text-[11px] text-indigo-200 leading-relaxed">
            <strong>Strategic Signal: </strong>{execBio.significance}
          </div>
        </div>
      )}
    </div>
  );
}
