import React from 'react';
import { ArrowUpRight, Award, Briefcase } from 'lucide-react';

export default function ManagementChangeCard({ filing, stock, onDeepDive }) {
  const { execBio, title, timestamp } = filing;

  return (
    <div className="bg-[#12141C] border border-[#232736] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E2230] pb-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-bold text-xs bg-[#1A1D2A] text-slate-200 px-2.5 py-1 rounded-md border border-[#2A3044]">
              {stock.ticker}
            </span>
            <h3 className="font-bold text-base text-white tracking-tight">
              {stock.name}
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Executive Appointment
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {timestamp} • {stock.sector}
          </p>
        </div>

        <button
          onClick={() => onDeepDive(stock.ticker)}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-900 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm shrink-0"
        >
          <span>Company X-Ray</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <h4 className="text-sm font-semibold text-slate-100 leading-snug">
        {title}
      </h4>

      {/* Enriched Profile */}
      {execBio && (
        <div className="bg-[#171A24] border border-[#262B3C] rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#232738] pb-2.5">
            <div>
              <p className="text-sm font-bold text-white">{execBio.name}</p>
              <p className="text-xs text-blue-400 font-medium">{execBio.role}</p>
            </div>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#1C2030] text-slate-300 border border-[#2D3348]">
              Verified Pedigree
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-start space-x-2.5">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="text-slate-400">Previous Role: </span>
                {execBio.previousRole}
              </p>
            </div>
            <div className="flex items-start space-x-2.5">
              <Award className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="text-slate-400">Track Record: </span>
                {execBio.experience}
              </p>
            </div>
          </div>

          {/* Compact Micro-Tag Callout */}
          <div className="bg-blue-950/25 border border-blue-500/35 rounded-xl p-3 text-xs leading-relaxed space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/35">
                <span>💡 Why Should I Care?</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Leadership Signal</span>
            </div>
            <p className="text-blue-100/95 font-medium leading-relaxed pl-0.5">
              {execBio.significance}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
