import { useState } from "react";
import Icon from "./Icons";
import "./MineManagerDashboard.css";

const alertsData = [
  { id: "ALT-2026-001", time: "11 Sep 2026, 10:24", category: "Safety", section: "North Pit", severity: "Critical", desc: "Methane (CH4) level detected at 2.5%, which is above the safe limit (1.0%). Immediate action required.", status: "Open", owner: "Rahul Kumar", escalation: "Yes", source: "Gas Sensor (CH4)" },
  { id: "ALT-2026-002", time: "11 Sep 2026, 09:18", category: "Environment", section: "Waste Dump", severity: "High", desc: "Dust level exceeded limit (PM10: 165 µg/m³). Water dousing required.", status: "In Progress", owner: "Anita Singh", escalation: "No", source: "Dust Sensor D-04" },
  { id: "ALT-2026-003", time: "11 Sep 2026, 08:45", category: "Production", section: "Processing Plant", severity: "High", desc: "Primary conveyor motor temperature exceeding 85°C.", status: "Open", owner: "Suresh Patel", escalation: "No", source: "Thermal Sensor" },
  { id: "ALT-2026-004", time: "10 Sep 2026, 17:30", category: "Labour", section: "Main Shaft", severity: "Critical", desc: "Worker missed biometric check-out signal at shaft #2 exit.", status: "Escalated", owner: "Rahul Kumar", escalation: "Yes", source: "Access Gate" },
  { id: "ALT-2026-005", time: "10 Sep 2026, 15:12", category: "Safety", section: "South Zone", severity: "High", desc: "Equipment vibration abnormal on Shovel EX-12.", status: "Open", owner: "Neha Verma", escalation: "No", source: "Vibration Sensor" },
  { id: "ALT-2026-006", time: "10 Sep 2026, 11:05", category: "Environment", section: "Tailings Area", severity: "Warning", desc: "Water pH out of optimal range (pH 5.4). Acid neutralizer required.", status: "In Progress", owner: "Amit Rao", escalation: "No", source: "pH Monitor P-01" },
  { id: "ALT-2026-007", time: "09 Sep 2026, 16:40", category: "Production", section: "Crusher Unit", severity: "Warning", desc: "Crusher output below target (65% capacity).", status: "Open", owner: "Suresh Patel", escalation: "No", source: "Weighbridge" },
  { id: "ALT-2026-008", time: "09 Sep 2026, 14:15", category: "Labour", section: "West Zone", severity: "Warning", desc: "PPE non-compliance detected in Zone A.", status: "Resolved", owner: "Priya Sharma", escalation: "No", source: "AI Camera Feed" },
];

