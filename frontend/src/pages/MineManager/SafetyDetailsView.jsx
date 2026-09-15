import { useState } from "react";
import Icon from "./Icons";
import "./MineManagerDashboard.css";

const violationsData = [
  { id: 1, time: "11 Sep 2026, 10:24", section: "North Pit", type: "PPE Non-Compliance", severity: "Critical", status: "Open", owner: "Rahul Kumar" },
  { id: 2, time: "10 Sep 2026, 15:10", section: "Processing Plant", type: "Equipment Guarding", severity: "High", status: "In Progress", owner: "Anita Singh" },
  { id: 3, time: "09 Sep 2026, 16:30", section: "Waste Dump", type: "Dust Level Exceeded", severity: "High", status: "Open", owner: "Suresh Patel" },
  { id: 4, time: "08 Sep 2026, 11:20", section: "Main Shaft", type: "Unauthorized Access", severity: "Medium", status: "Open", owner: "Neha Verma" },
  { id: 5, time: "07 Sep 2026, 09:15", section: "East Zone", type: "Ventilation Issue", severity: "Medium", status: "Resolved", owner: "Amit Rao" },
];

const inspectionsData = [
  { id: 1, date: "11 Sep 2026", section: "North Pit", inspector: "R. Kumar", result: "Passed", findings: "No major issues" },
  { id: 2, date: "10 Sep 2026", section: "Processing", inspector: "A. Singh", result: "Failed", findings: "Guard rail missing" },
  { id: 3, date: "09 Sep 2026", section: "Waste Dump", inspector: "S. Patel", result: "Passed", findings: "Dust within limit" },
  { id: 4, date: "08 Sep 2026", section: "Main Shaft", inspector: "N. Verma", result: "Passed", findings: "Good condition" },
  { id: 5, date: "07 Sep 2026", section: "West Zone", inspector: "A. Rao", result: "Follow-up", findings: "Minor cracks" },
];

