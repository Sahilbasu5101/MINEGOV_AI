import { useState } from "react";
import Icon from "./Icons";
import "./MineManagerDashboard.css";

const attendanceData = [
  { id: 1, section: "North Pit", total: 62, present: 58, absent: 4, pct: "94%", status: "Good" },
  { id: 2, section: "Processing Plant", total: 48, present: 44, absent: 4, pct: "92%", status: "Good" },
  { id: 3, section: "Main Shaft", total: 55, present: 46, absent: 9, pct: "84%", status: "Moderate" },
  { id: 4, section: "East Zone", total: 41, present: 35, absent: 6, pct: "85%", status: "Moderate" },
  { id: 5, section: "West Zone", total: 50, present: 42, absent: 8, pct: "84%", status: "Moderate" },
];

const contractorData = [
  { id: 1, name: "XYZ Mining Pvt Ltd", workers: 28, licence: "Valid", expiry: "12 Jan 2027", comp: "95%", status: "Compliant" },
  { id: 2, name: "Shakti Infrastructure", workers: 15, licence: "Valid", expiry: "08 Mar 2027", comp: "90%", status: "Compliant" },
  { id: 3, name: "R.K. Drilling Co.", workers: 12, licence: "Expired", expiry: "15 Aug 2026", comp: "60%", status: "Non-Compliant" },
  { id: 4, name: "Global Earthmovers", workers: 8, licence: "Valid", expiry: "20 Feb 2027", comp: "88%", status: "Compliant" },
];

