'use client';

import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';

export default function VisionCard() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isLight = theme === 'light';

  return (
    <div
      className={`glass-card p-3.5 sm:p-4 rounded-xl border backdrop-blur-md shadow-lg transition-all max-w-sm sm:max-w-md ${
        isLight
          ? 'bg-white/80 border-slate-200/90 text-slate-800 shadow-slate-900/5'
          : 'bg-[#080d15]/80 border-white/[0.08] text-slate-200 shadow-black/40'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Quote text with amber accent rule */}
        <div className="flex-1">
          <div className="w-8 h-0.5 bg-amber-500 rounded-full mb-2" />
          <p
            className={`text-xs sm:text-[13px] leading-relaxed font-medium italic ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            &ldquo;{t.visionQuote}&rdquo;
          </p>
        </div>

        {/* 4 Sovereign Pillars */}
        <div
          className={`shrink-0 pl-3.5 border-l flex flex-col justify-center gap-1 text-[9px] font-mono tracking-wider ${
            isLight ? 'border-slate-300 text-slate-500' : 'border-white/[0.1] text-slate-400'
          }`}
        >
          <span className="hover:text-amber-500 transition-colors font-semibold">
            {t.visionPeople}
          </span>
          <span className="hover:text-emerald-500 transition-colors font-semibold">
            {t.visionPlanet}
          </span>
          <span className="hover:text-cyan-500 transition-colors font-semibold">
            {t.visionProductivity}
          </span>
          <span className="hover:text-amber-500 transition-colors font-semibold">
            {t.visionProgress}
          </span>
        </div>
      </div>
    </div>
  );
}