export function SafetyDetailsView({ onShowToast, onClose }) {
  const [sectionFilter, setSectionFilter] = useState("All Sections");
  const [severityFilter, setSeverityFilter] = useState("All Severities");
  const [selectedViolation, setSelectedViolation] = useState(violationsData[0]);

  return (
    <div className="mm-safety-details-view">
      {/* Top Header */}
      <div className="mm-env-header">
        <div>
          <h1 className="mm-env-title">Safety Details</h1>
          <p className="mm-env-sub">
            Monitor safety compliance, inspections, violations and corrective actions.
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
            onClick={() => onShowToast("Add Safety Record modal opened", "info")}
          >
            + Add Safety Record
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
            <option value="Processing Plant">Processing Plant</option>
            <option value="Waste Dump">Waste Dump</option>
            <option value="Main Shaft">Main Shaft</option>
          </select>
        </div>

        <div>
          <label>Date Range</label>
          <input type="text" defaultValue="01 Sep 2026 - 11 Sep 2026" />
        </div>

        <div>
          <label>Severity Filter</label>
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
            <option value="All Severities">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button
          type="button"
          className="mm-btn-apply-filters"
          onClick={() => onShowToast("Filters applied to safety records", "info")}
        >
          Apply Filters
        </button>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="mm-env-kpis-row">
        <div className="mm-env-kpi-card is-green">
          <div className="mm-ekpi-icon">🛡️</div>
          <div>
            <strong className="mm-ekpi-num">96%</strong>
            <span className="mm-ekpi-lbl">Safety Compliance</span>
            <small className="mm-ekpi-sub">↑ 2% vs previous period</small>
          </div>
        </div>

        <div className="mm-env-kpi-card is-rose">
          <div className="mm-ekpi-icon">⚠️</div>
          <div>
            <strong className="mm-ekpi-num">12</strong>
            <span className="mm-ekpi-lbl">Open Violations</span>
            <small className="mm-ekpi-sub is-rose">↑ 3% vs previous period</small>
          </div>
        </div>

        <div className="mm-env-kpi-card is-blue">
          <div className="mm-ekpi-icon">📋</div>
          <div>
            <strong className="mm-ekpi-num">28</strong>
            <span className="mm-ekpi-lbl">Recent Inspections</span>
            <small className="mm-ekpi-sub">↑ 12% vs previous period</small>
          </div>
        </div>

        <div className="mm-env-kpi-card is-amber">
          <div className="mm-ekpi-icon">🪖</div>
          <div>
            <strong className="mm-ekpi-num">6</strong>
            <span className="mm-ekpi-lbl">High-Risk Issues</span>
            <small className="mm-ekpi-sub is-amber">↑ 25% vs previous period</small>
          </div>
        </div>
      </div>

      {/* Middle Row 1: 4 Breakdown Summary Cards */}
      <div className="mm-safety-breakdown-row">
        {/* Safety Overview (Donut Chart) */}
        <div className="mm-card mm-safety-donut-card">
          <h2 className="mm-card-title">Safety Overview</h2>
          <div className="mm-donut-wrap">
            <svg viewBox="0 0 120 120" className="mm-donut-svg">
              <circle cx="60" cy="60" r="45" fill="none" stroke="var(--line)" strokeWidth="14" />
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="var(--green)"
                strokeWidth="14"
                strokeDasharray="254 283"
                transform="rotate(-90 60 60)"
              />
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="var(--rose)"
                strokeWidth="14"
                strokeDasharray="14 283"
                strokeDashoffset="-254"
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="58" textAnchor="middle" className="mm-donut-score">96%</text>
              <text x="60" y="72" textAnchor="middle" className="mm-donut-sub">Compliant</text>
            </svg>
            <ul className="mm-donut-legend">
              <li><span className="mm-dot is-green" /> Compliant (92)</li>
              <li><span className="mm-dot is-amber" /> Minor Issues (5)</li>
              <li><span className="mm-dot is-blue" /> Major Issues (4)</li>
              <li><span className="mm-dot is-rose" /> Critical (2)</li>
            </ul>
          </div>
        </div>

        {/* Open Violations */}
        <div className="mm-card mm-safety-stat-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title">⚠️ Open Violations</h2>
            <button type="button" className="mm-viewlink" onClick={() => onShowToast("All open violations loaded", "info")}>
              View All →
            </button>
          </div>
          <div className="mm-stat-big-num">
            <strong>12</strong>
            <span>Current Open</span>
            <small className="mm-txt-rose">↑ 3% vs previous period</small>
          </div>
          <ul className="mm-stat-breakdown-list">
            <li><span>Critical</span><strong className="mm-txt-rose">2</strong></li>
            <li><span>High</span><strong className="mm-txt-amber">4</strong></li>
            <li><span>Medium</span><strong className="mm-txt-blue">4</strong></li>
            <li><span>Low</span><strong>2</strong></li>
          </ul>
        </div>

        {/* Recent Inspections */}
        <div className="mm-card mm-safety-stat-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title">📋 Recent Inspections</h2>
            <button type="button" className="mm-viewlink" onClick={() => onShowToast("Inspection logs opened", "info")}>
              View All →
            </button>
          </div>
          <div className="mm-stat-big-num">
            <strong>28</strong>
            <span>This Period</span>
            <small className="mm-txt-green">↑ 12% vs previous period</small>
          </div>
          <ul className="mm-stat-breakdown-list">
            <li><span>Passed</span><strong className="mm-txt-green">20</strong></li>
            <li><span>Failed</span><strong className="mm-txt-rose">4</strong></li>
            <li><span>Follow-up Required</span><strong className="mm-txt-amber">3</strong></li>
            <li><span>In Progress</span><strong>1</strong></li>
          </ul>
        </div>

        {/* High-Risk Issues */}
        <div className="mm-card mm-safety-stat-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title">🪖 High-Risk Issues</h2>
            <button type="button" className="mm-viewlink" onClick={() => onShowToast("Risk register opened", "info")}>
              View All →
            </button>
          </div>
          <div className="mm-stat-big-num">
            <strong>6</strong>
            <span>Active Issues</span>
          </div>
          <ul className="mm-stat-breakdown-list">
            <li><span>Equipment Safety</span><strong>2</strong></li>
            <li><span>Gas / Ventilation</span><strong>1</strong></li>
            <li><span>Structural / Ground</span><strong>1</strong></li>
            <li><span>Electrical</span><strong>1</strong></li>
            <li><span>Other</span><strong>1</strong></li>
          </ul>
        </div>
      </div>

      {/* Middle Row 2: Tables (Violation Tracker + Recent Inspections) */}
      <div className="mm-env-mid-grid">
        {/* Violation Tracker */}
        <div className="mm-card mm-env-readings-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title"><Icon name="warning" size={16} /> Violation Tracker</h2>
            <button type="button" className="mm-viewlink" onClick={() => onShowToast("All safety violations loaded", "info")}>
              View All →
            </button>
          </div>

          <div className="mm-env-table-wrap">
            <table className="mm-env-table">
              <thead>
                <tr>
                  <th>Date &amp; Time</th>
                  <th>Section / Zone</th>
                  <th>Violation Type</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {violationsData.map((v) => (
                  <tr
                    key={v.id}
                    className={selectedViolation?.id === v.id ? "is-selected-row" : ""}
                    onClick={() => setSelectedViolation(v)}
                  >
                    <td className="mm-time-cell">{v.time}</td>
                    <td>{v.section}</td>
                    <td><strong>{v.type}</strong></td>
                    <td>
                      <span className={`mm-status-badge is-${v.severity.toLowerCase()}`}>
                        {v.severity}
                      </span>
                    </td>
                    <td>
                      <span className={`mm-status-badge is-${v.status === "Resolved" ? "completed" : v.status === "In Progress" ? "pending" : "rejected"}`}>
                        {v.status}
                      </span>
                    </td>
                    <td>{v.owner}</td>
                    <td>
                      <button type="button" className="mm-btn-table-view">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Inspections Table */}
        <div className="mm-card mm-env-readings-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title"><Icon name="clipboard" size={16} /> Recent Inspections Log</h2>
            <button type="button" className="mm-viewlink" onClick={() => onShowToast("All inspection logs loaded", "info")}>
              View All →
            </button>
          </div>

          <div className="mm-env-table-wrap">
            <table className="mm-env-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Section</th>
                  <th>Inspector</th>
                  <th>Result</th>
                  <th>Findings</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inspectionsData.map((insp) => (
                  <tr key={insp.id}>
                    <td className="mm-time-cell">{insp.date}</td>
                    <td>{insp.section}</td>
                    <td>{insp.inspector}</td>
                    <td>
                      <span className={`mm-status-badge is-${insp.result === "Passed" ? "completed" : insp.result === "Failed" ? "rejected" : "pending"}`}>
                        {insp.result}
                      </span>
                    </td>
                    <td>{insp.findings}</td>
                    <td>
                      <button type="button" className="mm-btn-table-view">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Selected Issue + Corrective Action + Actions */}
      <div className="mm-env-bottom-grid">
        {/* Selected Safety Issue Details */}
        <div className="mm-card mm-selected-issue-card">
          <h2 className="mm-card-title">⚠️ Selected Safety Issue Details</h2>
          <div className="mm-issue-content">
            <div className="mm-issue-props">
              <div><span className="mm-lbl">Violation Type</span><strong className="mm-val">{selectedViolation.type}</strong></div>
              <div><span className="mm-lbl">Location / Section</span><strong className="mm-val">{selectedViolation.section}</strong></div>
              <div><span className="mm-lbl">Date &amp; Time</span><strong className="mm-val">{selectedViolation.time}</strong></div>
              <div><span className="mm-lbl">Severity</span><span className="mm-status-badge is-rejected">{selectedViolation.severity}</span></div>
            </div>

            <div className="mm-evidence-box">
              <span className="mm-lbl">Evidence</span>
              <div className="mm-evidence-thumbs">
                <div className="mm-thumb-img">🪖 helmet_photo.jpg</div>
                <div className="mm-thumb-add">+ Add</div>
              </div>
            </div>

            <div className="mm-issue-desc">
              <span className="mm-lbl">Description</span>
              <p>Workers found without proper safety helmets and high-visibility jackets in Zone A.</p>
              <div style={{ marginTop: "6px" }}>
                <span className="mm-lbl">Assigned To</span>
                <strong>{selectedViolation.owner}</strong>
              </div>
              <div style={{ marginTop: "4px" }}>
                <span className="mm-lbl">Current Status</span>
                <span className="mm-status-badge is-open">{selectedViolation.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Corrective Action / Escalation Card */}
        <div className="mm-card mm-compliance-card">
          <h2 className="mm-card-title">📌 Corrective Action / Escalation</h2>
          <div className="mm-compliance-details">
            <div><span className="mm-lbl">Action Required</span><strong>Issue PPE and re-train workers</strong></div>
            <div><span className="mm-lbl">Assigned Person</span><strong>Rahul Kumar</strong></div>
            <div><span className="mm-lbl">Deadline</span><strong className="mm-cyan">13 Sep 2026</strong></div>
            <div><span className="mm-lbl">Current Status</span><span className="mm-status-badge is-pending">In Progress</span></div>
            <div><span className="mm-lbl">Escalation Level</span><strong>Level 1</strong></div>
            <div><span className="mm-lbl">Escalate To</span><strong>Safety Manager</strong></div>
            <div><span className="mm-lbl">Notes</span><span>Follow-up inspection scheduled for tomorrow shift</span></div>
          </div>
        </div>

        {/* Actions Button Card */}
        <div className="mm-card mm-env-actions-card">
          <h2 className="mm-card-title">Actions</h2>
          <div className="mm-env-actions-btns">
            <button type="button" className="mm-btn-action-primary" onClick={() => onShowToast("Marked safety violation as Resolved", "success")}>
              ✓ Mark as Resolved
            </button>
            <button type="button" className="mm-btn-action-secondary" onClick={() => onShowToast("Assigned action item to Safety Inspector", "info")}>
              👤 Assign Action
            </button>
            <button type="button" className="mm-btn-action-danger" onClick={() => onShowToast("Escalated issue to Mines Safety Director", "warning")}>
              ⚠️ Escalate Issue
            </button>
            <button type="button" className="mm-btn-outline" onClick={() => onShowToast("Note added to safety log", "info")}>
              📝 Add Note
            </button>
            <button type="button" className="mm-btn-outline" onClick={() => onShowToast("Safety audit trail log generated", "info")}>
              📄 View Audit Trail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
