import { useState } from "react";
import Icon from "./Icons";
import "./MineManagerDashboard.css";

const envReadingsData = [
  { id: 1, time: "11 Sep 2026, 10:24", param: "Air Quality (AQI)", section: "North Pit", val: 42, unit: "-", limit: "< 50", status: "Good" },
  { id: 2, time: "11 Sep 2026, 09:15", param: "Dust (PM10)", section: "Processing Plant", val: 56, unit: "µg/m³", limit: "< 100", status: "Normal" },
  { id: 3, time: "10 Sep 2026, 18:40", param: "Noise Level", section: "Main Shaft", val: 82, unit: "dB", limit: "< 85", status: "Moderate" },
  { id: 4, time: "10 Sep 2026, 12:10", param: "Water pH", section: "Waste Dump", val: 7.2, unit: "pH", limit: "6.5 - 8.5", status: "Good" },
  { id: 5, time: "09 Sep 2026, 16:55", param: "SO2", section: "East Zone", val: 0.12, unit: "ppm", limit: "< 0.30", status: "Good" },
  { id: 6, time: "09 Sep 2026, 11:30", param: "NO2", section: "West Zone", val: 0.34, unit: "ppm", limit: "< 0.30", status: "High" },
  { id: 7, time: "08 Sep 2026, 14:20", param: "CO Level", section: "North Pit", val: 8, unit: "ppm", limit: "< 10", status: "Good" },
];

