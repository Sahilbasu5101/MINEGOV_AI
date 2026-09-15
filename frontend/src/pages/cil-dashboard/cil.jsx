import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  ShieldAlert,
  Activity,
  Leaf,
  Users,
  Radio,
  Sun,
  Moon,
  Sparkles,
  CheckCircle,
  X,
  FileText,
  AlertOctagon,
  HeartPulse,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  ExternalLink,
  Waves,
  Trees,
  Volume2,
  ShieldCheck,
  Bell,
  ArrowUpRight,
  ChevronRight,
  Layers,
  MapPin,
  Flame,
  Droplets,
  HardHat,
  Cpu,
  Gauge,
  Wind,
  ArrowLeft
} from 'lucide-react';


export default function CilDashboard({ onNavigateGateway, onBackToGateway, onBackToHome }) {
  // Theme state: initialized cleanly with local storage and system fallback
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('minegov_theme');
      if (stored !== null) return stored === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const [activeScreen, setActiveScreen] = useState('screen1');
  const [modalData, setModalData] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [safetyFilter, setSafetyFilter] = useState('ALL');

  // Notification panel state & data
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      type: 'CRITICAL',
      title: 'KGF-04 Methane Threshold Exceeded',
      sub: 'Area XII • Requires immediate review (0.88% bleed)',
      time: '8 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'WARNING',
      title: 'Area X OCEMS Filing Pending',
      sub: 'ECL Victoria • Reporting compliance action required (pH 5.2)',
      time: '24 min ago',
      unread: true
    },
    {
      id: 3,
      type: 'INFO',
      title: 'National OCEMS Telemetry Synchronized',
      sub: 'All 8 subsidiaries reporting • 124 CAAQMS active',
      time: '1 hr ago',
      unread: false
    }
  ]);

  // Expandable view toggles
  const [screen1More, setScreen1More] = useState(false);
  const [screen2More, setScreen2More] = useState(false);
  const [screen5More, setScreen5More] = useState(false);
  const [screen6More, setScreen6More] = useState(false);

  // Digital Twin Terrain Interactive Layer State (Screen 5)
  const [activeTwinLayer, setActiveTwinLayer] = useState('all');

  const chart2Ref = useRef(null);
  const chart3Ref = useRef(null);
  const chart4Ref = useRef(null);
  const healthChartRef = useRef(null);

  const chart2Instance = useRef(null);
  const chart3Instance = useRef(null);
  const chart4Instance = useRef(null);
  const healthChartInstance = useRef(null);
  const notifRef = useRef(null);

  // Synchronize documentElement class and persistence immediately on toggle
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const body = document.body;
      if (isDark) {
        root.classList.add('dark');
        if (body) body.classList.add('dark');
        localStorage.setItem('minegov_theme', 'dark');
      } else {
        root.classList.remove('dark');
        if (body) body.classList.remove('dark');
        localStorage.setItem('minegov_theme', 'light');
      }
    }
  }, [isDark]);

  // Click outside to close notifications dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const confirmAction = (msg) => {
    if (window.confirm(msg)) {
      triggerToast('Enforcement Order Authenticated and Signed via HSM.');
    }
  };

  const markAllNotificationsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, unread: false })));
    triggerToast('All notifications marked as read.');
  };

  const unreadCount = notificationsList.filter(n => n.unread).length;

  // Chart Rendering Engines with reactive dark/light axis & grid colors
  useEffect(() => {
    const textColor = isDark ? '#94a3b8' : '#475569';
    const gridColor = isDark ? '#1e293b' : '#e2e8f0';

    if (activeScreen === 'screen2' && chart2Ref.current) {
      if (chart2Instance.current) chart2Instance.current.destroy();
      chart2Instance.current = new Chart(chart2Ref.current, {
        type: 'line',
        data: {
          labels: ['Oct 2025', 'Jan 2026', 'Apr 2026', 'Jul 2026', 'Sep 2026 (FAR: 0.14)'],
          datasets: [
            {
              label: 'Serious Injuries',
              data: [0.38, 0.32, 0.28, 0.22, 0.17],
              borderColor: '#ef4444',
              backgroundColor: '#ef4444',
              borderWidth: 2.5,
              tension: 0.3,
              pointRadius: 4
            },
            {
              label: 'LTIFR Rate',
              data: [0.32, 0.26, 0.21, 0.18, 0.14],
              borderColor: '#0284c7',
              backgroundColor: '#0284c7',
              borderWidth: 2.5,
              tension: 0.3,
              pointRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              labels: { color: textColor, font: { size: 11, weight: '600' }, boxWidth: 12 }
            }
          },
          scales: {
            y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 10 } } },
            x: { grid: { display: false }, ticks: { color: textColor, font: { size: 10 } } }
          }
        }
      });
    }

    if (activeScreen === 'screen3' && chart3Ref.current) {
      if (chart3Instance.current) chart3Instance.current.destroy();
      chart3Instance.current = new Chart(chart3Ref.current, {
        type: 'line',
        data: {
          labels: ['00:00', '04:00', '08:00', '12:00', '16:00 (Inversion)', 'Current: 142 μg/m³'],
          datasets: [
            {
              label: 'Actual PM10',
              data: [68, 72, 85, 98, 122, 142],
              borderColor: '#0284c7',
              borderWidth: 2.5,
              tension: 0.35,
              pointRadius: [3, 3, 3, 3, 3, 5],
              pointBackgroundColor: ['#0284c7', '#0284c7', '#0284c7', '#0284c7', '#0284c7', '#ef4444']
            },
            {
              label: 'CPCB Cap (100)',
              data: [100, 100, 100, 100, 100, 100],
              borderColor: '#ef4444',
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              labels: { color: textColor, font: { size: 11, weight: '600' }, boxWidth: 12 }
            }
          },
          scales: {
            y: { min: 40, max: 160, grid: { color: gridColor }, ticks: { color: textColor, font: { size: 10 } } },
            x: { grid: { display: false }, ticks: { color: textColor, font: { size: 10 } } }
          }
        }
      });
    }

    if (activeScreen === 'screen4' && chart4Ref.current) {
      if (chart4Instance.current) chart4Instance.current.destroy();
      chart4Instance.current = new Chart(chart4Ref.current, {
        type: 'bar',
        data: {
          labels: ['FY22', 'FY23', 'FY24', 'FY25', 'FY26 YTD'],
          datasets: [{
            label: 'Afforestation Achieved (Ha)',
            data: [9200, 10100, 10800, 11950, 12480],
            backgroundColor: '#10b981',
            borderRadius: 4,
            barThickness: 32
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { min: 6000, max: 14000, grid: { color: gridColor }, ticks: { color: textColor, font: { size: 10 } } },
            x: { grid: { display: false }, ticks: { color: textColor, font: { size: 10 } } }
          }
        }
      });
    }

    if (activeScreen === 'screen6' && healthChartRef.current) {
      if (healthChartInstance.current) healthChartInstance.current.destroy();
      healthChartInstance.current = new Chart(healthChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['PME Fit', 'Re-Exam Required', 'Dust Watch', 'Temporarily Unfit'],
          datasets: [{
            data: [214500, 12400, 7800, 3700],
            backgroundColor: ['#10b981', '#06b6d4', '#f59e0b', '#ef4444']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: textColor, font: { size: 11, weight: '600' }, padding: 12 }
            }
          }
        }
      });
    }

    return () => {
      if (chart2Instance.current) chart2Instance.current.destroy();
      if (chart3Instance.current) chart3Instance.current.destroy();
      if (chart4Instance.current) chart4Instance.current.destroy();
      if (healthChartInstance.current) healthChartInstance.current.destroy();
    };
  }, [activeScreen, isDark, screen1More, screen2More, screen5More, screen6More]);

  // Screen 2 Data
  const safetyData = [
    { id: 'SEC22-01', colliery: 'ECL / KGF-04', matter: 'CMR 153: Methane gas flange bleed 0.88%', severity: 'CRITICAL', age: '28h 14m', action: 'Execute Sec. 22 Stop-Work', note: 'Colliery: ECL / KGF-04 pit. Violation: CMR 153 Methane concentration 0.88% at main return.' },
    { id: 'SEC22-02', colliery: 'WCL / Sasti', matter: 'CMR 123: Roof convergence & prop failure', severity: 'CRITICAL', age: '18h 30m', action: 'Halt Face Power', note: 'Colliery: WCL / Sasti. Roof convergence prop compression exceeding 18mm/hr.' },
    { id: 'NOT-144-03', colliery: 'BCCL / Moonidih', matter: 'CMR 144: Intake fan motor vibration outlier', severity: 'WATCH', age: '12h 10m', action: 'Order Re-Inspection', note: 'Colliery: BCCL / Moonidih. Auxiliary fan vibration 4.2 mm/s vs 2.5 mm/s baseline limit.' },
    { id: 'NOT-181-04', colliery: 'CCL / Piparwar', matter: 'CMR 181: Haulage wire rope statutory testing due', severity: 'DUE', age: '2d 04h', action: 'Demand Certificate', note: 'Colliery: CCL / Piparwar. 6-month NDT certificate overdue for main haulage wire rope.' },
    { id: 'SEC22-05', colliery: 'SECL / Kusmunda', matter: 'CMR 112: Haul road bench slope gradient > 1:16 exceedance', severity: 'CRITICAL', age: '14h 20m', action: 'Enforce Speed Lock', note: 'Kusmunda OCP main haul ramp exceeded statutory gradient cap.' },
    { id: 'NOT-209-06', colliery: 'NCL / Jayant', matter: 'CMR 209: Electronic flame-proof enclosure seal breach', severity: 'WATCH', age: '09h 45m', action: 'Isolate Transformer', note: 'Substation FLP gate interlock bypassed during shift handover.' },
    { id: 'NOT-087-07', colliery: 'BCCL / Lodna', matter: 'CMR 87: Mine water sump capacity buffer < 15% threshold', severity: 'DUE', age: '1d 12h', action: 'Deploy Aux Pumps', note: 'High seasonal inflow reported. Underground pump station backup required.' }
  ];
  const filteredSafety = safetyFilter === 'ALL' ? safetyData : safetyData.filter((d) => d.severity === safetyFilter);
  const visibleSafety = screen2More ? filteredSafety : filteredSafety.slice(0, 4);

  // Screen 5 Escalation Queue
  const escalationData = [
    { id: 'APX-SAF-001', sub: 'ECL / KGF-04', matter: 'Methane bleed >0.8% and barrier pillar clearance 7.8m', age: '28h 14m', dir: 'Director (Tech), CIL', action: 'Issue Board Stop-Heading', type: 'crit' },
    { id: 'APX-ENV-002', sub: 'ECL / Victoria', matter: 'Settling pond acidic runoff pH 5.2 (Stop-discharge)', age: '26h 40m', dir: 'Director (Env), CIL', action: 'Deploy Central Neutralizer', type: 'cyan' },
    { id: 'APX-LOG-003', sub: 'SECL / Korba', matter: 'Thermal plant coal buffer <6 days (Wagon shortage)', age: '18h 15m', dir: 'Director (Marketing), CIL', action: 'Divert 5 Freight Rakes', type: 'norm' },
    { id: 'APX-LAB-004', sub: 'BCCL / Area X', matter: '14 contractor transport licenses expiring in 48h', age: '16h 04m', dir: 'Director (Personnel), CIL', action: 'Issue Pass Extension', type: 'norm' },
    { id: 'APX-SAF-005', sub: 'WCL / Majri', matter: 'Inrush barrier water pressure telemetry warning >4.2 bar', age: '15h 10m', dir: 'Director (Tech), CIL', action: 'Halt Dip Heading', type: 'crit' },
    { id: 'APX-ENV-006', sub: 'CCL / Amrapali', matter: 'Dust suppression dry run: PM10 exceeded 180 ug/m3 in siding', age: '11h 25m', dir: 'Director (Env), CIL', action: 'Order Mist Cannon Override', type: 'cyan' }
  ];
  const visibleEscalations = screen5More ? escalationData : escalationData.slice(0, 4);

  // Screen 6 Health Records
  const healthData = [
    { sub: 'MCL (Mahanadi)', due: '240 Men', audio: '98.8%', xray: '99.4% Clear', train: '97.2%', gate: 'SYNCHRONIZED', gateCol: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-500/30' },
    { sub: 'SECL (South Eastern)', due: '310 Men', audio: '97.5%', xray: '98.9% Clear', train: '95.8%', gate: 'SYNCHRONIZED', gateCol: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-500/30' },
    { sub: 'BCCL (Bharat Coking)', due: '420 Men', audio: '94.2%', xray: '97.2% Clear', train: '89.4%', gate: '142 LOCKED', gateCol: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border-amber-500/30' },
    { sub: 'ECL (Eastern)', due: '510 Men', audio: '93.1%', xray: '96.4% Clear', train: '86.5%', gate: '198 LOCKED', gateCol: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border-rose-500/30' },
    { sub: 'NCL (Northern)', due: '180 Men', audio: '99.1%', xray: '99.8% Clear', train: '98.4%', gate: 'SYNCHRONIZED', gateCol: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-500/30' },
    { sub: 'CCL (Central)', due: '360 Men', audio: '95.6%', xray: '98.1% Clear', train: '92.1%', gate: '38 LOCKED', gateCol: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border-amber-500/30' },
    { sub: 'WCL (Western)', due: '290 Men', audio: '96.4%', xray: '98.5% Clear', train: '93.7%', gate: '22 LOCKED', gateCol: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border-amber-500/30' }
  ];
  const visibleHealth = screen6More ? healthData : healthData.slice(0, 4);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 dark:bg-[#070B13] text-slate-900 dark:text-slate-100 flex overflow-hidden font-sans transition-colors duration-200">
        
        {/* ======================== SIDEBAR ======================== */}
        <aside className="w-64 bg-white dark:bg-[#0B111E] border-r border-slate-200 dark:border-slate-800 flex flex-col flex-shrink-0 z-20 shadow-xl transition-colors duration-200">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B111E]">
            <div className="flex items-center space-x-2.5">
              <span className="w-8 h-8 bg-blue-600 rounded-lg text-white font-extrabold text-sm flex items-center justify-center shadow">M</span>
              <div>
                <h1 className="font-extrabold text-slate-900 dark:text-white text-sm tracking-wide">
                  MINEGOV AI
                </h1>
                <p className="text-[9px] text-blue-600 dark:text-cyan-400 font-bold tracking-wider uppercase">
                  {activeScreen === 'screen2' || activeScreen === 'screen3' ? 'REGULATOR GATEWAY' : 'CIL APEX COMMAND'}
                </p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              <span>SCADA Real-Time Sync</span>
            </div>
          </div>

          <div className="flex-1 py-4 overflow-y-auto px-2 space-y-1 text-xs font-semibold">
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              COMMAND MODULES
            </div>
            {[
              { id: 'screen1', label: '01 Executive Overview', icon: LayoutDashboard, color: 'text-blue-500' },
              { id: 'screen2', label: '02 DGMS Safety Desk', icon: ShieldAlert, color: 'text-rose-500' },
              { id: 'screen3', label: '03 CPCB Environment', icon: Activity, color: 'text-emerald-500' },
              { id: 'screen4', label: '04 Carbon & Bio-Reclaim', icon: Leaf, color: 'text-lime-500' },
              { id: 'screen5', label: '05 Workforce & Escalations', icon: Users, color: 'text-purple-500' },
              { id: 'screen6', label: '06 Health & Training Status', icon: HeartPulse, color: 'text-pink-500', isNew: true }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeScreen === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveScreen(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className={`w-4 h-4 mr-2.5 ${active ? 'text-white' : tab.color}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.isNew && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${active ? 'bg-white/20 text-white' : 'bg-pink-500/20 text-pink-400'}`}>
                      NEW
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 m-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-[11px] text-slate-500 space-y-1">
            <div className="flex justify-between text-slate-700 dark:text-slate-300 font-bold">
              <span>National Node</span>
              <span className="text-[9px] bg-blue-500/10 text-blue-600 dark:text-cyan-400 px-1.5 py-0.5 rounded border border-blue-500/20">All 8 Pits</span>
            </div>
            <p>Muster Sync: 98.4%</p>
            <p className="text-[10px]">Audit Ledger: SHA-256 HSM</p>
          </div>
        </aside>

        {/* ======================== MAIN WORKSPACE ======================== */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-100 dark:bg-[#070B13] transition-colors duration-200">
          
          {/* TOP HEADER */}
          <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1424] px-6 flex items-center justify-between shadow-xs z-20">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => {
                  if (onNavigateGateway) onNavigateGateway();
                  else if (onBackToGateway) onBackToGateway();
                  else if (onBackToHome) onBackToHome();
                  else window.location.hash = "#/access-gateway";
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-cyan-400 transition cursor-pointer"
                title="Return to Access Gateway"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Gateway</span>
              </button>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-wide uppercase">
                  {activeScreen === 'screen2' ? 'DGMS SAFETY DIRECTORATE • STATUTORY DESK' : 'CIL APEX COMMAND CENTER • NATIONAL COMPLIANCE INTELLIGENCE'}
                </h2>
                <p className="text-[10px] text-slate-500">HEADQUARTERS KOLKATA &bull; REPORTING CYCLE: CURRENT &bull; LAST SYNC: 15:39:39</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                <Radio className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                <span>OCEMS Feed: <strong className="text-slate-700 dark:text-slate-200">Live 15-Min</strong></span>
              </span>

              {/* Notification Bell Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-500 transition cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-extrabold text-[9px] rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3 px-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Command Notifications</span>
                        {unreadCount > 0 && (
                          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] font-semibold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-80 overflow-y-auto">
                      {notificationsList.map((item) => (
                        <div
                          key={item.id}
                          className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer ${item.unread ? 'bg-blue-50/30 dark:bg-blue-950/20' : ''}`}
                          onClick={() => {
                            setNotificationsList(prev => prev.map(n => n.id === item.id ? { ...n, unread: false } : n));
                            setModalData({ title: item.title, body: `${item.sub}\nLogged: ${item.time}` });
                          }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border ${
                              item.type === 'CRITICAL'
                                ? 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-900'
                                : item.type === 'WARNING'
                                ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900'
                                : 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950 dark:text-cyan-400 dark:border-blue-900'
                            }`}>
                              {item.type}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                          </div>
                          <p className="font-bold text-xs text-slate-900 dark:text-white mt-1.5 leading-snug">{item.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{item.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Working Dark/Light Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 transition cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-700" />}
                <span>{isDark ? 'Light' : 'Dark'}</span>
              </button>

              {/* User Pseudo Profile ID */}
              <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-700">
                <span className="p-1 rounded-full bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5">CMD</span>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">GOV-89421</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Safety Head &bull; Apex ID: CIL-9024</p>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {/* ================= SCREEN 1: CIL APEX EXECUTIVE OVERVIEW ================= */}
            {activeScreen === 'screen1' && (
              <div className="space-y-3.5">
                <div className="bg-white dark:bg-[#0D1424] border border-rose-300 dark:border-rose-900/60 rounded-lg p-2.5 px-3.5 flex items-center justify-between shadow-xs">
                  <div className="flex items-center space-x-2.5 text-xs text-rose-700 dark:text-rose-400 font-semibold truncate pr-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping flex-shrink-0"></span>
                    <span className="truncate"><strong>CRITICAL NOTICE:</strong> Area XII / KGF-04 pit Methane exceedance &gt; 0.8% and Damodar runoff requires Chairman endorsement.</span>
                  </div>
                  <button
                    onClick={() => setModalData({
                      title: 'Critical Statutory Endorsement Required',
                      body: 'ECL KGF-04 pit return airway methane concentration exceeded CMR 153 cap (0.88%). Requires formal Chairman stop-work endorsement.'
                    })}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-md shadow-xs transition flex-shrink-0 cursor-pointer"
                  >
                    Review &amp; Endorse
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ANNUAL TARGET</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">594.8 <span className="text-xs font-normal text-slate-500">/ 780 MT</span></p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '76%' }}></div>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-bold mt-1 inline-block">98.2% Pace of Target</span>
                  </div>

                  <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SAFETY INDEX</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">94.6 <span className="text-xs font-normal text-slate-500">/ 100</span></p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-bold mt-1 inline-block">+2.1% YoY Improvement</span>
                  </div>

                  <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BOARD ESCALATIONS</p>
                    <p className="text-xl font-extrabold text-rose-600 mt-0.5">04 <span className="text-xs font-semibold text-rose-500">Active</span></p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-[10px] text-rose-600 font-bold mt-1 inline-block">2 Exceeded 24h SLA</span>
                  </div>

                  <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DAILY RAIL DESPATCH</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">348 <span className="text-xs font-normal text-slate-500">Rakes</span></p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold mt-1 inline-block">Daily Target: 365</span>
                  </div>

                  <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-xs col-span-2 md:col-span-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WORKFORCE READINESS</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">238,400 <span className="text-xs font-normal text-slate-500">Men</span></p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '98%' }}></div>
                    </div>
                    <span className="text-[10px] text-blue-600 font-bold mt-1 inline-block">Biometric Muster: 98.4%</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg p-2 px-4 flex items-center justify-between text-xs shadow-xs">
                  <div className="flex items-center space-x-3 overflow-hidden truncate">
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-[10px] uppercase">ATTENTION REQUIRED</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium truncate">&bull; KGF-04 methane threshold exceeded &nbsp;&bull;&nbsp; Area X OCEMS filing pending &nbsp;&bull;&nbsp; CPCB ZLD directive published</span>
                  </div>
                  <button
                    onClick={() => setModalData({
                      title: 'All Active CPCB / DGMS Problem Notifications',
                      body: '1. Gazette Notice Order B-29016/PCI-I: Mandatory ZLD audit for washeries >2.5 MTPA.\n2. Sone and Damodar river runoff automated dosing triggered.\n3. SECR freight wagon turnaround buffer delayed by 14%.'
                    })}
                    className="text-blue-600 dark:text-cyan-400 font-bold text-[11px] hover:underline flex-shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-7 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="p-3 px-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/60 dark:bg-slate-900/50">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">STRATEGIC PERFORMANCE MATRIX</h3>
                          <p className="text-[10px] text-slate-500">Subsidiary operational health &bull; Current reporting cycle</p>
                        </div>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold px-2 py-0.5 rounded">
                          &bull; Live National Rollup
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-bold">
                            <tr>
                              <th className="py-2.5 px-3">SUBSIDIARY</th>
                              <th className="py-2.5 px-2">OUTPUT</th>
                              <th className="py-2.5 px-2">SAFETY</th>
                              <th className="py-2.5 px-2">ENVIRONMENT</th>
                              <th className="py-2.5 px-2">TREND</th>
                              <th className="py-2.5 px-3 text-center">ACTION</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                            {[
                              { sub: 'MCL (Mahanadi)', out: '142.4 MT', safe: 'NORMAL', env: 'PASS', trend: '↑ +2.4%', statCol: 'text-emerald-600 dark:text-emerald-400' },
                              { sub: 'SECL (South Eastern)', out: '138.6 MT', safe: 'NORMAL', env: 'PASS', trend: '↑ +1.1%', statCol: 'text-emerald-600 dark:text-emerald-400' },
                              { sub: 'NCL (Northern)', out: '98.2 MT', safe: 'NORMAL', env: 'PASS', trend: '↑ +3.2%', statCol: 'text-emerald-600 dark:text-emerald-400' },
                              { sub: 'CCL (Central)', out: '64.5 MT', safe: 'NORMAL', env: 'WATCH', trend: '↓ -0.4%', statCol: 'text-amber-500' },
                              { sub: 'WCL (Western)', out: '46.2 MT', safe: 'WATCH', env: 'WATCH', trend: '↓ -1.2%', statCol: 'text-amber-500' },
                              { sub: 'ECL (Eastern)', out: '28.4 MT', safe: 'CRITICAL', env: 'CRITICAL', trend: '↓ -4.8%', statCol: 'text-rose-500' }
                            ].map((r, i) => (
                              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{r.sub}</td>
                                <td className="py-2.5 px-2">{r.out}</td>
                                <td className={`py-2.5 px-2 font-bold ${r.statCol}`}>{r.safe}</td>
                                <td className={`py-2.5 px-2 font-bold ${r.statCol}`}>{r.env}</td>
                                <td className="py-2.5 px-2 font-semibold text-slate-500">{r.trend}</td>
                                <td className="py-2.5 px-3 text-center">
                                  <button
                                    onClick={() => setModalData({ title: `${r.sub} Deep Drilldown`, body: `Output pace: ${r.out}. Safety State: ${r.safe}. Trend trajectory: ${r.trend}.` })}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-xs cursor-pointer"
                                  >
                                    Inspect
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="p-2 px-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex justify-end">
                      <button
                        onClick={() => setScreen1More(!screen1More)}
                        className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>{screen1More ? 'Hide Logistics Siding Telemetry' : 'View More (Rail Logistics & Demurrage)'}</span>
                        {screen1More ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-between">
                    <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 shadow-xs space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">APEX ESCALATIONS &amp; DIRECTIVES</h3>
                        <span className="text-[9px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300 font-semibold">Board Action</span>
                      </div>

                      <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border-l-4 border-l-rose-600 rounded text-xs space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-rose-700 dark:text-rose-300 text-[11px]">ECL / Area XII Strata &amp; Gas</span>
                          <button onClick={() => confirmAction('Issue Chairman Stop-Heading directive for ECL KGF-04 pit?')} className="bg-rose-600 hover:bg-rose-700 text-white px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer">
                            Execute
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">
                          KGF-04 Methane &gt; 0.8% and barrier pillar clearance warning unresolved &gt;24h.
                        </p>
                      </div>

                      <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-l-amber-500 rounded text-xs space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-amber-700 dark:text-amber-300 text-[11px]">Thermal Supply Alert &bull; NTPC</span>
                          <button onClick={() => confirmAction('Divert 4 rakes from CCL siding to NTPC Farakka?')} className="bg-amber-600 hover:bg-amber-700 text-white px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer">
                            Divert
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">
                          Coal buffer dropped to 5.8 days due to freight rake congestion in Asansol division.
                        </p>
                      </div>

                      <div className="p-2.5 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-purple-900 dark:text-purple-300 text-[11px] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> AI Supply-Demand Optimizer
                          </span>
                          <span className="text-[9px] bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-bold px-1.5 py-0.2 rounded">96% CONF.</span>
                        </div>
                        <p className="text-[10px] text-purple-950 dark:text-slate-300 leading-snug">
                          Predictive model forecasts 12% wagon deficit in SECR corridor over next 72h. Dynamic rail route reallocation ready for approval.
                        </p>
                      </div>
                    </div>

                    {screen1More && (
                      <div className="p-3 bg-white dark:bg-[#0D1424] border border-cyan-500/30 rounded-lg shadow-xs space-y-2 animate-in fade-in duration-150">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 flex items-center gap-1">
                          <SlidersHorizontal className="w-3.5 h-3.5" /> Live Freight &amp; Weighbridge Telemetry
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-900">SECR Turnaround: <strong>38.4h (+14%)</strong></div>
                          <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-900">RFID Weighbridge: <strong className="text-emerald-500">99.1% Sync</strong></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ================= SCREEN 2: DGMS SAFETY DESK ================= */}
            {activeScreen === 'screen2' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">DGMS Statutory Safety Desk • CMR 2017 Violations</h2>
                    <p className="text-xs text-slate-500">Real-time strata convergence, ventilation telemetry, and Section 22 orders</p>
                  </div>
                  <span className="px-2.5 py-0.5 text-xs font-bold text-rose-700 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 rounded">
                    SECTION 22 ENFORCEMENT ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-rose-600 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ACTIVE SECTION 22 NOTICES</p>
                    <p className="text-xl font-extrabold text-rose-600 mt-0.5">04 Pits</p>
                    <p className="text-[11px] text-rose-700 font-medium mt-1">Underground Work Prohibited</p>
                  </div>
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">NATIONAL FATAL ACCIDENT RATE</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">0.14 <span className="text-xs font-semibold text-slate-500">/ 1,000</span></p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">▲ Historical Low Pace</p>
                  </div>
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-blue-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CERTIFIED MINES RESCUE SCBA</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">384 / 384</p>
                    <p className="text-[11px] text-blue-600 font-medium mt-1">100% Station Nominal</p>
                  </div>
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SIRDAR / OVERMAN SYNC</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">98.2%</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">Statutory Shift Registers Synced</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-7 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="p-3 px-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                        <span className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200">STATUTORY INQUIRY &amp; VIOLATIONS QUEUE</span>
                        <span className="text-[10px] text-blue-500 font-mono font-bold">Showing {visibleSafety.length} notices</span>
                      </div>
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-semibold text-[10px] uppercase">
                          <tr>
                            <th className="py-2 px-3">Notice</th>
                            <th className="py-2 px-2">Colliery</th>
                            <th className="py-2 px-2">Parameter</th>
                            <th className="py-2 px-2">Severity</th>
                            <th className="py-2 px-3 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                          {visibleSafety.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="py-2 px-3 font-mono font-bold text-blue-600 dark:text-cyan-400 cursor-pointer hover:underline" onClick={() => setModalData({ title: `Notice ${row.id}`, body: row.note })}>
                                {row.id} ↗
                              </td>
                              <td className="py-2 px-2">{row.colliery}</td>
                              <td className="py-2 px-2 text-slate-700 dark:text-slate-300 font-semibold">{row.matter}</td>
                              <td className="py-2 px-2">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${row.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'}`}>
                                  {row.severity}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-center">
                                <button onClick={() => confirmAction(`${row.action}?`)} className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] px-2.5 py-1 rounded cursor-pointer">
                                  {row.action}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-2 px-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex justify-end">
                      <button onClick={() => setScreen2More(!screen2More)} className="text-xs font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1 hover:underline cursor-pointer">
                        <span>{screen2More ? 'Collapse Notices' : 'View More (All Inquiries)'}</span>
                        {screen2More ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-xs flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200 mb-2">12-Month Serious Injury Rate vs LTIFR</h3>
                      <div className="h-64 w-full relative">
                        <canvas ref={chart2Ref}></canvas>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">&bull; Historical Fatal Accident Rate pacing at 0.14 per 1,000 workers.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= SCREEN 3: CPCB ENVIRONMENT ================= */}
            {activeScreen === 'screen3' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">CPCB Continuous OCEMS Telemetry &amp; Heavy Metals</h2>
                    <p className="text-xs text-slate-500">Continuous Ambient Air Quality, Industrial Effluent Standards, and Automated Outfall Ingestion</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded">124 CAAQMS Online</span>
                </div>

                {/* 4 Standard Top Environmental KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AIR STATIONS ONLINE</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">124 / 124</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">Continuous CAAQMS Telemetry</p>
                  </div>
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-rose-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ACTIVE AIR EXCEEDANCES</p>
                    <p className="text-xl font-extrabold text-rose-600 mt-0.5">08 Stations</p>
                    <p className="text-[11px] text-rose-600 font-medium mt-1">PM10 &gt; 100 μg/m³ Limit</p>
                  </div>
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-rose-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">EFFLUENT OUTFALL BREACHES</p>
                    <p className="text-xl font-extrabold text-rose-600 mt-0.5">01 Breach</p>
                    <p className="text-[11px] text-rose-600 font-medium mt-1">ECL Victoria (pH 5.2 Acidic)</p>
                  </div>
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SATELLITE GREEN-BELT</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">95.2% Compliant</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">NDVI: +0.64 (Vegetation Dense)</p>
                  </div>
                </div>

                {/* Environmental Monitoring Command Status Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Wind className="w-3.5 h-3.5 text-blue-500" /> CAAQMS Real-Time Sync
                      </span>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">100% Ingestion</p>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">15-Min Periodic Influx</p>
                    </div>
                    <span className="p-2 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 font-bold text-xs">
                      LIVE
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 text-emerald-500" /> Zero Liquid Discharge
                      </span>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">ZLD Audit Mandate</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">All Washeries &gt;2.5 MTPA</p>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      B-29016
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5 text-rose-500" /> Effluent pH Watch
                      </span>
                      <p className="text-sm font-extrabold text-rose-600 mt-1">pH 5.2 (Victoria)</p>
                      <p className="text-[10px] text-rose-500 font-medium mt-0.5">Auto Lime Dosing Active</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  </div>

                  <div className="p-3 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Statutory Compliance
                      </span>
                      <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">95.2% Pass Rate</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Schedule VI CPCB Standard</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      PASS
                    </span>
                  </div>
                </div>

                {/* Table + Expanded PM10 Curve Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-7 space-y-3.5">
                    <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden">
                      <div className="p-3 px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                        <span className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200">LIVE OCEMS AIR &amp; EFFLUENT MATRIX</span>
                        <span className="text-[10px] text-slate-500 font-mono">Continuous Stream</span>
                      </div>
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-semibold text-[10px] uppercase">
                          <tr>
                            <th className="py-2.5 px-3">Station</th>
                            <th className="py-2.5 px-2">PM10</th>
                            <th className="py-2.5 px-2">pH</th>
                            <th className="py-2.5 px-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                          <tr><td className="py-2.5 px-3 font-bold">Central Haulage CHP (MCL)</td><td className="py-2.5 px-2">84 μg/m³</td><td className="py-2.5 px-2">7.4</td><td className="py-2.5 px-3 text-emerald-600 font-bold">COMPLIANT</td></tr>
                          <tr><td className="py-2.5 px-3 font-bold">Deep Seam Outfall (SECL)</td><td className="py-2.5 px-2">92 μg/m³</td><td className="py-2.5 px-2">7.2</td><td className="py-2.5 px-3 text-emerald-600 font-bold">COMPLIANT</td></tr>
                          <tr className="bg-rose-50/70 dark:bg-rose-950/30"><td className="py-2.5 px-3 font-bold text-rose-700 dark:text-rose-400">Pit Head Washery #2 (ECL)</td><td className="py-2.5 px-2 font-bold text-rose-600">142 μg/m³</td><td className="py-2.5 px-2">6.8</td><td className="py-2.5 px-3 text-rose-600 font-bold">EXCEEDED (+42%)</td></tr>
                          <tr className="bg-rose-50/70 dark:bg-rose-950/30"><td className="py-2.5 px-3 font-bold text-rose-700 dark:text-rose-400">North Sump Runoff (ECL)</td><td className="py-2.5 px-2 font-bold text-rose-600">108 μg/m³</td><td className="py-2.5 px-2 font-bold text-rose-600">5.2</td><td className="py-2.5 px-3 text-rose-600 font-bold">SEC 33A ORDER</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> Heavy Metal Leachate</span>
                        <p className="text-[10px] text-slate-500 mt-1">Cr⁶⁺: <strong className="text-slate-800 dark:text-slate-200">0.02 mg/L (Cap: 0.1)</strong> &bull; Cd/Pb: <strong className="text-slate-800 dark:text-slate-200">0.008 mg/L</strong></p>
                      </div>
                      <div className="p-3 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
                        <span className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 uppercase flex items-center gap-1"><Volume2 className="w-3.5 h-3.5" /> Ambient Noise Leq</span>
                        <p className="text-[10px] text-slate-500 mt-1">Daytime Crusher: <strong className="text-slate-800 dark:text-slate-200">68.4 dB(A)</strong> &bull; Colony: <strong className="text-amber-500">54.2 dB(A)</strong></p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-xs flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200 mb-2">24-Hour Continuous PM10 Sensor Curve</h3>
                      <div className="h-64 w-full relative">
                        <canvas ref={chart3Ref}></canvas>
                      </div>
                    </div>
                    <p className="text-[10px] text-rose-500 mt-2 font-semibold">&bull; 16:00 Valley thermal inversion trapped particulate matter over Asansol belt.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= SCREEN 4: BIO-RECLAMATION ================= */}
            {activeScreen === 'screen4' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">National Bio-Reclamation, Carbon Offset &amp; River Catchment</h2>
                    <p className="text-xs text-slate-500">Continuous Emissions Monitoring (CPCB), Satellite NDVI Bio-Reclamation, and Mine Water Utilization</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded">
                    Target: 12,000 Ha / Achieved: 12,480 Ha (+104%)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">NATIONAL ENV COMPLIANCE</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">95.2%</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">● CPCB Schedule VI Standard</p>
                  </div>
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-amber-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CAAQMS AIR STATIONS</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">124 <span className="text-xs font-semibold text-slate-500">Active</span></p>
                    <p className="text-[11px] text-amber-600 font-medium mt-1">8 Exceedances (PM10 / PM2.5)</p>
                  </div>
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">BIO-RECLAMATION TARGET</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">12,480 Ha</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">Satellite NDVI: +0.64 (Dense)</p>
                  </div>
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-blue-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">MINE WATER RECYCLED</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">342 MLD</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">214 MLD Community Supply</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="p-3.5 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
                        <Waves className="w-4 h-4 text-cyan-400" /> River Catchment WQI
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        Damodar Downstream WQI: <strong className="text-emerald-500">78.4 (Good)</strong> &bull; Sone Siltation: <strong className="text-emerald-500">18.2 NTU</strong>
                      </p>
                    </div>
                    <span className="text-[10px] font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-900 px-2 py-1 rounded">
                      Hydrological Ingestion
                    </span>
                  </div>

                  <div className="p-3.5 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                        <Trees className="w-4 h-4 text-emerald-400" /> Drone LiDAR Biomass
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        Net Carbon Sink Offset: <strong className="text-slate-900 dark:text-white">482,500 tCO₂e/yr</strong> &bull; Canopy Density: <strong className="text-slate-900 dark:text-white">62.8%</strong>
                      </p>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 px-2 py-1 rounded">
                      Sentinel-2 Mapped
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-7 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden">
                    <div className="p-3 px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                      <span className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200">8-SUBSIDIARY ENVIRONMENTAL SCORECARD</span>
                    </div>
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-semibold text-[10px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Subsidiary</th>
                          <th className="py-2.5 px-2">CAAQMS</th>
                          <th className="py-2.5 px-2">Afforested</th>
                          <th className="py-2.5 px-2">Water Recycled</th>
                          <th className="py-2.5 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                        <tr><td className="py-2.5 px-3 font-bold">MCL</td><td className="py-2.5 px-2 text-emerald-700">24/24 PASS</td><td className="py-2.5 px-2">2,840 Ha (102%)</td><td className="py-2.5 px-2">84 MLD</td><td className="py-2.5 px-3 text-emerald-600 font-bold">OPTIMAL</td></tr>
                        <tr><td className="py-2.5 px-3 font-bold">SECL</td><td className="py-2.5 px-2 text-emerald-700">28/28 PASS</td><td className="py-2.5 px-2">3,120 Ha (99%)</td><td className="py-2.5 px-2">92 MLD</td><td className="py-2.5 px-3 text-emerald-600 font-bold">OPTIMAL</td></tr>
                        <tr><td className="py-2.5 px-3 font-bold">WCL</td><td className="py-2.5 px-2 text-amber-700">14/16 PASS</td><td className="py-2.5 px-2">1,120 Ha (91%)</td><td className="py-2.5 px-2">44 MLD</td><td className="py-2.5 px-3 text-amber-500 font-bold">WATCH</td></tr>
                        <tr className="bg-rose-50/70 dark:bg-rose-950/30"><td className="py-2.5 px-3 font-bold text-rose-700 dark:text-rose-400">ECL</td><td className="py-2.5 px-2 text-rose-700">10/12 PASS</td><td className="py-2.5 px-2 text-rose-600">590 Ha (84%)</td><td className="py-2.5 px-2">18 MLD</td><td className="py-2.5 px-3 text-rose-600 font-bold">CRITICAL</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="lg:col-span-5 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-xs flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200 mb-2">Yearly Afforestation Trend (Ha)</h3>
                      <div className="h-64 w-full relative">
                        <canvas ref={chart4Ref}></canvas>
                      </div>
                    </div>
                    <p className="text-[10px] text-emerald-600 mt-2 font-semibold">&bull; Pan-India target exceeded by +104% via satellite Sentinel-2 ingestion.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= SCREEN 5: WORKFORCE GOVERNANCE & DIGITAL TWIN ================= */}
            {activeScreen === 'screen5' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">National Workforce Governance, Welfare &amp; Board Escalations</h2>
                    <p className="text-xs text-slate-500">Biometric vs Cap-Lamp Protection, Contractor Form V Licensing, and Board-Level Statutory Escalation Queue</p>
                  </div>
                  <span className="px-2.5 py-0.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-300 rounded">
                    TRAPPED MINER AUDIT SECURED
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-blue-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">NATIONAL REGULAR WORKFORCE</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">238,400</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">112,000 Contract Labourers</p>
                  </div>
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-rose-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CAP-LAMP MISMATCHES</p>
                    <p className="text-xl font-extrabold text-rose-600 mt-0.5">48 Delta Flags</p>
                    <p className="text-[11px] text-rose-600 font-medium mt-1">All Reconciled on Surface</p>
                  </div>
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-amber-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">EXPIRING CONTRACTOR LIC.</p>
                    <p className="text-xl font-extrabold text-amber-600 mt-0.5">42 Vendors</p>
                    <p className="text-[11px] text-amber-600 font-medium mt-1">&lt;14 Days (Form V)</p>
                  </div>
                  <div className="bg-white dark:bg-[#0D1424] border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800 rounded p-3 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">PME MEDICAL STATUS</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">96.2% Pass</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">Mines Rules 1955 Compliant</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="p-3 px-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                      <span className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200">APEX BOARD ESCALATION QUEUE (&gt;24H SLA)</span>
                      <span className="text-[10px] text-rose-500 font-bold">Mandatory Board Directives</span>
                    </div>
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-semibold text-[10px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Ticket ID</th>
                          <th className="py-2.5 px-2">Subsidiary</th>
                          <th className="py-2.5 px-2">Statutory Parameter</th>
                          <th className="py-2.5 px-2">SLA Age</th>
                          <th className="py-2.5 px-2">Assigned Director</th>
                          <th className="py-2.5 px-3 text-center">Directive Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                        {visibleEscalations.map((row) => (
                          <tr key={row.id} className={row.type === 'crit' ? 'bg-rose-50/60 dark:bg-rose-950/30' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}>
                            <td className="py-2 px-3 font-mono font-bold text-blue-600 dark:text-cyan-400 cursor-pointer hover:underline" onClick={() => setModalData({ title: `Directive ${row.id}`, body: `${row.matter}\nAssigned Director: ${row.dir}\nSLA Status: Escalated to CIL Chairman.` })}>
                              {row.id} ↗
                            </td>
                            <td className="py-2 px-2 font-medium">{row.sub}</td>
                            <td className="py-2 px-2 text-slate-700 dark:text-slate-300 font-semibold">{row.matter}</td>
                            <td className="py-2 px-2 text-rose-600 font-mono text-[11px] font-bold">{row.age}</td>
                            <td className="py-2 px-2 text-slate-600 dark:text-slate-400">{row.dir}</td>
                            <td className="py-2 px-3 text-center">
                              <button onClick={() => confirmAction(`${row.action}?`)} className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] px-2.5 py-1 rounded cursor-pointer">
                                {row.action}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-2 px-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex justify-end">
                    <button onClick={() => setScreen5More(!screen5More)} className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline cursor-pointer">
                      <span>{screen5More ? 'Collapse Escalations' : 'View More (All Directives)'}</span>
                      {screen5More ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg p-3 px-4 shadow-xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                    CLOSED-LOOP NATIONAL GOVERNANCE ARCHITECTURE
                  </h3>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                    <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">6-Stage Closed-Loop Pipeline:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 font-mono text-[11px]">
                      <span>1. Detect: SCADA / Mobile IoT logs</span>
                      <span>2. Validate: CMR &amp; CPCB rules engine</span>
                      <span>3. Escalate: 4h Mine / 12h Area / 24h CIL Board SLA</span>
                      <span>4. Direct: Binding Chairman order via e-Gov gateway</span>
                      <span>5. Verify: Sensor telemetry override confirmation</span>
                      <span>6. Audit Lock: Permanent WORM ledger record</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0D1424] border border-purple-300/80 dark:border-purple-900/60 rounded-xl p-4 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-purple-600 text-white font-bold text-[10px]">TWIN-AI</span>
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                          DIGITAL MINE TWIN &bull; NATIONAL MULTI-DOMAIN OPERATIONS INTELLIGENCE
                        </h3>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Sovereign Open-Cast Pit Topology &bull; Real-time SCADA Nodes &bull; OCEMS Catchment Runoff &bull; CMR Barrier Pillar Clearance
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                      {[
                        { id: 'all', label: 'All Telemetry' },
                        { id: 'scada', label: 'SCADA IoT' },
                        { id: 'ocems', label: 'OCEMS Runoff' },
                        { id: 'safety', label: 'CMR 2017 Risk' }
                      ].map((lyr) => (
                        <button
                          key={lyr.id}
                          onClick={() => setActiveTwinLayer(lyr.id)}
                          className={`px-2 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
                            activeTwinLayer === lyr.id
                              ? 'bg-purple-600 text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {lyr.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative w-full h-80 sm:h-96 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

                    <svg className="w-full h-full preserve-3d" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="benchGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1e293b" />
                          <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>
                        <linearGradient id="pitDepth" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#0f172a" />
                          <stop offset="100%" stopColor="#020617" />
                        </linearGradient>
                        <linearGradient id="riverGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
                        </linearGradient>
                        <linearGradient id="greenBeltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#065f46" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="#022c22" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>

                      <polygon points="40,60 960,40 980,460 20,440" fill={isDark ? "#090d16" : "#f1f5f9"} stroke={isDark ? "#1e293b" : "#cbd5e1"} strokeWidth="1.5" />
                      <path d="M40,60 Q260,80 340,160 Q200,240 60,180 Z" fill="url(#greenBeltGrad)" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                      <text x="110" y="130" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">BIO-RECLAMATION ZONE #04 (12,480 Ha)</text>

                      <path d="M960,80 C740,110 820,240 680,310 C560,370 700,430 520,460" fill="none" stroke="url(#riverGrad)" strokeWidth="12" strokeLinecap="round" />
                      <text x="760" y="240" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">DAMODAR CATCHMENT RUNOFF</text>

                      <polygon points="260,140 640,120 720,380 200,340" fill="url(#benchGrad1)" stroke="#334155" strokeWidth="1.5" />
                      <polygon points="290,170 600,150 670,350 240,320" fill={isDark ? "#131c2e" : "#e2e8f0"} stroke="#475569" strokeWidth="1.5" />
                      <polygon points="320,200 560,185 620,325 280,300" fill={isDark ? "#0b1120" : "#cbd5e1"} stroke="#334155" strokeWidth="1.5" />
                      <polygon points="350,230 520,220 570,300 320,280" fill="url(#pitDepth)" stroke="#0284c7" strokeWidth="1.5" />
                      <text x="375" y="260" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">DEEP SEAM SUMP (ECL / KGF-04)</text>

                      <path d="M260,140 L300,220 L350,230 L520,220 L660,360 L920,410" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 4" />
                      <text x="760" y="395" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">MAIN COAL DISPATCH HAUL RAMP</text>

                      <circle cx="480" cy="223" r="4" fill="#fbbf24" className="animate-pulse" />
                      <circle cx="700" cy="375" r="4" fill="#fbbf24" className="animate-pulse" />

                      <line x1="390" y1="210" x2="490" y2="100" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="720" y1="300" x2="840" y2="290" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="180" y1="160" x2="180" y2="260" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                    </svg>

                    {(activeTwinLayer === 'all' || activeTwinLayer === 'safety') && (
                      <div className="absolute top-16 left-[34%] sm:left-[38%] bg-slate-900/90 border border-rose-500 text-white p-2 px-3 rounded-lg shadow-xl backdrop-blur-xs flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-rose-400" />
                            <span className="text-[10px] font-extrabold text-rose-400 uppercase font-mono">CMR 153 GAS BLEED</span>
                          </div>
                          <p className="text-[11px] font-bold">KGF-04 Return Airway: 0.88% CH₄</p>
                          <p className="text-[9px] text-slate-400">Barrier Pillar: 7.8m &bull; Chairman Stop-Heading Queued</p>
                        </div>
                      </div>
                    )}

                    {(activeTwinLayer === 'all' || activeTwinLayer === 'ocems') && (
                      <div className="absolute bottom-16 right-[6%] sm:right-[12%] bg-slate-900/90 border border-cyan-500 text-white p-2 px-3 rounded-lg shadow-xl backdrop-blur-xs flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-[10px] font-extrabold text-cyan-400 uppercase font-mono">OCEMS DISCHARGE SEC 33A</span>
                          </div>
                          <p className="text-[11px] font-bold">North Sump Outfall: pH 5.2 (Acidic)</p>
                          <p className="text-[9px] text-slate-400">TSS: 134 mg/L &bull; Automatic Lime Neutralizer Active</p>
                        </div>
                      </div>
                    )}

                    {(activeTwinLayer === 'all' || activeTwinLayer === 'ocems') && (
                      <div className="absolute top-10 left-[6%] bg-slate-900/90 border border-emerald-500 text-white p-2 px-2.5 rounded-lg shadow-xl backdrop-blur-xs flex items-center gap-2">
                        <Trees className="w-3.5 h-3.5 text-emerald-400" />
                        <div>
                          <span className="text-[9px] font-extrabold text-emerald-400 uppercase font-mono">DRONE LIDAR BIOMASS</span>
                          <p className="text-[10px] font-bold">NDVI: +0.64 (Dense Canopy)</p>
                        </div>
                      </div>
                    )}

                    {(activeTwinLayer === 'all' || activeTwinLayer === 'scada') && (
                      <div className="absolute bottom-8 left-[18%] bg-slate-900/90 border border-amber-500 text-white p-2 px-2.5 rounded-lg shadow-xl backdrop-blur-xs flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-amber-400" />
                        <div>
                          <span className="text-[9px] font-extrabold text-amber-400 uppercase font-mono">SCADA FOGS SIDING</span>
                          <p className="text-[10px] font-bold">348 Rakes/Day &bull; 99.1% RFID Sync</p>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3 bg-slate-950/80 border border-slate-800 p-1.5 px-2.5 rounded text-[9px] text-slate-400 font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Sovereign Digital Twin v2.6 &bull; GIS WGS-84 &bull; 15-Sec Heartbeat</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= SCREEN 6: HEALTH & MANDATORY TRAINING ================= */}
            {activeScreen === 'screen6' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">National Workforce Health &amp; Mandatory Training Portal</h2>
                    <p className="text-xs text-slate-500">Mines Rules 1955 (PME Health Screening) &amp; Mines Vocational Training Rules 1966 (MVTR)</p>
                  </div>
                  <span className="text-xs font-bold text-pink-600 bg-pink-50 dark:bg-pink-950/60 border border-pink-300 dark:border-pink-800 px-2.5 py-0.5 rounded">
                    STATUTORY MEDICAL AUDIT ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500 p-3.5 rounded-lg shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PME MEDICAL PASS</p>
                    <p className="text-2xl font-extrabold text-emerald-500 mt-1">96.2%</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">214,500 Workers Cleared</p>
                  </div>

                  <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 border-l-4 border-l-rose-500 p-3.5 rounded-lg shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PNEUMOCONIOSIS FLAGS</p>
                    <p className="text-2xl font-extrabold text-rose-500 mt-1">18 Cases</p>
                    <p className="text-[11px] text-rose-400 font-medium mt-0.5">Transferred to Surface Duties</p>
                  </div>

                  <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 border-l-4 border-l-cyan-500 p-3.5 rounded-lg shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MVTR REFRESHER TRAINED</p>
                    <p className="text-2xl font-extrabold text-cyan-400 mt-1">92.4%</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">Mandatory Annual Quota</p>
                  </div>

                  <div className="bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500 p-3.5 rounded-lg shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LOCKED GATE-PASSES</p>
                    <p className="text-2xl font-extrabold text-amber-500 mt-1">340 Drivers</p>
                    <p className="text-[11px] text-amber-400 font-medium mt-0.5">Pending Simulator Testing</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-7 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="p-3.5 px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                        <span className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200">SUBSIDIARY-WISE HEALTH (PME) &amp; VOCATIONAL REFRESHER METRICS</span>
                        <span className="text-[10px] text-slate-500 font-mono">Mines Rules 1955</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-semibold text-[10px] uppercase">
                            <tr>
                              <th className="py-2.5 px-3">Subsidiary</th>
                              <th className="py-2.5 px-2">PME Due</th>
                              <th className="py-2.5 px-2">Audiometry</th>
                              <th className="py-2.5 px-2">Chest X-Ray</th>
                              <th className="py-2.5 px-2">MVTR Training</th>
                              <th className="py-2.5 px-3 text-center">Gate Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                            {visibleHealth.map((row, i) => (
                              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{row.sub}</td>
                                <td className="py-2.5 px-2">{row.due}</td>
                                <td className="py-2.5 px-2">{row.audio}</td>
                                <td className="py-2.5 px-2">{row.xray}</td>
                                <td className="py-2.5 px-2">{row.train}</td>
                                <td className="py-2.5 px-3 text-center">
                                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${row.gateCol}`}>
                                    {row.gate}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="p-2.5 px-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex justify-end">
                      <button onClick={() => setScreen6More(!screen6More)} className="text-xs font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1 hover:underline cursor-pointer">
                        <span>{screen6More ? 'Collapse Health Dossier' : 'View More (All Subsidiaries PME)'}</span>
                        {screen6More ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-xs flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200 mb-2">National PME Health Screening Breakdown</h3>
                      <div className="h-60 w-full relative">
                        <canvas ref={healthChartRef}></canvas>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 rounded-lg text-xs space-y-1">
                      <div className="flex justify-between items-center font-bold text-pink-600 dark:text-pink-400 text-[11px]">
                        <span>AUTOMATIC GATE-PASS LOCKOUT SYSTEM</span>
                        <span className="text-[9px] bg-pink-500/20 text-pink-300 px-1.5 py-0.2 rounded font-mono">MVTR RULE 28</span>
                      </div>
                      <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">
                        Untrained contract tipper drivers without certified simulator refresher testing within 365 days are automatically locked at biometric boom barriers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Verification Modal Dialog */}
      {modalData && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0D1424] border border-slate-300 dark:border-slate-700 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/60">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>{modalData.title}</span>
              </h3>
              <button onClick={() => setModalData(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto">
              {modalData.body}
            </div>
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button onClick={() => setModalData(null)} className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-blue-500/40 flex items-center space-x-2 text-xs font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
