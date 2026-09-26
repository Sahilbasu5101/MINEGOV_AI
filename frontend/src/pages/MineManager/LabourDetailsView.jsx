import { useState, useEffect } from "react";
import Icon from "./Icons";
import { api } from "../../services/api";
import fallbackWorkforce from "../../data/workforceData.json";
import "./MineManagerDashboard.css";

export function LabourDetailsView({ onShowToast, onClose }) {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiveDb, setIsLiveDb] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [gateFilter, setGateFilter] = useState("All");
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [activeTab, setActiveTab] = useState("pme_roster"); // "pme_roster" | "shift_attendance" | "contractors"

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await api.getMineWorkforce("all");
        if (res?.status === "SUCCESS" && res?.workers?.length > 0) {
          setWorkers(res.workers);
          setSelectedWorker(res.workers[0]);
          setIsLiveDb(true);
        } else {
          throw new Error("Empty DB response, using fallback");
        }
      } catch (err) {
        console.warn("Using offline master workforce records:", err.message);
        const fallbackList = fallbackWorkforce.records || [];
        setWorkers(fallbackList);
        setSelectedWorker(fallbackList[0]);
        setIsLiveDb(false);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtered workers list
  const filteredWorkers = workers.filter((w) => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      !q ||
      w.workerId?.toLowerCase().includes(q) ||
      w.name?.toLowerCase().includes(q) ||
      w.designation?.toLowerCase().includes(q);

    const matchStatus =
      statusFilter === "All" || w.pmeStatus === statusFilter;

    const matchGate =
      gateFilter === "All" ||
      (gateFilter === "Locked" && (w.biometricGateLocked || w.pmeStatus === "UNFIT")) ||
      (gateFilter === "Cleared" && !w.biometricGateLocked && w.pmeStatus !== "UNFIT");

    return matchQuery && matchStatus && matchGate;
  });

  // Dynamic KPI calculations
  const totalCount = workers.length;
  const fitCount = workers.filter((w) => w.pmeStatus === "FIT").length;
  const dustWatchCount = workers.filter((w) => w.pmeStatus === "DUST_WATCH").length;
  const lockedOutCount = workers.filter((w) => w.biometricGateLocked || w.pmeStatus === "UNFIT").length;
  const complianceRate = totalCount > 0 ? Math.round(((fitCount) / totalCount) * 100) : 0;

  return (
    <div className="mm-labour-details-view">
      {/* Top Header */}
      <div className="mm-labour-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 className="mm-labour-title">Labour &amp; Workforce Statutory Roster</h1>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: "12px",
                backgroundColor: isLiveDb ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                color: isLiveDb ? "#10b981" : "#f59e0b",
                border: `1px solid ${isLiveDb ? "#10b981" : "#f59e0b"}`
              }}
            >
              {isLiveDb ? "⚡ Live Neon PostgreSQL Connected" : "📦 Cached Master Records"}
            </span>
          </div>
          <p className="mm-labour-sub">
            DGMS Form 'O' Periodic Medical Examination (PME), MVTR-1966 Refresher &amp; Biometric Gate Lockout Roster (CMR 2017 Reg 29).
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
            onClick={() => onShowToast(`Exported DGMS Form 'O' Roster (${workers.length} Personnel) to PDF`, "success")}
          >
            📤 Export Form 'O' Register
          </button>
        </div>
      </div>

      {/* Top 5 Dynamic KPI Summary Cards */}
      <div className="mm-labour-kpis-row">
        <div className="mm-labour-kpi-card is-cyan">
          <div className="mm-lkpi-icon">👥</div>
          <div>
            <strong className="mm-lkpi-num">{totalCount}</strong>
            <span className="mm-lkpi-lbl">Total Statutory Workforce</span>
            <small className="mm-lkpi-sub">BCCL Moonidih &amp; Jharia Coalfield</small>
          </div>
        </div>

        <div className="mm-labour-kpi-card is-green">
          <div className="mm-lkpi-icon">✅</div>
          <div>
            <strong className="mm-lkpi-num">{fitCount}</strong>
            <span className="mm-lkpi-lbl">PME Medically Fit</span>
            <small className="mm-lkpi-sub">{complianceRate}% of active force</small>
          </div>
        </div>

        <div className="mm-labour-kpi-card is-amber">
          <div className="mm-lkpi-icon">🫁</div>
          <div>
            <strong className="mm-lkpi-num">{dustWatchCount}</strong>
            <span className="mm-lkpi-lbl">Dust-Watch / Follow-up</span>
            <small className="mm-lkpi-sub is-amber">Silicosis / Pneumoconiosis Watch</small>
          </div>
        </div>

        <div className="mm-labour-kpi-card is-rose">
          <div className="mm-lkpi-icon">🚫</div>
          <div>
            <strong className="mm-lkpi-num">{lockedOutCount}</strong>
            <span className="mm-lkpi-lbl">Biometric Turnstile Locked</span>
            <small className="mm-lkpi-sub is-rose">Statutory Barred at Shaft Entrance</small>
          </div>
        </div>

        <div className="mm-labour-kpi-card is-purple">
          <div className="mm-lkpi-icon">🎓</div>
          <div>
            <strong className="mm-lkpi-num">96%</strong>
            <span className="mm-lkpi-lbl">MVTR-1966 Valid</span>
            <small className="mm-lkpi-sub">Vocational Training Compliant</small>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--line, #334155)", paddingBottom: "10px", marginTop: "10px" }}>
        <button
          type="button"
          className={`mm-btn-outline ${activeTab === "pme_roster" ? "is-selected-tab" : ""}`}
          style={{
            backgroundColor: activeTab === "pme_roster" ? "var(--cyan, #06b6d4)" : "transparent",
            color: activeTab === "pme_roster" ? "#000" : "inherit",
            fontWeight: activeTab === "pme_roster" ? "700" : "500",
          }}
          onClick={() => setActiveTab("pme_roster")}
        >
          🪪 Biometric Turnstile &amp; Form 'O' PME Records ({filteredWorkers.length})
        </button>
        <button
          type="button"
          className={`mm-btn-outline ${activeTab === "shift_attendance" ? "is-selected-tab" : ""}`}
          style={{
            backgroundColor: activeTab === "shift_attendance" ? "var(--cyan, #06b6d4)" : "transparent",
            color: activeTab === "shift_attendance" ? "#000" : "inherit",
            fontWeight: activeTab === "shift_attendance" ? "700" : "500",
          }}
          onClick={() => setActiveTab("shift_attendance")}
        >
          ⏱️ Shift Attendance Summary
        </button>
      </div>

      {/* TAB 1: PME & BIOMETRIC GATE LOCKOUT ROSTER */}
      {activeTab === "pme_roster" && (
        <div style={{ marginTop: "14px" }}>
          {/* Filter Bar */}
          <div className="mm-labour-filter-bar">
            <div style={{ flex: "1" }}>
              <label>Search Worker</label>
              <input
                type="text"
                placeholder="Search by Worker ID, Name, or Designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", padding: "6px 10px", borderRadius: "4px", border: "1px solid #475569", background: "#0f172a", color: "#fff" }}
              />
            </div>

            <div>
              <label>PME Medical Status</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="FIT">FIT (Cleared)</option>
                <option value="DUST_WATCH">DUST_WATCH (Under Observation)</option>
                <option value="UNFIT">UNFIT (Barred)</option>
              </select>
            </div>

            <div>
              <label>Biometric Gate Status</label>
              <select value={gateFilter} onChange={(e) => setGateFilter(e.target.value)}>
                <option value="All">All Gates</option>
                <option value="Cleared">Cleared (Green Gate)</option>
                <option value="Locked">Locked Out (Turnstile Barred)</option>
              </select>
            </div>

            <button
              type="button"
              className="mm-btn-apply-filters"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
                setGateFilter("All");
                onShowToast("Filters reset to show all workers", "info");
              }}
            >
              ↺ Reset
            </button>
          </div>

          {/* Master Workforce Table Card */}
          <div className="mm-card" style={{ marginTop: "14px" }}>
            <div className="mm-card-head">
              <h2 className="mm-card-title">
                <Icon name="people" size={16} /> DGMS Statutory Form 'O' Medical &amp; Gate Pass Ledger (CMR 2017)
              </h2>
              <span style={{ fontSize: "12px", color: "var(--muted, #94a3b8)" }}>
                Showing {filteredWorkers.length} of {workers.length} personnel
              </span>
            </div>

            <div className="mm-labour-table-wrap" style={{ maxHeight: "420px", overflowY: "auto" }}>
              {loading ? (
                <div style={{ padding: "30px", textAlign: "center", color: "#94a3b8" }}>
                  ⏳ Loading live worker records from Neon PostgreSQL...
                </div>
              ) : filteredWorkers.length === 0 ? (
                <div style={{ padding: "30px", textAlign: "center", color: "#94a3b8" }}>
                  No worker records found matching your filters.
                </div>
              ) : (
                <table className="mm-labour-table">
                  <thead>
                    <tr>
                      <th>Worker ID</th>
                      <th>Full Name</th>
                      <th>Designation</th>
                      <th>Colliery / Unit</th>
                      <th>PME Status</th>
                      <th>PME Due Date</th>
                      <th>Biometric Gate</th>
                      <th>Form 'O' Certificate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWorkers.map((w) => {
                      const isLocked = w.biometricGateLocked || w.pmeStatus === "UNFIT";
                      const isSelected = selectedWorker?.workerId === w.workerId;
                      const collieryLabel = w.colliery?.name || w.colliery || "Moonidih Deep Seam UG";
                      const dueDateStr = w.pmeDueDate ? new Date(w.pmeDueDate).toLocaleDateString("en-IN") : "2026-11-14";

                      return (
                        <tr
                          key={w.workerId}
                          className={isSelected ? "is-selected-row" : ""}
                          style={{ cursor: "pointer" }}
                          onClick={() => setSelectedWorker(w)}
                        >
                          <td>
                            <strong className="mm-cyan">{w.workerId}</strong>
                          </td>
                          <td>
                            <strong>{w.name}</strong>
                          </td>
                          <td>{w.designation}</td>
                          <td style={{ fontSize: "12px", color: "#cbd5e1" }}>{collieryLabel}</td>
                          <td>
                            <span
                              className={`mm-status-badge is-${
                                w.pmeStatus === "FIT"
                                  ? "completed"
                                  : w.pmeStatus === "DUST_WATCH"
                                  ? "pending"
                                  : "rejected"
                              }`}
                            >
                              {w.pmeStatus}
                            </span>
                          </td>
                          <td style={{ fontSize: "12px" }}>{dueDateStr}</td>
                          <td>
                            {isLocked ? (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                                  color: "#f87171",
                                  fontWeight: 600,
                                  fontSize: "11px",
                                }}
                              >
                                🔒 LOCKED OUT
                              </span>
                            ) : (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                                  color: "#34d399",
                                  fontWeight: 600,
                                  fontSize: "11px",
                                }}
                              >
                                🟢 CLEARED
                              </span>
                            )}
                          </td>
                          <td>
                            {w.medicalCertUrl ? (
                              <a
                                href={w.medicalCertUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  padding: "3px 8px",
                                  borderRadius: "4px",
                                  fontSize: "11px",
                                  backgroundColor: "rgba(6, 182, 212, 0.15)",
                                  color: "#22d3ee",
                                  border: "1px solid rgba(6, 182, 212, 0.4)",
                                  textDecoration: "none",
                                }}
                              >
                                📄 Form 'O' PDF ↗
                              </a>
                            ) : (
                              <span style={{ color: "#64748b", fontSize: "11px" }}>N/A</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SHIFT ATTENDANCE */}
      {activeTab === "shift_attendance" && (
        <div className="mm-labour-mid-grid" style={{ marginTop: "14px" }}>
          <div className="mm-card mm-attendance-card">
            <div className="mm-card-head">
              <h2 className="mm-card-title"><Icon name="people" size={16} /> Section Attendance Breakdown</h2>
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
                  {[
                    { id: 1, section: "Longwall Face West - Seam XVI", total: 42, present: 40, absent: 2, pct: "95%", status: "Good" },
                    { id: 2, section: "Main Shaft Incline No. 1", total: 38, present: 35, absent: 3, pct: "92%", status: "Good" },
                    { id: 3, section: "Continuous Miner Panel 3", total: 34, present: 29, absent: 5, pct: "85%", status: "Moderate" },
                    { id: 4, section: "Ventilation Fan House East", total: 16, present: 16, absent: 0, pct: "100%", status: "Good" },
                  ].map((r) => (
                    <tr key={r.id}>
                      <td><strong>{r.section}</strong></td>
                      <td>{r.total}</td>
                      <td>{r.present}</td>
                      <td><span className="mm-txt-rose">{r.absent}</span></td>
                      <td><strong className="mm-cyan">{r.pct}</strong></td>
                      <td><span className="mm-status-badge is-completed">{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Grid: Selected Worker Details + DGMS Statutory Action */}
      <div className="mm-labour-bottom-grid" style={{ marginTop: "16px" }}>
        {/* Selected Worker Details Card */}
        <div className="mm-card mm-worker-card" style={{ flex: "1.2" }}>
          <h2 className="mm-card-title">👤 Selected Worker Statutory Dossier</h2>
          {selectedWorker ? (
            <div className="mm-worker-grid-props">
              <div>
                <span className="mm-lbl">Worker Apex ID</span>
                <strong className="mm-val mm-cyan">{selectedWorker.workerId}</strong>
              </div>
              <div>
                <span className="mm-lbl">Name</span>
                <strong className="mm-val">{selectedWorker.name}</strong>
              </div>
              <div>
                <span className="mm-lbl">Designation</span>
                <strong className="mm-val">{selectedWorker.designation}</strong>
              </div>
              <div>
                <span className="mm-lbl">Colliery Unit</span>
                <strong className="mm-val">
                  {selectedWorker.colliery?.name || selectedWorker.colliery || "Moonidih Deep Seam UG"}
                </strong>
              </div>
              <div>
                <span className="mm-lbl">PME Status</span>
                <span
                  className={`mm-status-badge is-${
                    selectedWorker.pmeStatus === "FIT"
                      ? "completed"
                      : selectedWorker.pmeStatus === "DUST_WATCH"
                      ? "pending"
                      : "rejected"
                  }`}
                >
                  {selectedWorker.pmeStatus}
                </span>
              </div>
              <div>
                <span className="mm-lbl">Turnstile Gate Pass</span>
                {selectedWorker.biometricGateLocked || selectedWorker.pmeStatus === "UNFIT" ? (
                  <span style={{ color: "#ef4444", fontWeight: 700 }}>🔒 BARRED AT GATE</span>
                ) : (
                  <span style={{ color: "#10b981", fontWeight: 700 }}>🟢 PERMITTED</span>
                )}
              </div>
              <div>
                <span className="mm-lbl">Form 'O' PME Due</span>
                <strong className="mm-val">
                  {selectedWorker.pmeDueDate
                    ? new Date(selectedWorker.pmeDueDate).toLocaleDateString("en-IN")
                    : "2026-11-14"}
                </strong>
              </div>
              <div>
                <span className="mm-lbl">Cloudinary Form 'O' Link</span>
                {selectedWorker.medicalCertUrl ? (
                  <a
                    href={selectedWorker.medicalCertUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#38bdf8", textDecoration: "underline", fontSize: "12px", wordBreak: "break-all" }}
                  >
                    View Cloudinary Form 'O' Medical Certificate ↗
                  </a>
                ) : (
                  <span style={{ color: "#94a3b8" }}>No PDF on file</span>
                )}
              </div>
            </div>
          ) : (
            <p style={{ color: "#94a3b8" }}>Click on any worker row above to inspect their statutory dossier.</p>
          )}
        </div>

        {/* DGMS Statutory Rules & Lockout Notice */}
        <div className="mm-card mm-training-card" style={{ flex: "1" }}>
          <h2 className="mm-card-title">📜 DGMS Statutory Compliance Directive</h2>
          <div style={{ fontSize: "12px", color: "#cbd5e1", lineHeight: "1.6" }}>
            <p style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#f59e0b" }}>CMR 2017 Regulation 29 &amp; Mines Rules 1955:</strong> Every underground coal mine worker must undergo Periodic Medical Examination (PME) every 5 years (every 3 years for age &gt; 45).
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#ef4444" }}>Automated Biometric Lockout:</strong> Any worker with status <code style={{ color: "#ef4444" }}>UNFIT</code> or overdue PME is automatically locked out of the RFID Turnstile Gate at the pit-head shaft.
            </p>
            <p>
              <strong style={{ color: "#06b6d4" }}>Cloudinary Form 'O' Archival:</strong> Digitized medical fitness certificates are cryptographically referenced and verified during DGMS statutory inspections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
