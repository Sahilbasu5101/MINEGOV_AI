import { useMemo } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Lock,
  Clock,
  Terminal,
} from "lucide-react";

export function DemoDashboard({ currentHash, onBackToGateway, onBackToHome }) {
  const roleKey = currentHash.replace(/^#demo_/, "");

  const sessionToken = useMemo(() => {
    const hashSum = Math.abs(
      currentHash
        .split("")
        .reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
    );
    return `MG-${(hashSum % 900000) + 100000}-IN`;
  }, [currentHash]);

  const loginTime = useMemo(() => {
    return new Date().toLocaleTimeString();
  }, []);

  const roleMeta = {
    cil: {
      name: "Coal India Limited (CIL) Apex Portal",
      role: "Apex Executive Officer",
      department: "Ministry of Coal & Mines, GoI",
      level: "National Command Level 0",
      scope: "CIL Apex HQ • All Subsidiaries (BCCL, SECL, ECL, CCL, WCL, NCL, MCL)",
      color: "#22d3ee",
      modules: [
        "National Coal Production Aggregate",
        "Pan-India Drone & GIS Surveillance",
        "Subsidiary Compliance Index",
        "Apex Policy Enforcement System",
      ],
    },
    subsidiary: {
      name: "BCCL Subsidiary Portal",
      role: "CMD / Subsidiary Director",
      department: "Bharat Coking Coal Limited (BCCL)",
      level: "Subsidiary Command Level 1",
      scope: "Dhanbad Coal Basin • 12 Operational Areas",
      color: "#38bdf8",
      modules: [
        "BCCL Area Dispatch Dashboard",
        "Subsidiary Environmental Audits",
        "Heavy Earth Moving Machinery (HEMM) Tracking",
        "Safety Clearance Directives",
      ],
    },
    regional_area: {
      name: "Katras Area Regional Portal",
      role: "Regional Area General Manager",
      department: "Katras Area Office (BCCL)",
      level: "Regional Command Level 1.5",
      scope: "Katras Area Mining Leases & OCP Clusters",
      color: "#60a5fa",
      modules: [
        "Katras Area Extraction Log",
        "Gaslitand & Kusunda OCP Live Feed",
        "Sub-divisional Safety Violations Tracker",
        "Manpower Allocation Roster",
      ],
    },
    safety_head_officer: {
      name: "Safety Head Officer Dashboard",
      role: "Safety Head Officer / Field Inspector",
      department: "DGMS Mine Safety Cell",
      level: "Operational Safety Level 2",
      scope: "Gaslitand OCP • Katras Area • BCCL",
      color: "#34d399",
      modules: [
        "Real-Time Gas & Slope Hazard Monitoring",
        "DGMS Statutory Inspection Checklists",
        "Near-Miss Incident Reporter",
        "PPE & Evacuation Readiness Live Status",
      ],
    },
    environment_head_officer: {
      name: "Environment Head Officer Dashboard",
      role: "Environment Head Officer",
      department: "Environmental Clearance & Forest Conservation Cell",
      level: "Environmental Audit Level 2",
      scope: "Gaslitand OCP • Katras Area • BCCL",
      color: "#4ade80",
      modules: [
        "Continuous Ambient Air Quality Monitoring (CAAQMS)",
        "Effluent Treatment & Mine Water Discharge Log",
        "Topsoil Preservation & Reclamation Tracker",
        "Noise & Blast Vibration Telemetry",
      ],
    },
    production_head_officer: {
      name: "Production Head Officer Dashboard",
      role: "Production Head Officer",
      department: "Coal Extraction & Haulage Operations",
      level: "Production Command Level 2",
      scope: "Gaslitand OCP • Katras Area • BCCL",
      color: "#f59e0b",
      modules: [
        "Daily Coal Dispatch & Target Realization",
        "Overburden (OB) Removal Metrics",
        "Excavator & Dumper Cycle Telemetry",
        "Coal Seam Quality & Moisture Analyzer",
      ],
    },
    welfare_head_officer: {
      name: "Welfare Head Officer Dashboard",
      role: "Welfare Head Officer",
      department: "Workforce Welfare & Occupational Health Cell",
      level: "Mine Welfare Level 2",
      scope: "Gaslitand OCP • Katras Area • BCCL",
      color: "#a78bfa",
      modules: [
        "Shift Worker Health Surveillance Roster",
        "Dust Mask & Respiratory Filter Dispensary",
        "Mines Act 1952 Welfare Compliance Register",
        "Canteen & Drinking Water Quality Audits",
      ],
    },
    mine_manager: {
      name: "Mine Manager Operational Command",
      role: "Mine Manager (Statutory In-Charge)",
      department: "Mine Operations & Regulatory Command",
      level: "Statutory On-Site In-Charge (DGMS Certified)",
      scope: "Gaslitand OCP • Katras Area • BCCL",
      color: "#fb7185",
      modules: [
        "Master Operational Pit Command",
        "Shift In-Charge Handover & Statutory Shift Logs",
        "Blasting Schedule & Sirens Authorization",
        "Emergency Crisis Response Matrix",
      ],
    },
    regulatory_dgms: {
      name: "DGMS Regulatory Oversight Command",
      role: "Directorate General of Mines Safety (DGMS)",
      department: "DGMS Eastern Zone / HQ Dhanbad, GoI",
      level: "Statutory Regulatory Oversight Level 1",
      scope: "National Coal & Metalliferous Mines Safety Audit Purview",
      color: "#eab308",
      modules: [
        "Statutory Violation Notice Register (Section 22)",
        "Real-Time Air, Gas & Inundation Telemetry Audits",
        "Fatal & Serious Incident Investigation Portal",
        "Mine Manager Certification & Compliance Verification",
      ],
    },
    regulatory_ibm: {
      name: "IBM Mineral Conservation Portal",
      role: "Indian Bureau of Mines (IBM)",
      department: "Ministry of Mines, Government of India",
      level: "National Mineral Regulatory Authority",
      scope: "Pan-India Mining Leases & Mining Plan Purview",
      color: "#38bdf8",
      modules: [
        "Mining Plan / Scheme of Mining Approvals",
        "Star Rating of Mines Compliance Audit",
        "MCDR Mineral Conservation & Systematic Development",
        "Drone & Satellite Extraction Verification",
      ],
    },
    regulatory_moefcc: {
      name: "MoEFCC Environmental Clearance Gateway",
      role: "Ministry of Environment, Forest & Climate Change",
      department: "MoEFCC Impact Assessment Division, New Delhi",
      level: "Central Environmental Regulatory Authority",
      scope: "Environmental Clearances (EC) & Forest Diversion Leases",
      color: "#4ade80",
      modules: [
        "Half-Yearly EC Compliance Monitoring (PARIVESH)",
        "Afforestation & Progressive Mine Closure Audit",
        "Catchment Area & Water Body Buffer Surveillance",
        "Topsoil & Overburden Reclamation Geospatial Tracker",
      ],
    },
    regulatory_cpcb: {
      name: "CPCB / SPCB Pollution Surveillance Command",
      role: "Central / State Pollution Control Board",
      department: "Central Pollution Control Board (CPCB), Parivesh Bhawan",
      level: "Pollution Control & Emission Enforcement",
      scope: "Ambient Air Quality & Mine Effluent Discharge Monitoring",
      color: "#0ea5e9",
      modules: [
        "Continuous Ambient Air Quality Monitoring (CAAQMS)",
        "Effluent Treatment Plant (ETP) Discharge Telemetry",
        "Fly Ash & Hazardous Mine Waste Tracking",
        "Consent to Operate (CTO) / CTE Statutory Audits",
      ],
    },
    regulatory_state_mining: {
      name: "State Mining Authority Directorate",
      role: "State Directorate of Mines & Geology",
      department: "Department of Mines & Geology, State Government",
      level: "State Mineral Administration & Revenue",
      scope: "State Mining Leases, Transit Passes & DMF Audits",
      color: "#a855f7",
      modules: [
        "Mineral Royalty Assessment & e-Challan Verifier",
        "District Mineral Foundation (DMF) Project Tracker",
        "Illegal Mining Prevention & Vehicle RFID Surveillance",
        "State Boundary & Lease Perimeter Reconciliation",
      ],
    },
    regulatory_other: {
      name: "Inter-Agency Regulatory Surveillance Command",
      role: "Other Central / State Regulatory Body",
      department: "Inter-Ministerial Surveillance Network, GoI",
      level: "Multi-Agency Regulatory Purview",
      scope: "Cross-Jurisdiction Mining Surveillance & Law Enforcement",
      color: "#f43f5e",
      modules: [
        "Integrated Inter-Agency Intelligence Feed",
        "Special Task Force Audit Logs",
        "National Mineral Leakage & Tax Fraud Analytics",
        "Cross-Border Transit Verification",
      ],
    },
  };

  const currentRole = roleMeta[roleKey] || {
    name: "MineGov AI Role Dashboard",
    role: roleKey || "Authorized Official",
    department: "Ministry of Mines & Coal, GoI",
    level: "Authorized Access Level",
    scope: "National Mine Intelligence Grid",
    color: "#22d3ee",
    modules: ["Core Operational Intelligence", "Statutory Compliance", "Surveillance Feed"],
  };

  return (
    <div className="demo-dashboard-page">
      {/* Top Navbar */}
      <header className="demo-dash-nav">
        <div className="dash-nav-left">
          <button
            type="button"
            className="dash-back-btn"
            onClick={onBackToGateway}
            title="Return to Access Gateway"
          >
            <ArrowLeft size={16} />
            <span>Switch Role / Gateway</span>
          </button>
          <div className="gateway-divider-v"></div>
          <span className="dash-role-chip" style={{ borderColor: currentRole.color }}>
            <span className="pulse-dot" style={{ background: currentRole.color }}></span>
            {currentRole.role}
          </span>
        </div>

        <div className="dash-nav-right">
          <span className="dash-url-indicator">
            URL: <code>{currentHash}</code>
          </span>
          <button
            type="button"
            className="dash-home-btn"
            onClick={onBackToHome}
          >
            Portal Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="demo-dash-main">
        {/* Banner */}
        <div className="demo-status-banner">
          <div className="banner-left">
            <span className="banner-badge">
              <CheckCircle size={15} /> AUTHENTICATION SUCCESSFUL
            </span>
            <h1>{currentRole.name}</h1>
            <p className="banner-scope-txt">
              <strong>Department:</strong> {currentRole.department} &nbsp;|&nbsp;{" "}
              <strong>Level:</strong> {currentRole.level}
            </p>
          </div>
          <div className="banner-right">
            <div className="security-token-card">
              <div className="token-label">
                <Lock size={13} /> ACTIVE SESSION TOKEN
              </div>
              <div className="token-val">{sessionToken}</div>
              <div className="token-time">
                <Clock size={12} /> Logged in: {loginTime}
              </div>
            </div>
          </div>
        </div>

        {/* Construction notice */}
        <div className="construction-notice-card">
          <div className="construction-icon">
            <Terminal size={22} />
          </div>
          <div className="construction-text">
            <h3>Role-Based Dashboard Placeholder ({currentHash})</h3>
            <p>
              Aapka authentication role <strong>{currentRole.role}</strong> ke liye confirm ho chuka
              hai. Currently redirects successfully to <code>{currentHash}</code>. Baad me yahan
              detailed operational modules, charts aur forms integrate honge.
            </p>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="dash-section-header">
          <h2>Scheduled Modules for {currentRole.role}</h2>
          <span>Authorized under Mining Surveillance Directive 2026</span>
        </div>

        <div className="dash-modules-grid">
          {currentRole.modules.map((modName, idx) => (
            <div className="dash-module-card" key={idx}>
              <div className="mod-card-top">
                <span className="mod-num">0{idx + 1}</span>
                <span className="mod-badge">Ready for Integration</span>
              </div>
              <h3 className="mod-title">{modName}</h3>
              <p className="mod-desc">
                Authorized real-time interface tailored for {currentRole.role}. Configured for{" "}
                {currentRole.scope}.
              </p>
              <div className="mod-footer">
                <span className="mod-status-dot"></span>
                <span>Role Permission Level Verified</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
