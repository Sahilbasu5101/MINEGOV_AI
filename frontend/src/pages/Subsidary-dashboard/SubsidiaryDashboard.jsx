import React, { useState, useEffect } from 'react';

export function SubsidiaryDashboard({ onBackToGateway, onBackToHome }) {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('minegov_theme') !== 'light';
    });
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedGISZone, setSelectedGISZone] = useState('Area XII (Southern - Critical Hazard Zone)');
    const [modalData, setModalData] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
    const [drillDownModal, setDrillDownModal] = useState(null);
    const [showAllStatutory, setShowAllStatutory] = useState(false);
    const [showAllEscalations, setShowAllEscalations] = useState(false);
    const [hoveredSlice, setHoveredSlice] = useState(null);
    const [pulse, setPulse] = useState(false);
    const [syncTime, setSyncTime] = useState('15:21:01');

    useEffect(() => {
        localStorage.setItem('minegov_theme', darkMode ? 'dark' : 'light');
        const interval = setInterval(() => {
            setPulse(p => !p);
            const now = new Date();
            setSyncTime(now.toTimeString().split(' ')[0]);
        }, 2000);
        return () => clearInterval(interval);
    }, [darkMode]);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 4000);
    };

    const tabs = [
        {
            id: 'overview',
            label: '01 Executive Overview',
            badge: null,
            iconColor: 'text-cyan-400',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            )
        },
        {
            id: 'monitor',
            label: '02 Regional SCADA & IoT',
            badge: 'LIVE',
            iconColor: 'text-red-400',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            )
        },
        {
            id: 'gis',
            label: '03 GIS & Lease Map',
            badge: 'ISRO',
            iconColor: 'text-cyan-300',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
            )
        },
        {
            id: 'escalations',
            label: '04 HQ Escalations',
            badge: '7 ACTIVE',
            iconColor: 'text-purple-400',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            )
        },
        {
            id: 'statutory',
            label: '05 Statutory Vault',
            badge: 'HSM',
            iconColor: 'text-pink-400',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            )
        },
    ];

    const theme = {
        bg: darkMode ? 'bg-[#07090E] text-slate-100' : 'bg-[#F8FAFC] text-slate-900',
        sidebar: 'bg-[#0D1117] border-slate-800 text-slate-300',
        card: darkMode ? 'bg-[#1E293B]/90 border-slate-800 shadow-md' : 'bg-white border-[#CBD5E1] shadow-sm',
        cardText: darkMode ? 'text-slate-400' : 'text-[#334155]',
        primaryText: darkMode ? 'text-slate-100' : 'text-[#0F172A]',
        tableHeader: darkMode ? 'bg-black/40 text-slate-400 border-slate-800' : 'bg-[#E2E8F0] text-[#0F172A] border-[#CBD5E1]',
        tableDivide: darkMode ? 'divide-slate-800/60' : 'divide-[#CBD5E1]',
    };

    const subsidiaryShares = [
        { name: 'MCL (Mahanadi)', share: 18.4, out: '138.2 MT', color: '#3b82f6' },
        { name: 'SECL (South Eastern)', share: 16.7, out: '125.0 MT', color: '#10b981' },
        { name: 'NCL (Northern)', share: 15.9, out: '119.2 MT', color: '#f59e0b' },
        { name: 'CCL (Central)', share: 12.8, out: '96.0 MT', color: '#8b5cf6' },
        { name: 'WCL (Western)', share: 12.2, out: '91.5 MT', color: '#ec4899' },
        { name: 'BCCL (Bharat Coking)', share: 11.4, out: '85.5 MT', color: '#06b6d4' },
        { name: 'ECL (Eastern)', share: 7.6, out: '57.0 MT', color: '#ef4444' },
        { name: 'SCCL/Other', share: 5.0, out: '37.5 MT', color: '#64748b' },
    ];

    const statutoryFilingsList = [
        { doc: 'Monthly Production Return (Form IV)', auth: 'Ministry of Coal', period: 'August 2026', status: 'PENDING', statColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30', hash: 'sha256:88e2c0199f31ab4d...', sig: 'Required (CMD)' },
        { doc: 'DGMS Annual Safety Compliance Report', auth: 'DGMS Dhanbad', period: 'Q2 2026', status: 'SIGNED', statColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', hash: 'sha256:39a1f88e2c0199f3...', sig: 'Shri R. K. Sharma (IAS)' },
        { doc: 'OCEMS Environmental Submission', auth: 'State Pollution Control Board', period: 'Monthly (Aug)', status: 'SUBMITTED', statColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20', hash: 'sha256:77b4d990bc1298cde...', sig: 'Chief Environment Officer' },
        { doc: 'Mine Accident & Incident Register', auth: 'DGMS Safety Directorate', period: 'Current Cycle', status: 'SIGNED', statColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', hash: 'sha256:12c990bc1298cde7...', sig: 'Director Safety' },
        { doc: 'Explosives Usage & Magazine Return', auth: 'Chief Controller of Explosives', period: 'Monthly (Aug)', status: 'SIGNED', statColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', hash: 'sha256:99f2b1188e2c0199...', sig: 'General Manager (Safety)' },
        { doc: 'Ground Water Extraction Audit Report', auth: 'Central Ground Water Authority', period: 'H1 2026', status: 'SUBMITTED', statColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20', hash: 'sha256:44d3c2277f1088ab...', sig: 'Chief Environment Officer' },
        { doc: 'Vocational Training Centre (VTC) Return', auth: 'DGMS Training Board', period: 'Q2 2026', status: 'SIGNED', statColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', hash: 'sha256:55e4d3366a0977bc...', sig: 'Director Personnel' },
        { doc: 'CSR & Sustainable Development Report', auth: 'Ministry of Coal', period: 'Annual 2025-26', status: 'PENDING', statColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30', hash: 'sha256:66f5e4455b1866ed...', sig: 'Required (CMD)' }
    ];

    const escalationsList = [
        { pri: 'CRITICAL', ref: 'ESC-2026-901', area: 'Area XII / KGF-04', reg: 'CMR Reg. 153', issue: 'Methane Hazard exceedance > 0.8% unmitigated', age: '13h 10m', owner: 'Subsidiary CMD' },
        { pri: 'CRITICAL', ref: 'ESC-2026-884', area: 'ECL / Sanctoria', reg: 'CMR Reg. 142', issue: 'Ventilation Compliance Breach in Underground Panel', age: '28h 15m', owner: 'Director Safety' },
        { pri: 'HIGH', ref: 'ESC-2026-812', area: 'CCL / Kusunda', reg: 'Water Act Sec 25', issue: 'OCEMS Environmental Reporting Delay (>24h)', age: '19h 06m', owner: 'Chief Environment' },
        { pri: 'HIGH', ref: 'ESC-2026-790', area: 'SECL / Gevra', reg: 'DGMS Guideline', issue: 'DGMS Inspection Observation on Overburden Slope', age: '32h 40m', owner: 'Mine Manager' },
        { pri: 'MEDIUM', ref: 'ESC-2026-754', area: 'NCL / Jhingurda', reg: 'Rail Despatch SLA', issue: 'Rail Dispatch SLA Breach (Wagon Deficit)', age: '11h 42m', owner: 'GM Sales & Mktg' },
        { pri: 'MEDIUM', ref: 'ESC-2026-712', area: 'MCL / Talcher', reg: 'Safety Rule 42', issue: 'Heavy Earth Moving Machinery (HEMM) proximity sensor failure', age: '08h 20m', owner: 'Chief Maintenance' },
        { pri: 'LOW', ref: 'ESC-2026-699', area: 'BCCL / Lodna', reg: 'Statutory Return', issue: 'Quarterly welfare committee meeting minutes submission pending', age: '44h 10m', owner: 'Welfare Officer' }
    ];

    return (
        <div className={`${theme.bg} h-screen w-screen flex overflow-hidden font-sans text-xs select-none transition-colors duration-200 relative`}>

            {toastMessage && (
                <div className="fixed bottom-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2.5 border border-emerald-500 animate-bounce">
                    <span className="font-bold">✓ SUCCESS:</span> {toastMessage}
                </div>
            )}

            {drillDownModal && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
                    <div className={`${darkMode ? 'bg-[#1E293B] border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'} p-6 rounded-xl border max-w-2xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto`}>
                        <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">
                                {drillDownModal === 'notifications' && '📋 All Active HQ Notifications & Compliance Alerts'}
                                {drillDownModal === 'activity' && '⚡ Complete Recent Operational Activity Log'}
                                {drillDownModal === 'production' && '📈 Detailed Subsidiary Production & Target Audit'}
                                {drillDownModal === 'workforce' && '👷 Workforce & Safety Readiness Detailed Breakdown'}
                            </h3>
                            <button onClick={() => setDrillDownModal(null)} className="text-slate-400 hover:text-white font-bold cursor-pointer text-sm">✕</button>
                        </div>

                        <div className="space-y-3 text-xs">
                            {drillDownModal === 'notifications' && (
                                <div className="space-y-2">
                                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"><p className="font-bold text-red-500">🔴 KGF-04 Methane Exceedance (&gt;0.8%)</p><p className="text-[11px] text-slate-300 mt-0.5">Unresolved for 13h 10m under CMR Reg. 153. Chairman endorsement required.</p></div>
                                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg"><p className="font-bold text-amber-500">🟠 Area X OCEMS Filing Pending</p><p className="text-[11px] text-slate-300 mt-0.5">Continuous ambient air quality monitoring return due before midnight.</p></div>
                                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg"><p className="font-bold text-amber-500">🟡 Rail Dispatch Deficit (-18 rakes)</p><p className="text-[11px] text-slate-300 mt-0.5">SECR corridor congestion affecting thermal power plant coal buffer stocks.</p></div>
                                    <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg"><p className="font-bold text-blue-400">🔵 GIS Telemetry Sync Complete</p><p className="text-[11px] text-slate-300 mt-0.5">ISRO Bhuvan lease boundaries successfully verified across all 48 mine districts.</p></div>
                                </div>
                            )}

                            {drillDownModal === 'activity' && (
                                <div className="space-y-2 font-mono text-[11px]">
                                    <div className="p-2.5 bg-black/40 rounded border border-slate-800 flex justify-between"><span>14:32 — KGF-04 methane threshold crossed</span><span className="text-red-400">ALARM</span></div>
                                    <div className="p-2.5 bg-black/40 rounded border border-slate-800 flex justify-between"><span>14:29 — Area XII GIS zone synchronized</span><span className="text-emerald-400">SYNCED</span></div>
                                    <div className="p-2.5 bg-black/40 rounded border border-slate-800 flex justify-between"><span>14:24 — Rail routing recommendation generated</span><span className="text-blue-400">AI OPTIMIZER</span></div>
                                    <div className="p-2.5 bg-black/40 rounded border border-slate-800 flex justify-between"><span>14:18 — Safety inspection closed (Kusunda Pit 02)</span><span className="text-emerald-400">VERIFIED</span></div>
                                    <div className="p-2.5 bg-black/40 rounded border border-slate-800 flex justify-between"><span>14:05 — Statutory filing digitally signed (Form IV)</span><span className="text-emerald-400">HSM SIGNED</span></div>
                                </div>
                            )}

                            {drillDownModal === 'production' && (
                                <div className="space-y-2">
                                    <p className="text-slate-300">Subsidiary performance tracking against annual allocation of 780 MT. Current aggregate achievement stands at 98.2% pace.</p>
                                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                                        <div className="p-3 bg-black/40 rounded border border-slate-800"><p className="text-slate-400">MCL Actual Output:</p><p className="text-blue-400 font-bold text-sm">142.4 MT (104.2% Target)</p></div>
                                        <div className="p-3 bg-black/40 rounded border border-slate-800"><p className="text-slate-400">SECL Actual Output:</p><p className="text-emerald-400 font-bold text-sm">138.6 MT (99.1% Target)</p></div>
                                        <div className="p-3 bg-black/40 rounded border border-slate-800"><p className="text-slate-400">NCL Actual Output:</p><p className="text-amber-400 font-bold text-sm">98.2 MT (102.5% Target)</p></div>
                                        <div className="p-3 bg-black/40 rounded border border-slate-800"><p className="text-slate-400">ECL Actual Output (Crit):</p><p className="text-red-400 font-bold text-sm">28.4 MT (86.1% Target)</p></div>
                                    </div>
                                </div>
                            )}

                            {drillDownModal === 'workforce' && (
                                <div className="space-y-2 text-xs">
                                    <p className="text-slate-300">Subsidiary-wide workforce readiness and safety compliance audit summary:</p>
                                    <div className="p-3 bg-black/40 rounded border border-slate-800 space-y-1.5 font-mono">
                                        <p className="flex justify-between"><span>Total Deployed Workforce:</span> <strong className="text-slate-100">238,400 Men</strong></p>
                                        <p className="flex justify-between"><span>Biometric Muster Attendance:</span> <strong className="text-emerald-400">98.4% Active</strong></p>
                                        <p className="flex justify-between"><span>Mandatory Safety Training (VTC):</span> <strong className="text-emerald-400">96.8% Compliant</strong></p>
                                        <p className="flex justify-between"><span>Periodic Medical Examination (PME):</span> <strong className="text-amber-400">94.2% Verified</strong></p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end pt-3 border-t border-slate-700">
                            <button onClick={() => setDrillDownModal(null)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer">Close Window</button>
                        </div>
                    </div>
                </div>
            )}

            {showNotificationDrawer && (
                <div className="fixed inset-0 bg-black/75 z-50 flex justify-end backdrop-blur-sm animate-fadeIn">
                    <div className={`${darkMode ? 'bg-[#0F172A] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'} w-96 h-full p-5 border-l shadow-2xl flex flex-col justify-between`}>
                        <div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">🚨 HQ Notifications &amp; SOP Guidelines</h3>
                                <button onClick={() => setShowNotificationDrawer(false)} className="text-slate-400 hover:text-white font-bold cursor-pointer">✕</button>
                            </div>

                            <div className="py-4 space-y-3 overflow-y-auto max-h-[calc(100vh-140px)] text-xs">
                                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg space-y-1">
                                    <p className="font-bold text-red-500 flex justify-between"><span>CRITICAL METHANE SPIKE</span> <span>13h ago</span></p>
                                    <p className="text-[11px] text-slate-300">Area XII / KGF-04 CH4 level reached 0.84% under CMR Reg. 153. Chairman endorsement required.</p>
                                </div>

                                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg space-y-1">
                                    <p className="font-bold text-amber-500 flex justify-between"><span>OCEMS COMPLIANCE NOTICE</span> <span>24h left</span></p>
                                    <p className="text-[11px] text-slate-300">Area X continuous ambient air quality monitoring return due before midnight.</p>
                                </div>

                                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg space-y-1">
                                    <p className="font-bold text-blue-400 flex justify-between"><span>STANDARD OPERATING PROCEDURE</span> <span>SOP #402</span></p>
                                    <p className="text-[11px] text-slate-300"><strong>Emergency Power Interruption:</strong> Verify underground ventilation fan backup before executing remote power cutoff.</p>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => setShowNotificationDrawer(false)} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold cursor-pointer">Close Drawer</button>
                    </div>
                </div>
            )}

            {modalData && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className={`${darkMode ? 'bg-[#1E293B] border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'} p-6 rounded-xl border max-w-lg w-full shadow-2xl space-y-4`}>
                        <div className="flex justify-between items-center pb-3 border-b border-slate-700/60">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                                <h3 className="text-sm font-bold tracking-wide uppercase text-blue-400">MINEGOV AI &bull; Command Action Terminal</h3>
                            </div>
                            <button onClick={() => setModalData(null)} className="text-slate-400 hover:text-white font-bold cursor-pointer text-sm">✕</button>
                        </div>

                        <div className="space-y-2 text-xs">
                            <p className="font-medium">{modalData.description}</p>
                            <div className="p-3 bg-[#090D16] rounded-lg border border-slate-700 space-y-1.5 text-[11px] font-mono shadow-inner text-slate-200">
                                <p><span className="text-slate-400 font-semibold">ACTION REQUEST:</span> <span className="text-cyan-400">{modalData.action}</span></p>
                                <p><span className="text-slate-400 font-semibold">TARGET ENTITY:</span> <span className="text-emerald-400">{modalData.target}</span></p>
                                <p><span className="text-slate-400 font-semibold">AUTHORITY TIER:</span> <span className="text-slate-200">Subsidiary CMD (Shri R. K. Sharma, IAS)</span></p>
                                <p><span className="text-slate-400 font-semibold">SECURITY HASH:</span> <span className="text-amber-400">SHA-256 HSM Token Verified</span></p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-700/60">
                            <button onClick={() => setModalData(null)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold cursor-pointer">Cancel</button>
                            <button onClick={() => { showToast(`Authorized & Executed: ${modalData.action}`); setModalData(null); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer shadow-lg">
                                Authorize &amp; Execute
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <aside className={`w-64 ${theme.sidebar} border-r p-3.5 flex flex-col justify-between shrink-0 h-full z-10`}>
                <div>
                    <div className="mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
                        <div>
                            <h1 className="text-xs font-bold text-emerald-400 tracking-wider">MINEGOV AI</h1>
                            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">SUBSIDIARY COMMAND</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/80">
                            <span className={`w-2 h-2 rounded-full ${pulse ? 'bg-emerald-400 animate-ping' : 'bg-emerald-600'}`}></span>
                            <span className="text-[8px] text-emerald-400 font-bold">SCADA LIVE</span>
                        </div>
                    </div>

                    <div className="text-[9px] text-slate-500 mb-1.5 font-bold uppercase tracking-wider">Core Command Modules</div>
                    <nav className="space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center justify-between ${activeTab === tab.id ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-900/30' : 'hover:bg-slate-800/80 text-slate-300'
                                    }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className={activeTab === tab.id ? 'text-white' : tab.iconColor}>{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </div>
                                {tab.badge && (
                                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${tab.badge === '7 ACTIVE' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800 text-slate-400'}`}>
                                        {tab.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/80 text-[9px] space-y-1 text-slate-400">
                        <p className="font-bold text-slate-300 flex justify-between"><span>SYSTEM STATUS</span> <span className="text-emerald-400">● 100%</span></p>
                        <p className="flex justify-between"><span>SCADA Network:</span> <span className="text-emerald-400">Online</span></p>
                        <p className="flex justify-between"><span>GIS Sync:</span> <span className="text-emerald-400">Synced</span></p>
                        <p className="flex justify-between"><span>Statutory Ledger:</span> <span className="text-emerald-400">Verified</span></p>
                    </div>

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold border border-slate-700 cursor-pointer flex items-center justify-center gap-2 transition-colors"
                    >
                        {darkMode ? "☀️ Light Theme Mode" : "🌙 Dark Theme Mode"}
                    </button>

                    {onBackToGateway && (
                        <button
                            onClick={onBackToGateway}
                            className="w-full py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 text-[10px] font-semibold border border-red-800/60 cursor-pointer flex items-center justify-center gap-2 transition-colors"
                            title="Return to Access Gateway"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Exit to Gateway</span>
                        </button>
                    )}
                </div>
            </aside>

            <main className="flex-1 p-4 h-full overflow-y-auto flex flex-col justify-between space-y-3">

                <header className={`flex justify-between items-center pb-3 border-b ${darkMode ? 'border-slate-800' : 'border-[#CBD5E1]'}`}>
                    <div>
                        <h2 className={`text-sm font-bold ${theme.primaryText} uppercase tracking-wide`}>
                            {activeTab === 'overview' && 'Subsidiary Command Center • Enterprise production, safety & compliance intelligence'}
                            {activeTab === 'monitor' && 'Regional SCADA & IoT • Live telemetry from monitored mine districts'}
                            {activeTab === 'gis' && 'GIS & Lease Map • Spatial intelligence, lease boundaries and environmental buffers'}
                            {activeTab === 'escalations' && 'HQ Escalations • Priority statutory and operational interventions'}
                            {activeTab === 'statutory' && 'Statutory Vault • Regulatory filings, DGMS and Ministry of Coal compliance'}
                        </h2>
                        <p className={`text-[9px] ${theme.cardText} font-mono mt-0.5`}>
                            SUBSIDIARY HQ &bull; REPORTING CYCLE: CURRENT &bull; LAST SYNC: {syncTime}
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        {onBackToGateway && (
                            <button
                                onClick={onBackToGateway}
                                className={`px-3 py-1.5 rounded-xl border text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                                    darkMode
                                        ? 'bg-[#1E293B] border-slate-700 text-slate-200 hover:bg-slate-800'
                                        : 'bg-white border-[#CBD5E1] text-slate-800 hover:bg-slate-100 shadow-sm'
                                }`}
                                title="Return to Access Gateway"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>← Gateway</span>
                            </button>
                        )}

                        {onBackToHome && (
                            <button
                                onClick={onBackToHome}
                                className={`px-3 py-1.5 rounded-xl border text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                                    darkMode
                                        ? 'bg-[#1E293B] border-slate-700 text-slate-200 hover:bg-slate-800'
                                        : 'bg-white border-[#CBD5E1] text-slate-800 hover:bg-slate-100 shadow-sm'
                                }`}
                                title="Return to Portal Landing Page"
                            >
                                <span>Portal Home</span>
                            </button>
                        )}

                        <button
                            onClick={() => setShowNotificationDrawer(true)}
                            className={`p-2.5 rounded-xl border ${darkMode ? 'bg-[#1E293B] border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white border-[#CBD5E1] text-slate-800 hover:bg-slate-100'} cursor-pointer relative shadow-sm`}
                            title="Open Notifications & Guidelines"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                        </button>

                        <div className={`flex items-center gap-3 px-3.5 py-2 rounded-xl border ${theme.card}`}>
                            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow">CMD</div>
                            <div className="text-right">
                                <p className={`font-bold ${theme.primaryText} text-[11px]`}>Shri R. K. Sharma, IAS</p>
                                <p className="text-[9px] text-emerald-500 font-semibold">Subsidiary CMD &bull; Apex ID: CIL-9024</p>
                            </div>
                        </div>
                    </div>
                </header>

                {activeTab === 'overview' && (
                    <div className="space-y-3 animate-fadeIn flex-1 flex flex-col justify-between">
                        <div className="space-y-3">

                            <div className={`border-l-4 border-red-500 px-3.5 py-2 rounded-r-lg flex items-center justify-between text-[11px] ${darkMode ? 'bg-red-950/40 text-red-200 border-y border-r border-red-900/40' : 'bg-red-50 text-red-900 border border-red-200'}`}>
                                <div className="flex items-center gap-2.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                                    <span className="font-bold tracking-wide">CRITICAL NOTICE: Area XII / KGF-04 Methane exceedance &gt; 0.8% requires Chairman endorsement.</span>
                                </div>
                                <button
                                    onClick={() => setModalData({ action: 'Review & Endorse Stop-Work', target: 'Area XII / KGF-04 District A', description: 'Methane concentration exceeded safety limit (0.84%). Immediate Chairman endorsement required under CMR Reg. 153.' })}
                                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold cursor-pointer shadow"
                                >
                                    Review &amp; Endorse
                                </button>
                            </div>

                            <div className="grid grid-cols-5 gap-3">
                                <div className={`p-3 rounded-xl border ${theme.card}`}>
                                    <p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Annual Target</p>
                                    <h3 className={`text-sm font-extrabold mt-1 ${theme.primaryText}`}>594.8 / 780 MT</h3>
                                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '76.2%' }}></div>
                                    </div>
                                    <p className={`text-[9px] ${theme.cardText} mt-1.5 flex justify-between`}><span>Pace of Target</span> <strong className="text-emerald-600 dark:text-emerald-400 font-bold">98.2%</strong></p>
                                </div>

                                <div className={`p-3 rounded-xl border ${theme.card}`}>
                                    <p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Safety Index</p>
                                    <h3 className={`text-sm font-extrabold mt-1 ${theme.primaryText}`}>94.6 / 100</h3>
                                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94.6%' }}></div>
                                    </div>
                                    <p className={`text-[9px] ${theme.cardText} mt-1.5 flex justify-between`}><span>YoY Improvement</span> <strong className="text-emerald-600 dark:text-emerald-400 font-bold">+3.1%</strong></p>
                                </div>

                                <div className={`p-3 rounded-xl border ${theme.card}`}>
                                    <p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Board Escalations</p>
                                    <h3 className={`text-sm font-extrabold mt-1 text-red-500`}>04 Active</h3>
                                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div className="bg-red-500 h-full rounded-full" style={{ width: '80%' }}></div>
                                    </div>
                                    <p className={`text-[9px] ${theme.cardText} mt-1.5 flex justify-between`}><span>SLA Status</span> <strong className="text-red-500 font-bold">2 exceeded SLA</strong></p>
                                </div>

                                <div className={`p-3 rounded-xl border ${theme.card}`}>
                                    <p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Daily Rail Despatch</p>
                                    <h3 className={`text-sm font-extrabold mt-1 text-amber-600 dark:text-amber-400`}>348 Rakes</h3>
                                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '95%' }}></div>
                                    </div>
                                    <p className={`text-[9px] ${theme.cardText} mt-1.5 flex justify-between`}><span>Daily Target</span> <strong className="text-amber-600 dark:text-amber-400 font-bold">Target 366</strong></p>
                                </div>

                                <div className={`p-3 rounded-xl border ${theme.card} flex flex-col justify-between`}>
                                    <div>
                                        <p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Workforce &amp; Safety Readiness</p>
                                        <h3 className={`text-sm font-extrabold mt-1 ${theme.primaryText}`}>238,400 Men</h3>
                                        <p className={`text-[9px] ${theme.cardText} mt-1`}>Biometric Muster: <strong className="text-emerald-600 dark:text-emerald-400">98.4%</strong></p>
                                        <p className={`text-[9px] ${theme.cardText}`}>Safety Training: <strong className="text-emerald-600 dark:text-emerald-400">96.8%</strong></p>
                                    </div>
                                    <button onClick={() => setDrillDownModal('workforce')} className="text-blue-500 hover:underline font-bold text-[10px] text-left pt-1 cursor-pointer block">View Workforce →</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className={`col-span-2 p-3 rounded-xl border ${theme.card} flex items-center justify-between`}>
                                    <div className="flex items-center gap-3">
                                        <span className="px-2 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded font-bold text-[9px]">ATTENTION REQUIRED</span>
                                        <div className="flex items-center gap-4 text-[11px]">
                                            <span className={`flex items-center gap-1.5 ${theme.primaryText}`}><strong className="text-red-500">🔴</strong> KGF-04 methane threshold exceeded</span>
                                            <span className={`flex items-center gap-1.5 ${theme.primaryText}`}><strong className="text-amber-500">🟠</strong> Area X OCEMS filing pending</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setDrillDownModal('notifications')} className="text-blue-500 hover:underline font-bold text-[11px] cursor-pointer">View All →</button>
                                </div>

                                <div className={`p-3 rounded-xl border ${theme.card} flex items-center justify-between`}>
                                    <span className={`text-[10px] font-bold uppercase ${theme.cardText}`}>Quick Actions</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => setActiveTab('monitor')} className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded text-[10px] font-semibold cursor-pointer">Open SCADA</button>
                                        <button onClick={() => setActiveTab('gis')} className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded text-[10px] font-semibold cursor-pointer">Inspect GIS</button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">

                                <div className={`col-span-2 p-3.5 rounded-xl border ${theme.card} flex flex-col justify-between`}>
                                    <div>
                                        <div className="flex justify-between items-center mb-2.5">
                                            <div>
                                                <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>Strategic Performance Matrix</h3>
                                                <p className={`text-[9px] ${theme.cardText}`}>Subsidiary operational health • Current reporting cycle</p>
                                            </div>
                                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[9px] font-bold">● Live National Rollup</span>
                                        </div>

                                        <table className="w-full text-left text-[11px]">
                                            <thead>
                                                <tr className={`border-b ${theme.tableHeader} text-[9px] uppercase font-mono`}>
                                                    <th className="p-2">Subsidiary</th>
                                                    <th className="p-2">Output</th>
                                                    <th className="p-2">Safety</th>
                                                    <th className="p-2">Environment</th>
                                                    <th className="p-2">Trend</th>
                                                    <th className="p-2 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className={`divide-y ${theme.tableDivide}`}>
                                                {[
                                                    { name: 'MCL (Mahanadi)', out: '142.4 MT', safety: 'NORMAL', safetyColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20', ocems: 'PASS', trend: '↑ +2.4%' },
                                                    { name: 'SECL (South Eastern)', out: '138.6 MT', safety: 'NORMAL', safetyColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20', ocems: 'PASS', trend: '↑ +1.1%' },
                                                    { name: 'NCL (Northern)', out: '98.2 MT', safety: 'NORMAL', safetyColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20', ocems: 'PASS', trend: '↑ +3.2%' },
                                                    { name: 'CCL (Central)', out: '64.5 MT', safety: 'WATCH', safetyColor: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20', ocems: 'WATCH', trend: '→ 0.0%' },
                                                    { name: 'WCL (Western)', out: '46.2 MT', safety: 'WATCH', safetyColor: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20', ocems: 'WATCH', trend: '↓ -0.8%' },
                                                    { name: 'BCCL (Bharat Coking)', out: '32.8 MT', safety: 'WATCH', safetyColor: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20', ocems: 'WATCH', trend: '↓ -1.2%' },
                                                    { name: 'ECL (Eastern)', out: '28.4 MT', safety: 'CRITICAL', safetyColor: 'text-red-500 bg-red-500/10 border-red-500/20', ocems: 'FAIL', trend: '↓ -4.5%' },
                                                ].map((row, idx) => (
                                                    <tr key={idx} className="hover:bg-blue-600/5 transition-colors">
                                                        <td className={`p-2 font-bold ${theme.primaryText}`}>{row.name}</td>
                                                        <td className={`p-2 font-mono ${theme.primaryText}`}>{row.out}</td>
                                                        <td className="p-2">
                                                            <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${row.safetyColor}`}>{row.safety}</span>
                                                        </td>
                                                        <td className="p-2">
                                                            <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${row.ocems === 'PASS' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : row.ocems === 'WATCH' ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20'}`}>
                                                                {row.ocems}
                                                            </span>
                                                        </td>
                                                        <td className={`p-2 font-mono text-[10px] ${theme.cardText}`}>{row.trend}</td>
                                                        <td className="p-2 text-right">
                                                            <button
                                                                onClick={() => setModalData({ action: `Inspect / Intervene (${row.name})`, target: row.name, description: `Opening deep diagnostic telemetry and statutory compliance records for ${row.name}.` })}
                                                                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-semibold cursor-pointer shadow"
                                                            >
                                                                Inspect
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                                        <span className="font-bold">RECENT OPERATIONAL ACTIVITY:</span>
                                        <span>14:32 — KGF-04 methane threshold crossed</span>
                                        <span>14:29 — GIS synced</span>
                                        <span>14:18 — Inspection closed</span>
                                        <button onClick={() => setDrillDownModal('activity')} className="text-blue-500 hover:underline font-bold cursor-pointer">View Full Activity →</button>
                                    </div>
                                </div>

                                <div className="space-y-3">

                                    <div className={`p-3.5 rounded-xl border ${theme.card}`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>Monthly Output Trajectory</h3>
                                            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">+4.2% YoY</span>
                                        </div>

                                        <div className={`h-36 rounded-lg border p-2.5 flex flex-col justify-between ${darkMode ? 'bg-black/50 border-slate-800' : 'bg-slate-50 border-[#CBD5E1]'}`}>
                                            <div className={`flex justify-between text-[8px] font-mono ${theme.cardText}`}>
                                                <span>Actual vs Target (MT)</span>
                                                <span className="text-blue-500 font-bold">Scale: 80 - 120 MT</span>
                                            </div>

                                            <div className="flex items-end justify-between h-24 gap-2 px-1 relative">
                                                <div className="absolute inset-x-0 top-6 border-t border-dashed border-amber-500/60 pointer-events-none"></div>

                                                {[
                                                    { m: 'Apr', act: '82 MT', tgt: '86 MT', ach: '95.3%', var: '-4 MT', h: '40%' },
                                                    { m: 'May', act: '91 MT', tgt: '90 MT', ach: '101.1%', var: '+1 MT', h: '55%' },
                                                    { m: 'Jun', act: '95 MT', tgt: '94 MT', ach: '101.0%', var: '+1 MT', h: '62%' },
                                                    { m: 'Jul', act: '101 MT', tgt: '98 MT', ach: '103.0%', var: '+3 MT', h: '74%' },
                                                    { m: 'Aug', act: '108 MT', tgt: '104 MT', ach: '103.8%', var: '+4 MT', h: '88%' },
                                                    { m: 'Sep', act: '112 MT', tgt: '108 MT', ach: '103.7%', var: '+4 MT', h: '98%' },
                                                ].map((bar, i) => (
                                                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end">
                                                        <div className="absolute -top-16 bg-slate-900 text-slate-100 text-[9px] font-mono px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700 shadow-2xl z-30 pointer-events-none whitespace-nowrap">
                                                            <p className="font-bold text-blue-400">{bar.m} Performance</p>
                                                            <p>Actual: <strong className="text-emerald-400">{bar.act}</strong> | Target: {bar.tgt}</p>
                                                            <p>Achievement: {bar.ach} (Var: {bar.var})</p>
                                                        </div>
                                                        <div className="w-full bg-blue-600 hover:bg-blue-500 rounded-t transition-all cursor-pointer shadow" style={{ height: bar.h }}></div>
                                                        <span className={`text-[9px] font-mono font-bold ${theme.cardText}`}>{bar.m}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`p-3.5 rounded-xl border ${theme.card} flex items-center justify-between`}>
                                        <div className="space-y-1">
                                            <h4 className={`text-[10px] font-bold uppercase ${theme.primaryText}`}>Subsidiary Contribution</h4>
                                            <p className={`text-[9px] ${theme.cardText}`}>Hover slice for share details</p>
                                            <p className={`text-[10px] font-bold text-blue-500`}>{hoveredSlice ? `${hoveredSlice.name}: ${hoveredSlice.share}% (${hoveredSlice.out})` : 'Explore CIL Mix'}</p>
                                        </div>

                                        <div className="relative w-20 h-20 flex items-center justify-center">
                                            <svg viewBox="0 0 42 42" className="w-16 h-16 transform -rotate-90">
                                                {subsidiaryShares.map((sub, idx) => {
                                                    const prevSum = subsidiaryShares.slice(0, idx).reduce((acc, curr) => acc + curr.share, 0);
                                                    return (
                                                        <circle
                                                            key={idx}
                                                            cx="21" cy="21" r="15.91549430918954"
                                                            fill="transparent"
                                                            stroke={sub.color}
                                                            strokeWidth={hoveredSlice?.name === sub.name ? "6" : "4"}
                                                            strokeDasharray={`${sub.share} ${100 - sub.share}`}
                                                            strokeDashoffset={-prevSum}
                                                            onMouseEnter={() => setHoveredSlice(sub)}
                                                            onMouseLeave={() => setHoveredSlice(null)}
                                                            className="cursor-pointer transition-all duration-200"
                                                        />
                                                    );
                                                })}
                                            </svg>
                                            <div className="absolute text-center pointer-events-none">
                                                <span className={`text-[9px] font-bold block ${theme.primaryText}`}>{hoveredSlice ? `${hoveredSlice.share}%` : 'CIL'}</span>
                                                <span className={`text-[7px] uppercase ${theme.cardText}`}>Mix</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`p-3.5 rounded-xl border ${theme.card} space-y-1.5`}>
                                        <div className="flex justify-between items-center">
                                            <h4 className={`text-[10px] font-bold uppercase ${theme.primaryText}`}>Production Intelligence</h4>
                                            <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-500 rounded text-[8px] font-bold">AUDIT READY</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                                            <p className={theme.cardText}>Current Pace: <strong className="text-emerald-500">98.2%</strong></p>
                                            <p className={theme.cardText}>Month-End: <strong className="text-blue-500">+4.8%</strong></p>
                                            <p className={theme.cardText}>Rail Gap: <strong className="text-red-500">−18 Rakes</strong></p>
                                            <p className={theme.cardText}>Top Contrib: <strong className="text-emerald-500">MCL</strong></p>
                                        </div>
                                        <button onClick={() => setDrillDownModal('production')} className="text-blue-500 hover:underline font-bold text-[10px] pt-1 block cursor-pointer">View Production Details →</button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'monitor' && (
                    <div className="space-y-3.5 animate-fadeIn">
                        <div className="grid grid-cols-4 gap-3">
                            <div className={`p-3 rounded-xl border ${theme.card}`}><p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Sensors Online</p><h3 className={`text-base font-bold mt-1 ${theme.primaryText}`}>1,482 / 1,500</h3></div>
                            <div className={`p-3 rounded-xl border ${theme.card}`}><p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Active Alarms</p><h3 className="text-base font-bold mt-1 text-red-500">03 Critical</h3></div>
                            <div className={`p-3 rounded-xl border ${theme.card}`}><p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Mines Reporting</p><h3 className={`text-base font-bold mt-1 text-blue-500`}>48 / 48 Units</h3></div>
                            <div className={`p-3 rounded-xl border ${theme.card}`}><p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Last Telemetry Sync</p><h3 className={`text-base font-bold mt-1 ${theme.primaryText}`}>{syncTime}</h3></div>
                        </div>

                        <div className={`p-3.5 rounded-xl border ${theme.card}`}>
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>Live Industrial Sensor Telemetry Grid</h3>
                                    <p className={`text-[9px] ${theme.cardText}`}>Real-time IoT stream from underground and opencast districts</p>
                                </div>
                                <button
                                    onClick={() => showToast('SCADA sensor telemetry forcibly synchronized across all 48 nodes.')}
                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer shadow"
                                >
                                    Force Sensor Sync
                                </button>
                            </div>

                            <table className="w-full text-left text-[11px]">
                                <thead>
                                    <tr className={`border-b ${theme.tableHeader} text-[9px] uppercase font-mono`}>
                                        <th className="p-2.5">Mine Unit</th>
                                        <th className="p-2.5">CH₄ Methane</th>
                                        <th className="p-2.5">CO Sensor</th>
                                        <th className="p-2.5">Temperature</th>
                                        <th className="p-2.5">Ventilation</th>
                                        <th className="p-2.5">Status</th>
                                        <th className="p-2.5">Last Sync</th>
                                        <th className="p-2.5 text-right">Remote Control</th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${theme.tableDivide}`}>
                                    {[
                                        { unit: 'KGF-04 District A', ch4: '0.84%', co: '18 ppm', temp: '31.4 °C', vent: '1,420 m³/s', status: 'ALARM', statColor: 'text-red-500 bg-red-500/10 border-red-500/30', sync: '0s ago' },
                                        { unit: 'Kusunda Pit 02', ch4: '0.12%', co: '4 ppm', temp: '28.1 °C', vent: '2,850 m³/s', status: 'NORMAL', statColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30', sync: '1s ago' },
                                        { unit: 'Area IX North Block', ch4: '0.18%', co: '6 ppm', temp: '29.0 °C', vent: '3,100 m³/s', status: 'NORMAL', statColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30', sync: '0s ago' },
                                        { unit: 'Area X Central Shaft', ch4: '0.45%', co: '14 ppm', temp: '32.2 °C', vent: '1,900 m³/s', status: 'ALARM', statColor: 'text-red-500 bg-red-500/10 border-red-500/30', sync: '2s ago' },
                                        { unit: 'Area XII East Panel', ch4: '0.79%', co: '16 ppm', temp: '33.5 °C', vent: '1,550 m³/s', status: 'ALARM', statColor: 'text-red-500 bg-red-500/10 border-red-500/30', sync: '0s ago' },
                                        { unit: 'Jamadoba Section 3', ch4: '0.09%', co: '3 ppm', temp: '27.5 °C', vent: '4,200 m³/s', status: 'NORMAL', statColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30', sync: '1s ago' },
                                    ].map((row, idx) => (
                                        <tr key={idx} className="hover:bg-blue-600/5 transition-colors font-mono text-[10px]">
                                            <td className={`p-2.5 font-bold font-sans text-xs ${theme.primaryText}`}>{row.unit}</td>
                                            <td className={`p-2.5 font-bold ${row.ch4.startsWith('0.8') || row.ch4.startsWith('0.7') ? 'text-red-500 animate-pulse' : theme.primaryText}`}>{row.ch4}</td>
                                            <td className={`p-2.5 ${theme.primaryText}`}>{row.co}</td>
                                            <td className={`p-2.5 ${theme.primaryText}`}>{row.temp}</td>
                                            <td className={`p-2.5 ${theme.primaryText}`}>{row.vent}</td>
                                            <td className="p-2.5 font-sans">
                                                <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${row.statColor}`}>{row.status}</span>
                                            </td>
                                            <td className="p-2.5 text-slate-500 dark:text-slate-400">{row.sync}</td>
                                            <td className="p-2.5 text-right font-sans space-x-2">
                                                <button
                                                    onClick={() => setModalData({ action: 'Run Diagnostic', target: row.unit, description: `Executing complete SCADA sensor diagnostic routine for ${row.unit}.` })}
                                                    className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-[10px] font-semibold cursor-pointer"
                                                >
                                                    Diagnostic
                                                </button>
                                                <button
                                                    onClick={() => setModalData({ action: 'Cut Power / Isolate District', target: row.unit, description: `Executing emergency power isolation sequence for ${row.unit} due to hazardous gas accumulation.` })}
                                                    className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-semibold cursor-pointer shadow"
                                                >
                                                    Cut Power
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'gis' && (
                    <div className="space-y-3.5 animate-fadeIn">
                        <div className="grid grid-cols-3 gap-3.5">

                            <div className={`col-span-2 p-3.5 rounded-xl border ${theme.card} flex flex-col justify-between relative`}>
                                <div className="flex justify-between items-center mb-2.5">
                                    <div>
                                        <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>Spatial Intelligence &amp; Mine Lease Schematic Map</h3>
                                        <p className={`text-[9px] ${theme.cardText}`}>ISRO Bhuvan Real-Time Feed • Click cluster regions to inspect</p>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20 text-[9px] font-mono font-bold">LAT: 23.6102° N | LON: 86.1582° E</span>
                                </div>

                                <div className="relative w-full h-72 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

                                    <svg viewBox="0 0 600 320" className="w-full h-full absolute inset-0">
                                        <path d="M 120 100 L 300 90 L 450 140 L 220 230 Z" stroke="#64748b" strokeWidth="3" fill="none" opacity="0.8" strokeDasharray="4 2" />

                                        <g onClick={() => setSelectedGISZone('Area IX (Northern Cluster)')} className="cursor-pointer group">
                                            <polygon points="60,40 230,30 250,130 70,140" fill={selectedGISZone.includes('Area IX') ? '#2563eb' : '#1e3a8a'} fillOpacity={selectedGISZone.includes('Area IX') ? '0.9' : '0.5'} stroke="#60a5fa" strokeWidth="2.5" />
                                            <text x="80" y="75" fill="#93c5fd" fontSize="10" fontWeight="bold">AREA IX</text>
                                            <circle cx="150" cy="85" r="4" fill="#38bdf8" />
                                            <text x="160" y="88" fill="#e2e8f0" fontSize="8">● Mine Shaft A</text>
                                        </g>

                                        <g onClick={() => setSelectedGISZone('Area X (Central Cluster)')} className="cursor-pointer group">
                                            <polygon points="260,35 480,45 460,150 250,135" fill={selectedGISZone.includes('Area X') ? '#d97706' : '#78350f'} fillOpacity={selectedGISZone.includes('Area X') ? '0.9' : '0.5'} stroke="#fbbf24" strokeWidth="2.5" />
                                            <text x="290" y="75" fill="#fde68a" fontSize="10" fontWeight="bold">AREA X</text>
                                            <circle cx="360" cy="85" r="4" fill="#fbbf24" />
                                            <text x="370" y="88" fill="#e2e8f0" fontSize="8">● Kusunda Pit 02</text>
                                            <rect x="400" y="100" width="16" height="12" fill="#a855f7" rx="2" />
                                            <text x="420" y="110" fill="#e2e8f0" fontSize="8">▣ OB Dump-03</text>
                                        </g>

                                        <g onClick={() => setSelectedGISZone('Area XII (Southern - Critical Hazard Zone)')} className="cursor-pointer group">
                                            <polygon points="80,160 320,155 340,290 70,280" fill={selectedGISZone.includes('Area XII') ? '#dc2626' : '#991b1b'} fillOpacity={selectedGISZone.includes('Area XII') ? '0.95' : '0.7'} stroke="#f87171" strokeWidth="3" />
                                            <text x="100" y="195" fill="#fca5a5" fontSize="11" fontWeight="bold">AREA XII (Critical)</text>

                                            <circle cx="210" cy="225" r="32" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                                            <text x="245" y="215" fill="#38bdf8" fontSize="8">7.5m Safety Buffer</text>

                                            <circle cx="120" cy="240" r="4" fill="#10b981" />
                                            <text x="130" y="243" fill="#6ee7b7" fontSize="8">◆ M-01</text>

                                            <circle cx="210" cy="225" r="10" fill="#f87171" className="animate-ping" />
                                            <circle cx="210" cy="225" r="4" fill="#ef4444" />
                                            <text x="225" y="228" fill="#fca5a5" fontSize="9" fontWeight="bold">▲ KGF-04 Hazard</text>
                                        </g>
                                    </svg>
                                </div>

                                <div className={`pt-2 px-1 text-[9px] ${theme.cardText} font-mono border-t border-slate-800 flex flex-wrap gap-4 items-center justify-between`}>
                                    <span className="font-bold text-slate-300">MAP LEGEND:</span>
                                    <span>■ Mine / Lease Area</span>
                                    <span>● Mine / Shaft</span>
                                    <span>◆ Monitoring Station</span>
                                    <span>━ Haul Road</span>
                                    <span>▣ Overburden Dump</span>
                                    <span>◯ 7.5 m Safety Buffer</span>
                                    <span className="text-red-400 font-bold">▲ Active Hazard</span>
                                </div>
                            </div>

                            <div className={`p-3.5 rounded-xl border ${theme.card} flex flex-col justify-between space-y-3`}>
                                <div>
                                    <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">GIS Spatial Zone Inspector</h3>

                                    <div className="space-y-2.5 text-xs">
                                        <div className="p-2.5 bg-black/40 rounded-lg border border-slate-800">
                                            <p className={`text-[9px] ${theme.cardText} uppercase`}>Selected Area</p>
                                            <p className="font-bold text-emerald-400 text-sm mt-0.5">{selectedGISZone}</p>
                                        </div>

                                        <div className="p-2.5 bg-black/40 rounded-lg border border-slate-800 space-y-1.5 text-[11px] text-slate-300">
                                            <p className="flex justify-between"><span className={theme.cardText}>Mine Units:</span> <strong>08 Active Units</strong></p>
                                            <p className="flex justify-between"><span className={theme.cardText}>Monitoring Stations:</span> <strong>14 Stations</strong></p>
                                            <p className="flex justify-between"><span className={theme.cardText}>Overburden Dumps:</span> <strong>03 Monitored</strong></p>
                                            <p className="flex justify-between"><span className={theme.cardText}>7.5m Safety Buffer:</span> <strong className={selectedGISZone.includes('Area XII') ? 'text-red-400' : 'text-emerald-400'}>{selectedGISZone.includes('Area XII') ? 'VIOLATION DETECTED' : 'COMPLIANT'}</strong></p>
                                            <p className="flex justify-between"><span className={theme.cardText}>Bhuvan Feed:</span> <strong className="text-emerald-400">SYNCED</strong></p>
                                            <p className="flex justify-between"><span className={theme.cardText}>Active Hazards:</span> <strong className={selectedGISZone.includes('Area XII') ? 'text-red-400' : 'text-emerald-400'}>{selectedGISZone.includes('Area XII') ? '01 (Methane)' : '00'}</strong></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <button
                                        onClick={() => setModalData({ action: 'Export GeoJSON Packet', target: selectedGISZone, description: `Generating certified ISRO Bhuvan spatial GIS vector package for ${selectedGISZone}.` })}
                                        className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer shadow"
                                    >
                                        Export GeoJSON Packet
                                    </button>
                                    <button
                                        onClick={() => showToast(`High-resolution satellite feed refreshed for ${selectedGISZone}.`)}
                                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 cursor-pointer"
                                    >
                                        Refresh Satellite Feed
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* ------------------------------------------------------------------------- */}
                {/* SCREEN 4: HQ ESCALATIONS (WITH VIVID ILLUMINATED MINING SCHEMATIC) */}
                {/* ------------------------------------------------------------------------- */}
                {activeTab === 'escalations' && (
                    <div className="space-y-3.5 animate-fadeIn">
                        <div className="grid grid-cols-4 gap-3">
                            <div className={`p-3 rounded-xl border ${theme.card}`}><p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Total Active</p><h3 className={`text-base font-bold mt-1 ${theme.primaryText}`}>7 Escalations</h3></div>
                            <div className={`p-3 rounded-xl border ${theme.card}`}><p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Critical Severity</p><h3 className="text-base font-bold mt-1 text-red-500">3 Critical</h3></div>
                            <div className={`p-3 rounded-xl border ${theme.card}`}><p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>SLA Breached</p><h3 className="text-base font-bold mt-1 text-amber-500">2 Breached (&gt;24h)</h3></div>
                            <div className={`p-3 rounded-xl border ${theme.card}`}><p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Awaiting Review</p><h3 className="text-base font-bold mt-1 ${theme.primaryText}">2 Pending</h3></div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className={`col-span-2 p-3.5 rounded-xl border ${theme.card}`}>
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>HQ Escalations &amp; Action Queue</h3>
                                        <p className={`text-[9px] ${theme.cardText}`}>Priority statutory and operational interventions exceeding 24h SLA</p>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-bold">4 CRITICAL SLA BREACHES</span>
                                </div>

                                <table className="w-full text-left text-[11px]">
                                    <thead>
                                        <tr className={`border-b ${theme.tableHeader} text-[9px] uppercase font-mono`}>
                                            <th className="p-2.5">Priority</th>
                                            <th className="p-2.5">Reference</th>
                                            <th className="p-2.5">Mine / Area</th>
                                            <th className="p-2.5">Regulation</th>
                                            <th className="p-2.5">Issue Description</th>
                                            <th className="p-2.5">Age</th>
                                            <th className="p-2.5 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`divide-y ${theme.tableDivide}`}>
                                        {(showAllEscalations ? escalationsList : escalationsList.slice(0, 4)).map((row, idx) => (
                                            <tr key={idx} className="hover:bg-blue-600/5 transition-colors">
                                                <td className="p-2.5">
                                                    <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${row.pri === 'CRITICAL' ? 'text-red-500 bg-red-500/10 border-red-500/30' : row.pri === 'HIGH' ? 'text-amber-500 bg-amber-500/10 border-amber-500/30' : 'text-blue-400 bg-blue-500/10 border-blue-500/30'}`}>
                                                        {row.pri}
                                                    </span>
                                                </td>
                                                <td className={`p-2.5 font-mono text-[10px] ${theme.primaryText}`}>{row.ref}</td>
                                                <td className={`p-2.5 font-bold ${theme.primaryText}`}>{row.area}</td>
                                                <td className={`p-2.5 font-mono text-[10px] ${theme.cardText}`}>{row.reg}</td>
                                                <td className={`p-2.5 ${theme.primaryText}`}>{row.issue}</td>
                                                <td className="p-2.5 font-mono text-[10px] text-red-500 font-bold">{row.age}</td>
                                                <td className="p-2.5 text-right">
                                                    <button
                                                        onClick={() => setModalData({ action: 'Endorse Stop-Work Directive', target: `${row.area} (${row.ref})`, description: `Executing formal executive stop-work order and dispatching statutory notice for ${row.issue}.` })}
                                                        className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold cursor-pointer shadow"
                                                    >
                                                        Endorse
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="mt-3 pt-2 flex justify-center border-t border-slate-200 dark:border-slate-800">
                                    <button
                                        onClick={() => setShowAllEscalations(!showAllEscalations)}
                                        className="text-blue-500 hover:underline font-bold text-xs cursor-pointer flex items-center gap-1 py-1 px-4 rounded bg-blue-500/10 border border-blue-500/20"
                                    >
                                        {showAllEscalations ? '▲ View Less' : '▼ View More Escalations (3 More Active)'}
                                    </button>
                                </div>
                            </div>

                            {/* Right Side: Severity Breakdown + Well-Lit Animated Mining Schematic */}
                            <div className={`p-3.5 rounded-xl border ${theme.card} flex flex-col justify-between space-y-3`}>
                                <div className="space-y-3">
                                    <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>Escalation Severity Breakdown</h3>

                                    <div className="space-y-2 text-xs">
                                        <div>
                                            <div className="flex justify-between font-bold mb-1 text-[11px]">
                                                <span className="text-red-500">Critical Severity (42.8%)</span>
                                                <span>3 Cases</span>
                                            </div>
                                            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                                <div className="bg-red-500 h-full rounded-full" style={{ width: '42.8%' }}></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between font-bold mb-1 text-[11px]">
                                                <span className="text-amber-500">High Priority (28.6%)</span>
                                                <span>2 Cases</span>
                                            </div>
                                            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                                <div className="bg-amber-500 h-full rounded-full" style={{ width: '28.6%' }}></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between font-bold mb-1 text-[11px]">
                                                <span className="text-blue-500">Medium / Low (28.6%)</span>
                                                <span>2 Cases</span>
                                            </div>
                                            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                                <div className="bg-blue-500 h-full rounded-full" style={{ width: '28.6%' }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BRIGHT, WELL-LIT ANIMATED MINING SCHEMATIC ILLUSTRATION */}
                                    <div className="relative w-full h-28 rounded-lg bg-gradient-to-br from-sky-400 via-blue-200 to-amber-100 border border-slate-300 dark:border-slate-700 overflow-hidden flex flex-col items-center justify-center p-2 shadow-inner">
                                        <svg viewBox="0 0 300 120" className="w-full h-full">
                                            {/* Bright Daytime Sky */}
                                            <rect x="0" y="0" width="300" height="70" fill="#bae6fd" opacity="0.6" />

                                            {/* Open Cast Terraces */}
                                            <path d="M 0 90 L 80 75 L 160 90 L 300 65 L 300 120 L 0 120 Z" fill="#64748b" opacity="0.8" />
                                            <path d="M 40 100 L 120 85 L 220 98 L 300 80 L 300 120 L 40 120 Z" fill="#475569" opacity="0.9" />

                                            {/* Excavator Illustration */}
                                            <g transform="translate(70, 48)">
                                                <rect x="-12" y="12" width="24" height="16" fill="#f59e0b" rx="3" />
                                                <path d="M 0 16 L 30 -12 L 55 -6" stroke="#fbbf24" strokeWidth="5" fill="none" strokeLinecap="round" />
                                                <circle cx="-5" cy="28" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                                                <circle cx="8" cy="28" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                                            </g>

                                            {/* Moving Haul Dump Truck */}
                                            <g className="animate-pulse" transform="translate(190, 64)">
                                                <rect x="0" y="6" width="38" height="20" fill="#2563eb" rx="3" />
                                                <rect x="32" y="11" width="16" height="15" fill="#1d4ed8" rx="2" />
                                                <circle cx="10" cy="26" r="6" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                                                <circle cx="36" cy="26" r="6" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                                            </g>

                                            {/* Hazard Beacon Light */}
                                            <circle cx="265" cy="35" r="8" fill="#f87171" className="animate-ping" />
                                            <circle cx="265" cy="35" r="4" fill="#dc2626" />

                                            <text x="12" y="16" fill="#0f172a" fontSize="9" font-family="monospace" fontWeight="bold">● ACTIVE EXCAVATION FEED</text>
                                        </svg>
                                    </div>
                                </div>

                                {/* HIGH CONTRAST PROTOCOL BOX */}
                                <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-1 text-[11px] text-slate-100 shadow-md">
                                    <p className="font-bold text-amber-400">HQ INTERVENTION PROTOCOL:</p>
                                    <p className="text-slate-200 text-[10px] leading-tight">All critical safety escalations require joint sign-off by Director Safety and Subsidiary CMD within 24 hours.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'statutory' && (
                    <div className="space-y-3.5 animate-fadeIn">
                        <div className="grid grid-cols-4 gap-3">
                            <div className={`p-3 rounded-xl border ${theme.card}`}><p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Documents Vault</p><h3 className="text-base font-bold mt-1 text-blue-500">128 Files</h3></div>
                            <div className={`p-3 rounded-xl border ${theme.card}`}><p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Pending Signature</p><h3 className="text-base font-bold mt-1 text-amber-500">06 Filings</h3></div>
                            <div className={`p-3 rounded-xl border ${theme.card}`}><p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>Submitted &amp; Signed</p><h3 className="text-base font-bold mt-1 text-emerald-500">114 Filings</h3></div>
                            <div className={`p-3 rounded-xl border ${theme.card}`}><p className={`text-[9px] ${theme.cardText} font-bold uppercase`}>HSM Ledger Status</p><h3 className="text-base font-bold mt-1 text-emerald-500">VERIFIED</h3></div>
                        </div>

                        <div className={`p-3.5 rounded-xl border ${theme.card}`}>
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>Regulatory Filings &bull; DGMS &amp; Ministry of Coal</h3>
                                    <p className={`text-[9px] ${theme.cardText}`}>Cryptographic HSM ledger signed documents</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-mono text-emerald-500 font-bold">SHA-256 Integrity Chain: ACTIVE</span>
                                    <button
                                        onClick={() => setModalData({ action: 'Sign & Push to Ministry Portal', target: 'Batch Pending Filings (06)', description: 'Applying cryptographic HSM executive digital signature to all pending statutory returns and pushing to Ministry of Coal portal.' })}
                                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer shadow"
                                    >
                                        Sign &amp; Push All
                                    </button>
                                </div>
                            </div>

                            <table className="w-full text-left text-[11px]">
                                <thead>
                                    <tr className={`border-b ${theme.tableHeader} text-[9px] uppercase font-mono`}>
                                        <th className="p-2.5">Filing Document</th>
                                        <th className="p-2.5">Authority</th>
                                        <th className="p-2.5">Period</th>
                                        <th className="p-2.5">Status</th>
                                        <th className="p-2.5">Cryptographic Hash</th>
                                        <th className="p-2.5">Signature Holder</th>
                                        <th className="p-2.5 text-right">Action Terminal</th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${theme.tableDivide}`}>
                                    {(showAllStatutory ? statutoryFilingsList : statutoryFilingsList.slice(0, 4)).map((row, idx) => (
                                        <tr key={idx} className="hover:bg-blue-600/5 transition-colors">
                                            <td className={`p-2.5 font-bold ${theme.primaryText}`}>{row.doc}</td>
                                            <td className={`p-2.5 ${theme.primaryText}`}>{row.auth}</td>
                                            <td className={`p-2.5 font-mono text-[10px] ${theme.primaryText}`}>{row.period}</td>
                                            <td className="p-2.5">
                                                <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${row.statColor}`}>{row.status}</span>
                                            </td>
                                            <td className="p-2.5 font-mono text-[10px] text-slate-500 dark:text-slate-400">{row.hash}</td>
                                            <td className={`p-2.5 font-mono text-[10px] ${theme.primaryText}`}>{row.sig}</td>
                                            <td className="p-2.5 text-right">
                                                <button
                                                    onClick={() => setModalData({ action: 'Sign & Push to Ministry', target: row.doc, description: `Applying cryptographic HSM executive signature to ${row.doc} and pushing securely to the Ministry portal.` })}
                                                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold cursor-pointer shadow"
                                                >
                                                    {row.status === 'PENDING' ? 'Sign & Push' : 'View Ledger'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-3 pt-2 flex justify-center border-t border-slate-200 dark:border-slate-800">
                                <button
                                    onClick={() => setShowAllStatutory(!showAllStatutory)}
                                    className="text-blue-500 hover:underline font-bold text-xs cursor-pointer flex items-center gap-1 py-1 px-4 rounded bg-blue-500/10 border border-blue-500/20"
                                >
                                    {showAllStatutory ? '▲ View Less' : '▼ View More Regulatory Filings (4 More)'}
                                </button>
                            </div>

                            <div className="mt-3 pt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                                <span>RECENT SYSTEM ACTIVITY:</span>
                                <span className="text-emerald-500">14:28 — Production Return signed</span>
                                <span>13:52 — DGMS response uploaded</span>
                                <span>12:40 — OCEMS report submitted</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`pt-2 border-t flex justify-between items-center text-[9px] ${darkMode ? 'border-slate-800 text-slate-500' : 'border-gray-200 text-gray-600'} font-mono`}>
                    <span>MINEGOV AI &bull; Operational Intelligence Layer &bull; Prototype System</span>
                    <span>Secure Connection &bull; HSM Cryptographic Ledger Verified &bull; Latency: 12ms</span>
                </div>
            </main>
        </div>
    );
}

export default SubsidiaryDashboard;