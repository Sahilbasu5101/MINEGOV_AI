'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider'; // Aapka existing ThemeProvider

const ORG_DATA = {
  cil: ['Coal India Limited (CIL)', 'Singareni Collieries (SCCL)'],
  subsidiaries: {
    'Coal India Limited (CIL)': [
      'Eastern Coalfields Limited (ECL)',
      'Bharat Coking Coal Limited (BCCL)',
      'Central Coalfields Limited (CCL)',
    ],
  },
  regions: {
    'Eastern Coalfields Limited (ECL)': ['Dhanbad Area', 'Asansol Area'],
    'Bharat Coking Coal Limited (BCCL)': ['Jharia Area', 'Kusunda Area'],
  },
  mines: {
    'Dhanbad Area': ['Kusunda OCP', 'Rajapur OCP'],
    'Asansol Area': ['Satgram Mine'],
  },
};

const ROLES = [
  { id: 'field', title: 'Field Inspector', sub: 'FIELD-OPS' },
  { id: 'env', title: 'Environment Officer', sub: 'ENV-MONITOR' },
  { id: 'prod', title: 'Production Officer', sub: 'OPS-MGMT' },
  { id: 'welfare', title: 'Welfare Officer', sub: 'HR-OFFICER' },
  { id: 'safety', title: 'Safety Inspector', sub: 'SAFETY-AUDIT' },
  { id: 'manager', title: 'Mine Manager', sub: 'SITE-DIRECTOR' },
];

