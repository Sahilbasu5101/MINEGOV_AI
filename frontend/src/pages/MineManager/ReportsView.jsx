import { useState } from "react";
import Icon from "./Icons";
import "./MineManagerDashboard.css";

const initialReports = [
  { id: "RPT-2026-001", type: "Safety", name: "Safety Incident & Violation Report", date: "11 Sep 2026", status: "Completed", author: "Rahul Kumar", scope: "All Sections" },
  { id: "RPT-2026-002", type: "Environment", name: "In-Pit Dust & Gas Emission Log", date: "09 Sep 2026", status: "Completed", author: "System", scope: "East Pit & Crusher" },
  { id: "RPT-2026-003", type: "Production", name: "Shift Extraction & Overburden Target", date: "07 Sep 2026", status: "Pending", author: "Rahul Kumar", scope: "Main Pit" },
  { id: "RPT-2026-004", type: "Labour", name: "Statutory Roster & Attendance Log", date: "05 Sep 2026", status: "Completed", author: "Rahul Kumar", scope: "All Sections" },
  { id: "RPT-2026-005", type: "Safety", name: "DGMS Inspection Pre-Audit Report", date: "03 Sep 2026", status: "Rejected", author: "System", scope: "North Pit" },
  { id: "RPT-2026-006", type: "Environment", name: "Hydrological Discharge & Pump Audit", date: "01 Sep 2026", status: "Completed", author: "Rahul Kumar", scope: "West Pit" },
];

