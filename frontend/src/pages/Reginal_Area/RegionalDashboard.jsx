import { useState } from "react";
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowLeft,
  Bell,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  FileCheck2,
  FileText,
  HardHat,
  Key,
  Layers,
  LayoutDashboard,
  Lock,
  Moon,
  Radio,
  RefreshCw,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Truck,
  Users,
  Wifi,
  Zap,
  Sun,
} from "lucide-react";
import "./RegionalDashboard.css";

// 12 Colliery Performance Data
const COLLIERY_MATRIX = [
  {
    id: "KGF-01 (North Pit)",
    type: "Open Cast (Coal)",
    safety: 94,
    env: 91,
    prod: 102,
    labour: 96,
    status: "HEALTHY",
    alerts: 0,
    escalated: 0,
    outputToday: "6,420 t",
    methanePpm: 0.12,
  },
  {
    id: "KGF-02 (Central UG)",
    type: "Underground (Continuous)",
    safety: 81,
    env: 89,
    prod: 88,
    labour: 91,
    status: "WATCH",
    alerts: 2,
    escalated: 0,
    outputToday: "3,810 t",
    methanePpm: 0.45,
  },
  {
    id: "KGF-03 (East Incline)",
    type: "Underground (Longwall)",
    safety: 91,
    env: 76,
    prod: 98,
    labour: 94,
    status: "WATCH",
    alerts: 1,
    escalated: 0,
    outputToday: "4,500 t",
    methanePpm: 0.38,
  },
  {
    id: "KGF-04 (Deep Seam)",
    type: "Underground (Bord & Pillar)",
    safety: 68,
    env: 74,
    prod: 72,
    labour: 84,
    status: "CRITICAL",
    alerts: 4,
    escalated: 2,
    outputToday: "2,190 t",
    methanePpm: 0.88,
  },
  {
    id: "KGF-05 (West OC)",
    type: "Open Cast (Highwall)",
    safety: 96,
    env: 92,
    prod: 104,
    labour: 95,
    status: "HEALTHY",
    alerts: 0,
    escalated: 0,
    outputToday: "8,900 t",
    methanePpm: 0.08,
  },
  {
    id: "KGF-07 (Victoria Pit)",
    type: "Open Cast / Deep Incline",
    safety: 71,
    env: 64,
    prod: 94,
    labour: 81,
    status: "CRITICAL",
    alerts: 3,
    escalated: 1,
    outputToday: "4,120 t",
    methanePpm: 0.62,
  },
  {
    id: "KGF-08 to 12 (6 Mines)",
    type: "Cluster Cluster Leases",
    safety: 90,
    env: 86,
    prod: 94,
    labour: 90,
    status: "NORMAL",
    alerts: 1,
    escalated: 0,
    outputToday: "21,900 t",
    methanePpm: 0.22,
  },
];

// Screen configurations metadata
const SCREENS_CONFIG = {
  overview: {
    screenNum: "SCREEN 1",
    title: "Regional Area Dashboard • Area Overview",
    crumb: "Area Overview",
    subtitle:
      "Unified Multi-Mine Operational Control, Risk Concentration & Statutory Escalation Console",
  },
  live: {
    screenNum: "SCREEN 2",
    title: "Regional Area Dashboard • Live Operations",
    crumb: "Live Operations",
    subtitle:
      "Synchronized Cluster Telemetry: Ventilation, Gas Flanges, Heavy Mobile Fleet & Outfall SCADA",
  },
  gis: {
    screenNum: "SCREEN 3",
    title: "Regional Area Dashboard • Regional GIS Map",
    crumb: "Regional GIS Map",
    subtitle:
      "Approved IBM Lease Polygons, Statutory 7.5m Barrier Pillars (CMR Reg. 112), and 50-Ha Satellite Greenbelts",
  },
  statutory: {
    screenNum: "SCREEN 4",
    title: "Regional Area Dashboard • Statutory Reports",
    crumb: "Statutory Reports",
    subtitle:
      "Automated Compilation of DGMS, SPCB, Coal Controller (CCO), and IBM Statutory Returns",
  },
  escalation: {
    screenNum: "SCREEN 5",
    title: "Regional Area Dashboard • Escalation Queue",
    crumb: "Escalation Queue",
    subtitle:
      "Statutory 4-Hour Action SLA Enforcement, Multi-Mine Incident Triage & Stop-Work Directives",
  },
  rbac: {
    screenNum: "SCREEN 6",
    title: "Regional Area Dashboard • Area Settings & RBAC",
    crumb: "Area Settings & RBAC",
    subtitle:
      "Multi-Tier Role Access, Statutory SLA Timers, Rule Customization, and Cryptographic Parameters",
  },
  safety: {
    screenNum: "SCREEN 7",
    title: "Regional Area Dashboard • Safety Intelligence",
    crumb: "Safety Intelligence",
    subtitle:
      "Standardized Safety Index Rankings, Rescue Readiness, and Sirdar Rollup Intelligence",
  },
  env: {
    screenNum: "SCREEN 8",
    title: "Regional Area Dashboard • Environmental CAA",
    crumb: "Environmental CAA",
    subtitle:
      "Continuous Ambient Air Telemetry, Effluent Water Quality, and 50-Ha Satellite Bio-Reclamation",
  },
  prod: {
    screenNum: "SCREEN 9",
    title: "Regional Area Dashboard • Production & Lease",
    crumb: "Production & Lease",
    subtitle:
      "Multi-Pit Extraction Reconciler, Overburden Balance (m³/t), and Barrier Pillar Protections",
  },
  labour: {
    screenNum: "SCREEN 10",
    title: "Regional Area Dashboard • Labour & Cap-Lamp",
    crumb: "Labour & Cap-Lamp",
    subtitle:
      "RFID vs Cap-Lamp Muster Reconciliation (CMR Reg. 142), Contractor Licensing, and Worker Health Camps",
  },
};