export function LabourDetailsView({ onShowToast, onClose }) {
  const [sectionFilter, setSectionFilter] = useState("All Sections");
  const [shiftFilter, setShiftFilter] = useState("All Shifts");

  return (
    <div className="mm-labour-details-view">
      {/* Top Header */}
      <div className="mm-labour-header">
        <div>
          <h1 className="mm-labour-title">Labour Details</h1>
          <p className="mm-labour-sub">
            Monitor workforce attendance, contractor details, training compliance and labour-related issues.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {onClose && (
            <button type="button" className="mm-btn-outline" onClick={onClose}>
              ← Back to Dashboard
            </button>
          )}
          <button type="button" className="mm-btn-outline" onClick={() => onShowToast("Add New Labour Record modal opened", "info")}>
            + Add Labour Record
          </button>
          <button type="button" className="mm-btn-save-main" onClick={() => onShowToast("Exported Labour Roster & Attendance Log (PDF)", "success")}>
            📤 Export Report
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mm-labour-filter-bar">
        <div>
          <label>Section</label>
          <select value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)}>
            <option value="All Sections">All Sections</option>
            <option value="North Pit">North Pit</option>
            <option value="Main Shaft">Main Shaft</option>
          </select>
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
          <label>Date Range</label>
          <input type="text" defaultValue="01 Sep 2026 - 11 Sep 2026" />
        </div>

        <div>
          <label>Contractor</label>
          <select>
            <option>All Contractors</option>
            <option>XYZ Mining Pvt Ltd</option>
            <option>Shakti Infrastructure</option>
          </select>
        </div>

        <button type="button" className="mm-btn-apply-filters" onClick={() => onShowToast("Applied filters to labour dataset", "info")}>
          Apply Filters
        </button>
      </div>

      {/* Top 5 KPI Summary Cards */}
      <div className="mm-labour-kpis-row">
        <div className="mm-labour-kpi-card is-cyan">
          <div className="mm-lkpi-icon">👥</div>
          <div>
            <strong className="mm-lkpi-num">286</strong>
            <span className="mm-lkpi-lbl">Total Workforce</span>
            <small className="mm-lkpi-sub">↑ 5% vs last period</small>
          </div>
        </div>

        <div className="mm-labour-kpi-card is-green">
          <div className="mm-lkpi-icon">✅</div>
          <div>
            <strong className="mm-lkpi-num">240</strong>
            <span className="mm-lkpi-lbl">Present Today</span>
            <small className="mm-lkpi-sub">84% attendance rate</small>
          </div>
        </div>

        <div className="mm-labour-kpi-card is-rose">
          <div className="mm-lkpi-icon">🚫</div>
          <div>
            <strong className="mm-lkpi-num">32</strong>
            <span className="mm-lkpi-lbl">Absent Today</span>
            <small className="mm-lkpi-sub is-rose">↑ 12% vs last period</small>
          </div>
        </div>

        <div className="mm-labour-kpi-card is-amber">
          <div className="mm-lkpi-icon">🏢</div>
          <div>
            <strong className="mm-lkpi-num">18</strong>
            <span className="mm-lkpi-lbl">Contractors On-Site</span>
            <small className="mm-lkpi-sub">4 companies</small>
          </div>
        </div>

        <div className="mm-labour-kpi-card is-purple">
          <div className="mm-lkpi-icon">🎓</div>
          <div>
            <strong className="mm-lkpi-num">92%</strong>
            <span className="mm-lkpi-lbl">Training Compliant</span>
            <small className="mm-lkpi-sub">↑ 6% vs last period</small>
          </div>
        </div>
      </div>

      {/* Middle Grid: Attendance & Workforce Table + Contractor Status Table */}
      <div className="mm-labour-mid-grid">
        {/* Attendance & Workforce Table */}
        <div className="mm-card mm-attendance-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title"><Icon name="people" size={16} /> Attendance &amp; Workforce</h2>
            <button type="button" className="mm-viewlink" onClick={() => onShowToast("Detailed biometric logs loaded", "info")}>
              View All →
            </button>
          </div>

          <div className="mm-labour-table-wrap">
            <table className="mm-labour-table">
              <thead>
                <tr>
                  <th>Section / Location</th>
                  <th>Total Workers</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Attendance %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((r) => (
                  <tr key={r.id}>
                    <td><strong>{r.section}</strong></td>
                    <td>{r.total}</td>
                    <td>{r.present}</td>
                    <td><span className="mm-txt-rose">{r.absent}</span></td>
                    <td><strong className="mm-cyan">{r.pct}</strong></td>
                    <td>
                      <span className={`mm-status-badge is-${r.status === "Good" ? "completed" : "pending"}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contractor Status Table */}
        <div className="mm-card mm-contractor-card">
          <div className="mm-card-head">
            <h2 className="mm-card-title"><Icon name="clipboard" size={16} /> Contractor Status</h2>
            <button type="button" className="mm-viewlink" onClick={() => onShowToast("Contractor compliance directory opened", "info")}>
              View All →
            </button>
          </div>

          <div className="mm-labour-table-wrap">
            <table className="mm-labour-table">
              <thead>
                <tr>
                  <th>Contractor</th>
                  <th>Workers</th>
                  <th>Licence Status</th>
                  <th>Expiry Date</th>
                  <th>Compliance %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {contractorData.map((c) => (
                  <tr key={c.id}>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.workers}</td>
                    <td><span className={c.licence === "Valid" ? "mm-txt-green" : "mm-txt-rose"}>{c.licence}</span></td>
                    <td>{c.expiry}</td>
                    <td><strong>{c.comp}</strong></td>
                    <td>
                      <span className={`mm-status-badge is-${c.status === "Compliant" ? "completed" : "rejected"}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Training Compliance + Selected Worker + Grievances */}
      <div className="mm-labour-bottom-grid">
        {/* Training Compliance Progress Bars */}
        <div className="mm-card mm-training-card">
          <h2 className="mm-card-title">🎓 Training Compliance</h2>
          <div className="mm-training-list">
            <div className="mm-tbar-item">
              <div className="mm-tbar-head"><span>Safety Induction</span><strong>90%</strong></div>
              <div className="mm-tbar-track"><div className="mm-tbar-fill" style={{ width: "90%" }} /></div>
            </div>
            <div className="mm-tbar-item">
              <div className="mm-tbar-head"><span>Equipment Operation</span><strong>90%</strong></div>
              <div className="mm-tbar-track"><div className="mm-tbar-fill" style={{ width: "90%" }} /></div>
            </div>
            <div className="mm-tbar-item">
              <div className="mm-tbar-head"><span>Emergency Response</span><strong>85%</strong></div>
              <div className="mm-tbar-track"><div className="mm-tbar-fill" style={{ width: "85%" }} /></div>
            </div>
            <div className="mm-tbar-item">
              <div className="mm-tbar-head"><span>First Aid</span><strong>98%</strong></div>
              <div className="mm-tbar-track"><div className="mm-tbar-fill" style={{ width: "98%" }} /></div>
            </div>
          </div>
        </div>

        {/* Selected Worker Details Card */}
        <div className="mm-card mm-worker-card">
          <h2 className="mm-card-title">👤 Selected Worker / Labour Details</h2>
          <div className="mm-worker-grid-props">
            <div><span className="mm-lbl">Worker ID</span><strong className="mm-val mm-cyan">WRK-2026-1045</strong></div>
            <div><span className="mm-lbl">Name</span><strong className="mm-val">Rajesh Kumar</strong></div>
            <div><span className="mm-lbl">Role</span><strong className="mm-val">Driller</strong></div>
            <div><span className="mm-lbl">Section</span><strong className="mm-val">North Pit</strong></div>
            <div><span className="mm-lbl">Contractor</span><strong className="mm-val">XYZ Mining Pvt Ltd</strong></div>
            <div><span className="mm-lbl">Status</span><span className="mm-status-badge is-completed">Present</span></div>
          </div>
        </div>

        {/* Grievances & Labour Issues Card */}
        <div className="mm-card mm-grievances-card">
          <h2 className="mm-card-title">⚖️ Grievances &amp; Labour Issues</h2>
          <div className="mm-grievances-list">
            <div className="mm-grievance-row">
              <div>
                <strong>Overtime Allowance Claim</strong>
                <span>Suresh Patel · XYZ Mining</span>
              </div>
              <span className="mm-status-badge is-open">Open</span>
            </div>
            <div className="mm-grievance-row">
              <div>
                <strong>PPE Safety Helmet Issue</strong>
                <span>Amit Rao · Shakti Infra</span>
              </div>
              <span className="mm-status-badge is-completed">Resolved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
