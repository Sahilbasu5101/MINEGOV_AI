'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Lock,
  Info,
  Layers,
  Sparkles,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';

export default function HeroContent() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isLight = theme === 'light';

  return (
    <div className="flex flex-col justify-center max-w-xl z-20 py-2 sm:py-4">
      
      {/* Official Government of India Division Tag / Tri-Tagline */}
      <div className="flex flex-wrap items-center gap-2 mb-4 self-start">
        {/* Tri-Tagline Pill from Reference: Safe Mines | Responsible Minerals | A Stronger India */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono tracking-wider transition-colors shadow-sm ${
            isLight
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-900'
              : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
          }`}
        >
          {/* Saffron, White, Green Tricolor Micro-Pips */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white border border-slate-400"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#138808]"></span>
          </div>
          <span className="font-semibold uppercase">{t.taglineSafeMines}</span>
          <span className="opacity-30">|</span>
          <span className="font-semibold uppercase">{t.taglineMinerals}</span>
          <span className="opacity-30">|</span>
          <span className="font-semibold uppercase">{t.taglineIndia}</span>
        </div>
      </div>

      {/* Authoritative Headline - High-End Human-Crafted Typography */}
      <h1
        className={`font-display text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] mb-4 transition-colors ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}
      >
        <span>{t.headlineMain}</span>{' '}
        <span className="block mt-1 text-mineral-gold">
          {t.headlineAccent}
        </span>
      </h1>

      {/* Clear Sovereign Description */}
      <p
        className={`text-sm sm:text-base leading-relaxed mb-6 font-normal transition-colors max-w-lg ${
          isLight ? 'text-slate-600' : 'text-slate-300'
        }`}
      >
        {t.subDescription}
      </p>

      {/* Dual CTA Action Cards (Operational Users vs Regulatory Officials) */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-4">
        {/* Button 1: Enter MineGov AI for CIL & Mine Operational Users */}
        <Link
          href="/portal"
          className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all duration-200 group shadow-md hover:-translate-y-0.5 ${
            isLight
              ? 'bg-slate-900 border-slate-800 text-white shadow-slate-900/20 hover:bg-slate-800'
              : 'bg-[#0f1726]/90 hover:bg-[#152033] border-cyan-500/40 text-white shadow-[0_0_20px_-5px_rgba(0,229,255,0.25)] hover:border-cyan-400'
          }`}
        >
          <div className="flex items-center gap-3 text-left">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                isLight ? 'bg-white/10 text-amber-300' : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
              }`}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5">
                <span>{t.ctaEnterMineGov}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-normal">
                {t.ctaEnterSubtext}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0" />
        </Link>

        {/* Button 2: Regulatory Access for Government & Regulatory Officials */}
        <Link
          href="/portal"
          className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all duration-200 group shadow-md hover:-translate-y-0.5 ${
            isLight
              ? 'bg-white border-slate-300 text-slate-900 hover:border-amber-500 hover:bg-amber-50/50'
              : 'bg-slate-900/60 hover:bg-slate-900/90 border-amber-500/35 text-amber-200 hover:border-amber-500 shadow-amber-950/20'
          }`}
        >
          <div className="flex items-center gap-3 text-left">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                isLight ? 'bg-amber-100 text-amber-800' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold tracking-wide">
                {t.ctaRegulatory}
              </div>
              <div className="text-[10px] text-slate-400 font-normal">
                {t.ctaRegulatorySubtext}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
        </Link>
      </div>

      {/* Security & Access Warning Micro-Notice */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-5 font-mono">
        <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span>{t.authNotice}</span>
      </div>

      {/* National Status Chips */}
      <div
        className={`pt-3 border-t flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono transition-colors ${
          isLight ? 'border-slate-200 text-slate-600' : 'border-white/[0.08] text-slate-400'
        }`}
      >
        <div className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm animate-pulse"></span>
          <span className={isLight ? 'text-slate-700 font-medium' : 'text-slate-300'}>
            ISRO / GSI Geospatial Uplink
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm"></span>
          <span className={isLight ? 'text-slate-700 font-medium' : 'text-slate-300'}>
            DGMS Safety Telemetry
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm"></span>
          <span className={isLight ? 'text-slate-700 font-medium' : 'text-slate-300'}>
            IBM Concession Verifier
          </span>
        </div>
      </div>

    </div>
  );
}