export function RegionalDashboard({ onBackToGateway, onBackToHome }) {
  // Active screen/tab (1 of 10 screens)
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const currentScreen = SCREENS_CONFIG[activeTab] || SCREENS_CONFIG.overview;

  const handleRefresh = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 800);
  };

  const filteredMines = COLLIERY_MATRIX.filter((m) => {
    const matchesSearch =
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "ALL" || m.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div
      className={`regional-dashboard-root ${isDarkTheme ? "dark-theme" : ""}`}
    >
      {/* 1. LEFT SIDEBAR */}
      <aside className="reg-sidebar">
        {/* Brand Area */}
        <div className="reg-sidebar-brand">
          <div className="brand-icon-box">
            <Shield className="text-blue-700" size={22} />
          </div>
          <div className="brand-text-col">
            <span className="brand-main">MineGov AI</span>
            <span className="brand-badge">REGIONAL HQ • KATRAS</span>
          </div>
        </div>

        {/* User Session Info Pill */}
        <div className="sidebar-session-card">
          <div className="session-status-dot"></div>
          <div className="session-info">
            <strong>Katras Regional Area</strong>
            <span>Jurisdiction: 12 Collieries</span>
          </div>
        </div>

        {/* Navigation Links - 10 Screens */}
        <nav className="reg-nav-menu">
          <span className="nav-group-label">COMMAND DESK</span>

          <button
            type="button"
            className={`reg-nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard size={18} />
            <span>Area Overview</span>
            <span className="nav-pill-badge">Live</span>
          </button>

          <button
            type="button"
            className={`reg-nav-item ${activeTab === "live" ? "active" : ""}`}
            onClick={() => setActiveTab("live")}
          >
            <Radio size={18} />
            <span>Live Operations</span>
            <span className="nav-pill-count">342 Fleet</span>
          </button>

          <button
            type="button"
            className={`reg-nav-item ${activeTab === "gis" ? "active" : ""}`}
            onClick={() => setActiveTab("gis")}
          >
            <Compass size={18} />
            <span>Regional GIS Map</span>
          </button>

          <button
            type="button"
            className={`reg-nav-item ${activeTab === "statutory" ? "active" : ""}`}
            onClick={() => setActiveTab("statutory")}
          >
            <FileCheck2 size={18} />
            <span>Statutory Reports</span>
            <span className="nav-pill-warn">Due 3d</span>
          </button>

          <button
            type="button"
            className={`reg-nav-item ${activeTab === "escalation" ? "active" : ""}`}
            onClick={() => setActiveTab("escalation")}
          >
            <AlertOctagon size={18} />
            <span>Escalation Queue</span>
            <span className="nav-pill-alert">2 Esc</span>
          </button>

          <button
            type="button"
            className={`reg-nav-item ${activeTab === "rbac" ? "active" : ""}`}
            onClick={() => setActiveTab("rbac")}
          >
            <Lock size={18} />
            <span>Area Settings &amp; RBAC</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="reg-sidebar-footer">
          <div className="system-telemetry-badge">
            <span className="telemetry-dot"></span>
            <span>15-Min Live Ingestion Sync</span>
          </div>
          <button
            type="button"
            className="switch-gateway-btn"
            onClick={onBackToGateway}
          >
            <ArrowLeft size={15} /> Switch Role / Gateway
          </button>
        </div>
      </aside>

      {/* 2. MAIN APP CONTENT */}
      <div className="reg-main-wrapper">
        {/* Top Header Bar */}
        <header className="reg-header">
          <div className="header-left">
            <div className="reg-breadcrumbs">
              <span className="crumb-root" onClick={onBackToHome}>
                Home
              </span>
              <span className="crumb-sep">/</span>
              <span className="crumb-mid" onClick={onBackToGateway}>
                Regional Gateway
              </span>
              <span className="crumb-sep">/</span>
              <span className="crumb-curr">{currentScreen.crumb}</span>
            </div>
            <div className="header-cluster-badge">
              <span className="cluster-tag">EASTERN AREA (12 COLLIERIES)</span>
              <span className="cluster-sub">
                Bharat Coking Coal Limited (BCCL)
              </span>
            </div>
          </div>

          <div className="header-right">
            <div className="header-search-wrap">
              <Search size={15} className="search-icon" />
              <input
                type="text"
                placeholder="Search colliery, sensor, alert, ticket..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              type="button"
              className={`refresh-pill ${isSyncing ? "syncing" : ""}`}
              onClick={handleRefresh}
              title="Refresh regional telemetry"
            >
              <RefreshCw size={14} />
              <span>{isSyncing ? "Syncing..." : "Sync"}</span>
            </button>

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setIsDarkTheme((current) => !current)}
              aria-pressed={isDarkTheme}
              aria-label={
                isDarkTheme ? "Switch to light theme" : "Switch to dark theme"
              }
              title={
                isDarkTheme ? "Switch to light theme" : "Switch to dark theme"
              }
            >
              {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div
              className="notification-btn-wrap"
              title="3 Unread Critical Alerts"
            >
              <button type="button" className="icon-bell-btn">
                <Bell size={18} />
                <span className="bell-red-badge"></span>
              </button>
            </div>

            <div className="user-profile-pill">
              <div className="user-avatar">
                <span>GM</span>
              </div>
              <div className="user-details">
                <strong className="user-name">Dr. R. K. Mahapatra</strong>
                <span className="user-role">Regional General Manager</span>
              </div>
              <ChevronDown size={14} className="user-caret" />
            </div>

            <button
              type="button"
              className="portal-home-link"
              onClick={onBackToHome}
              title="Return to Public Portal"
            >
              Home
            </button>
          </div>
        </header>

        {/* Sub-Header Title Bar */}
        <div className="reg-title-bar">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {currentScreen.screenNum}
              </span>
              <h1 className="screen-main-title">{currentScreen.title}</h1>
            </div>
            <p className="screen-main-sub">{currentScreen.subtitle}</p>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              GM Session: Eastern Cluster
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-bold">
              ● Live Sync: 15-Min Ingestion Active
            </span>
          </div>
        </div>

        {/* Scrollable Main Area */}
        <main className="reg-content-scroll">
          {/* CRITICAL BANNER */}
          <div className="critical-notice-banner">
            <div className="notice-left">
              <span className="critical-icon-pill">
                <AlertTriangle size={15} />
              </span>
              <div>
                <strong>
                  CRITICAL NOTICES: High-Severity Operational Items Active in
                  KGF-04 and KGF-07
                </strong>
                <p>
                  KGF-04 Methane &gt; 0.8% and barrier pillar clearance warning
                  unresolved past 4h local SLA. Regional GM directive pending.
                </p>
              </div>
            </div>
            <div className="notice-actions">
              <span className="escalated-pill">2 ESCALATED</span>
              <button
                type="button"
                className="watch-active-btn"
                onClick={() => setActiveTab("escalation")}
              >
                WATCH ACTIVE <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* =========================================================================
              DYNAMIC KPI SECTION (Changes per screen)
             ========================================================================= */}
          {/* 1. AREA OVERVIEW KPIS (Screen 1) */}
          {activeTab === "overview" && (
            <section className="kpi-cards-grid">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">MINES MONITORED</span>
                  <Building2
                    className="kpi-faded-icon text-blue-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">12 / 12</span>
                  <span className="kpi-chip chip-teal">● 100% Online Sync</span>
                </div>
                <div className="kpi-footer">
                  Katras Basin Coal Extraction Cluster
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">REGIONAL SAFETY SCORE</span>
                  <ShieldCheck
                    className="kpi-faded-icon text-emerald-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">
                    88.4<small>/100</small>
                  </span>
                  <span className="kpi-trend trend-up">
                    ▲ +1.8% vs Baseline
                  </span>
                </div>
                <div className="kpi-footer">
                  DGMS Statutory Compliance Index
                </div>
              </div>

              <div className="kpi-card border-red-200">
                <div className="kpi-header">
                  <span className="kpi-label text-red-600 font-semibold">
                    CRITICAL OPEN ALERTS
                  </span>
                  <AlertOctagon
                    className="kpi-faded-icon text-red-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-red-600">7 Total</span>
                  <span className="kpi-chip chip-red">3 Beyond 4h SLA</span>
                </div>
                <div className="kpi-footer text-red-700">
                  Requires Regional GM Sign-off
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">PRODUCTION VS TARGET</span>
                  <Activity
                    className="kpi-faded-icon text-blue-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">94.2%</span>
                  <span className="kpi-chip chip-blue">
                    51,840 t / 55,000 t
                  </span>
                </div>
                <div className="kpi-footer">
                  Daily Dispatch Target Realization
                </div>
              </div>

              <div className="kpi-card border-amber-200">
                <div className="kpi-header">
                  <span className="kpi-label">ENVIRONMENTAL HEALTH</span>
                  <Activity
                    className="kpi-faded-icon text-amber-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">
                    79.1<small>/100</small>
                  </span>
                  <span className="kpi-trend trend-down text-amber-600">
                    2 Pits at CAAQMS Risk
                  </span>
                </div>
                <div className="kpi-footer">
                  Air quality sensor spikes in KGF-03/07
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">LABOUR &amp; WELFARE</span>
                  <Users className="kpi-faded-icon text-indigo-600" size={20} />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">91.8%</span>
                  <span className="kpi-chip chip-teal">
                    8,420 Active Miners
                  </span>
                </div>
                <div className="kpi-footer">
                  Cap-Lamp RFID telemetry synchronized
                </div>
              </div>
            </section>
          )}

          {/* 2. LIVE OPERATIONS KPIS (Screen 2) */}
          {activeTab === "live" && (
            <section className="kpi-cards-grid grid-4-col">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">ACTIVE MOBILE FLEET</span>
                  <Truck className="kpi-faded-icon text-blue-600" size={20} />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">342 Units</span>
                </div>
                <div className="kpi-footer">
                  Dumpers, Shovels, Continuous Miners
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">MINERS UNDERGROUND</span>
                  <HardHat
                    className="kpi-faded-icon text-emerald-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">3,124 Men</span>
                </div>
                <div className="kpi-footer">
                  Cap-Lamp RFID active underground
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">IOT TELEMETRY NODES</span>
                  <Radio className="kpi-faded-icon text-blue-600" size={20} />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">
                    1,480 / 1,480
                  </span>
                  <span className="kpi-chip chip-teal">100% Ingestion</span>
                </div>
                <div className="kpi-footer">● 100% Ingestion Online</div>
              </div>

              <div className="kpi-card border-red-200">
                <div className="kpi-header">
                  <span className="kpi-label text-red-600">
                    TELEMETRY LIMIT FLAGS
                  </span>
                  <AlertTriangle
                    className="kpi-faded-icon text-red-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-red-600">5 Active</span>
                </div>
                <div className="kpi-footer text-red-700">
                  2 CH4, 1 CO, 2 PM10 Outliers
                </div>
              </div>
            </section>
          )}

          {/* 3. REGIONAL GIS MAP KPIS (Screen 3) */}
          {activeTab === "gis" && (
            <section className="kpi-cards-grid grid-4-col">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">MINING LEASES MAPPED</span>
                  <Compass className="kpi-faded-icon text-blue-600" size={20} />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">12 Polygons</span>
                </div>
                <div className="kpi-footer">IBM Approved Boundary Layer</div>
              </div>

              <div className="kpi-card border-amber-200">
                <div className="kpi-header">
                  <span className="kpi-label text-amber-700">
                    BARRIER BUFFER ALARMS
                  </span>
                  <AlertTriangle
                    className="kpi-faded-icon text-amber-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-amber-600">1 Warning</span>
                </div>
                <div className="kpi-footer text-amber-700">
                  KGF-04 Heading: 7.8m to fence
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">BIO-RECLAMATION TARGET</span>
                  <CheckCircle2
                    className="kpi-faded-icon text-emerald-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">
                    48.2 / 50 Ha
                  </span>
                  <span className="kpi-chip chip-teal">NDVI Avg: +0.62</span>
                </div>
                <div className="kpi-footer">Satellite Greenbelts Compliant</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">OVERBURDEN DUMPS MAPPED</span>
                  <Layers
                    className="kpi-faded-icon text-indigo-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">8 Dumps</span>
                </div>
                <div className="kpi-footer">
                  Slope Stability Telemetry Synced
                </div>
              </div>
            </section>
          )}

          {/* 4. STATUTORY REPORTS KPIS (Screen 4) */}
          {activeTab === "statutory" && (
            <section className="kpi-cards-grid grid-4-col">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">COMPILED FILINGS</span>
                  <FileText
                    className="kpi-faded-icon text-blue-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">
                    48 Shift Logs
                  </span>
                </div>
                <div className="kpi-footer">100% Synced Provenance</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">DGMS SAFETY LEDGER</span>
                  <ShieldCheck
                    className="kpi-faded-icon text-emerald-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">88.4% Pass</span>
                </div>
                <div className="kpi-footer">Accident Severity Logged</div>
              </div>

              <div className="kpi-card border-amber-200">
                <div className="kpi-header">
                  <span className="kpi-label text-amber-700">
                    AIR / WATER CESS
                  </span>
                  <Clock className="kpi-faded-icon text-amber-500" size={20} />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-amber-600">
                    Due in 3 Days
                  </span>
                </div>
                <div className="kpi-footer text-amber-700">
                  SPCB Form V Compiled
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">DIGITAL DSC SIGNOFF</span>
                  <FileCheck2
                    className="kpi-faded-icon text-indigo-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">HSM Locked</span>
                </div>
                <div className="kpi-footer">SHA-256 Ledger Audit</div>
              </div>
            </section>
          )}

          {/* 5. ESCALATION QUEUE KPIS (Screen 5) */}
          {activeTab === "escalation" && (
            <section className="kpi-cards-grid grid-4-col">
              <div className="kpi-card border-red-200">
                <div className="kpi-header">
                  <span className="kpi-label text-red-600">
                    4H SLA BREACHES
                  </span>
                  <AlertTriangle
                    className="kpi-faded-icon text-red-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-red-600">3 Tickets</span>
                </div>
                <div className="kpi-footer text-red-700">
                  Breached 4h Local Action SLA
                </div>
              </div>

              <div className="kpi-card border-amber-200">
                <div className="kpi-header">
                  <span className="kpi-label text-amber-700">
                    TECH INVESTIGATION
                  </span>
                  <Activity
                    className="kpi-faded-icon text-amber-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-amber-600">4 Tickets</span>
                </div>
                <div className="kpi-footer text-amber-700">
                  Under Technical Investigation
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">REGIONAL DIRECTIVES</span>
                  <ShieldAlert
                    className="kpi-faded-icon text-blue-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">2 Orders</span>
                </div>
                <div className="kpi-footer">
                  Stop-Work &amp; Water Suppression
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">RESOLVED &amp; AUDITED</span>
                  <CheckCircle2
                    className="kpi-faded-icon text-emerald-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">11 Closed</span>
                </div>
                <div className="kpi-footer">
                  Verified &amp; Cryptographically Audited
                </div>
              </div>
            </section>
          )}

          {/* 6. AREA SETTINGS & RBAC KPIS (Screen 6) */}
          {activeTab === "rbac" && (
            <>
              <section className="kpi-cards-grid grid-4-col">
                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">REGISTERED MINES</span>
                    <Building2
                      className="kpi-faded-icon text-blue-600"
                      size={20}
                    />
                  </div>
                  <div className="kpi-val-row">
                    <span className="kpi-number text-slate-900">12 Pits</span>
                  </div>
                  <div className="kpi-footer">Eastern Sector Cluster</div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">AUTHORITY HIERARCHY</span>
                    <Key
                      className="kpi-faded-icon text-emerald-600"
                      size={20}
                    />
                  </div>
                  <div className="kpi-val-row">
                    <span className="kpi-number text-slate-900">4 Tiers</span>
                  </div>
                  <div className="kpi-footer">
                    Regional GM down to Pit Managers
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">AUDIT HASH MODE</span>
                    <Server
                      className="kpi-faded-icon text-indigo-600"
                      size={20}
                    />
                  </div>
                  <div className="kpi-val-row">
                    <span className="kpi-number text-slate-900">SHA-256</span>
                  </div>
                  <div className="kpi-footer">Write Once Read Many (WORM)</div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-label">AREA SYNC LATENCY</span>
                    <Wifi className="kpi-faded-icon text-teal-600" size={20} />
                  </div>
                  <div className="kpi-val-row">
                    <span className="kpi-number text-emerald-700">
                      &lt;100ms
                    </span>
                  </div>
                  <div className="kpi-footer">Local Mine Edge Hot Sync</div>
                </div>
              </section>
              <section className="domain-controls card-white">
                <div>
                  <h2 className="card-title">Intelligence Domains</h2>
                  <span className="card-subtitle">
                    Select a domain to review its regional operating
                    intelligence.
                  </span>
                </div>
                <div className="domain-button-grid">
                  <button
                    type="button"
                    className={`domain-button ${selectedDomain === "safety" ? "active" : ""}`}
                    onClick={() => setSelectedDomain("safety")}
                  >
                    <ShieldAlert size={18} />
                    <span>Safety Intelligence</span>
                  </button>
                  <button
                    type="button"
                    className={`domain-button ${selectedDomain === "env" ? "active" : ""}`}
                    onClick={() => setSelectedDomain("env")}
                  >
                    <Activity size={18} />
                    <span>Environmental CAA</span>
                  </button>
                  <button
                    type="button"
                    className={`domain-button ${selectedDomain === "prod" ? "active" : ""}`}
                    onClick={() => setSelectedDomain("prod")}
                  >
                    <Layers size={18} />
                    <span>Production &amp; Lease</span>
                  </button>
                  <button
                    type="button"
                    className={`domain-button ${selectedDomain === "labour" ? "active" : ""}`}
                    onClick={() => setSelectedDomain("labour")}
                  >
                    <HardHat size={18} />
                    <span>Labour &amp; Cap-Lamp</span>
                  </button>
                </div>
              </section>
            </>
          )}

          {/* 7. SAFETY INTELLIGENCE KPIS (Screen 7) */}
          {(activeTab === "safety" ||
            (activeTab === "rbac" && selectedDomain === "safety")) && (
            <section className="kpi-cards-grid grid-4-col">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">SAFETY COMPOSITE INDEX</span>
                  <ShieldCheck
                    className="kpi-faded-icon text-emerald-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">88.4 / 100</span>
                </div>
                <div className="kpi-footer">Weighted Multi-Mine Score</div>
              </div>

              <div className="kpi-card border-red-200">
                <div className="kpi-header">
                  <span className="kpi-label text-red-600">
                    CRITICAL HAZARDS
                  </span>
                  <AlertOctagon
                    className="kpi-faded-icon text-red-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-red-600">07 Total</span>
                </div>
                <div className="kpi-footer text-red-700">
                  KGF-04: 4, KGF-07: 3
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">RESCUE STATION READINESS</span>
                  <CheckCircle2
                    className="kpi-faded-icon text-teal-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">
                    48 / 48 SCBA
                  </span>
                </div>
                <div className="kpi-footer">Standby Muster Verified</div>
              </div>

              <div className="kpi-card border-amber-200">
                <div className="kpi-header">
                  <span className="kpi-label text-amber-700">
                    SIRDAR SHIFT REPORTS
                  </span>
                  <FileText
                    className="kpi-faded-icon text-amber-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">
                    45 / 48 Filed
                  </span>
                </div>
                <div className="kpi-footer text-amber-700">
                  3 Delinquent in South Sector
                </div>
              </div>
            </section>
          )}

          {/* 8. ENVIRONMENTAL CAA KPIS (Screen 8) */}
          {(activeTab === "env" ||
            (activeTab === "rbac" && selectedDomain === "env")) && (
            <section className="kpi-cards-grid grid-4-col">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">REGIONAL ENV INDEX</span>
                  <Activity
                    className="kpi-faded-icon text-emerald-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">79.1 / 100</span>
                </div>
                <div className="kpi-footer">2 Collieries at CAAQMS Risk</div>
              </div>

              <div className="kpi-card border-red-200">
                <div className="kpi-header">
                  <span className="kpi-label text-red-600">
                    AIR QUALITY EXCEEDANCE
                  </span>
                  <AlertTriangle
                    className="kpi-faded-icon text-red-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-red-600">1 Exceeded</span>
                </div>
                <div className="kpi-footer text-red-700">
                  KGF-04: PM10 142 µg/m³ (+42%)
                </div>
              </div>

              <div className="kpi-card border-red-200">
                <div className="kpi-header">
                  <span className="kpi-label text-red-600">
                    WATER DISCHARGE FLAGS
                  </span>
                  <AlertOctagon
                    className="kpi-faded-icon text-red-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-red-600">1 Acid Breach</span>
                </div>
                <div className="kpi-footer text-red-700">
                  KGF-07: pH 5.2 (Stop-Discharge)
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">50-HA BIO-RECLAMATION</span>
                  <CheckCircle2
                    className="kpi-faded-icon text-teal-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">
                    48.2 / 50 Ha
                  </span>
                </div>
                <div className="kpi-footer">NDVI: +0.62 (Compliant)</div>
              </div>
            </section>
          )}

          {/* 9. PRODUCTION & LEASE KPIS (Screen 9) */}
          {(activeTab === "prod" ||
            (activeTab === "rbac" && selectedDomain === "prod")) && (
            <section className="kpi-cards-grid grid-4-col">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">DAILY COAL TARGET</span>
                  <Layers className="kpi-faded-icon text-blue-600" size={20} />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">55,000 t</span>
                </div>
                <div className="kpi-footer">12 Mines Combined Plan</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">ACTUAL MINED OUTPUT</span>
                  <TrendingUp
                    className="kpi-faded-icon text-emerald-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">51,840 t</span>
                  <span className="kpi-chip chip-blue">94.2% Achievement</span>
                </div>
                <div className="kpi-footer">-3,160 t gap from target</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">REGIONAL STRIPPING RATIO</span>
                  <Truck className="kpi-faded-icon text-indigo-600" size={20} />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">2.84 m³/t</span>
                </div>
                <div className="kpi-footer">
                  Target: 2.90 m³/t (OB: 147k m³)
                </div>
              </div>

              <div className="kpi-card border-red-200">
                <div className="kpi-header">
                  <span className="kpi-label text-red-600">
                    MINES &gt;20% VARIANCE
                  </span>
                  <AlertTriangle
                    className="kpi-faded-icon text-red-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-red-600">1 Breach</span>
                </div>
                <div className="kpi-footer text-red-700">
                  KGF-04: -28% Output Drop
                </div>
              </div>
            </section>
          )}

          {/* 10. LABOUR & CAP-LAMP KPIS (Screen 10) */}
          {(activeTab === "labour" ||
            (activeTab === "rbac" && selectedDomain === "labour")) && (
            <section className="kpi-cards-grid grid-4-col">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">ACTIVE WORKFORCE</span>
                  <Users className="kpi-faded-icon text-blue-600" size={20} />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">8,420</span>
                </div>
                <div className="kpi-footer">5,140 Regular | 3,280 Contract</div>
              </div>

              <div className="kpi-card border-red-200">
                <div className="kpi-header">
                  <span className="kpi-label text-red-600">
                    CAP-LAMP MISMATCHES
                  </span>
                  <AlertOctagon
                    className="kpi-faded-icon text-red-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-red-600">
                    18 Delta Flags
                  </span>
                </div>
                <div className="kpi-footer text-red-700">
                  Trapped Miner Protection Alarm
                </div>
              </div>

              <div className="kpi-card border-amber-200">
                <div className="kpi-header">
                  <span className="kpi-label text-amber-700">
                    CONTRACTOR EXPIRIES
                  </span>
                  <FileText
                    className="kpi-faded-icon text-amber-500"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-amber-600">14 Licenses</span>
                </div>
                <div className="kpi-footer text-amber-700">
                  Due within 14 Days (Form V)
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">PME MEDICAL STATUS</span>
                  <CheckCircle2
                    className="kpi-faded-icon text-emerald-600"
                    size={20}
                  />
                </div>
                <div className="kpi-val-row">
                  <span className="kpi-number text-slate-900">88.4%</span>
                  <span className="kpi-chip chip-teal">Compliant</span>
                </div>
                <div className="kpi-footer">
                  142 Overdue (&gt;5y Mines Rules)
                </div>
              </div>
            </section>
          )}

          {/* =========================================================================
              MIDDLE SPLIT: 12-Colliery Matrix (2/3) + Dynamic Screen Line Graph (1/3)
             ========================================================================= */}
          <div className="middle-split-grid mt-4">
            {/* Left 2/3: Colliery Performance Matrix */}
            <div className="card-white colliery-matrix-card">
              <div className="card-header-row">
                <div>
                  <h2 className="card-title">
                    12-Colliery Operational Performance Matrix
                  </h2>
                  <p className="card-subtitle">
                    Live Cluster Health • Safety, Environmental, Production
                    &amp; Labour Audit
                  </p>
                </div>

                <div className="card-actions-row">
                  <div className="filter-pill-group">
                    <button
                      type="button"
                      className={`filter-btn ${filterStatus === "ALL" ? "active" : ""}`}
                      onClick={() => setFilterStatus("ALL")}
                    >
                      All (12)
                    </button>
                    <button
                      type="button"
                      className={`filter-btn ${filterStatus === "CRITICAL" ? "active" : ""}`}
                      onClick={() => setFilterStatus("CRITICAL")}
                    >
                      Critical (2)
                    </button>
                    <button
                      type="button"
                      className={`filter-btn ${filterStatus === "WATCH" ? "active" : ""}`}
                      onClick={() => setFilterStatus("WATCH")}
                    >
                      Watch (2)
                    </button>
                    <button
                      type="button"
                      className={`filter-btn ${filterStatus === "HEALTHY" ? "active" : ""}`}
                      onClick={() => setFilterStatus("HEALTHY")}
                    >
                      Healthy (2)
                    </button>
                  </div>

                  <span className="live-pill">
                    <span className="live-dot"></span> Live Cluster Health
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="reg-table">
                  <thead>
                    <tr>
                      <th>COLLIERY ID</th>
                      <th className="text-center">SAFETY</th>
                      <th className="text-center">ENV.</th>
                      <th className="text-center">PROD.</th>
                      <th className="text-center">LABOUR</th>
                      <th className="text-center">OVERALL</th>
                      <th className="text-center">ALERTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMines.map((m) => (
                      <tr
                        key={m.id}
                        className={
                          m.status === "CRITICAL" ? "row-critical" : ""
                        }
                      >
                        <td>
                          <div className="colliery-name-cell">
                            <strong className="colliery-title">{m.id}</strong>
                            <span className="colliery-type">{m.type}</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span
                            className={`metric-score ${m.safety < 75 ? "score-red" : m.safety < 85 ? "score-amber" : "score-green"}`}
                          >
                            {m.safety}%
                          </span>
                        </td>
                        <td className="text-center">
                          <span
                            className={`metric-score ${m.env < 75 ? "score-red" : m.env < 85 ? "score-amber" : "score-green"}`}
                          >
                            {m.env}%
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="metric-score font-semibold text-slate-800">
                            {m.prod}%
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="metric-score font-semibold text-slate-800">
                            {m.labour}%
                          </span>
                        </td>
                        <td className="text-center">
                          <span
                            className={`status-badge badge-${m.status.toLowerCase()}`}
                          >
                            {m.status}
                          </span>
                        </td>
                        <td className="text-center">
                          {m.alerts > 0 ? (
                            <span
                              className={`alerts-tag ${m.escalated > 0 ? "alerts-tag-esc" : ""}`}
                            >
                              {m.alerts}{" "}
                              {m.escalated > 0 ? `(${m.escalated} Esc.)` : ""}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono text-xs">
                              0
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Bottom Directive Bar */}
              <div className="directive-bar">
                <div className="directive-label">
                  <Zap size={14} /> Operational Directive #REG-GM-2026-04
                </div>
                <p className="directive-text">
                  KGF-04 Methane &gt; 0.8% and barrier pillar clearance warning
                  unresolved past 4h local SLA. Regional GM directive pending to
                  enforce stop-heading.
                </p>
                <button
                  type="button"
                  className="directive-btn"
                  onClick={() => setActiveTab("escalation")}
                >
                  Action
                </button>
              </div>
            </div>

            {/* Right 1/3: Screen-Specific Graphs & AI Anomaly Detection */}
            <div className="right-analytics-col">
              {/* Dynamic Graph by screen */}
              <div className="card-white graph-card">
                {/* 1. Overview Trajectory (Screen 1) */}
                {activeTab === "overview" && (
                  <>
                    <div className="graph-card-header">
                      <div>
                        <h3 className="card-title text-sm">
                          30-DAY HEALTH TRAJECTORY (LINE GRAPH)
                        </h3>
                        <span className="card-subtitle text-xs">
                          Prod % vs Safety vs Target
                        </span>
                      </div>
                      <div className="chart-legend">
                        <span className="legend-item">
                          <span className="leg-dot bg-blue-600"></span> Prod %
                        </span>
                        <span className="legend-item">
                          <span className="leg-dot bg-emerald-600"></span>{" "}
                          Safety
                        </span>
                        <span className="legend-item">
                          <span className="leg-dot bg-red-400 border-dashed"></span>{" "}
                          Target (95%)
                        </span>
                      </div>
                    </div>
                    <svg viewBox="0 0 380 130" className="health-chart-svg">
                      <line
                        x1="10"
                        y1="25"
                        x2="370"
                        y2="25"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeDasharray="3,3"
                      />
                      <path
                        d="M10,80 Q120,60 200,68 T370,36"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M10,65 Q120,70 200,55 T370,34"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />
                      <circle cx="370" cy="36" r="4" fill="#2563eb" />
                      <circle cx="370" cy="34" r="4" fill="#10b981" />
                    </svg>
                    <div className="chart-x-axis">
                      <span>Day 1</span>
                      <span>Day 7</span>
                      <span>Day 14</span>
                      <span>Day 21</span>
                      <strong className="text-blue-700">Day 30 (94.2%)</strong>
                    </div>
                  </>
                )}

                {/* 2. Live Waveform (Screen 2) */}
                {activeTab === "live" && (
                  <>
                    <div className="graph-card-header">
                      <div>
                        <h3 className="card-title text-sm">
                          24-HOUR HOURLY DISPATCH WAVEFORM
                        </h3>
                        <span className="card-subtitle text-xs">
                          Coal Dispatched per shift
                        </span>
                      </div>
                    </div>
                    <svg viewBox="0 0 380 130" className="health-chart-svg">
                      <path
                        d="M10,60 Q100,30 200,45 T370,40"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M10,75 Q100,55 200,60 T370,55"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      <path
                        d="M10,100 Q100,85 200,90 T370,75"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="chart-x-axis">
                      <span>03:00 (C)</span>
                      <span>06:00 (A)</span>
                      <span>12:00 (Peak)</span>
                      <span>18:00 (B)</span>
                      <span>23:59</span>
                    </div>
                  </>
                )}

                {/* 3. GIS Multi-Year Growth (Screen 3) */}
                {activeTab === "gis" && (
                  <>
                    <div className="graph-card-header">
                      <div>
                        <h3 className="card-title text-sm">
                          MULTI-YEAR BIO-RECLAMATION GROWTH
                        </h3>
                        <span className="card-subtitle text-xs">
                          Reclaimed Ha vs EC Mandate Target
                        </span>
                      </div>
                    </div>
                    <svg viewBox="0 0 380 130" className="health-chart-svg">
                      <line
                        x1="10"
                        y1="35"
                        x2="370"
                        y2="35"
                        stroke="#0284c7"
                        strokeWidth="1.5"
                        strokeDasharray="4,4"
                      />
                      <path
                        d="M10,105 Q120,80 240,55 T370,38"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="2.5"
                      />
                      <circle cx="370" cy="38" r="4.5" fill="#16a34a" />
                    </svg>
                    <div className="chart-x-axis">
                      <span>2022</span>
                      <span>2023</span>
                      <span>2024</span>
                      <span>2025</span>
                      <strong className="text-emerald-700">
                        2026 (96.4% Reclaimed)
                      </strong>
                    </div>
                  </>
                )}

                {/* 4. Statutory Pass Rate (Screen 4) */}
                {activeTab === "statutory" && (
                  <>
                    <div className="graph-card-header">
                      <div>
                        <h3 className="card-title text-sm">
                          12-MONTH REGULATORY PASS RATE
                        </h3>
                        <span className="card-subtitle text-xs">
                          DGMS &amp; SPCB Pass % vs 95% Target
                        </span>
                      </div>
                    </div>
                    <svg viewBox="0 0 380 130" className="health-chart-svg">
                      <line
                        x1="10"
                        y1="30"
                        x2="370"
                        y2="30"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeDasharray="3,3"
                      />
                      <path
                        d="M10,75 Q120,60 240,45 T370,35"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      <path
                        d="M10,90 Q120,70 240,50 T370,40"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2"
                      />
                      <circle cx="370" cy="35" r="4" fill="#10b981" />
                      <circle cx="370" cy="40" r="4" fill="#0284c7" />
                    </svg>
                    <div className="chart-x-axis">
                      <span>Oct 2025</span>
                      <span>Jan 2026</span>
                      <span>Apr 2026</span>
                      <span>Jul 2026</span>
                      <strong className="text-blue-700">
                        Sep 2026 (94.8%)
                      </strong>
                    </div>
                  </>
                )}

                {/* 5. Escalation Velocity (Screen 5) */}
                {activeTab === "escalation" && (
                  <>
                    <div className="graph-card-header">
                      <div>
                        <h3 className="card-title text-sm">
                          MONTHLY SLA BREACH VS RESOLUTION VELOCITY
                        </h3>
                        <span className="card-subtitle text-xs">
                          Closed in SLA vs Breached (&gt;4h)
                        </span>
                      </div>
                    </div>
                    <svg viewBox="0 0 380 130" className="health-chart-svg">
                      <path
                        d="M10,85 Q120,65 240,40 T370,30"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M10,50 Q120,65 240,80 T370,95"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="2.5"
                      />
                      <circle cx="370" cy="30" r="4" fill="#16a34a" />
                      <circle cx="370" cy="95" r="4" fill="#dc2626" />
                    </svg>
                    <div className="chart-x-axis">
                      <span>May 2026</span>
                      <span>Jun 2026</span>
                      <span>Jul 2026</span>
                      <span>Aug 2026</span>
                      <strong className="text-slate-800">Sep 2026</strong>
                    </div>
                  </>
                )}

                {/* 6. RBAC Sync Latency (Screen 6) */}
                {activeTab === "rbac" && (
                  <>
                    <div className="graph-card-header">
                      <div>
                        <h3 className="card-title text-sm">
                          CLUSTER EDGE SYNC &amp; TELEMETRY LATENCY
                        </h3>
                        <span className="card-subtitle text-xs">
                          Sync Latency (ms) vs SLA Limit (200ms)
                        </span>
                      </div>
                    </div>
                    <svg viewBox="0 0 380 130" className="health-chart-svg">
                      <line
                        x1="10"
                        y1="35"
                        x2="370"
                        y2="35"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeDasharray="3,3"
                      />
                      <path
                        d="M10,85 L80,80 L160,88 L240,82 L320,75 L370,72"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2.5"
                      />
                      <circle cx="370" cy="72" r="4" fill="#0284c7" />
                    </svg>
                    <div className="chart-x-axis">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                      <strong className="text-emerald-700">
                        Current: 88ms
                      </strong>
                    </div>
                  </>
                )}

                {/* 7. Safety Score vs Incident Rate (Screen 7) */}
                {(activeTab === "safety" ||
                  (activeTab === "rbac" && selectedDomain === "safety")) && (
                  <>
                    <div className="graph-card-header">
                      <div>
                        <h3 className="card-title text-sm">
                          12-MONTH SAFETY SCORE VS INCIDENT RATE
                        </h3>
                        <span className="card-subtitle text-xs">
                          Safety Index vs Incident Rate (LTIFR)
                        </span>
                      </div>
                    </div>
                    <svg viewBox="0 0 380 130" className="health-chart-svg">
                      <path
                        d="M10,85 Q120,70 240,55 T370,40"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M10,45 Q120,60 240,75 T370,88"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="2.5"
                      />
                      <circle cx="370" cy="40" r="4" fill="#16a34a" />
                      <circle cx="370" cy="88" r="4" fill="#dc2626" />
                    </svg>
                    <div className="chart-x-axis">
                      <span>Oct 2025</span>
                      <span>Jan 2026</span>
                      <span>Apr 2026</span>
                      <span>Jul 2026</span>
                      <strong className="text-emerald-700">
                        Sep 2026 (Score: 88.4)
                      </strong>
                    </div>
                  </>
                )}

                {/* 8. CAAQMS Dust Telemetry (Screen 8) */}
                {(activeTab === "env" ||
                  (activeTab === "rbac" && selectedDomain === "env")) && (
                  <>
                    <div className="graph-card-header">
                      <div>
                        <h3 className="card-title text-sm">
                          24-HOUR ROLLING CAAQMS DUST TELEMETRY
                        </h3>
                        <span className="card-subtitle text-xs">
                          PM10 / PM2.5 vs CPCB Limit (100 µg/m³)
                        </span>
                      </div>
                    </div>
                    <svg viewBox="0 0 380 130" className="health-chart-svg">
                      <line
                        x1="10"
                        y1="40"
                        x2="370"
                        y2="40"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeDasharray="3,3"
                      />
                      <path
                        d="M10,80 Q100,70 200,55 T370,35"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2"
                      />
                      <path
                        d="M10,105 Q100,95 200,85 T370,65"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />
                      <circle cx="370" cy="35" r="4" fill="#0284c7" />
                      <circle cx="370" cy="65" r="4" fill="#f59e0b" />
                    </svg>
                    <div className="chart-x-axis">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00 (Thermal Inversion)</span>
                      <span>23:59</span>
                    </div>
                  </>
                )}

                {/* 9. Cumulative Output Curve (Screen 9) */}
                {(activeTab === "prod" ||
                  (activeTab === "rbac" && selectedDomain === "prod")) && (
                  <>
                    <div className="graph-card-header">
                      <div>
                        <h3 className="card-title text-sm">
                          CUMULATIVE DAILY OUTPUT CURVE VS TARGET
                        </h3>
                        <span className="card-subtitle text-xs">
                          Plan Target (55k t) vs Actual Extraction
                        </span>
                      </div>
                    </div>
                    <svg viewBox="0 0 380 130" className="health-chart-svg">
                      <line
                        x1="10"
                        y1="35"
                        x2="370"
                        y2="35"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                        strokeDasharray="4,4"
                      />
                      <path
                        d="M10,110 L120,85 L240,60 L370,42"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="3"
                      />
                      <circle cx="370" cy="42" r="4.5" fill="#0284c7" />
                    </svg>
                    <div className="chart-x-axis">
                      <span>Shift C (Start)</span>
                      <span>Shift A</span>
                      <span>Shift B</span>
                      <strong className="text-blue-700">
                        Current: 51,840 t
                      </strong>
                    </div>
                  </>
                )}

                {/* 10. Labour Attendance (Screen 10) */}
                {(activeTab === "labour" ||
                  (activeTab === "rbac" && selectedDomain === "labour")) && (
                  <>
                    <div className="graph-card-header">
                      <div>
                        <h3 className="card-title text-sm">
                          30-DAY DAILY SHIFT ATTENDANCE RATE
                        </h3>
                        <span className="card-subtitle text-xs">
                          Shift A, Shift B, Shift C (Night Dip)
                        </span>
                      </div>
                    </div>
                    <svg viewBox="0 0 380 130" className="health-chart-svg">
                      <path
                        d="M10,40 Q100,45 200,40 T370,42"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2"
                      />
                      <path
                        d="M10,55 Q100,60 200,55 T370,58"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="2"
                      />
                      <path
                        d="M10,80 L80,95 L160,82 L240,98 L320,85 L370,82"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />
                      <circle cx="80" cy="95" r="3.5" fill="#dc2626" />
                      <circle cx="240" cy="98" r="3.5" fill="#dc2626" />
                    </svg>
                    <div className="chart-x-axis">
                      <span>Day 1</span>
                      <span>Day 7 (Fri Dip)</span>
                      <span>Day 14</span>
                      <span>Day 21 (Fri Dip)</span>
                      <span>Day 30</span>
                    </div>
                  </>
                )}
              </div>

              {/* AI Cluster Anomaly Detection Card */}
              <div className="card-white ai-anomaly-card">
                <div className="ai-card-header">
                  <div className="ai-title-wrap">
                    <Zap size={15} className="text-purple-600" />
                    <strong className="ai-title">
                      AI CLUSTER ANOMALY DETECTION
                    </strong>
                  </div>
                  <span className="ai-conf-chip">94% CONF.</span>
                </div>
                <p className="ai-anomaly-body">
                  Multi-mine pattern detection identifies particulate surge
                  across <strong>KGF-03, 04, and 07</strong> due to low-altitude
                  valley inversion. Regional mist-tankers deployed.
                </p>
                <div className="ai-footer-row">
                  <span className="text-xs text-slate-500">
                    Auto-correlated from 1,480 IoT nodes
                  </span>
                  <button
                    type="button"
                    className="ai-action-link"
                    onClick={() => setActiveTab("env")}
                  >
                    View CAA Telemetry →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
