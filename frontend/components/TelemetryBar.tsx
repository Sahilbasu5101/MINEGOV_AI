'use client';

import React, { useEffect, useState } from 'react';
import { Activity, ShieldCheck, Database, Radio, Satellite } from 'lucide-react';

export default function TelemetryBar() {
  const [timeUtc, setTimeUtc] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc(now.toUTCString().replace('GMT', 'ZULU'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#05080c]/90 border-t border-white/[0.06] backdrop-blur-md px-4 sm:px-8 py-2 z-30 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-mono text-slate-400">
        
        {/* Left: Telemetry items */}
        <div className="flex items-center flex-wrap gap-x-6 gap-y-1">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-slate-500">FED-GRID:</span>
            <span className="font-semibold text-cyan-300">ONLINE</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <Satellite className="w-3 h-3 text-cyan-400" />
            <span className="text-slate-500">ORBITAL UPLINK:</span>
            <span className="text-slate-300">SENTINEL-2 / RADARSAT-2</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <Database className="w-3 h-3 text-amber-400" />
            <span className="text-slate-500">CONCESSIONS MONITORED:</span>
            <span className="text-slate-200 font-semibold">1,420 ACTIVE LEASES</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span className="text-slate-500">SLOPE INTEGRITY INDEX:</span>
            <span className="text-emerald-400 font-semibold">99.98% NOMINAL</span>
          </div>
        </div>

        {/* Right: Timestamp & classification */}
        <div className="flex items-center gap-4 ml-auto">
          <span className="hidden xl:inline text-slate-500">GOV-GRADE 256-BIT ENCRYPTION</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="flex items-center gap-2 font-semibold text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>{timeUtc || 'SYNCING ZULU...'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
