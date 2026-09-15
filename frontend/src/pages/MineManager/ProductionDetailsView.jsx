import { useState } from "react";
import Icon from "./Icons";
import "./MineManagerDashboard.css";

const sectionProdData = [
  { id: 1, section: "North Pit", actual: "3,200 MT", target: "3,000 MT", pct: "107%", status: "On Target", color: "var(--green)" },
  { id: 2, section: "South Zone", actual: "2,450 MT", target: "2,500 MT", pct: "98%", status: "Slightly Low", color: "var(--amber)" },
  { id: 3, section: "East Zone", actual: "1,980 MT", target: "2,000 MT", pct: "99%", status: "On Target", color: "var(--green)" },
  { id: 4, section: "West Zone", actual: "2,100 MT", target: "2,000 MT", pct: "105%", status: "On Target", color: "var(--green)" },
  { id: 5, section: "Main Shaft", actual: "720 MT", target: "1,000 MT", pct: "72%", status: "Below Target", color: "var(--rose)" },
];

export function ProductionDetailsView({ onShowToast, onClose }) {
  const [sectionFilter, setSectionFilter] = useState("All Sections");
  const [shiftFilter, setShiftFilter] = useState("All Shifts");
  const [selectedSection, setSelectedSection] = useState(sectionProdData[0]);

  return (
    <div className="mm-prod-details-view">
      {/* Top Header */}
      <div className="mm-prod-header">
        <div>
          <h1 className="mm-prod-title">Production Details</h1>
          <p className="mm-prod-sub">
            Monitor section-wise production, output targets, performance trends and anomalies.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {onClose && (
            <button type="button" className="mm-btn-outline" onClick={onClose}>
              ← Back to Dashboard
            </button>
          )}
          <button
            type="button"
            className="mm-btn-save-main"
            onClick={() => onShowToast("Generated Production Extraction Report (PDF)", "success")}
          >
            📊 Generate Production Report
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mm-prod-filter-bar">
        <div>
          <label>Section / Location</label>
          <select value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)}>
            <option value="All Sections">All Sections</option>
            <option value="North Pit">North Pit</option>
            <option value="South Zone">South Zone</option>
            <option value="East Zone">East Zone</option>
          </select>
        </div>

        <div>
          <label>Date Range</label>
          <input type="text" defaultValue="01 Sep 2026 - 11 Sep 2026" />
        </div>

        <div>
          <label>Shift</label>
          <select value={shiftFilter} onChange={(e) => setShiftFilter(e.target.value)}>
            <option value="All Shifts">All Shifts</option>
            <option value="Day Shift">Day Shift</option>
            <option value="Night Shift">Night Shift</option>
          </select>
        </div>

        <div>
          <label>Status</label>
          <select>
            <option>All Status</option>
            <option>On Target</option>
            <option>Below Target</option>
          </select>
        </div>

        <button
          type="button"
          className="mm-btn-apply-filters"
          onClick={() => onShowToast("Applied filters to production logs", "info")}
        >
          Apply Filters
        </button>
      </div>

      {/* Top 4 KPI Summary Cards */}
      <div className="mm-prod-kpis-row">
        <div className="mm-prod-kpi-card is-green">
          <div className="mm-pkpi-icon">🚜</div>
          <div>
            <span className="mm-pkpi-lbl">Today's Output</span>
            <strong className="mm-pkpi-num">12,450 MT</strong>
            <small className="mm-pkpi-sub">Target: 12,000 MT · ↑ 4% vs yesterday</small>
          </div>
        </div>

        <div className="mm-prod-kpi-card is-blue">
          <div className="mm-pkpi-icon">🎯</div>
          <div>
            <span className="mm-pkpi-lbl">Target %</span>
            <strong className="mm-pkpi-num">104%</strong>
            <small className="mm-pkpi-sub">Achieved: 12,450 / 12,000 MT</small>
          </div>
        </div>

        <div className="mm-prod-kpi-card is-purple">
          <div className="mm-pkpi-icon">🏗️</div>
          <div>
            <span className="mm-pkpi-lbl">Active Sections</span>
            <strong className="mm-pkpi-num">5 / 6</strong>
            <small className="mm-pkpi-sub">Producing (83%)</small>
          </div>
        </div>

        <div className="mm-prod-kpi-card is-rose">
          <div className="mm-pkpi-icon">⚠️</div>
          <div>
            <span className="mm-pkpi-lbl">Production Alerts</span>
            <strong className="mm-pkpi-num">2</strong>
            <small className="mm-pkpi-sub is-rose">1 Critical · 1 Warning</small>
          </div>
        </div>
      </div>

      {/* Middle Grid: Section-wise Production Table + Trend Chart */}
      <div className="mm-prod-mid-grid">
        {/* Section-wise Production Table Card */}
        <div className="mm-card mm-sec-prod-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title"><Icon name="bars" size={16} /> Section-wise Production</h2>
            <button type="button" className="mm-viewlink" onClick={() => onShowToast("All section targets loaded", "info")}>
              View Details →
            </button>
          </div>

          <div className="mm-prod-table-wrap">
            <table className="mm-prod-table">
              <thead>
                <tr>
                  <th>Section / Location</th>
                  <th>Actual Output (MT)</th>
                  <th>Target (MT)</th>
                  <th>Achievement</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sectionProdData.map((row) => (
                  <tr
                    key={row.id}
                    className={selectedSection?.id === row.id ? "is-selected-row" : ""}
                    onClick={() => setSelectedSection(row)}
                  >
                    <td><strong>{row.section}</strong></td>
                    <td>{row.actual}</td>
                    <td>{row.target}</td>
                    <td><strong className="mm-cyan">{row.pct}</strong></td>
                    <td>
                      <span className={`mm-status-badge is-${row.status === "On Target" ? "completed" : row.status === "Slightly Low" ? "pending" : "rejected"}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Production Trend Line Chart Card */}
        <div className="mm-card mm-prod-trend-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title"><Icon name="bars" size={16} /> Production Trend</h2>
            <div className="mm-range">
              <button type="button" className="is-selected">7D</button>
              <button type="button">30D</button>
              <button type="button">3M</button>
            </div>
          </div>

          <div className="mm-trend-chart-box">
            <svg viewBox="0 0 400 160" className="mm-trend-svg">
              <line x1="30" y1="120" x2="380" y2="120" stroke="var(--line)" />
              <line x1="30" y1="80" x2="380" y2="80" stroke="var(--line)" strokeDasharray="3 3" />

              {/* Actual Output */}
              <polyline points="40,110 90,95 140,80 190,85 240,70 290,65 340,55" fill="none" stroke="var(--cyan)" strokeWidth="2.5" />
              {/* Target Output */}
              <polyline points="40,85 90,85 140,85 190,85 240,85 290,85 340,85" fill="none" stroke="var(--green)" strokeDasharray="4 4" strokeWidth="2" />
            </svg>

            <div className="mm-chart-legend">
              <span><span className="mm-dot is-cyan" /> Actual Output</span>
              <span><span className="mm-dot is-green" /> Target Output</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Selected Section Details + Anomaly Action Panel */}
      <div className="mm-prod-bottom-grid">
        {/* Selected Section Details & 7-Day Bar Chart */}
        <div className="mm-card mm-sec-details-card">
          <h2 className="mm-card-title">📌 Selected Section / Production Details</h2>
          <div className="mm-sec-details-flex">
            <div className="mm-sec-grid-props">
              <div><span className="mm-lbl">Section / Location</span><strong className="mm-val">{selectedSection.section}</strong></div>
              <div><span className="mm-lbl">Date &amp; Time</span><strong className="mm-val">11 Sep 2026, 10:24</strong></div>
              <div><span className="mm-lbl">Actual Output</span><strong className="mm-val mm-cyan">{selectedSection.actual}</strong></div>
              <div><span className="mm-lbl">Target Output</span><strong className="mm-val">{selectedSection.target}</strong></div>
              <div><span className="mm-lbl">Achievement</span><strong className="mm-val is-green">{selectedSection.pct}</strong></div>
              <div><span className="mm-lbl">Status</span><span className="mm-status-badge is-completed">{selectedSection.status}</span></div>
              <div><span className="mm-lbl">Equipment</span><strong className="mm-val">Excavators, Haul Trucks</strong></div>
              <div><span className="mm-lbl">Shift Operator</span><strong className="mm-val">Rajesh Kumar</strong></div>
            </div>

            {/* Output Trend Bar Chart */}
            <div className="mm-bar-chart-box">
              <span className="mm-lbl" style={{ marginBottom: "6px" }}>Output Trend (Last 7 Days)</span>
              <div className="mm-bars-wrap">
                <div className="bar-col" style={{ height: "60%" }}><span>5 Sep</span></div>
                <div className="bar-col" style={{ height: "70%" }}><span>6 Sep</span></div>
                <div className="bar-col" style={{ height: "65%" }}><span>7 Sep</span></div>
                <div className="bar-col" style={{ height: "80%" }}><span>8 Sep</span></div>
                <div className="bar-col" style={{ height: "75%" }}><span>9 Sep</span></div>
                <div className="bar-col" style={{ height: "90%" }}><span>10 Sep</span></div>
                <div className="bar-col is-active" style={{ height: "100%" }}><span>11 Sep</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Anomaly / Action Panel Card */}
        <div className="mm-card mm-anomaly-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title">⚠️ Anomaly / Action Panel</h2>
            <button type="button" className="mm-viewlink" onClick={() => onShowToast("All production anomalies loaded", "info")}>
              View All →
            </button>
          </div>

          <div className="mm-anomaly-list">
            <div className="mm-anomaly-box is-critical">
              <div className="mm-anom-head">
                <strong>Conveyor Belt Downtime</strong>
                <span className="mm-sev-badge is-critical">Critical</span>
              </div>
              <p>Detected Time: 11 Sep 2026, 09:12 · South Zone</p>
              <small>Impact: Output reduced by ~15% · Under Investigation</small>
            </div>

            <div className="mm-anomaly-box is-warning">
              <div className="mm-anom-head">
                <strong>Lower Output Than Expected</strong>
                <span className="mm-sev-badge is-warning">Warning</span>
              </div>
              <p>Detected Time: 11 Sep 2026, 08:45 · Main Shaft</p>
              <small>Impact: Output 28% below target · Action Assigned</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
