'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Globe,
  ChevronDown,
  ExternalLink,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import {
  useLanguage,
  SUPPORTED_LANGUAGES,
  LanguageCode,
} from '@/components/LanguageProvider';

export default function Footer() {
  const { theme } = useTheme();
  const { language, setLanguage, t, currentLangInfo } = useLanguage();
  const isLight = theme === 'light';

  const [isVisible, setIsVisible] = useState(false);
  const [langPickerOpen, setLangPickerOpen] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const langPickerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to trigger animation when user scrolls towards footer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px 50px 0px',
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Close language picker on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langPickerRef.current &&
        !langPickerRef.current.contains(event.target as Node)
      ) {
        setLangPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const footerLinks = [
    { label: t.privacyPolicy, href: '#privacy' },
    { label: t.termsOfUse, href: '#terms' },
    { label: t.accessibility, href: '#accessibility' },
    { label: t.help, href: '#help' },
    { label: t.contactUs, href: '#contact' },
  ];

  return (
    <footer
      ref={footerRef}
      className={`w-full relative z-30 transition-all duration-700 ease-out border-t ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${
        isLight
          ? 'bg-white/95 border-slate-200 text-slate-700 shadow-lg'
          : 'bg-[#05080c]/95 border-white/[0.08] text-slate-300 shadow-2xl'
      } ${isVisible ? 'shimmer-top-border' : ''}`}
    >
      {/* Top Accent Micro-line */}
      <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      {/* Main Sleek Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Ministry Brand & Emblem */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 transition-transform duration-300 ${
                isVisible ? 'scale-100 rotate-0' : 'scale-90 -rotate-6'
              } ${
                isLight
                  ? 'border-slate-300 bg-slate-100 text-amber-700'
                  : 'border-amber-500/40 bg-amber-950/40 text-amber-400'
              }`}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 2L4 7v6c0 5.25 3.4 10.2 8 11.5 4.6-1.3 8-6.25 8-11.5V7l-8-5z" />
                <path d="M12 7v10" />
                <path d="M8 11h8" />
              </svg>
            </div>
            <div>
              <div
                className={`text-xs sm:text-sm font-bold tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {t.footerCopyright}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {t.goi} • Sovereign Mining Digital Enclave
              </div>
            </div>
          </div>

          {/* Center: Legal & Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1 text-xs">
            {footerLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className={`transition-colors duration-200 font-medium ${
                  isLight
                    ? 'text-slate-600 hover:text-amber-700'
                    : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Social Icons & Language Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Social Icons (LinkedIn, X, YouTube) */}
            <div className="flex items-center gap-1.5 text-slate-400">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`p-1.5 rounded-lg border transition-colors ${
                  isLight
                    ? 'border-slate-300 hover:border-amber-500 hover:text-slate-900 bg-slate-50'
                    : 'border-white/[0.08] hover:border-amber-500/60 hover:text-white bg-slate-900/60'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.78-1.72-1.73s.77-1.73 1.72-1.73c.95 0 1.72.78 1.72 1.73s-.77 1.73-1.72 1.73m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className={`p-1.5 rounded-lg border transition-colors ${
                  isLight
                    ? 'border-slate-300 hover:border-amber-500 hover:text-slate-900 bg-slate-50'
                    : 'border-white/[0.08] hover:border-amber-500/60 hover:text-white bg-slate-900/60'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className={`p-1.5 rounded-lg border transition-colors ${
                  isLight
                    ? 'border-slate-300 hover:border-amber-500 hover:text-slate-900 bg-slate-50'
                    : 'border-white/[0.08] hover:border-amber-500/60 hover:text-white bg-slate-900/60'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Quick Language Dropdown in Footer */}
            <div className="relative" ref={langPickerRef}>
              <button
                onClick={() => setLangPickerOpen(!langPickerOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                  isLight
                    ? 'bg-slate-100 border-slate-300 text-slate-800 hover:border-amber-500'
                    : 'bg-slate-900 border-white/[0.1] text-amber-300 hover:border-amber-500/50'
                }`}
                aria-label="Change Language"
              >
                <Globe className="w-3 h-3 text-amber-500" />
                <span className="text-[11px]">{currentLangInfo.nativeName}</span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 transition-transform ${
                    langPickerOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {langPickerOpen && (
                <div
                  className={`absolute right-0 bottom-full mb-2 w-44 rounded-xl border shadow-2xl py-1 z-50 backdrop-blur-xl animate-in fade-in duration-150 ${
                    isLight
                      ? 'bg-white/95 border-slate-200 text-slate-800'
                      : 'bg-[#0c121c]/95 border-white/[0.12] text-white'
                  }`}
                >
                  {SUPPORTED_LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangPickerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left ${
                        language === item.code
                          ? isLight
                            ? 'bg-amber-50 text-amber-800 font-semibold'
                            : 'bg-amber-950/60 text-amber-300 font-semibold'
                          : isLight
                          ? 'hover:bg-slate-100'
                          : 'hover:bg-white/[0.06]'
                      }`}
                    >
                      <span className="font-medium">{item.nativeName}</span>
                      <span className="text-[10px] text-slate-400">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Micro-Bar: NIC & NMET Sovereign Disclaimers */}
        <div
          className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono ${
            isLight ? 'border-slate-200 text-slate-500' : 'border-white/[0.05] text-slate-500'
          }`}
        >
          <span>{t.nicNotice}</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-500">
              <Lock className="w-2.5 h-2.5" />
              <span>GIGW COMPLIANT • MEITY CERTIFIED</span>
            </span>
            <span>© {new Date().getFullYear()} MineGov AI</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
