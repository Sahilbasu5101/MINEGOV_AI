'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  ArrowRight, ShieldCheck, Building2, Info, Lock,
  Globe, ChevronDown, Check, Search, Sun, Moon,
  Menu, X, BarChart3, ShieldCheck as SC, Leaf, Users,
  Settings2, Globe2, Layers, Network, Radio, Megaphone,
  Cpu, Activity
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import {
  useLanguage,
  SUPPORTED_LANGUAGES,
  LanguageCode,
} from '@/components/LanguageProvider';

/* ─── Dynamic 3D Simulation (no SSR) ─── */
const MineSimulation3D = dynamic(() => import('@/components/MineSimulation3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#07090d]">
      <div className="flex flex-col items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
        <span className="text-[11px] font-mono text-amber-500 tracking-widest">
          INITIALIZING GSI 3D DIGITAL TWIN...
        </span>
      </div>
    </div>
  ),
});

/* ─── Ashoka Chakra SVG for Azadi badge ─── */
function AzadiChakra({ size = 16 }: { size?: number }) {
  const cx = size / 2, cy = size / 2, r = size * 0.35;
  const spokes = Array.from({ length: 12 }, (_, i) => (i * 30 * Math.PI) / 180);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={cx} cy={cy} r={r} stroke="#F59E0B" strokeWidth="1.2" />
      {spokes.map((rad, i) => (
        <line key={i}
          x1={cx + (r * 0.3) * Math.cos(rad)} y1={cy + (r * 0.3) * Math.sin(rad)}
          x2={cx + (r * 0.95) * Math.cos(rad)} y2={cy + (r * 0.95) * Math.sin(rad)}
          stroke="#F59E0B" strokeWidth="0.8" strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/* ─── Ashok Stambha Logo SVG ─── */
function AshokStambhaLogo({ isLight }: { isLight: boolean }) {
  const gold = isLight ? '#B45309' : '#F59E0B';
  const goldDark = isLight ? '#92400E' : '#D97706';
  return (
    <svg viewBox="0 0 40 46" className="w-8 h-9" fill="none">
      {/* Abacus base */}
      <rect x="5" y="37" width="30" height="4" rx="2" fill={gold} />
      <circle cx="12" cy="39" r="2" fill="none" stroke={goldDark} strokeWidth="0.9" />
      <circle cx="20" cy="39" r="2" fill="none" stroke={goldDark} strokeWidth="0.9" />
      <circle cx="28" cy="39" r="2" fill="none" stroke={goldDark} strokeWidth="0.9" />
      {/* Pillar */}
      <rect x="18.5" y="20" width="3" height="17" rx="1.5" fill={gold} />
      {/* Ashoka Chakra */}
      <circle cx="20" cy="16" r="7" fill="none" stroke={gold} strokeWidth="1.6" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        return <line key={i}
          x1={20 + 2.5 * Math.cos(r)} y1={16 + 2.5 * Math.sin(r)}
          x2={20 + 6.5 * Math.cos(r)} y2={16 + 6.5 * Math.sin(r)}
          stroke={gold} strokeWidth="0.9"
        />;
      })}
      {/* Left Lion */}
      <ellipse cx="11.5" cy="10" rx="5.5" ry="3.5" fill={gold} />
      <circle cx="8" cy="7.5" r="3.8" fill={gold} />
      <circle cx="6.5" cy="7.5" r="2.5" fill={goldDark} opacity="0.75" />
      {/* Right Lion */}
      <ellipse cx="28.5" cy="10" rx="5.5" ry="3.5" fill={gold} />
      <circle cx="32" cy="7.5" r="3.8" fill={gold} />
      <circle cx="33.5" cy="7.5" r="2.5" fill={goldDark} opacity="0.75" />
      {/* Tricolor stripe */}
      <rect x="5" y="41.5" width="30" height="1.5" rx="0.5" fill="#FF9933" />
      <rect x="5" y="43.5" width="30" height="1.5" rx="0.5" fill="#138808" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN HOME PAGE
   ═══════════════════════════════════════════════════ */
export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, fontSize, setFontSize, currentLangInfo } = useLanguage();
  const isLight = theme === 'light';

  /* Navbar state */
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  /* Footer visibility */
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerVisible, setFooterVisible] = useState(false);

  /* Footer lang picker */
  const [footerLangOpen, setFooterLangOpen] = useState(false);
  const footerLangRef = useRef<HTMLDivElement>(null);

  /* Apply font-size to html */
  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  /* Apply theme class */
  useEffect(() => {
    document.documentElement.classList.toggle('light', isLight);
    document.documentElement.classList.toggle('dark', !isLight);
  }, [isLight]);

  /* Close lang dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (footerLangRef.current && !footerLangRef.current.contains(e.target as Node)) setFooterLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Footer IntersectionObserver */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFooterVisible(true); },
      { threshold: 0.1 }
    );
    if (footerRef.current) obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  const navItems = [
    { label: t.navHome, href: '#hero' },
    { label: t.navAbout, href: '#about' },
    { label: t.navPlatform, href: '#pillars' },
    { label: t.navCompliance, href: '#stats' },
    { label: t.navIntelligence, href: '#pillars' },
    { label: t.navResources, href: '#gazette' },
  ];

  const pillars = [
    { icon: BarChart3, label: t.pillar1, color: 'text-cyan-400' },
    { icon: SC, label: t.pillar2, color: 'text-amber-400' },
    { icon: Leaf, label: t.pillar3, color: 'text-emerald-400' },
    { icon: Users, label: t.pillar4, color: 'text-sky-400' },
    { icon: Settings2, label: t.pillar5, color: 'text-amber-300' },
    { icon: Globe2, label: t.pillar6, color: 'text-teal-400' },
  ];

  const stats = [
    { icon: Layers, value: t.statLeasesNumber, label: t.statLeasesLabel, valueColor: isLight ? 'text-slate-900' : 'text-white' },
    { icon: Network, value: t.statMinesNumber, label: t.statMinesLabel, valueColor: isLight ? 'text-blue-700' : 'text-cyan-300' },
    { icon: Radio, value: t.statSatelliteNumber, label: t.statSatelliteLabel, valueColor: isLight ? 'text-slate-900' : 'text-white' },
    { icon: Leaf, value: t.statComplianceNumber, label: t.statComplianceLabel, valueColor: isLight ? 'text-emerald-700' : 'text-emerald-400' },
  ];

  const newsItems = [
    { date: '08 Sep 2026', text: t.newsItem1, tag: 'REGULATION' },
    { date: '05 Sep 2026', text: t.newsItem2, tag: 'AI CORE' },
    { date: '01 Sep 2026', text: t.newsItem3, tag: 'GIS MAP' },
  ];

  /* ── Styles ── */
  const glass = isLight
    ? 'bg-white/90 border-slate-200/80 shadow-slate-900/5'
    : 'bg-[#080d16]/90 border-white/[0.08] shadow-black/50';

  const cardBg = isLight
    ? 'bg-white/85 border-slate-200/90 shadow-slate-900/5 hover:shadow-md'
    : 'bg-[#080d15]/85 border-white/[0.08] shadow-black/40 hover:border-white/[0.14]';

  return (
    <div
      className={`relative w-full min-h-screen geo-grid-bg transition-colors duration-300 ${
        isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#06090e] text-slate-100'
      }`}
      style={{ fontSize: fontSize === 'sm' ? '14px' : fontSize === 'lg' ? '17.5px' : '16px' }}
    >

      {/* ══════════════════════════════════════════
          NAVBAR
          ══════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Tricolor ribbon */}
        <div className="h-[2.5px] w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        {/* Top bar */}
        <div className={`px-4 sm:px-8 py-1 border-b text-[11px] font-mono transition-colors ${
          isLight ? 'bg-slate-100/98 border-slate-200 text-slate-600' : 'bg-[#040609]/98 border-white/[0.06] text-slate-400'
        }`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider">{t.goi}</span>
              <span className="opacity-40">|</span>
              <span className="text-amber-500 font-semibold">{t.ministryOfMines}</span>
              <span className="hidden md:inline opacity-40">•</span>
              <span className="hidden md:inline text-slate-400 truncate max-w-xs">{t.portalSubtitle}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden sm:flex items-center gap-1.5 text-emerald-500 font-semibold text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {t.satelliteActive}
              </span>
              {/* Azadi Ka Amrit Mahotsav official badge */}
              <div className="hidden lg:flex items-center gap-2 px-2.5 py-0.5 rounded-full border bg-gradient-to-r from-amber-950/50 via-orange-950/30 to-amber-950/50 border-amber-600/40">
                <AzadiChakra size={14} />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] font-extrabold text-amber-300 tracking-widest">75</span>
                  <span className="text-[8.5px] font-semibold text-amber-400/90">{t.azadiTag}</span>
                </div>
                <div className="flex flex-col gap-[1.5px]">
                  <span className="w-1 h-1 rounded-full bg-[#FF9933]" />
                  <span className="w-1 h-1 rounded-full bg-white/80" />
                  <span className="w-1 h-1 rounded-full bg-[#138808]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className={`backdrop-blur-xl border-b transition-colors duration-200 ${
          isLight ? 'bg-white/95 border-slate-200 text-slate-900' : 'bg-[#07090e]/95 border-white/[0.08] text-white'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">

            {/* Brand: Ashok Stambha + MineGov AI */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${
                isLight ? 'bg-amber-50 border-amber-200 group-hover:border-amber-500' : 'bg-amber-950/40 border-amber-500/40 group-hover:border-amber-400'
              }`}>
                <AshokStambhaLogo isLight={isLight} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl font-display tracking-tight">
                    MineGov<span className="text-amber-500">AI</span>
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold tracking-wider hidden sm:inline ${
                    isLight ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                  }`}>GOI.INTEL</span>
                </div>
                <span className={`text-[10px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {t.ministryOfMines}
                </span>
              </div>
            </Link>

            {/* Nav links desktop */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item, i) => (
                <a key={i} href={item.href} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  i === 0
                    ? isLight ? 'bg-amber-50 text-amber-800 font-semibold' : 'bg-amber-950/40 text-amber-400 font-semibold'
                    : isLight ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                }`}>{item.label}</a>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Search */}
              <div className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs ${
                isLight ? 'bg-slate-50 border-slate-300 focus-within:border-amber-500' : 'bg-slate-900/80 border-white/[0.1] focus-within:border-amber-500/50'
              }`}>
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <input
                  placeholder={t.searchPlaceholder}
                  className="bg-transparent outline-none w-32 lg:w-40 text-[11px] placeholder:text-slate-500"
                />
              </div>

              {/* Font Size A- A A+ */}
              <div className={`hidden sm:flex items-center rounded-lg overflow-hidden border text-[11px] font-mono ${
                isLight ? 'border-slate-300 bg-slate-100' : 'border-white/[0.1] bg-slate-900/80'
              }`}>
                {(['sm', 'base', 'lg'] as const).map((s, i) => (
                  <button key={s} onClick={() => setFontSize(s)}
                    className={`px-2 py-1 transition-colors ${i === 1 ? 'border-x border-inherit' : ''} ${
                      fontSize === s ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-amber-400'
                    }`}>
                    {s === 'sm' ? 'A-' : s === 'base' ? 'A' : 'A+'}
                  </button>
                ))}
              </div>

              {/* Language Selector */}
              <div className="relative" ref={langRef}>
                <button onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    isLight ? 'bg-slate-100 border-slate-300 text-slate-800 hover:border-amber-500' : 'bg-slate-900/90 border-white/[0.12] text-amber-300 hover:border-amber-500/60'
                  }`}>
                  <Globe className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[11px] font-bold">{currentLangInfo.nativeName}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>

                {langOpen && (
                  <div className={`absolute right-0 mt-2 w-52 rounded-xl border shadow-2xl py-1.5 z-50 backdrop-blur-xl ${
                    isLight ? 'bg-white/98 border-slate-200 shadow-slate-900/10' : 'bg-[#0c121c]/98 border-white/[0.12] shadow-black/80'
                  }`}>
                    <div className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border-b mb-1 ${
                      isLight ? 'text-slate-400 border-slate-200' : 'text-slate-500 border-white/[0.08]'
                    }`}>Select Language</div>
                    {SUPPORTED_LANGUAGES.map((item) => (
                      <button key={item.code} onClick={() => { setLanguage(item.code); setLangOpen(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                          language === item.code
                            ? isLight ? 'bg-amber-50 text-amber-800 font-semibold' : 'bg-amber-950/50 text-amber-300 font-semibold'
                            : isLight ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-200 hover:bg-white/[0.06]'
                        }`}>
                        <div className="flex items-center gap-2">
                          <span className="w-5 text-[10px] font-mono text-amber-500 font-bold">{item.flagLabel}</span>
                          <span>{item.nativeName}</span>
                          <span className="text-[10px] text-slate-400">({item.name})</span>
                        </div>
                        {language === item.code && <Check className="w-3.5 h-3.5 text-amber-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button onClick={toggleTheme}
                className={`p-2 rounded-lg border transition-all ${
                  isLight ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' : 'bg-slate-900 border-white/[0.1] text-amber-400 hover:bg-slate-800'
                }`}>
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              {/* Access Portal CTA */}
              <Link href="/portal" className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-md shrink-0 ${
                isLight ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 hover:brightness-110'
              }`}>
                <Lock className="w-3 h-3" />
                <span className="hidden xs:inline">{t.accessPortal}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              {/* Mobile hamburger */}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden p-2 rounded-lg border border-white/[0.1]">
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className={`xl:hidden border-t px-4 py-3 space-y-1 ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#070a0f]/98 border-white/[0.08]'
            }`}>
              {navItems.map((item, i) => (
                <a key={i} href={item.href} onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/[0.06]'
                  }`}>{item.label}</a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════ */}
      <main id="hero" className="pt-[7.5rem] pb-6 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-6">

            {/* ── Left: Hero Copy ── */}
            <div className="w-full lg:w-[46%] flex flex-col shrink-0">

              {/* Tagline pills */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 self-start rounded-full border text-[11px] font-mono tracking-wider mb-4 ${
                isLight ? 'bg-amber-50 border-amber-300/60 text-amber-900' : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white border border-slate-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#138808]" />
                <span className="font-bold uppercase">{t.taglineSafeMines}</span>
                <span className="opacity-30">|</span>
                <span className="font-bold uppercase">{t.taglineMinerals}</span>
                <span className="opacity-30">|</span>
                <span className="font-bold uppercase">{t.taglineIndia}</span>
              </div>

              {/* Headline */}
              <h1 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {t.headlineMain}{' '}
                <span className="block mt-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                  {t.headlineAccent}
                </span>
              </h1>

              {/* Sub-description */}
              <p className={`text-sm sm:text-[15px] leading-relaxed mb-6 max-w-lg ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {t.subDescription}
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Link href="/portal"
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all hover:-translate-y-0.5 group shadow-lg ${
                    isLight
                      ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800'
                      : 'bg-[#0f1726]/90 border-cyan-500/40 text-white hover:bg-[#152033] hover:border-cyan-400 shadow-cyan-950/20'
                  }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                      isLight ? 'bg-white/10 border-white/10' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300'
                    }`}>
                      <Building2 className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{t.ctaEnterMineGov}</div>
                      <div className="text-[10px] text-slate-400">{t.ctaEnterSubtext}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link href="/portal"
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all hover:-translate-y-0.5 group shadow-md ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 hover:border-amber-500 hover:bg-amber-50/50'
                      : 'bg-slate-900/60 border-amber-500/35 text-amber-200 hover:border-amber-400 hover:bg-slate-900/90'
                  }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                      isLight ? 'bg-amber-100 border-amber-200 text-amber-700' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    }`}>
                      <ShieldCheck className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{t.ctaRegulatory}</div>
                      <div className="text-[10px] text-slate-400">{t.ctaRegulatorySubtext}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Auth notice */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-5 font-mono">
                <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{t.authNotice}</span>
              </div>

              {/* Status chips */}
              <div className={`pt-3 border-t flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-mono ${
                isLight ? 'border-slate-200' : 'border-white/[0.08]'
              }`}>
                {[
                  { dot: 'bg-cyan-400', label: 'ISRO / GSI Geospatial Uplink' },
                  { dot: 'bg-emerald-400', label: 'DGMS Safety Telemetry' },
                  { dot: 'bg-amber-400', label: 'IBM Concession Verifier' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
                    <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Vision Card + 3D ── */}
            <div className="w-full lg:w-[54%] flex flex-col gap-4">

              {/* Vision Quote Card */}
              <div className={`glass-card rounded-xl border p-4 shadow-lg self-end max-w-md w-full transition-all ${glass}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="w-8 h-0.5 bg-amber-500 rounded-full mb-2" />
                    <p className={`text-[13px] leading-relaxed font-medium italic ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      &ldquo;{t.visionQuote}&rdquo;
                    </p>
                  </div>
                  <div className={`shrink-0 pl-4 border-l flex flex-col gap-1 text-[10px] font-mono font-bold tracking-widest ${
                    isLight ? 'border-slate-300 text-slate-500' : 'border-white/[0.1] text-slate-400'
                  }`}>
                    <span className="hover:text-amber-500 transition-colors">{t.visionPeople}</span>
                    <span className="hover:text-emerald-500 transition-colors">{t.visionPlanet}</span>
                    <span className="hover:text-cyan-500 transition-colors">{t.visionProductivity}</span>
                    <span className="hover:text-amber-500 transition-colors">{t.visionProgress}</span>
                  </div>
                </div>
              </div>

              {/* 3D Mine Simulation */}
              <div className="w-full h-[380px] sm:h-[440px] lg:h-[460px] relative rounded-2xl overflow-hidden border shadow-2xl border-white/10">
                <MineSimulation3D />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ══════════════════════════════════════════
          FEATURE PILLARS
          ══════════════════════════════════════════ */}
      <section id="pillars" className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`glass-card rounded-2xl border backdrop-blur-xl p-4 sm:p-5 shadow-xl ${glass}`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {pillars.map(({ icon: Icon, label, color }, i) => (
                <div key={i} className={`group flex flex-col items-center text-center p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  isLight ? 'hover:bg-amber-50/80' : 'hover:bg-white/[0.04]'
                }`}>
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center mb-2.5 transition-all ${
                    isLight ? 'border-slate-200 bg-slate-50 group-hover:border-amber-400 group-hover:bg-amber-50' : `border-white/[0.12] bg-slate-900 group-hover:border-amber-400/60`
                  }`}>
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                      isLight ? 'text-slate-700 group-hover:text-amber-700' : color
                    }`} />
                  </div>
                  <span className={`text-xs font-semibold leading-snug ${
                    isLight ? 'text-slate-700 group-hover:text-slate-900' : 'text-slate-300 group-hover:text-white'
                  }`}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS + GAZETTE
          ══════════════════════════════════════════ */}
      <section id="stats" className="py-4 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* Stats cards */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map(({ icon: Icon, value, label, valueColor }, i) => (
                <div key={i} className={`glass-card rounded-xl border p-4 flex flex-col justify-between transition-all hover:-translate-y-0.5 shadow-md ${cardBg}`}>
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-3 ${
                    isLight ? 'border-slate-200 bg-slate-100 text-amber-700' : 'border-white/[0.1] bg-slate-900 text-amber-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className={`text-2xl font-extrabold font-mono tracking-tight mb-1 ${valueColor}`}>{value}</div>
                  <div className={`text-[11px] font-medium leading-snug ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{label}</div>
                </div>
              ))}
            </div>

            {/* What's New */}
            <div id="gazette" className={`lg:col-span-5 glass-card rounded-xl border p-4 flex flex-col shadow-md ${cardBg}`}>
              <div className={`flex items-center justify-between pb-3 border-b mb-3 ${isLight ? 'border-slate-200' : 'border-white/[0.08]'}`}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                    <Megaphone className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <span className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{t.whatsNewTitle}</span>
                </div>
                <a href="#gazette" className={`text-[11px] font-semibold flex items-center gap-1 ${
                  isLight ? 'text-amber-700 hover:text-amber-800' : 'text-amber-400 hover:text-amber-300'
                }`}>
                  {t.viewAll} <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div className="space-y-3">
                {newsItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 group cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 animate-pulse" />
                    <div>
                      <div className={`flex items-center gap-2 text-[10px] font-mono mb-0.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                        <span>{item.date}</span>
                        <span className="opacity-30">•</span>
                        <span className={`px-1 py-0.5 rounded text-[9px] font-semibold ${
                          isLight ? 'bg-slate-200 text-slate-700' : 'bg-white/[0.08] text-slate-300'
                        }`}>{item.tag}</span>
                      </div>
                      <p className={`text-xs leading-snug group-hover:text-amber-500 transition-colors ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER — Scroll-animated, elegant
          ══════════════════════════════════════════ */}
      <div ref={footerRef}>
        <footer className={`w-full transition-all duration-700 ease-out border-t ${
          footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${
          isLight
            ? 'bg-white/98 border-slate-200 text-slate-700'
            : 'bg-[#04070b]/98 border-white/[0.07] text-slate-300'
        }`}>
          {/* Glowing top accent bar */}
          <div className={`w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent transition-opacity duration-1000 ${
            footerVisible ? 'opacity-100' : 'opacity-0'
          }`} />

          {/* Main footer content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">

              {/* Brand */}
              <div className={`flex items-center gap-3 transition-all duration-700 delay-100 ${
                footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                  isLight ? 'border-amber-300 bg-amber-50' : 'border-amber-500/40 bg-amber-950/40'
                }`}>
                  <AshokStambhaLogo isLight={isLight} />
                </div>
                <div>
                  <div className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {t.footerCopyright}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Sovereign Mining Digital Platform
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <nav className={`flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs transition-all duration-700 delay-150 ${
                footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                {[t.privacyPolicy, t.termsOfUse, t.accessibility, t.help, t.contactUs].map((lbl, i) => (
                  <a key={i} href={`#${lbl}`} className={`font-medium transition-colors ${
                    isLight ? 'text-slate-600 hover:text-amber-700' : 'text-slate-400 hover:text-amber-400'
                  }`}>{lbl}</a>
                ))}
              </nav>

              {/* Socials + Language */}
              <div className={`flex items-center gap-3 transition-all duration-700 delay-200 ${
                footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                {/* Social icons */}
                {[
                  { label: 'LinkedIn', path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.78-1.72-1.73s.77-1.73 1.72-1.73c.95 0 1.72.78 1.72 1.73s-.77 1.73-1.72 1.73m1.4 9.74v-8.37H5.06v8.37h2.8z' },
                  { label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                  { label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                ].map(({ label, path }) => (
                  <a key={label} href="#" aria-label={label} className={`p-1.5 rounded-lg border transition-colors ${
                    isLight ? 'border-slate-300 bg-slate-50 text-slate-500 hover:text-amber-700 hover:border-amber-500' : 'border-white/[0.08] bg-slate-900/60 text-slate-400 hover:text-amber-400 hover:border-amber-500/60'
                  }`}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d={path} />
                    </svg>
                  </a>
                ))}

                {/* Footer language picker */}
                <div className="relative" ref={footerLangRef}>
                  <button onClick={() => setFooterLangOpen(!footerLangOpen)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      isLight ? 'bg-slate-100 border-slate-300 text-slate-800 hover:border-amber-500' : 'bg-slate-900 border-white/[0.1] text-amber-300 hover:border-amber-500/50'
                    }`}>
                    <Globe className="w-3 h-3 text-amber-500" />
                    <span className="text-[11px]">{currentLangInfo.nativeName}</span>
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${footerLangOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {footerLangOpen && (
                    <div className={`absolute right-0 bottom-full mb-2 w-44 rounded-xl border shadow-2xl py-1 z-50 backdrop-blur-xl ${
                      isLight ? 'bg-white/98 border-slate-200' : 'bg-[#0c121c]/98 border-white/[0.12]'
                    }`}>
                      {SUPPORTED_LANGUAGES.map((item) => (
                        <button key={item.code} onClick={() => { setLanguage(item.code); setFooterLangOpen(false); }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors ${
                            language === item.code
                              ? isLight ? 'bg-amber-50 text-amber-800 font-semibold' : 'bg-amber-950/60 text-amber-300 font-semibold'
                              : isLight ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-200 hover:bg-white/[0.06]'
                          }`}>
                          <span>{item.nativeName}</span>
                          <span className="text-[10px] text-slate-400">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className={`mt-5 pt-4 border-t flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono transition-all duration-700 delay-300 ${
              footerVisible ? 'opacity-100' : 'opacity-0'
            } ${isLight ? 'border-slate-200 text-slate-500' : 'border-white/[0.05] text-slate-500'}`}>
              <span>{t.nicNotice}</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-emerald-500">
                  <Lock className="w-2.5 h-2.5" />
                  GIGW COMPLIANT • MEITY CERTIFIED
                </span>
                <span>© {new Date().getFullYear()} MineGov AI</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}