export function ReportsView({ onShowToast, onOpenSection }) {
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, generator, preview, history, audit
  const [selectedCategory, setSelectedCategory] = useState("safety");
  const [reportType, setReportType] = useState("Incident Report");
  const [sectionFilter, setSectionFilter] = useState("All Sections");
  const [dateRange, setDateRange] = useState("01 Sep 2026 - 11 Sep 2026");
  const [reportsList] = useState(initialReports);
  const [selectedReport, setSelectedReport] = useState(initialReports[0]);
  const [showFullReportModal, setShowFullReportModal] = useState(false);

  const handleGenerateReport = () => {
    onShowToast(`Generated new ${selectedCategory.toUpperCase()} report successfully!`, "success");
    setActiveTab("preview");
  };

  return (
    <div className="mm-reports-view">
      {/* Top Title & Sub-Navigation Tabs */}
      <div className="mm-reports-header">
        <div>
          <h1 className="mm-reports-title">Reports</h1>
          <p className="mm-reports-sub">Generate, view and manage reports for your mine operations.</p>
        </div>

        <div className="mm-reports-tabs">
          <button
            type="button"
            className={`mm-rpt-tab ${activeTab === "dashboard" ? "is-active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={`mm-rpt-tab ${activeTab === "generator" ? "is-active" : ""}`}
            onClick={() => setActiveTab("generator")}
          >
            Report Generator
          </button>
          <button
            type="button"
            className={`mm-rpt-tab ${activeTab === "preview" ? "is-active" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            Report Preview
          </button>
          <button
            type="button"
            className={`mm-rpt-tab ${activeTab === "history" ? "is-active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            Report History
          </button>
          <button
            type="button"
            className={`mm-rpt-tab ${activeTab === "audit" ? "is-active" : ""}`}
            onClick={() => setActiveTab("audit")}
          >
            Audit / Source Details
          </button>
        </div>
      </div>

      {/* VIEW TAB 1: MAIN REPORTS DASHBOARD */}
      {activeTab === "dashboard" && (
        <div className="mm-reports-content">
          {/* Top Card: Report Controls */}
          <div className="mm-card mm-report-controls-card">
            <div className="mm-card-head">
              <h2 className="mm-card-title">
                <Icon name="clipboard" size={17} /> Report Controls
              </h2>
              <span className="mm-sub-info">Select report type, section, category and date range to generate reports.</span>
            </div>

            <div className="mm-controls-grid">
              {/* Category Selector Cards (4 Options) */}
              <div className="mm-cat-cards-grid">
                <div
                  className={`mm-cat-card is-safety ${selectedCategory === "safety" ? "is-selected" : ""}`}
                  onClick={() => setSelectedCategory("safety")}
                >
                  <div className="mm-cat-icon"><Icon name="shield" size={22} /></div>
                  <strong className="mm-cat-name">SAFETY</strong>
                  <span className="mm-cat-desc">Reports / Violations</span>
                  <input type="radio" checked={selectedCategory === "safety"} onChange={() => {}} />
                </div>

                <div
                  className={`mm-cat-card is-env ${selectedCategory === "env" ? "is-selected" : ""}`}
                  onClick={() => setSelectedCategory("env")}
                >
                  <div className="mm-cat-icon"><Icon name="leaf" size={22} /></div>
                  <strong className="mm-cat-name">ENVIRONMENT</strong>
                  <span className="mm-cat-desc">Readings / Compliance</span>
                  <input type="radio" checked={selectedCategory === "env"} onChange={() => {}} />
                </div>

                <div
                  className={`mm-cat-card is-prod ${selectedCategory === "prod" ? "is-selected" : ""}`}
                  onClick={() => setSelectedCategory("prod")}
                >
                  <div className="mm-cat-icon"><Icon name="bars" size={22} /></div>
                  <strong className="mm-cat-name">PRODUCTION</strong>
                  <span className="mm-cat-desc">Output / Target</span>
                  <input type="radio" checked={selectedCategory === "prod"} onChange={() => {}} />
                </div>

                <div
                  className={`mm-cat-card is-labour ${selectedCategory === "labour" ? "is-selected" : ""}`}
                  onClick={() => setSelectedCategory("labour")}
                >
                  <div className="mm-cat-icon"><Icon name="people" size={22} /></div>
                  <strong className="mm-cat-name">LABOUR</strong>
                  <span className="mm-cat-desc">Attendance / Grievances</span>
                  <input type="radio" checked={selectedCategory === "labour"} onChange={() => {}} />
                </div>
              </div>

              {/* Form Controls Right Side */}
              <div className="mm-controls-form">
                <div className="mm-form-row">
                  <div>
                    <label>Report Type</label>
                    <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                      <option value="Incident Report">Incident Report</option>
                      <option value="Compliance Log">Compliance Log</option>
                      <option value="DGMS Statutory Return">DGMS Statutory Return</option>
                    </select>
                  </div>
                  <div>
                    <label>Mine / Section</label>
                    <select value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)}>
                      <option value="All Sections">All Sections</option>
                      <option value="East Pit">East Pit</option>
                      <option value="West Pit">West Pit</option>
                      <option value="Main Pit">Main Pit</option>
                    </select>
                  </div>
                </div>

                <div className="mm-form-row">
                  <div>
                    <label>Category</label>
                    <select>
                      <option>All Categories</option>
                      <option>Statutory Audit</option>
                      <option>Telemetry Log</option>
                    </select>
                  </div>
                  <div>
                    <label>Date Range</label>
                    <input type="text" value={dateRange} onChange={(e) => setDateRange(e.target.value)} />
                  </div>
                </div>

                <button
                  type="button"
                  className="mm-btn-generate-main"
                  onClick={handleGenerateReport}
                >
                  📄 Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Middle Row: Report Preview Card + Report History Card */}
          <div className="mm-reports-mid-grid">
            {/* Report Preview Card */}
            <div className="mm-card mm-report-preview-card">
              <h2 className="mm-card-title"><Icon name="eye" size={16} /> Report Preview</h2>

              <div className="mm-preview-split">
                {/* Mock Report Document Graphic */}
                <div className="mm-doc-thumb">
                  <div className="mm-doc-header">
                    <Icon name="shield" size={18} />
                    <span>MineGuard Safety Incident Report</span>
                  </div>
                  <div className="mm-doc-lines">
                    <div className="mm-line-lg" />
                    <div className="mm-line-md" />
                    <div className="mm-line-sm" />
                    <div className="mm-chart-circle" />
                  </div>
                </div>

                <div className="mm-doc-info">
                  <h3>Selected report summary</h3>
                  <ul>
                    <li>● Key metrics</li>
                    <li>● Flags / violations</li>
                    <li>● Trends / section status</li>
                    <li>● Compliance information</li>
                  </ul>

                  <div className="mm-doc-actions">
                    <button
                      type="button"
                      className="mm-btn-blue-main"
                      onClick={() => setShowFullReportModal(true)}
                    >
                      Open Full Report →
                    </button>
                    <div className="mm-sub-actions">
                      <button type="button" onClick={() => setActiveTab("preview")}>👁 View Summary</button>
                      <button type="button" onClick={() => onShowToast("Downloading encrypted PDF...", "success")}>📥 Download PDF</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Report History Card */}
            <div className="mm-card mm-report-history-card">
              <div className="mm-card-head">
                <h2 className="mm-card-title"><Icon name="history" size={16} /> Report History</h2>
                <button type="button" className="mm-viewlink" onClick={() => setActiveTab("history")}>
                  View All Reports →
                </button>
              </div>

              <div className="mm-history-table-wrap">
                <table className="mm-history-table">
                  <thead>
                    <tr>
                      <th>Report ID</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Generated By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportsList.map((rpt) => (
                      <tr key={rpt.id}>
                        <td className="mm-cell-id">{rpt.id}</td>
                        <td>{rpt.type}</td>
                        <td>{rpt.date}</td>
                        <td>
                          <span className={`mm-status-badge is-${rpt.status.toLowerCase()}`}>
                            {rpt.status}
                          </span>
                        </td>
                        <td>{rpt.author}</td>
                        <td>
                          <button
                            type="button"
                            className="mm-btn-table-view"
                            onClick={() => {
                              setSelectedReport(rpt);
                              setActiveTab("preview");
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
          </div>

          {/* Bottom Row: Audit Summary Card + Report Actions Card */}
          <div className="mm-reports-bottom-grid">
            {/* Audit / Source Summary Card */}
            <div className="mm-card mm-audit-card">
              <h2 className="mm-card-title"><Icon name="clipboard" size={16} /> Audit / Source Summary</h2>
              
              <div className="mm-audit-flex">
                <ul className="mm-audit-list">
                  <li><Icon name="check" size={14} /> Time-stamped records</li>
                  <li><Icon name="check" size={14} /> Section-wise source data</li>
                  <li><Icon name="check" size={14} /> Corrective-action status</li>
                  <li><Icon name="check" size={14} /> Audit trail reference</li>
                </ul>

                <div className="mm-audit-right">
                  <div className="mm-audit-placeholder-bars">
                    <div className="bar-line b1" />
                    <div className="bar-line b2" />
                    <div className="bar-line b3" />
                  </div>
                  <button type="button" className="mm-viewlink" onClick={() => setActiveTab("audit")}>
                    View Details →
                  </button>
                </div>
              </div>
            </div>

            {/* Report Actions Card */}
            <div className="mm-card mm-actions-card">
              <h2 className="mm-card-title"><Icon name="gear" size={16} /> Report Actions</h2>
              
              <div className="mm-actions-grid-4">
                <div
                  className="mm-act-box"
                  onClick={() => onShowToast("Regenerating report from latest telemetry stream...", "info")}
                >
                  <div className="mm-act-icon is-blue">📄</div>
                  <div>
                    <strong>Generate / Regenerate</strong>
                    <span>Create updated report</span>
                  </div>
                </div>

                <div
                  className="mm-act-box"
                  onClick={() => onShowToast("Report submitted to DGMS Statutory Officer for signoff", "success")}
                >
                  <div className="mm-act-icon is-green">📤</div>
                  <div>
                    <strong>Submit Report</strong>
                    <span>Send for review</span>
                  </div>
                </div>

                <div
                  className="mm-act-box"
                  onClick={() => onShowToast("Raised new Corrective Action Item #CA-4812", "warning")}
                >
                  <div className="mm-act-icon is-amber">⚠️</div>
                  <div>
                    <strong>Raise Corrective Action</strong>
                    <span>Create action item</span>
                  </div>
                </div>

                <div
                  className="mm-act-box"
                  onClick={() => onShowToast("Export link generated & copied to clipboard", "success")}
                >
                  <div className="mm-act-icon is-purple">🔗</div>
                  <div>
                    <strong>Share / Export</strong>
                    <span>Export or share report</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW TAB 2: REPORT GENERATOR */}
      {activeTab === "generator" && (
        <div className="mm-tab-section">
          <div className="mm-card">
            <h2 className="mm-card-title">1. Select Report Type</h2>
            <div className="mm-cat-cards-grid" style={{ marginBottom: "16px" }}>
              <div className="mm-cat-card is-safety is-selected">
                <Icon name="shield" size={24} />
                <strong>Safety</strong>
              </div>
              <div className="mm-cat-card is-env">
                <Icon name="leaf" size={24} />
                <strong>Environment</strong>
              </div>
              <div className="mm-cat-card is-prod">
                <Icon name="bars" size={24} />
                <strong>Production</strong>
              </div>
              <div className="mm-cat-card is-labour">
                <Icon name="people" size={24} />
                <strong>Labour</strong>
              </div>
            </div>

            <h2 className="mm-card-title">2. Scope &amp; Filters</h2>
            <div className="mm-form-row" style={{ gap: "14px", marginBottom: "16px" }}>
              <div><label>Mine / Site</label><select><option>Sukhdev Mine (BCCL)</option></select></div>
              <div><label>Section / Zone</label><select><option>All Sections</option></select></div>
              <div><label>Equipment (Optional)</label><select><option>All Equipment</option></select></div>
            </div>

            <button type="button" className="mm-btn-blue-main" onClick={handleGenerateReport}>
              Generate Report
            </button>
          </div>
        </div>
      )}

      {/* VIEW TAB 3: REPORT PREVIEW */}
      {activeTab === "preview" && (
        <div className="mm-tab-section">
          <div className="mm-card">
            <div className="mm-card-head">
              <h2 className="mm-card-title">Report Preview: {selectedReport.id} - {selectedReport.name}</h2>
              <button type="button" className="mm-btn-blue-main" onClick={() => onShowToast("Downloading PDF...", "success")}>
                Download / Export PDF
              </button>
            </div>

            {/* Summary Metrics */}
            <div className="mm-preview-metrics-row">
              <div className="mm-pmetric-box">
                <span className="mm-pm-lbl">Total Incidents</span>
                <strong className="mm-pm-val is-rose">12</strong>
              </div>
              <div className="mm-pmetric-box">
                <span className="mm-pm-lbl">High Risk Events</span>
                <strong className="mm-pm-val is-amber">3</strong>
              </div>
              <div className="mm-pmetric-box">
                <span className="mm-pm-lbl">Injuries</span>
                <strong className="mm-pm-val is-green">0</strong>
              </div>
              <div className="mm-pmetric-box">
                <span className="mm-pm-lbl">Safe Man-Hours</span>
                <strong className="mm-pm-val is-cyan">1,245</strong>
              </div>
            </div>

            <div className="mm-preview-doc-body">
              <h3>Statutory Compliance Summary</h3>
              <p>All DGMS safety norms verified. Gas telemetry levels CH4 0.05% (Normal), CO 4 ppm (Normal). Zero fatalities reported in current shift.</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW TAB 4: REPORT HISTORY */}
      {activeTab === "history" && (
        <div className="mm-tab-section">
          <div className="mm-card">
            <h2 className="mm-card-title">Report History &amp; Archives</h2>
            <div className="mm-history-table-wrap">
              <table className="mm-history-table">
                <thead>
                  <tr>
                    <th>Report ID</th>
                    <th>Type</th>
                    <th>Mine / Site</th>
                    <th>Date Range</th>
                    <th>Status</th>
                    <th>Author</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsList.map((r) => (
                    <tr key={r.id}>
                      <td className="mm-cell-id">{r.id}</td>
                      <td>{r.type}</td>
                      <td>Sukhdev Mine</td>
                      <td>{r.date}</td>
                      <td><span className={`mm-status-badge is-${r.status.toLowerCase()}`}>{r.status}</span></td>
                      <td>{r.author}</td>
                      <td>
                        <button type="button" className="mm-btn-table-view" onClick={() => { setSelectedReport(r); setActiveTab("preview"); }}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW TAB 5: AUDIT / SOURCE DETAILS */}
      {activeTab === "audit" && (
        <div className="mm-tab-section">
          <div className="mm-card">
            <h2 className="mm-card-title">Audit Trail &amp; Telemetry Source Logs</h2>
            <div className="mm-audit-source-list">
              <div className="mm-audit-row">
                <strong className="mm-cyan">11 Sep 2026, 10:30 AM</strong>
                <span>Telemetry stream synced from Gas Sensors (E-12, W-04)</span>
                <span className="mm-status-badge is-completed">VERIFIED</span>
              </div>
              <div className="mm-audit-row">
                <strong className="mm-cyan">11 Sep 2026, 09:50 AM</strong>
                <span>Over-speed event logged for HT-07 by Speed Radar System</span>
                <span className="mm-status-badge is-completed">VERIFIED</span>
              </div>
              <div className="mm-audit-row">
                <strong className="mm-cyan">11 Sep 2026, 06:00 AM</strong>
                <span>Shift handover signoff digitally signed by Rahul Kumar</span>
                <span className="mm-status-badge is-completed">SIGNED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Full Report Preview */}
      {showFullReportModal && (
        <div className="mm-modal-overlay" onClick={() => setShowFullReportModal(false)}>
          <div className="mm-modal" style={{ maxWidth: "700px" }} onClick={(e) => e.stopPropagation()}>
            <div className="mm-modal-header">
              <h3 className="mm-modal-title">📄 {selectedReport.id} - Statutory Report View</h3>
              <button type="button" className="mm-panel-close" onClick={() => setShowFullReportModal(false)}>✕</button>
            </div>
            <div className="mm-modal-body">
              <div className="mm-full-doc-preview">
                <h2>BCCL / SECL STATUTORY SAFETY REPORT</h2>
                <hr />
                <p><strong>Report Reference:</strong> {selectedReport.id}</p>
                <p><strong>Generated On:</strong> {selectedReport.date}</p>
                <p><strong>Status:</strong> {selectedReport.status}</p>
                <p><strong>Signoff Manager:</strong> {selectedReport.author}</p>
                <br />
                <h4>Summary of Operations:</h4>
                <p>All excavators and haulage trucks operated under DGMS guidelines. Environmental air monitoring index remains within permissible limits.</p>
              </div>
            </div>
            <div className="mm-modal-footer">
              <button type="button" className="mm-modal-btn is-cyan" onClick={() => { onShowToast("Report exported to PDF", "success"); setShowFullReportModal(false); }}>
                Export PDF
              </button>
              <button type="button" className="mm-modal-btn is-ghost" onClick={() => setShowFullReportModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
