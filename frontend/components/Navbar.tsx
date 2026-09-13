'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  ArrowRight,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Search,
  Check,
  Menu,
  X,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import {
  useLanguage,
  SUPPORTED_LANGUAGES,
} from '@/components/LanguageProvider';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, fontSize, setFontSize, currentLangInfo } = useLanguage();
  const isLight = theme === 'light';

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { label: t.navHome, href: '#' },
    { label: t.navAbout, href: '#about' },
    { label: t.navPlatform, href: '#pillars' },
    { label: t.navCompliance, href: '#stats' },
    { label: t.navIntelligence, href: '#pillars' },
    { label: t.navResources, href: '#gazette' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200">
      {/* Indian National Tricolor Ribbon */}
      <div className="tricolor-stripe w-full" />

      {/* Top Official Government of India Header Bar */}
      <div
        className={`px-3 sm:px-6 lg:px-8 py-1 border-b text-[11px] transition-colors ${
          isLight
            ? 'bg-slate-100/95 border-slate-200 text-slate-700'
            : 'bg-[#040609]/95 border-white/[0.06] text-slate-400'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold tracking-wider">{t.goi}</span>
            <span className="opacity-40">|</span>
            <span className="text-amber-500 font-semibold tracking-wide">
              {t.ministryOfMines}
            </span>
            <span className="hidden md:inline opacity-40">•</span>
            <span className="hidden md:inline text-slate-400 font-normal truncate">
              {t.portalSubtitle}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Satellite Live Status */}
            <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-500 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t.satelliteActive}
            </span>

            {/* Azadi Ka Amrit Mahotsav — Official GoI style golden badge */}
            <div className="hidden lg:flex items-center">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${
                  isLight
                    ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-amber-300/60 shadow-sm'
                    : 'bg-gradient-to-r from-amber-950/60 via-orange-950/40 to-amber-950/60 border-amber-600/40'
                }`}
              >
                {/* Lotus / Ashoka wheel mini emblem */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
                  <circle cx="12" cy="12" r="4" stroke="#F59E0B" strokeWidth="1.5"/>
                  {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
                    <line
                      key={i}
                      x1="12" y1="12"
                      x2={12 + 9 * Math.cos((deg * Math.PI) / 180)}
                      y2={12 + 9 * Math.sin((deg * Math.PI) / 180)}
                      stroke="#F59E0B"
                      strokeWidth="1"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                  ))}
                  <circle cx="12" cy="12" r="9" stroke="#D97706" strokeWidth="0.8" fill="none" strokeDasharray="2 1.5"/>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className={`text-[9px] font-extrabold tracking-widest uppercase ${
                    isLight ? 'text-amber-800' : 'text-amber-300'
                  }`}>
                    75
                  </span>
                  <span className={`text-[8px] font-semibold tracking-wide ${
                    isLight ? 'text-orange-700' : 'text-amber-400'
                  }`}>
                    {t.azadiTag}
                  </span>
                </div>
                {/* Tricolor micro-stripe */}
                <div className="flex flex-col gap-[1px] ml-0.5">
                  <div className="w-1 h-1 rounded-full bg-[#FF9933]"/>
                  <div className="w-1 h-1 rounded-full bg-[#f0f0f0]"/>
                  <div className="w-1 h-1 rounded-full bg-[#138808]"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <div
        className={`backdrop-blur-md border-b shadow-md transition-colors duration-200 ${
          isLight
            ? 'bg-white/92 border-slate-200/90 text-slate-900'
            : 'bg-[#070a0f]/90 border-white/[0.08] text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Official Emblem & Portal Title */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            {/* Ashok Stambha Emblem */}
            <div
              className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-all shadow-sm overflow-hidden ${
                isLight
                  ? 'bg-gradient-to-br from-amber-50 via-white to-amber-50 border border-amber-300/60 group-hover:border-amber-500'
                  : 'bg-gradient-to-br from-amber-950/60 via-[#0a1220] to-amber-950/30 border border-amber-500/50 group-hover:border-amber-400'
              }`}
            >
              {/* Ashoka Stambha SVG — Lion Capital */}
              <svg viewBox="0 0 40 44" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Base Abacus */}
                <rect x="6" y="36" width="28" height="3.5" rx="1.5" fill={isLight ? '#B45309' : '#F59E0B'}/>
                {/* Abacus wheels */}
                <circle cx="12" cy="37.75" r="1.8" fill="none" stroke={isLight ? '#92400E' : '#D97706'} strokeWidth="0.8"/>
                <circle cx="20" cy="37.75" r="1.8" fill="none" stroke={isLight ? '#92400E' : '#D97706'} strokeWidth="0.8"/>
                <circle cx="28" cy="37.75" r="1.8" fill="none" stroke={isLight ? '#92400E' : '#D97706'} strokeWidth="0.8"/>
                {/* Column shaft */}
                <rect x="18" y="20" width="4" height="16" rx="1" fill={isLight ? '#D97706' : '#F59E0B'}/>
                {/* Ashoka Chakra ring */}
                <circle cx="20" cy="16" r="6.5" fill="none" stroke={isLight ? '#B45309' : '#F59E0B'} strokeWidth="1.5"/>
                {/* Chakra spokes (12 for compact) */}
                {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
                  <line
                    key={i}
                    x1={20 + 2.5 * Math.cos((deg * Math.PI) / 180)}
                    y1={16 + 2.5 * Math.sin((deg * Math.PI) / 180)}
                    x2={20 + 6 * Math.cos((deg * Math.PI) / 180)}
                    y2={16 + 6 * Math.sin((deg * Math.PI) / 180)}
                    stroke={isLight ? '#B45309' : '#F59E0B'}
                    strokeWidth="0.9"
                  />
                ))}
                {/* Left lion (simplified) */}
                <ellipse cx="12" cy="10" rx="5" ry="3.5" fill={isLight ? '#D97706' : '#F59E0B'}/>
                <circle cx="9" cy="7" r="3.5" fill={isLight ? '#D97706' : '#F59E0B'}/>
                <circle cx="7.5" cy="7" r="2.5" fill={isLight ? '#B45309' : '#D97706'} opacity="0.7"/>
                {/* Right lion (simplified) */}
                <ellipse cx="28" cy="10" rx="5" ry="3.5" fill={isLight ? '#D97706' : '#F59E0B'}/>
                <circle cx="31" cy="7" r="3.5" fill={isLight ? '#D97706' : '#F59E0B'}/>
                <circle cx="32.5" cy="7" r="2.5" fill={isLight ? '#B45309' : '#D97706'} opacity="0.7"/>
                {/* Tricolor bottom stripe */}
                <rect x="6" y="40.5" width="28" height="1.2" rx="0.4" fill="#FF9933"/>
                <rect x="6" y="42" width="28" height="1.2" rx="0.4" fill="#138808"/>
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-lg sm:text-xl font-display">
                  MineGov<span className="text-amber-500 ml-0.5">AI</span>
                </span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider hidden xs:inline-block ${
                    isLight
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  GOI.INTEL
                </span>
              </div>
              <span
                className={`text-[10px] font-medium tracking-wide line-clamp-1 max-w-[190px] sm:max-w-none ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {t.ministryOfMines}
              </span>
            </div>
          </Link>

          {/* Middle: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-colors ${
                  idx === 0
                    ? isLight
                      ? 'text-amber-700 bg-amber-50 font-semibold'
                      : 'text-amber-400 bg-amber-950/40 font-semibold'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Search, Font Size, Language, Theme, Access */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Search Input (Collapsible/Compact) */}
            <div className="relative hidden md:block">
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 focus-within:border-amber-500 focus-within:bg-white'
                    : 'bg-slate-900/80 border-white/[0.1] focus-within:border-amber-500/60 focus-within:bg-slate-900'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none w-28 lg:w-44 text-[11px] placeholder:text-slate-500 text-inherit"
                />
              </div>
            </div>

            {/* Accessibility Font Size Controls (A- / A / A+) */}
            <div
              className={`hidden sm:flex items-center border rounded-lg overflow-hidden text-[11px] font-mono ${
                isLight ? 'border-slate-300 bg-slate-100' : 'border-white/[0.1] bg-slate-900/80'
              }`}
              title="Adjust Font Size"
            >
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 transition-colors ${
                  fontSize === 'sm'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-amber-400'
                }`}
                aria-label="Decrease Font Size"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 border-x border-inherit transition-colors ${
                  fontSize === 'base'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-amber-400'
                }`}
                aria-label="Normal Font Size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 transition-colors ${
                  fontSize === 'lg'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-amber-400'
                }`}
                aria-label="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* Multi-Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all ${
                  isLight
                    ? 'bg-slate-100 border-slate-300 text-slate-800 hover:border-amber-500'
                    : 'bg-slate-900/90 border-white/[0.12] text-amber-300 hover:border-amber-500/60 shadow-sm'
                }`}
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-bold text-[11px]">{currentLangInfo.nativeName}</span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                    langDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {langDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-2xl py-1.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 ${
                    isLight
                      ? 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-900/10'
                      : 'bg-[#0c121c]/95 border-white/[0.12] text-white shadow-black/80'
                  }`}
                >
                  <div className="px-3 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-inherit/10">
                    Choose Language
                  </div>
                  {SUPPORTED_LANGUAGES.map((item) => {
                    const isSelected = language === item.code;
                    return (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLanguage(item.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                          isSelected
                            ? isLight
                              ? 'bg-amber-50 text-amber-800 font-semibold'
                              : 'bg-amber-950/50 text-amber-300 font-semibold'
                            : isLight
                            ? 'hover:bg-slate-100 text-slate-700'
                            : 'hover:bg-white/[0.06] text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 text-[10px] font-mono text-amber-500 font-bold">
                            {item.flagLabel}
                          </span>
                          <span>{item.nativeName}</span>
                          <span className="text-[10px] text-slate-400">({item.name})</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-500" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all duration-200 flex items-center justify-center ${
                isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-900 border-white/[0.1] text-amber-400 hover:bg-slate-800'
              }`}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle Theme"
            >
              {isLight ? (
                <Moon className="w-3.5 h-3.5 text-slate-700" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              )}
            </button>

            {/* Access Portal Button */}
            <Link
              href="/portal"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-md shrink-0 ${
                isLight
                  ? 'bg-slate-900 hover:bg-slate-800 text-white'
                  : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-bold hover:brightness-110 shadow-amber-950/40'
              }`}
            >
              <Lock className={`w-3 h-3 ${isLight ? 'text-amber-400' : 'text-slate-950'}`} />
              <span className="hidden xs:inline">{t.accessPortal}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-white/[0.1] text-slate-400 hover:text-white"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className={`xl:hidden border-t px-4 py-3 space-y-2 backdrop-blur-xl ${
              isLight ? 'bg-white/95 border-slate-200' : 'bg-[#070a0f]/95 border-white/[0.08]'
            }`}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-white/[0.06]"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

      </div>
    </header>
  );
}
