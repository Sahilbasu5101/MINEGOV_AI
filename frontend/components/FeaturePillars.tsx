'use client';

import React from 'react';
import {
  BarChart3,
  ShieldCheck,
  Leaf,
  Users,
  Settings2,
  Globe2,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';

export default function FeaturePillars() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isLight = theme === 'light';

  const pillars = [
    {
      icon: BarChart3,
      label: t.pillar1,
      color: 'text-cyan-400',
      accentBg: 'group-hover:border-cyan-400 group-hover:bg-cyan-500/10',
    },
    {
      icon: ShieldCheck,
      label: t.pillar2,
      color: 'text-amber-400',
      accentBg: 'group-hover:border-amber-400 group-hover:bg-amber-500/10',
    },
    {
      icon: Leaf,
      label: t.pillar3,
      color: 'text-emerald-400',
      accentBg: 'group-hover:border-emerald-400 group-hover:bg-emerald-500/10',
    },
    {
      icon: Users,
      label: t.pillar4,
      color: 'text-sky-400',
      accentBg: 'group-hover:border-sky-400 group-hover:bg-sky-500/10',
    },
    {
      icon: Settings2,
      label: t.pillar5,
      color: 'text-amber-300',
      accentBg: 'group-hover:border-amber-300 group-hover:bg-amber-500/10',
    },
    {
      icon: Globe2,
      label: t.pillar6,
      color: 'text-teal-400',
      accentBg: 'group-hover:border-teal-400 group-hover:bg-teal-500/10',
    },
  ];

  return (
    <section id="pillars" className="w-full relative z-20 py-4 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`glass-card rounded-2xl border backdrop-blur-xl p-3 sm:p-5 shadow-xl transition-all ${
            isLight
              ? 'bg-white/85 border-slate-200/90 shadow-slate-900/5'
              : 'bg-[#080d16]/90 border-white/[0.08] shadow-black/60'
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`group flex flex-col items-center text-center p-2.5 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    isLight
                      ? 'hover:bg-slate-100/90 text-slate-800'
                      : 'hover:bg-white/[0.04] text-slate-200'
                  }`}
                >
                  {/* Circular Outlined Icon Badge */}
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center mb-2.5 transition-all duration-200 shadow-sm ${
                      isLight
                        ? 'border-slate-300 bg-slate-50 text-slate-700 group-hover:border-amber-500 group-hover:bg-amber-50/50'
                        : 'border-white/[0.14] bg-slate-900/80 text-slate-300 group-hover:border-amber-400/80 group-hover:bg-amber-950/30'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                        isLight ? 'text-slate-800 group-hover:text-amber-600' : `${item.color}`
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs sm:text-[13px] font-semibold tracking-tight transition-colors line-clamp-2 leading-snug ${
                      isLight
                        ? 'text-slate-700 group-hover:text-slate-900'
                        : 'text-slate-300 group-hover:text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