export function EnvironmentDetailsView({ onShowToast, onClose }) {
  const [sectionFilter, setSectionFilter] = useState("All Sections");
  const [paramFilter, setParamFilter] = useState("All Parameters");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedReading, setSelectedReading] = useState(envReadingsData[5]); // High NO2 reading

  return (
    <div className="mm-env-details-view">
      {/* Top Header */}
      <div className="mm-env-header">
        <div>
          <h1 className="mm-env-title">Environment Details</h1>
          <p className="mm-env-sub">
            Monitor environmental conditions, readings, compliance status and take corrective actions.
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
            onClick={() => onShowToast("Exported Environmental Compliance Report (PDF)", "success")}
          >
            📥 Export Report
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mm-env-filter-bar">
        <div>
          <label>Section / Zone</label>
          <select value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)}>
            <option value="All Sections">All Sections</option>
            <option value="North Pit">North Pit</option>
            <option value="West Zone">West Zone</option>
            <option value="East Zone">East Zone</option>
          </select>
        </div>

        <div>
          <label>Date Range</label>
          <input type="text" defaultValue="01 Sep 2026 - 11 Sep 2026" />
        </div>

        <div>
          <label>Parameter</label>
          <select value={paramFilter} onChange={(e) => setParamFilter(e.target.value)}>
            <option value="All Parameters">All Parameters</option>
            <option value="Air Quality">Air Quality (AQI)</option>
            <option value="Dust">Dust (PM10)</option>
            <option value="Noise Level">Noise Level</option>
          </select>
        </div>

        <div>
          <label>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All Status">All Status</option>
            <option value="Good">Good</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="button"
          className="mm-btn-apply-filters"
          onClick={() => onShowToast("Filters applied to environmental dataset", "info")}
        >
          Apply Filters
        </button>
      </div>

      {/* Top 4 KPI Summary Cards */}
      <div className="mm-env-kpis-row">
        <div className="mm-env-kpi-card is-green">
          <div className="mm-ekpi-icon">🍃</div>
          <div>
            <strong className="mm-ekpi-num">12</strong>
            <span className="mm-ekpi-lbl">Parameters In Range</span>
            <small className="mm-ekpi-sub">↑ 8% vs last period</small>
          </div>
        </div>

        <div className="mm-env-kpi-card is-rose">
          <div className="mm-ekpi-icon">⚠️</div>
          <div>
            <strong className="mm-ekpi-num">3</strong>
            <span className="mm-ekpi-lbl">Parameters Out of Range</span>
            <small className="mm-ekpi-sub is-rose">↑ 25% vs last period</small>
          </div>
        </div>

        <div className="mm-env-kpi-card is-blue">
          <div className="mm-ekpi-icon">📊</div>
          <div>
            <strong className="mm-ekpi-num">28</strong>
            <span className="mm-ekpi-lbl">Latest Readings Today</span>
            <small className="mm-ekpi-sub">↑ 12% vs last period</small>
          </div>
        </div>

        <div className="mm-env-kpi-card is-amber">
          <div className="mm-ekpi-icon">⏰</div>
          <div>
            <strong className="mm-ekpi-num">4</strong>
            <span className="mm-ekpi-lbl">Compliance Deadlines</span>
            <small className="mm-ekpi-sub is-amber">↑ 50% vs last period</small>
          </div>
        </div>
      </div>

      {/* 4 Parameter Quick Cards */}
      <div className="mm-param-cards-row">
        <div className="mm-param-card">
          <div className="mm-param-head">
            <span>Air Quality (AQI)</span>
            <small className="mm-txt-green">↑ 10% vs last period</small>
          </div>
          <div className="mm-param-val-row">
            <strong className="mm-param-num">42</strong>
            <span className="mm-status-pill is-running">Good</span>
          </div>
        </div>

        <div className="mm-param-card">
          <div className="mm-param-head">
            <span>Water / Discharge (pH)</span>
            <small className="mm-txt-green">↑ 5% vs last period</small>
          </div>
          <div className="mm-param-val-row">
            <strong className="mm-param-num">7.2</strong>
            <span className="mm-status-pill is-running">Normal</span>
          </div>
        </div>

        <div className="mm-param-card">
          <div className="mm-param-head">
            <span>Noise Level</span>
            <small className="mm-txt-rose">↑ 8% vs last period</small>
          </div>
          <div className="mm-param-val-row">
            <strong className="mm-param-num">82 dB</strong>
            <span className="mm-status-pill is-idle">Moderate</span>
          </div>
        </div>

        <div className="mm-param-card">
          <div className="mm-param-head">
            <span>Dust (PM10)</span>
            <small className="mm-txt-green">↑ 12% vs last period</small>
          </div>
          <div className="mm-param-val-row">
            <strong className="mm-param-num">56 µg/m³</strong>
            <span className="mm-status-pill is-running">Normal</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Environment Readings Table + Trends Chart */}
      <div className="mm-env-mid-grid">
        {/* Environment Readings Card */}
        <div className="mm-card mm-env-readings-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title"><Icon name="leaf" size={16} /> Environment Readings</h2>
            <button type="button" className="mm-viewlink" onClick={() => onShowToast("All 142 environmental logs loaded", "info")}>
              View All →
            </button>
          </div>

          <div className="mm-env-table-wrap">
            <table className="mm-env-table">
              <thead>
                <tr>
                  <th>Date &amp; Time</th>
                  <th>Parameter</th>
                  <th>Section / Zone</th>
                  <th>Reading</th>
                  <th>Unit</th>
                  <th>Limit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {envReadingsData.map((row) => (
                  <tr
                    key={row.id}
                    className={selectedReading?.id === row.id ? "is-selected-row" : ""}
                    onClick={() => setSelectedReading(row)}
                  >
                    <td className="mm-time-cell">{row.time}</td>
                    <td>{row.param}</td>
                    <td>{row.section}</td>
                    <td><strong>{row.val}</strong></td>
                    <td>{row.unit}</td>
                    <td>{row.limit}</td>
                    <td>
                      <span className={`mm-status-badge is-${row.status.toLowerCase()}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Environment Trends Chart Card */}
        <div className="mm-card mm-env-trends-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title"><Icon name="bars" size={16} /> Environment Trends</h2>
            <div className="mm-range">
              <button type="button" className="is-selected">7D</button>
              <button type="button">30D</button>
              <button type="button">3M</button>
              <button type="button">1Y</button>
            </div>
          </div>

          <div className="mm-trend-chart-box">
            <svg viewBox="0 0 400 160" className="mm-trend-svg">
              <line x1="30" y1="120" x2="380" y2="120" stroke="var(--line)" />
              <line x1="30" y1="80" x2="380" y2="80" stroke="var(--line)" strokeDasharray="3 3" />
              <line x1="30" y1="40" x2="380" y2="40" stroke="var(--line)" strokeDasharray="3 3" />

              {/* Line 1: Air Quality */}
              <polyline points="40,90 90,85 140,95 190,80 240,75 290,78 340,70" fill="none" stroke="var(--cyan)" strokeWidth="2.5" />
              {/* Line 2: Dust */}
              <polyline points="40,110 90,105 140,100 190,112 240,98 290,95 340,90" fill="none" stroke="var(--amber)" strokeWidth="2.5" />
              {/* Line 3: Noise */}
              <polyline points="40,60 90,55 140,65 190,50 240,58 290,52 340,48" fill="none" stroke="var(--rose)" strokeWidth="2.5" />
            </svg>

            <div className="mm-chart-legend">
              <span><span className="mm-dot is-cyan" /> Air Quality (AQI)</span>
              <span><span className="mm-dot is-amber" /> Dust (PM10)</span>
              <span><span className="mm-dot is-rose" /> Noise (dB)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Selected Issue + Compliance Action + Actions */}
      <div className="mm-env-bottom-grid">
        {/* Selected Environment Issue Card */}
        <div className="mm-card mm-selected-issue-card">
          <h2 className="mm-card-title">⚠️ Selected Environment Issue</h2>
          <div className="mm-issue-content">
            <div className="mm-issue-props">
              <div><span className="mm-lbl">Parameter</span><strong className="mm-val">Dust (PM10)</strong></div>
              <div><span className="mm-lbl">Reading</span><strong className="mm-val is-rose">156 µg/m³</strong></div>
              <div><span className="mm-lbl">Location / Section</span><strong className="mm-val">Processing Plant</strong></div>
              <div><span className="mm-lbl">Date &amp; Time</span><strong className="mm-val">10 Sep 2026, 12:40</strong></div>
              <div><span className="mm-lbl">Limit</span><strong className="mm-val">&lt; 100 µg/m³</strong></div>
              <div><span className="mm-lbl">Status</span><span className="mm-status-badge is-rejected">High</span></div>
            </div>

            <div className="mm-issue-desc">
              <span className="mm-lbl">Description</span>
              <p>Dust level exceeded the permissible limit in Processing Plant (Dust Suppression Unit 2 failure).</p>
            </div>
          </div>
        </div>

        {/* Compliance & Corrective Action Card */}
        <div className="mm-card mm-compliance-card">
          <h2 className="mm-card-title">📌 Compliance &amp; Corrective Action</h2>
          <div className="mm-compliance-details">
            <div><span className="mm-lbl">Compliance Requirement</span><strong>MOTP Dust Control Norms</strong></div>
            <div><span className="mm-lbl">Assigned Person / Owner</span><strong>Anita Singh</strong></div>
            <div><span className="mm-lbl">Action Required</span><strong>Increase water spraying and check dust extraction system</strong></div>
            <div><span className="mm-lbl">Deadline</span><strong className="mm-cyan">12 Sep 2026</strong></div>
            <div><span className="mm-lbl">Current Status</span><span className="mm-status-badge is-open">Open</span></div>
          </div>
        </div>

        {/* Actions Button Card */}
        <div className="mm-card mm-env-actions-card">
          <h2 className="mm-card-title">Actions</h2>
          <div className="mm-env-actions-btns">
            <button type="button" className="mm-btn-action-primary" onClick={() => onShowToast("Marked issue as Resolved", "success")}>
              ✓ Mark as Resolved
            </button>
            <button type="button" className="mm-btn-action-secondary" onClick={() => onShowToast("Assigned action item to Anita Singh", "info")}>
              👤 Assign Action
            </button>
            <button type="button" className="mm-btn-action-danger" onClick={() => onShowToast("Escalated issue to Statutory Director", "warning")}>
              ⚠️ Escalate Issue
            </button>
            <button type="button" className="mm-btn-outline" onClick={() => onShowToast("Note added to environmental log", "info")}>
              📝 Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