export function AlertsView({ onShowToast, onOpenSection }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All Sections");
  const [selectedAlert, setSelectedAlert] = useState(alertsData[0]);

  const filteredAlerts = alertsData.filter((a) => {
    const matchesSearch =
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.section.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSev = severityFilter === "All" || a.severity === severityFilter;
    const matchesCat = categoryFilter === "All" || a.category === categoryFilter;
    const matchesSec = sectionFilter === "All Sections" || a.section === sectionFilter;
    return matchesSearch && matchesSev && matchesCat && matchesSec;
  });

  return (
    <div className="mm-alerts-page-view">
      {/* Page Title & Configure Button */}
      <div className="mm-alerts-header">
        <div>
          <h1 className="mm-alerts-page-title">Alerts</h1>
          <p className="mm-alerts-page-sub">
            Monitor, track and manage safety, operational and environmental alerts.
          </p>
        </div>

        <button
          type="button"
          className="mm-btn-configure-rules"
          onClick={() => onShowToast("Alert rules configuration panel opened", "info")}
        >
          ⚙ Configure Alert Rules
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="mm-alerts-filter-bar">
        <div className="mm-alert-search-input">
          <Icon name="search" size={14} />
          <input
            type="text"
            placeholder="Search by alert ID, keyword, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
          <option value="All">Severity: All ▾</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Warning">Warning</option>
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">Category: All ▾</option>
          <option value="Safety">Safety</option>
          <option value="Environment">Environment</option>
          <option value="Production">Production</option>
          <option value="Labour">Labour</option>
        </select>

        <select value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)}>
          <option value="All Sections">Section: All Sections ▾</option>
          <option value="North Pit">North Pit</option>
          <option value="West Pit">West Pit</option>
          <option value="Main Shaft">Main Shaft</option>
          <option value="Processing Plant">Processing Plant</option>
        </select>

        <button type="button" className="mm-btn-alert-search">
          Search
        </button>
      </div>

      {/* 6 Summary Stat Cards */}
      <div className="mm-alert-stats-row">
        <div className="mm-alert-stat-card is-critical">
          <div className="mm-stat-icon">⚠️</div>
          <div>
            <strong className="mm-stat-num">8</strong>
            <span className="mm-stat-lbl">Critical</span>
            <small className="mm-stat-badge">2 new</small>
          </div>
        </div>

        <div className="mm-alert-stat-card is-high">
          <div className="mm-stat-icon">⚠️</div>
          <div>
            <strong className="mm-stat-num">14</strong>
            <span className="mm-stat-lbl">High</span>
            <small className="mm-stat-badge">3 new</small>
          </div>
        </div>

        <div className="mm-alert-stat-card is-warning">
          <div className="mm-stat-icon">⚠️</div>
          <div>
            <strong className="mm-stat-num">22</strong>
            <span className="mm-stat-lbl">Warning</span>
            <small className="mm-stat-badge">5 new</small>
          </div>
        </div>

        <div className="mm-alert-stat-card is-open">
          <div className="mm-stat-icon">ℹ️</div>
          <div>
            <strong className="mm-stat-num">11</strong>
            <span className="mm-stat-lbl">Open</span>
            <small className="mm-stat-badge">1 new</small>
          </div>
        </div>

        <div className="mm-alert-stat-card is-progress">
          <div className="mm-stat-icon">🔄</div>
          <div>
            <strong className="mm-stat-num">6</strong>
            <span className="mm-stat-lbl">In Progress</span>
            <small className="mm-stat-badge">2 updated</small>
          </div>
        </div>

        <div className="mm-alert-stat-card is-escalated">
          <div className="mm-stat-icon">✅</div>
          <div>
            <strong className="mm-stat-num">4</strong>
            <span className="mm-stat-lbl">Escalated</span>
            <small className="mm-stat-badge">1 new</small>
          </div>
        </div>
      </div>

      {/* Alert List Table Card */}
      <div className="mm-card mm-alert-table-card">
        <div className="mm-card-head">
          <h2 className="mm-card-title">Alert List</h2>
          <div style={{ display: "flex", gap: "8px" }}>
            <button type="button" className="mm-btn-export" onClick={() => onShowToast("Exporting alert log to CSV...", "info")}>
              📤 Export
            </button>
          </div>
        </div>

        <div className="mm-alert-table-wrap">
          <table className="mm-alert-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Time</th>
                <th>Alert ID</th>
                <th>Category</th>
                <th>Section / Zone</th>
                <th>Severity</th>
                <th>Description</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Escalation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((a) => (
                <tr
                  key={a.id}
                  className={selectedAlert?.id === a.id ? "is-selected-row" : ""}
                  onClick={() => setSelectedAlert(a)}
                >
                  <td><input type="checkbox" /></td>
                  <td className="mm-time-cell">{a.time}</td>
                  <td className="mm-cell-id">{a.id}</td>
                  <td>{a.category}</td>
                  <td>{a.section}</td>
                  <td>
                    <span className={`mm-sev-badge is-${a.severity.toLowerCase()}`}>
                      {a.severity}
                    </span>
                  </td>
                  <td className="mm-desc-cell">{a.desc}</td>
                  <td>
                    <span className={`mm-status-badge is-${a.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>{a.owner}</td>
                  <td><span className={a.escalation === "Yes" ? "mm-txt-rose" : ""}>{a.escalation}</span></td>
                  <td>
                    <button
                      type="button"
                      className="mm-btn-table-view"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAlert(a);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid: Selected Alert Details + Escalation / History */}
      <div className="mm-alert-bottom-grid">
        {/* Selected Alert Details Card */}
        <div className="mm-card mm-alert-details-card">
          <h2 className="mm-card-title">Selected Alert Details</h2>
          
          <div className="mm-alert-details-content">
            <div className="mm-alert-grid-props">
              <div>
                <span className="mm-lbl">Alert ID</span>
                <strong className="mm-val mm-cyan">{selectedAlert.id}</strong>
              </div>
              <div>
                <span className="mm-lbl">Category</span>
                <strong className="mm-val">{selectedAlert.category}</strong>
              </div>
              <div>
                <span className="mm-lbl">Section / Location</span>
                <strong className="mm-val">{selectedAlert.section}</strong>
              </div>
              <div>
                <span className="mm-lbl">Severity</span>
                <span className={`mm-sev-badge is-${selectedAlert.severity.toLowerCase()}`}>
                  {selectedAlert.severity}
                </span>
              </div>
              <div>
                <span className="mm-lbl">Time</span>
                <strong className="mm-val">{selectedAlert.time}</strong>
              </div>
              <div>
                <span className="mm-lbl">Source</span>
                <strong className="mm-val">{selectedAlert.source}</strong>
              </div>
              <div>
                <span className="mm-lbl">Assigned Person</span>
                <strong className="mm-val">{selectedAlert.owner}</strong>
              </div>
              <div>
                <span className="mm-lbl">Current Status</span>
                <span className="mm-status-badge is-open">{selectedAlert.status}</span>
              </div>
            </div>

            <div className="mm-alert-desc-box">
              <span className="mm-lbl">Description</span>
              <p className="mm-desc-text">{selectedAlert.desc}</p>
            </div>

            <div className="mm-alert-actions-row">
              <button
                type="button"
                className="mm-btn-action-primary"
                onClick={() => onShowToast(`Action assigned for ${selectedAlert.id}`, "success")}
              >
                Assign Action
              </button>
              <button
                type="button"
                className="mm-btn-action-secondary"
                onClick={() => onShowToast(`Alert ${selectedAlert.id} marked In Progress`, "info")}
              >
                Mark In Progress
              </button>
              <button
                type="button"
                className="mm-btn-action-danger"
                onClick={() => onShowToast(`Alert ${selectedAlert.id} closed`, "success")}
              >
                Close Alert
              </button>
            </div>
          </div>
        </div>

        {/* Escalation / Alert History Card */}
        <div className="mm-card mm-escalation-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title">Escalation / Alert History</h2>
            <button type="button" className="mm-viewlink" onClick={() => onShowToast("Full alert audit trail opened", "info")}>
              View Full History →
            </button>
          </div>

          <div className="mm-timeline">
            <div className="mm-tl-item">
              <span className="mm-tl-dot is-red" />
              <div className="mm-tl-content">
                <span className="mm-tl-time">11 Sep 2026, 10:24</span>
                <strong>Alert Created</strong>
                <span>Automated (Gas Sensor CH4)</span>
              </div>
            </div>
            <div className="mm-tl-item">
              <span className="mm-tl-dot is-blue" />
              <div className="mm-tl-content">
                <span className="mm-tl-time">11 Sep 2026, 10:32</span>
                <strong>Notified to Mine Manager</strong>
                <span>System Notification Stream</span>
              </div>
            </div>
            <div className="mm-tl-item">
              <span className="mm-tl-dot is-cyan" />
              <div className="mm-tl-content">
                <span className="mm-tl-time">11 Sep 2026, 10:45</span>
                <strong>Acknowledged</strong>
                <span>Rahul Kumar (Colliery Manager)</span>
              </div>
            </div>
            <div className="mm-tl-item">
              <span className="mm-tl-dot is-green" />
              <div className="mm-tl-content">
                <span className="mm-tl-time">11 Sep 2026, 11:10</span>
                <strong>Action Taken</strong>
                <span>Ventilation increased in North Pit</span>
              </div>
            </div>
            <div className="mm-tl-item">
              <span className="mm-tl-dot is-amber" />
              <div className="mm-tl-content">
                <span className="mm-tl-time">11 Sep 2026, 11:40</span>
                <strong>Escalated</strong>
                <span>DGMS Safety Officer notified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
