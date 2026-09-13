'use client';

import React from 'react';
import {
  Layers,
  Network,
  Radio,
  Leaf,
  Megaphone,
  ArrowRight,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';

export default function StatsAndGazette() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isLight = theme === 'light';

  const stats = [
    {
      icon: Layers,
      value: t.statLeasesNumber,
      label: t.statLeasesLabel,
      accent: 'from-amber-500/10 to-amber-500/5',
      textColor: isLight ? 'text-slate-900' : 'text-white',
    },
    {
      icon: Network,
      value: t.statMinesNumber,
      label: t.statMinesLabel,
      accent: 'from-cyan-500/10 to-cyan-500/5',
      textColor: isLight ? 'text-blue-600' : 'text-cyan-300',
    },
    {
      icon: Radio,
      value: t.statSatelliteNumber,
      label: t.statSatelliteLabel,
      accent: 'from-sky-500/10 to-sky-500/5',
      textColor: isLight ? 'text-slate-900' : 'text-white',
    },
    {
      icon: Leaf,
      value: t.statComplianceNumber,
      label: t.statComplianceLabel,
      accent: 'from-emerald-500/10 to-emerald-500/5',
      textColor: isLight ? 'text-emerald-700' : 'text-emerald-400',
    },
  ];

  const newsItems = [
    { date: '08 Sep 2026', text: t.newsItem1, tag: 'REGULATION' },
    { date: '05 Sep 2026', text: t.newsItem2, tag: 'AI CORE' },
    { date: '01 Sep 2026', text: t.newsItem3, tag: 'GIS MAP' },
  ];

  return (
    <section id="stats" className="w-full relative z-20 py-4 mb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left: 4 Stat Highlight Cards (~7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`glass-card p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 shadow-md ${
                    isLight
                      ? 'bg-white/85 border-slate-200/90 shadow-slate-900/5'
                      : 'bg-[#080d15]/85 border-white/[0.08] shadow-black/40'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-3 shadow-inner ${
                      isLight
                        ? 'border-slate-300 bg-slate-100 text-slate-700'
                        : 'border-white/[0.1] bg-slate-900/80 text-amber-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div
                      className={`text-xl sm:text-2xl font-extrabold font-mono tracking-tight leading-none mb-1.5 ${stat.textColor}`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`text-[11px] sm:text-xs font-medium leading-snug line-clamp-2 ${
                        isLight ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: What's New Live Gazette / Notification Feed (~5 cols) */}
          <div
            id="gazette"
            className={`lg:col-span-5 glass-card p-4 rounded-xl border flex flex-col justify-between shadow-md transition-all ${
              isLight
                ? 'bg-white/85 border-slate-200/90 shadow-slate-900/5'
                : 'bg-[#080d15]/85 border-white/[0.08] shadow-black/40'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-inherit/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                  <Megaphone className="w-3.5 h-3.5" />
                </div>
                <span
                  className={`text-xs sm:text-sm font-bold tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {t.whatsNewTitle}
                </span>
              </div>

              <a
                href="#gazette"
                className={`text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                  isLight
                    ? 'text-amber-700 hover:text-amber-800'
                    : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                <span>{t.viewAll}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Notification items */}
            <div className="divide-y divide-inherit/10 py-1 space-y-2">
              {newsItems.map((item, idx) => (
                <div
                  key={idx}
                  className="pt-2 first:pt-1 flex items-start gap-2.5 group cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 animate-pulse" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mb-0.5">
                      <span>{item.date}</span>
                      <span className="opacity-30">•</span>
                      <span
                        className={`px-1 py-0.2 rounded text-[9px] font-semibold ${
                          isLight
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-white/[0.08] text-slate-300'
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <p
                      className={`text-xs font-normal leading-snug transition-colors line-clamp-2 ${
                        isLight
                          ? 'text-slate-700 group-hover:text-amber-800'
                          : 'text-slate-300 group-hover:text-amber-300'
                      }`}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
