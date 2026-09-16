import { useEffect, useState, useCallback, useRef } from "react";
import Icon from "./Icons";
import "./MineManagerDashboard.css";
import { MineMap } from "../../views/components/MineMap";
import { LiveMonitoringView } from "./LiveMonitoringView";
import { MineMapView } from "./MineMapView";
import { OperationsAssetView } from "./OperationsAssetView";
import { SafetyDetailsView } from "./SafetyDetailsView";
import { EnvironmentDetailsView } from "./EnvironmentDetailsView";
import { ProductionDetailsView } from "./ProductionDetailsView";
import { LabourDetailsView } from "./LabourDetailsView";
import { ReportsView } from "./ReportsView";
import { AlertsView } from "./AlertsView";
import { SettingsView } from "./SettingsView";
import {
  availableMines,
  trendDataRanges,
  kpiCards,
  realtimeAlerts,
  riskScore,
  authorityOrders,
  recentActivity,
  navItems,
  sectionDetails,
} from "./dashboardData";

/* ---------------- helpers ---------------- */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(d) {
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function formatTime(d) {
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${String(h).padStart(2, "0")}:${m}:${s} ${ampm}`;
}

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/* ---------------- Brand logo ---------------- */

function BrandLogo({ size = 36 }) {
  return (
    <svg
      viewBox="0 0 64 44"
      width={size}
      height={(size * 44) / 64}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mmPeakA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="mmPeakB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path d="M32 3 62 41H2L32 3Z" fill="url(#mmPeakA)" />
      <path d="M18 16 40 41H2l16-25Z" fill="url(#mmPeakB)" />
      <path d="M32 3 44 18l-7 4-5-7-5 7-7-4L32 3Z" fill="#fff" opacity=".92" />
      <path d="M18 16l7 9-4 3-4-5-3 4-3-2 7-9Z" fill="#fff" opacity=".75" />
      <path
        d="M2 41h60"
        stroke="#1e3a8a"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity=".35"
      />
    </svg>
  );
}

/* ---------------- Toast Notification ---------------- */

function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`mm-toast is-${type}`}>
      <Icon name={type === "success" ? "check" : type === "alert" ? "warning" : "info"} size={15} />
      <span>{message}</span>
      <button
        type="button"
        className="mm-toast-close"
        onClick={onClose}
        aria-label="Close notification"
        title="Hide notification"
      >
        ✕
      </button>
    </div>
  );
}

/* ---------------- Detail Panel (Slide-Over) ---------------- */

function DetailPanel({ sectionKey, onClose, onShowToast }) {
  const detail = sectionDetails[sectionKey];
  if (!detail) return null;

  return (
    <>
      <div className="mm-panel-overlay" onClick={onClose} />
      <aside className="mm-panel">
        <div className="mm-panel-header">
          <span className="mm-panel-icon">
            <Icon name={detail.icon} size={18} />
          </span>
          <h2>{detail.title}</h2>
          <button
            type="button"
            className="mm-panel-close"
            onClick={onClose}
            aria-label="Close panel"
          >
            <Icon name="close" size={15} />
          </button>
        </div>

        <div className="mm-panel-body">
          <div className="mm-panel-grid">
            {detail.items.map((item) => (
              <div key={item.label} className={`mm-panel-stat is-${item.status}`}>
                <span className="mm-panel-stat-label">
                  <span className="mm-panel-dot" />
                  {item.label}
                </span>
                <span className="mm-panel-stat-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mm-panel-footer">
          <button
            type="button"
            className="mm-panel-btn is-primary"
            onClick={() => {
              onShowToast(`${detail.title} report exported successfully!`, "success");
              onClose();
            }}
          >
            <Icon name="download" size={13} /> Export Report
          </button>
          <button type="button" className="mm-panel-btn is-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </aside>
    </>
  );
}

/* ---------------- Notification Dropdown ---------------- */

function NotificationDropdown({ isOpen, onClose, onSelectAlert, onMarkAllRead, unreadCount }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mm-notif-dropdown" ref={ref}>
      <div className="mm-notif-head">
        <h3>Live Alerts &amp; Notifications ({unreadCount})</h3>
        <button
          type="button"
          onClick={() => {
            onMarkAllRead();
          }}
        >
          Mark all read
        </button>
      </div>
      <ul className="mm-notif-list">
        {realtimeAlerts.map((a) => (
          <li
            key={a.id}
            className="mm-notif-item"
            onClick={() => {
              onSelectAlert(a);
              onClose();
            }}
          >
            <span className={`mm-notif-icon is-${a.severity}`}>
              <Icon name={a.severity === "info" ? "info" : "warning"} size={13} />
            </span>
            <span>
              <span className="mm-notif-title">{a.title}</span>
              <span className="mm-notif-sub">{a.location}</span>
            </span>
            <span className="mm-notif-time">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Sidebar ---------------- */

function Sidebar({ active, onSelect }) {
  return (
    <aside className="mm-sidebar">
      <div className="mm-brand">
        <BrandLogo size={36} />
        <div>
          <p className="mm-brand-name">MineGov AI</p>
          <p className="mm-brand-tag">Safer Mines. Smarter Tomorrow.</p>
        </div>
      </div>

      <nav className="mm-nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`mm-nav-item ${active === item.key ? "is-active" : ""}`}
            onClick={() => onSelect(item.key)}
          >
            <Icon name={item.icon} size={16} />
            <span>{item.label}</span>
            {item.badge ? (
              <span className="mm-nav-badge">{item.badge}</span>
            ) : null}
          </button>
        ))}
      </nav>

      <div className="mm-sidebar-foot">
        <BrandLogo size={70} />
        <p className="mm-foot-text">People | Planet | Productivity</p>
      </div>
    </aside>
  );
}

/* ---------------- Top bar with functional dropdowns (Z-INDEX 1000) ---------------- */

function TopBar({
  theme,
  onToggleTheme,
  now,
  currentMine,
  onSelectMine,
  currentShift,
  onSelectShift,
  onOpenNotifications,
  showNotif,
  onCloseNotif,
  unreadCount,
  onSelectAlert,
  onMarkAllRead,
  onOpenProfile,
}) {
  const [mineDropdownOpen, setMineDropdownOpen] = useState(false);
  const [shiftDropdownOpen, setShiftDropdownOpen] = useState(false);
  const mineMenuRef = useRef(null);
  const shiftMenuRef = useRef(null);

  const shifts = [
    "Day Shift (06:00 - 14:00)",
    "Evening Shift (14:00 - 22:00)",
    "Night Shift (22:00 - 06:00)",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mineMenuRef.current && !mineMenuRef.current.contains(e.target)) {
        setMineDropdownOpen(false);
      }
      if (shiftMenuRef.current && !shiftMenuRef.current.contains(e.target)) {
        setShiftDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="mm-topbar">
      <div className="mm-topbar-left">
        <div className="mm-title-row">
          <h1 className="mm-title">Mine Operations Dashboard</h1>
          <span className="mm-mine-badge">{currentMine.name}</span>
        </div>
        <p className="mm-subtitle">
          Real-time oversight of extraction, safety telemetry, DGMS statutory compliance, and workforce roster.
        </p>
      </div>

      <div className="mm-topbar-actions">
        {/* Mine Selector Dropdown */}
        <div className="mm-dropdown-wrapper" ref={mineMenuRef}>
          <button
            type="button"
            className="mm-select is-primary"
            onClick={() => setMineDropdownOpen((v) => !v)}
            title="Switch Operating Mine Lease"
          >
            <Icon name="location" size={13} />
            {currentMine.name}
            <Icon name="chevron" size={13} />
          </button>
          {mineDropdownOpen && (
            <div className="mm-dropdown-menu">
              <div className="mm-dropdown-header">Select Mining Lease</div>
              {availableMines.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`mm-dropdown-item ${currentMine.id === m.id ? "is-selected" : ""}`}
                  onClick={() => {
                    onSelectMine(m);
                    setMineDropdownOpen(false);
                  }}
                >
                  <div>
                    <span>{m.name}</span>
                    <span className="mm-dropdown-item-meta">{m.area} • {m.type}</span>
                  </div>
                  {currentMine.id === m.id && <Icon name="check" size={13} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Shift Selector Dropdown */}
        <div className="mm-dropdown-wrapper" ref={shiftMenuRef}>
          <button
            type="button"
            className="mm-select is-primary"
            onClick={() => setShiftDropdownOpen((v) => !v)}
            title="Active Operational Shift"
          >
            <Icon name="clock" size={13} />
            {currentShift.split(" ")[0]} Shift
            <Icon name="chevron" size={13} />
          </button>
          {shiftDropdownOpen && (
            <div className="mm-dropdown-menu" style={{ minWidth: 210 }}>
              <div className="mm-dropdown-header">Active Shift Handover</div>
              {shifts.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`mm-dropdown-item ${currentShift === s ? "is-selected" : ""}`}
                  onClick={() => {
                    onSelectShift(s);
                    setShiftDropdownOpen(false);
                  }}
                >
                  <span>{s}</span>
                  {currentShift === s && <Icon name="check" size={13} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Display */}
        <span className="mm-select">
          <Icon name="calendar" size={13} />
          {formatDate(now)}
        </span>

        {/* Live Status Pill */}
        <span className="mm-live">
          <span className="mm-live-dot" />
          LIVE
        </span>

        {/* Theme Toggle */}
        <button
          type="button"
          className="mm-icon-btn"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} size={15} />
        </button>

        {/* Notifications Bell */}
        <div className="mm-bell-wrapper">
          <button
            type="button"
            className="mm-icon-btn"
            onClick={onOpenNotifications}
            aria-label="Notifications"
            title="View Real-Time Alerts"
          >
            <Icon name="bell" size={15} />
            {unreadCount > 0 && (
              <span className="mm-bell-badge">{unreadCount}</span>
            )}
          </button>
          <NotificationDropdown
            isOpen={showNotif}
            onClose={onCloseNotif}
            onSelectAlert={onSelectAlert}
            onMarkAllRead={onMarkAllRead}
            unreadCount={unreadCount}
          />
        </div>

        {/* User Profile Button */}
        <button
          type="button"
          className="mm-user"
          onClick={onOpenProfile}
          title="Mine Manager Statutory Credentials"
        >
          <span className="mm-avatar">RK</span>
          <span className="mm-user-text">
            <span className="mm-user-name">Rahul Kumar</span>
            <span className="mm-user-role">Colliery Manager</span>
          </span>
        </button>
      </div>
    </header>
  );
}

/* ---------------- Card wrapper ---------------- */

function Card({ title, className = "", action, children, onClick }) {
  return (
    <section className={`mm-card ${className}`} onClick={onClick}>
      {title || action ? (
        <div className="mm-card-head">
          {title ? <h2 className="mm-card-title">{title}</h2> : null}
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

function ViewLink({ onClick, label = "View Details" }) {
  return (
    <button
      type="button"
      className="mm-viewlink"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {label}
      <Icon name="arrow" size={12} />
    </button>
  );
}

/* ---------------- Real Leaflet Satellite Map (Hero Page Compatible) ---------------- */

function MineOverview({ onOpen, currentMine }) {
  return (
    <Card
      title="Mine Spatial Overview (GIS Satellite)"
      className="mm-overview"
      action={
        <button
          type="button"
          className="mm-map-btn"
          onClick={() => onOpen("map")}
          title="Open Fullscreen GIS Spatial Layer"
        >
          <Icon name="expand" size={12} />
          Spatial Map
        </button>
      }
    >
      <div className="hero-map-panel">
        <div className="map-panel-top">
          <span>
            <span className="pulse-dot" /> LIVE GIS &amp; SATELLITE
          </span>
          <span>{currentMine?.name || "Sukhdev Mine (BCCL)"} • 22.3382° N, 82.5460° E</span>
        </div>
        <MineMap />
      </div>
    </Card>
  );
}

/* ---------------- 7-Day Trend chart with Range switching & Tooltips ---------------- */

function TrendChart({ onOpen }) {
  const [range, setRange] = useState("7D");
  const [hoverIdx, setHoverIdx] = useState(null);

  const currentData = trendDataRanges[range] || trendDataRanges["7D"];
  const { labels, production, safetyAlerts } = currentData;

  const W = 420;
  const H = 145;
  const padL = 34;
  const padR = 26;
  const padT = 10;
  const padB = 22;

  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const maxProd = 10000;
  const maxAlert = 20;

  const x = (i) => padL + (i / (labels.length - 1)) * innerW;
  const yProd = (v) => padT + (1 - v / maxProd) * innerH;
  const yAlert = (v) => padT + (1 - v / maxAlert) * innerH;

  const line = (arr, fn) =>
    arr.map((v, i) => `${x(i).toFixed(1)},${fn(v).toFixed(1)}`).join(" ");

  const areaPoints = `${padL},${H - padB} ${line(production, yProd)} ${W - padR},${H - padB}`;

  return (
    <Card
      title="Production & Safety Trend"
      className="mm-trend"
      action={
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div className="mm-range">
            {["7D", "14D", "30D"].map((r) => (
              <button
                key={r}
                type="button"
                className={range === r ? "is-active" : ""}
                onClick={() => setRange(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <ViewLink onClick={() => onOpen("production")} label="Analytics" />
        </div>
      }
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mm-chart"
        preserveAspectRatio="none"
        onMouseLeave={() => setHoverIdx(null)}
      >
        {/* Grid lines */}
        {[0, 3000, 6000, 10000].map((v) => (
          <g key={v}>
            <line
              x1={padL}
              y1={yProd(v)}
              x2={W - padR}
              y2={yProd(v)}
              className="mm-gridline"
            />
            <text
              x={padL - 4}
              y={yProd(v) + 3}
              className="mm-axis"
              textAnchor="end"
            >
              {v === 0 ? "0" : `${v / 1000}K`}
            </text>
          </g>
        ))}

        {[0, 10, 20].map((v) => (
          <text
            key={v}
            x={W - padR + 4}
            y={yAlert(v) + 3}
            className="mm-axis"
          >
            {v}
          </text>
        ))}

        {/* Shaded Area */}
        <polygon points={areaPoints} className="mm-area" />

        {/* Lines */}
        <polyline points={line(production, yProd)} className="mm-line mm-line-prod" />
        <polyline points={line(safetyAlerts, yAlert)} className="mm-line mm-line-alert" />

        {/* Data points */}
        {production.map((v, i) => (
          <circle
            key={`p${i}`}
            cx={x(i)}
            cy={yProd(v)}
            r={hoverIdx === i ? "4.5" : "3"}
            className="mm-dot-prod"
            onMouseEnter={() => setHoverIdx(i)}
            style={{ cursor: "pointer", transition: "r 0.15s" }}
          />
        ))}
        {safetyAlerts.map((v, i) => (
          <circle
            key={`a${i}`}
            cx={x(i)}
            cy={yAlert(v)}
            r={hoverIdx === i ? "4.5" : "3"}
            className="mm-dot-alert"
            onMouseEnter={() => setHoverIdx(i)}
            style={{ cursor: "pointer", transition: "r 0.15s" }}
          />
        ))}

        {/* Interactive Hover Tooltip */}
        {hoverIdx !== null && (
          <g transform={`translate(${Math.min(W - 100, Math.max(padL, x(hoverIdx) - 45))}, ${Math.max(8, yProd(production[hoverIdx]) - 32)})`}>
            <rect
              width="95"
              height="28"
              rx="4"
              fill="#061326"
              stroke="var(--cyan)"
              strokeWidth="1"
              opacity="0.95"
            />
            <text x="47" y="11" fill="#cbd5e1" fontSize="8.5" fontWeight="700" textAnchor="middle">
              {labels[hoverIdx]}: {production[hoverIdx].toLocaleString()} T
            </text>
            <text x="47" y="22" fill="var(--rose)" fontSize="8.5" fontWeight="700" textAnchor="middle">
              Alerts: {safetyAlerts[hoverIdx]} Active
            </text>
          </g>
        )}

        {/* Labels */}
        {labels.map((l, i) => (
          <text
            key={l}
            x={x(i)}
            y={H - 5}
            className="mm-axis"
            textAnchor="middle"
          >
            {l}
          </text>
        ))}
      </svg>

      <div className="mm-chart-legend">
        <span>
          <i className="mm-swatch mm-swatch-prod" />
          Production (Tons)
        </span>
        <span>
          <i className="mm-swatch mm-swatch-alert" />
          Safety Alerts
        </span>
      </div>
    </Card>
  );
}

/* ---------------- Real-time alerts with filters & detail modal ---------------- */

function RealtimeAlerts({ onOpen, onSelectAlert }) {
  const [filter, setFilter] = useState("all");

  const filtered = realtimeAlerts.filter((a) => {
    if (filter === "all") return true;
    return a.severity === filter;
  });

  return (
    <Card
      title="Real-Time Alerts"
      className="mm-alerts"
      action={<ViewLink onClick={() => onOpen("alerts")} />}
    >
      <div className="mm-filter-tabs">
        {["all", "critical", "high", "info"].map((f) => (
          <button
            key={f}
            type="button"
            className={`mm-filter-pill ${filter === f ? "is-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? `All (${realtimeAlerts.length})` : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="mm-alert-list">
        {filtered.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              className={`mm-alert is-${a.severity}`}
              onClick={() => onSelectAlert(a)}
              title="Click to view alert resolution and take action"
            >
              <span className="mm-alert-icon">
                <Icon
                  name={a.severity === "info" ? "info" : "warning"}
                  size={14}
                />
              </span>
              <span className="mm-alert-body">
                <span className="mm-alert-title">{a.title}</span>
                <span className="mm-alert-loc">{a.location}</span>
              </span>
              <span className="mm-alert-time">{a.time}</span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------------- KPI cards ---------------- */

function KpiCards({ onOpen }) {
  return (
    <div className="mm-kpis">
      {kpiCards.map((c) => (
        <article
          key={c.key}
          className={`mm-kpi tone-${c.tone}`}
          onClick={() => onOpen(c.key)}
          title={`Click to open full ${c.title} diagnostic panel`}
        >
          <span className="mm-kpi-icon">
            <Icon name={c.icon} size={18} />
          </span>
          <div className="mm-kpi-body">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p className="mm-kpi-title">{c.title}</p>
              <span style={{ fontSize: "10px", color: "var(--cyan)", fontWeight: 700 }}>
                Details →
              </span>
            </div>
            <div className="mm-kpi-value-row">
              <span className="mm-kpi-value">{c.value}</span>
              {c.unit ? <span className="mm-kpi-unit">{c.unit}</span> : null}
              {c.delta ? (
                <span className={`mm-kpi-delta is-${c.trend}`}>
                  {c.trend === "up" ? "\u2191" : "\u2193"} {c.delta}
                </span>
              ) : null}
              {c.secondValue ? (
                <span className="mm-kpi-second">{c.secondValue}</span>
              ) : null}
            </div>
            <div className="mm-kpi-labels">
              <p className="mm-kpi-label">{c.label}</p>
              {c.secondLabel ? (
                <p className="mm-kpi-label">{c.secondLabel}</p>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------------- AI risk score (REDESIGNED - COMPACT, ZERO CUTOFF) ---------------- */

function RiskGauge({ score }) {
  const R = 44;
  const C = Math.PI * R; // 138.23
  const filled = (score / 100) * C;

  return (
    <svg
      viewBox="0 0 140 76"
      className="mm-gauge"
      role="img"
      aria-label={`Risk score ${score} of 100`}
    >
      <defs>
        <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#42d392" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      {/* Background arc from (26, 62) to (114, 62) */}
      <path d="M 26 62 A 44 44 0 0 1 114 62" className="mm-gauge-track" />
      {/* Progress arc */}
      <path
        d="M 26 62 A 44 44 0 0 1 114 62"
        className="mm-gauge-fill"
        style={{ strokeDasharray: `${filled} ${C}` }}
      />
      {/* Center text */}
      <text x="70" y="52" className="mm-gauge-score" textAnchor="middle">
        {score}
      </text>
      <text x="70" y="66" className="mm-gauge-of" textAnchor="middle">
        / 100
      </text>
    </svg>
  );
}

function RiskSection({ onOpen, onShowToast }) {
  return (
    <Card className="mm-risk">
      <div className="mm-risk-grid">
        <div className="mm-risk-left">
          <div className="mm-risk-head">
            <h2 className="mm-card-title">AI Risk Score</h2>
            <span className="mm-band">Risk: {riskScore.band}</span>
          </div>
          <RiskGauge score={riskScore.score} />
          <span className="mm-risk-prob">ML Confidence: 94.2% • Medium Threat</span>
        </div>

        <div className="mm-risk-right">
          <div className="mm-card-head" style={{ marginBottom: "2px" }}>
            <h3 className="mm-sub-title">Top Predictive Risk Factors</h3>
            <ViewLink label="Full AI Analysis" onClick={() => onOpen("risk")} />
          </div>
          <ol className="mm-risk-list">
            {riskScore.factors.map((f, i) => (
              <li
                key={f}
                className="mm-risk-item"
                onClick={() => {
                  onShowToast(`Analyzing risk driver: "${f}"`, "info");
                  onOpen("risk");
                }}
                title="Click to view root cause analysis"
              >
                <span className={`mm-rank rank-${i + 1}`}>{i + 1}</span>
                <span style={{ flex: 1 }}>{f}</span>
                <span className="mm-risk-factor-arrow">→</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Card>
  );
}

/* ---------------- Authority orders ---------------- */

function AuthorityOrders({ onOpen, onSelectOrder }) {
  return (
    <Card
      title="High Authority Orders & Directives"
      className="mm-orders"
      action={<ViewLink onClick={() => onOpen("orders")} />}
    >
      <ul className="mm-order-list">
        {authorityOrders.map((o) => (
          <li key={o.id}>
            <button
              type="button"
              onClick={() => onSelectOrder(o)}
              title="Click to view statutory directive & verify compliance"
            >
              <span className="mm-order-icon">
                <Icon name="file" size={15} />
              </span>
              <span className="mm-order-text">{o.text}</span>
              <span className="mm-order-date">{o.date}</span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------------- Recent activity ---------------- */

function RecentActivitySection({ onOpen, onSelectActivity }) {
  const [actFilter, setActFilter] = useState("all");

  const filtered = recentActivity.filter((r) => {
    if (actFilter === "all") return true;
    return r.type.toLowerCase() === actFilter;
  });

  return (
    <Card
      title="Recent Activity & Shift Audit Log"
      className="mm-activity"
      action={<ViewLink onClick={() => onOpen("activity")} />}
    >
      <div className="mm-filter-tabs">
        {["all", "alert", "event", "info"].map((t) => (
          <button
            key={t}
            type="button"
            className={`mm-filter-pill ${actFilter === t ? "is-active" : ""}`}
            onClick={() => setActFilter(t)}
          >
            {t === "all" ? `All (${recentActivity.length})` : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="mm-activity-list">
        {filtered.map((r) => (
          <button
            key={r.id}
            type="button"
            className="mm-activity-row"
            onClick={() => onSelectActivity(r)}
            title="Click to inspect audit trail entry"
          >
            <span className={`mm-activity-icon is-${r.severity}`}>
              <Icon name={r.icon} size={14} />
            </span>
            <span className={`mm-activity-badge is-${r.type.toLowerCase()}`}>
              {r.type}
            </span>
            <span className="mm-activity-body">
              <span className="mm-activity-desc">{r.description}</span>
              <span className="mm-activity-loc">
                <Icon name="location" size={10} /> {r.location}
              </span>
            </span>
            <span className="mm-activity-time">
              <Icon name="clock" size={10} />
              {r.time}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}

/* ---------------- Interactive Action Modals ---------------- */

function AlertDetailModal({ alert, onClose, onShowToast }) {
  if (!alert) return null;
  return (
    <div className="mm-modal-overlay" onClick={onClose}>
      <div className="mm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mm-modal-header">
          <h3 className="mm-modal-title">
            <Icon name="warning" size={17} />
            {alert.title}
          </h3>
          <button type="button" className="mm-panel-close" onClick={onClose}>✕</button>
        </div>
        <div className="mm-modal-body">
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span className={`mm-activity-badge is-${alert.severity === 'critical' ? 'alert' : alert.severity === 'high' ? 'event' : 'info'}`}>
              {alert.severity.toUpperCase()} PRIORITY
            </span>
            <span style={{ color: "var(--ink-3)", fontSize: "11.5px" }}>Logged at {alert.time}</span>
          </div>

          <div>
            <span style={{ color: "var(--ink-3)", fontSize: "10.5px", display: "block" }}>Location / Telemetry Node:</span>
            <strong style={{ color: "var(--ink)", fontSize: "12.5px" }}>{alert.location}</strong>
          </div>

          <div style={{ background: "var(--soft)", padding: "10px", borderRadius: "7px", border: "1px solid var(--line)" }}>
            <strong style={{ color: "var(--cyan)", fontSize: "11.5px", display: "block", marginBottom: "3px" }}>
              Standard Operating Procedure (DGMS Reg. 162)
            </strong>
            <p style={{ margin: 0, color: "var(--ink-2)", fontSize: "11px", lineHeight: 1.45 }}>
              Immediate verification required. Verify gas monitoring sensor calibration and deploy designated safety steward with multi-gas detector. Isolate power to regional HEMM machinery if hazard levels escalate.
            </p>
          </div>
        </div>
        <div className="mm-modal-footer">
          <button
            type="button"
            className="mm-modal-btn is-cyan"
            onClick={() => {
              onShowToast(`Emergency Squad dispatched to ${alert.location}`, "success");
              onClose();
            }}
          >
            Dispatch Safety Team
          </button>
          <button
            type="button"
            className="mm-modal-btn is-ghost"
            onClick={() => {
              onShowToast(`Alert acknowledged: ${alert.title}`, "info");
              onClose();
            }}
          >
            Acknowledge Alert
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderDetailModal({ order, onClose, onShowToast }) {
  if (!order) return null;
  return (
    <div className="mm-modal-overlay" onClick={onClose}>
      <div className="mm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mm-modal-header">
          <h3 className="mm-modal-title">
            <Icon name="file" size={17} />
            Statutory Authority Directive
          </h3>
          <button type="button" className="mm-panel-close" onClick={onClose}>✕</button>
        </div>
        <div className="mm-modal-body">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="mm-band">Issuing Authority: DGMS Eastern Zone</span>
            <span style={{ color: "var(--ink-3)", fontSize: "11px" }}>Issued: {order.date}</span>
          </div>

          <div>
            <span style={{ color: "var(--ink-3)", fontSize: "10.5px", display: "block" }}>Directive Mandate:</span>
            <p style={{ color: "var(--ink)", fontSize: "13px", fontWeight: 700, margin: "4px 0 0" }}>
              "{order.text}"
            </p>
          </div>

          <div style={{ background: "var(--soft)", padding: "10px", borderRadius: "7px", border: "1px solid var(--line)" }}>
            <span style={{ color: "var(--ink-3)", fontSize: "10.5px", display: "block", marginBottom: "3px" }}>
              Statutory Compliance Deadline:
            </span>
            <strong style={{ color: "var(--amber)", fontSize: "11.5px" }}>
              Within 48 Hours of Receipt (Mines Act 1952, Section 22)
            </strong>
          </div>
        </div>
        <div className="mm-modal-footer">
          <button
            type="button"
            className="mm-modal-btn is-cyan"
            onClick={() => {
              onShowToast(`Compliance Proof for directive #${order.id} filed successfully!`, "success");
              onClose();
            }}
          >
            File Compliance Proof
          </button>
          <button type="button" className="mm-modal-btn is-ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivityDetailModal({ activity, onClose, onShowToast }) {
  if (!activity) return null;
  return (
    <div className="mm-modal-overlay" onClick={onClose}>
      <div className="mm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mm-modal-header">
          <h3 className="mm-modal-title">
            <Icon name="activity" size={17} />
            Audit Trail Event #{activity.id}
          </h3>
          <button type="button" className="mm-panel-close" onClick={onClose}>✕</button>
        </div>
        <div className="mm-modal-body">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={`mm-activity-badge is-${activity.type.toLowerCase()}`}>{activity.type}</span>
            <span style={{ color: "var(--ink-3)", fontSize: "11px" }}>Timestamp: {activity.time}</span>
          </div>

          <div>
            <span style={{ color: "var(--ink-3)", fontSize: "10.5px", display: "block" }}>Event Log:</span>
            <strong style={{ color: "var(--ink)", fontSize: "13px" }}>{activity.description}</strong>
          </div>

          <div style={{ background: "var(--soft)", padding: "8px 10px", borderRadius: "6px" }}>
            <span style={{ color: "var(--ink-3)", fontSize: "10px", display: "block" }}>Physical Node / Location:</span>
            <span style={{ color: "var(--cyan)", fontSize: "11.5px", fontWeight: 700 }}>{activity.location}</span>
          </div>
        </div>
        <div className="mm-modal-footer">
          <button
            type="button"
            className="mm-modal-btn is-cyan"
            onClick={() => {
              onShowToast(`Incident log exported to encrypted archive`, "success");
              onClose();
            }}
          >
            Export Log
          </button>
          <button type="button" className="mm-modal-btn is-ghost" onClick={onClose}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileModal({ onClose, onShowToast }) {
  return (
    <div className="mm-modal-overlay" onClick={onClose}>
      <div className="mm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mm-modal-header">
          <h3 className="mm-modal-title">
            <Icon name="hardhat" size={17} />
            Mine Manager Statutory Credentials
          </h3>
          <button type="button" className="mm-panel-close" onClick={onClose}>✕</button>
        </div>
        <div className="mm-modal-body">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="mm-avatar" style={{ width: "42px", height: "42px", fontSize: "16px" }}>RK</span>
            <div>
              <h4 style={{ margin: 0, fontSize: "15px", color: "var(--ink)" }}>Rahul Kumar</h4>
              <p style={{ margin: "2px 0 0", color: "var(--cyan)", fontSize: "11.5px", fontWeight: 600 }}>
                Colliery Manager & Statutory Agent (Coal)
              </p>
            </div>
          </div>

          <div style={{ background: "var(--soft)", padding: "10px", borderRadius: "7px", border: "1px solid var(--line)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "11px" }}>
              <div>
                <span style={{ color: "var(--ink-3)", display: "block", fontSize: "9.5px" }}>DGMS Certificate No.</span>
                <strong style={{ color: "var(--ink)" }}>FCMC/DHN/2019/4812</strong>
              </div>
              <div>
                <span style={{ color: "var(--ink-3)", display: "block", fontSize: "9.5px" }}>Subsidiary / Area</span>
                <strong style={{ color: "var(--ink)" }}>BCCL • Dhanbad Basin</strong>
              </div>
              <div>
                <span style={{ color: "var(--ink-3)", display: "block", fontSize: "9.5px" }}>Statutory Authority</span>
                <strong style={{ color: "var(--green)" }}>Level 2 Operational Signoff</strong>
              </div>
              <div>
                <span style={{ color: "var(--ink-3)", display: "block", fontSize: "9.5px" }}>Digital Token Status</span>
                <strong style={{ color: "var(--cyan)" }}>Active & Encrypted</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="mm-modal-footer">
          <button
            type="button"
            className="mm-modal-btn is-cyan"
            onClick={() => {
              onShowToast("Shift safety handover signed and submitted", "success");
              onClose();
            }}
          >
            Sign Shift Safety Handover
          </button>
          <button type="button" className="mm-modal-btn is-ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function EmergencySosModal({ onClose, onShowToast }) {
  return (
    <div className="mm-modal-overlay" onClick={onClose}>
      <div className="mm-modal" style={{ borderColor: "var(--rose)" }} onClick={(e) => e.stopPropagation()}>
        <div className="mm-modal-header" style={{ background: "rgba(244, 63, 94, 0.15)" }}>
          <h3 className="mm-modal-title" style={{ color: "var(--rose)" }}>
            <Icon name="warning" size={18} />
            BROADCAST EMERGENCY MINE ALERT (SOS)
          </h3>
          <button type="button" className="mm-panel-close" onClick={onClose}>✕</button>
        </div>
        <div className="mm-modal-body">
          <p style={{ color: "var(--ink)", fontSize: "12.5px", lineHeight: 1.45, margin: 0 }}>
            This will activate the central audible sirens across all operational pits, send immediate SMS/PA broadcasts to 182 on-site workers, and dispatch the Katras Regional Rescue Station.
          </p>
          <div style={{ background: "rgba(244, 63, 94, 0.1)", padding: "10px", borderRadius: "7px", border: "1px solid rgba(244, 63, 94, 0.3)" }}>
            <strong style={{ color: "var(--rose)", display: "block", fontSize: "11.5px" }}>
              WARNING: Statutory Emergency Action
            </strong>
            <span style={{ color: "var(--ink-2)", fontSize: "10.5px" }}>
              Trigger only in event of slope failure, inundation, gas burst, or critical equipment fire.
            </span>
          </div>
        </div>
        <div className="mm-modal-footer">
          <button
            type="button"
            className="mm-modal-btn is-rose"
            onClick={() => {
              onShowToast("EMERGENCY SIRENS ACTIVATED! Regional rescue station alerted.", "alert");
              onClose();
            }}
          >
            ACTIVATE EVACUATION SIRENS
          </button>
          <button type="button" className="mm-modal-btn is-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Main Dashboard Component ---------------- */

export default function MineManagerDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [theme, setTheme] = useState("dark");
  const [panelKey, setPanelKey] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState(() => new Date());
  const [showStatusbar, setShowStatusbar] = useState(true);
  const [currentMine, setCurrentMine] = useState(availableMines[0]);
  const [currentShift, setCurrentShift] = useState("Day Shift (06:00 - 14:00)");
  const [selectedPit, setSelectedPit] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [toast, setToast] = useState(null);

  const now = useNow();

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
  }, []);

  const openSection = useCallback((key) => {
    if (["operations", "safety", "environment", "production", "labour", "map", "live", "reports", "alerts", "settings"].includes(key)) {
      setActiveNav(key);
      setPanelKey(null);
    } else {
      setPanelKey(key);
    }
  }, []);

  const closePanel = useCallback(() => {
    setPanelKey(null);
  }, []);

  const handleNavSelect = useCallback((key) => {
    setActiveNav(key);
    setPanelKey(null);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshedTime(new Date());
      showToast("Real-time telemetry and gas sensors synchronized.", "success");
    }, 1000);
  }, [showToast]);

  const toggleNotif = useCallback(() => {
    setShowNotif((v) => !v);
  }, []);

  const closeNotif = useCallback(() => {
    setShowNotif(false);
  }, []);

  const handleMarkAllRead = useCallback(() => {
    setUnreadCount(0);
    showToast("All notifications marked as read.", "info");
  }, [showToast]);

  // Keyboard shortcut: Escape to close open overlays
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        if (panelKey) closePanel();
        if (showNotif) closeNotif();
        if (selectedAlert) setSelectedAlert(null);
        if (selectedOrder) setSelectedOrder(null);
        if (selectedActivity) setSelectedActivity(null);
        if (showProfile) setShowProfile(false);
        if (showSosModal) setShowSosModal(false);
        if (selectedPit) setSelectedPit(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [panelKey, showNotif, selectedAlert, selectedOrder, selectedActivity, showProfile, showSosModal, selectedPit, closePanel, closeNotif]);

  return (
    <div className="mm-shell" data-theme={theme}>
      <Sidebar active={activeNav} onSelect={handleNavSelect} />

      <main className="mm-main">
        <TopBar
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          now={now}
          currentMine={currentMine}
          onSelectMine={(m) => {
            setCurrentMine(m);
            showToast(`Switched active mining lease to ${m.name}`, "info");
          }}
          currentShift={currentShift}
          onSelectShift={(s) => {
            setCurrentShift(s);
            showToast(`Active shift switched to ${s.split(" ")[0]} Shift`, "info");
          }}
          onOpenNotifications={toggleNotif}
          showNotif={showNotif}
          onCloseNotif={closeNotif}
          unreadCount={unreadCount}
          onSelectAlert={(a) => setSelectedAlert(a)}
          onMarkAllRead={handleMarkAllRead}
          onOpenProfile={() => setShowProfile(true)}
        />

        {activeNav === "live" ? (
          <LiveMonitoringView
            onShowToast={showToast}
            onOpenSection={openSection}
          />
        ) : activeNav === "map" ? (
          <MineMapView
            onShowToast={showToast}
            onOpenSection={openSection}
          />
        ) : activeNav === "operations" ? (
          <OperationsAssetView
            onShowToast={showToast}
            onClose={() => setActiveNav("dashboard")}
          />
        ) : activeNav === "safety" ? (
          <SafetyDetailsView
            onShowToast={showToast}
            onClose={() => setActiveNav("dashboard")}
          />
        ) : activeNav === "environment" ? (
          <EnvironmentDetailsView
            onShowToast={showToast}
            onClose={() => setActiveNav("dashboard")}
          />
        ) : activeNav === "production" ? (
          <ProductionDetailsView
            onShowToast={showToast}
            onClose={() => setActiveNav("dashboard")}
          />
        ) : activeNav === "labour" ? (
          <LabourDetailsView
            onShowToast={showToast}
            onClose={() => setActiveNav("dashboard")}
          />
        ) : activeNav === "reports" ? (
          <ReportsView
            onShowToast={showToast}
            onOpenSection={openSection}
          />
        ) : activeNav === "alerts" ? (
          <AlertsView
            onShowToast={showToast}
            onOpenSection={openSection}
          />
        ) : activeNav === "settings" ? (
          <SettingsView
            onShowToast={showToast}
          />
        ) : (
          <div className="mm-grid">
            <div className="mm-kpi-wrap">
              <KpiCards onOpen={openSection} />
            </div>

            <TrendChart onOpen={openSection} />
            <RiskSection onOpen={openSection} onShowToast={showToast} />
            <RealtimeAlerts
              onOpen={openSection}
              onSelectAlert={(a) => setSelectedAlert(a)}
            />

            <RecentActivitySection
              onOpen={openSection}
              onSelectActivity={(r) => setSelectedActivity(r)}
            />
            <AuthorityOrders
              onOpen={openSection}
              onSelectOrder={(o) => setSelectedOrder(o)}
            />
          </div>
        )}

        {showStatusbar && (
          <footer className="mm-statusbar">
            <span className="mm-status-ok">
              <Icon name="check" size={15} />
              Telemetry Stream Active • All DGMS In-Pit Safety Systems Operational
            </span>
            <span className="mm-status-meta">
              Last Updated: <strong className="mm-status-time">{formatDate(lastRefreshedTime)}, {formatTime(lastRefreshedTime)}</strong>
              <button
                type="button"
                className={`mm-refresh ${isRefreshing ? "is-spinning" : ""}`}
                onClick={handleRefresh}
                title="Poll latest sensor values"
              >
                <Icon name="refresh" size={12} />
                {isRefreshing ? "Syncing..." : "Sync Telemetry"}
              </button>
              <button
                type="button"
                className="mm-sos-btn"
                onClick={() => setShowSosModal(true)}
                title="Broadcast Immediate Emergency Alert"
              >
                <Icon name="warning" size={12} />
                EMERGENCY SOS
              </button>
              <button
                type="button"
                className="mm-statusbar-close"
                onClick={() => setShowStatusbar(false)}
                title="Hide status bar"
              >
                ✕
              </button>
            </span>
            <span className="mm-status-tag">Safer Mines. Smarter Tomorrow.</span>
          </footer>
        )}
      </main>

      {/* Slide-Over Detail Panel */}
      {panelKey && (
        <DetailPanel
          sectionKey={panelKey}
          onClose={closePanel}
          onShowToast={showToast}
        />
      )}

      {/* Interactive Action Modals */}
      {selectedAlert && (
        <AlertDetailModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onShowToast={showToast}
        />
      )}

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onShowToast={showToast}
        />
      )}

      {selectedActivity && (
        <ActivityDetailModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onShowToast={showToast}
        />
      )}

      {showProfile && (
        <ProfileModal
          onClose={() => setShowProfile(false)}
          onShowToast={showToast}
        />
      )}

      {showSosModal && (
        <EmergencySosModal
          onClose={() => setShowSosModal(false)}
          onShowToast={showToast}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