export default function PortalPage() {
  const { theme, toggleTheme } = useTheme();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form States
  const [selectedCil, setSelectedCil] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedMine, setSelectedMine] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const isDark = theme === 'dark';

  const handleMineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedMine(val);
    if (val) setStep(2);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 p-6 font-sans ${isDark ? 'bg-[#070b12] text-slate-200' : 'bg-slate-50 text-slate-800'
      }`}>
      {/* Top Bar */}
      <div className={`max-w-7xl mx-auto flex justify-between items-center border-b pb-4 mb-6 ${isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
        <div>
          <h1 className="text-xl font-bold text-amber-500">MineGov AI</h1>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Secure • Compliant • Sustainable</p>
        </div>

        {/* Top Right Controls (Theme Toggle + Landing Page Button) */}
        <div className="flex items-center gap-3">
          {/* Landing Page wala same Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border text-xs font-medium transition ${isDark
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            title="Toggle Theme"
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>

          <Link
            href="/"
            className={`text-xs px-3 py-2 rounded border transition ${isDark
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
          >
            ← Return to Landing Page
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Steps */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Access MineGov AI</h2>
          <p className={`text-xs -mt-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Select your organization and role to access authorized modules and operational data.
          </p>

          {/* STEP 1: Select Organization */}
          <div className={`p-5 rounded-lg border transition ${step >= 1
              ? isDark ? 'border-amber-500/40 bg-slate-900/60' : 'border-amber-500/50 bg-white shadow-sm'
              : isDark ? 'border-slate-800 bg-slate-900/20' : 'border-slate-200 bg-slate-100'
            }`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-500 text-black font-bold text-xs">1</span>
              <div>
                <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Select Your Organization</h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Choose your operational location to access relevant data.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select
                value={selectedCil}
                onChange={(e) => { setSelectedCil(e.target.value); setSelectedSub(''); setSelectedRegion(''); setSelectedMine(''); }}
                className={`text-xs p-2.5 rounded border outline-none ${isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-amber-500'
                    : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500'
                  }`}
              >
                <option value="">Select CIL / Parent Org</option>
                {ORG_DATA.cil.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>

              <select
                disabled={!selectedCil}
                value={selectedSub}
                onChange={(e) => { setSelectedSub(e.target.value); setSelectedRegion(''); setSelectedMine(''); }}
                className={`text-xs p-2.5 rounded border outline-none disabled:opacity-40 ${isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-amber-500'
                    : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500'
                  }`}
              >
                <option value="">Select Subsidiary</option>
                {selectedCil && ORG_DATA.subsidiaries[selectedCil as keyof typeof ORG_DATA.subsidiaries]?.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <select
                disabled={!selectedSub}
                value={selectedRegion}
                onChange={(e) => { setSelectedRegion(e.target.value); setSelectedMine(''); }}
                className={`text-xs p-2.5 rounded border outline-none disabled:opacity-40 ${isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-amber-500'
                    : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500'
                  }`}
              >
                <option value="">Select Regional / Area Office</option>
                {selectedSub && ORG_DATA.regions[selectedSub as keyof typeof ORG_DATA.regions]?.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>

              <select
                disabled={!selectedRegion}
                value={selectedMine}
                onChange={handleMineChange}
                className={`text-xs p-2.5 rounded border outline-none disabled:opacity-40 ${isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-amber-500'
                    : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500'
                  }`}
              >
                <option value="">Select Mine</option>
                {selectedRegion && (ORG_DATA.mines[selectedRegion as keyof typeof ORG_DATA.mines] || ['Kusunda OCP']).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* STEP 2: Select Your Role */}
          <div className={`p-5 rounded-lg border transition ${step >= 2
              ? isDark ? 'border-amber-500/40 bg-slate-900/60' : 'border-amber-500/50 bg-white shadow-sm'
              : 'opacity-50 pointer-events-none ' + (isDark ? 'border-slate-800 bg-slate-900/20' : 'border-slate-200 bg-slate-100')
            }`}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${step >= 2 ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-300'}`}>2</span>
              <div>
                <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Select Your Role</h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Choose your role based on operational authorization.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setSelectedRole(r.title); setStep(3); }}
                  className={`p-3 text-left rounded border transition ${selectedRole === r.title
                      ? 'border-amber-500 bg-amber-500/10'
                      : isDark ? 'border-slate-800 bg-slate-950 hover:border-slate-700' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                >
                  <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{r.title}</p>
                  <p className="text-[10px] text-slate-500">{r.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: Authenticate */}
          <div className={`p-5 rounded-lg border transition ${step === 3
              ? isDark ? 'border-amber-500/40 bg-slate-900/60' : 'border-amber-500/50 bg-white shadow-sm'
              : 'opacity-50 pointer-events-none ' + (isDark ? 'border-slate-800 bg-slate-900/20' : 'border-slate-200 bg-slate-100')
            }`}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${step === 3 ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-300'}`}>3</span>
              <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Authenticate</h3>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Access Granted!"); }} className="space-y-3 max-w-md">
              <input
                type="text"
                placeholder="Government ID / Email"
                className={`w-full text-xs p-2 rounded border outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500'
                  }`}
                required
              />
              <input
                type="password"
                placeholder="Enter Security PIN"
                className={`w-full text-xs p-2 rounded border outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500'
                  }`}
                required
              />
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs py-2 rounded transition"
              >
                Sign In →
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Access Scope Side Panel */}
        <div className={`p-5 rounded-lg border h-fit space-y-4 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
          <h3 className={`text-sm font-semibold border-b pb-2 ${isDark ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
            }`}>
            Access Scope
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <p className="text-slate-500">CIL / Parent Org</p>
              <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedCil || 'Not Selected'}</p>
            </div>
            <div>
              <p className="text-slate-500">Subsidiary</p>
              <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedSub || 'Not Selected'}</p>
            </div>
            <div>
              <p className="text-slate-500">Regional / Area</p>
              <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedRegion || 'Not Selected'}</p>
            </div>
            <div>
              <p className="text-slate-500">Mine</p>
              <p className="font-medium text-amber-500">{selectedMine || 'Not Selected'}</p>
            </div>

            <div className={`border-t pt-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <p className="text-slate-500">Selected Role</p>
              <p className="font-semibold text-amber-500 text-sm">{selectedRole || 'None'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}