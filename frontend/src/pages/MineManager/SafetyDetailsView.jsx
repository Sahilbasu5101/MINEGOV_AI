import { useState, useEffect } from "react";
import Icon from "./Icons";
import { api } from "../../services/api";
import fallbackSafety from "../../data/safetyNoticesData.json";
import "./MineManagerDashboard.css";

export function SafetyDetailsView({ onShowToast, onClose }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiveDb, setIsLiveDb] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    async function loadNotices() {
      try {
        setLoading(true);
        const res = await api.getMineSafetyNotices("all");
        if (res?.status === "SUCCESS" && res?.notices?.length > 0) {
          setNotices(res.notices);
          setSelectedNotice(res.notices[0]);
          setIsLiveDb(true);
        } else {
          throw new Error("Empty safety DB response");
        }
      } catch (err) {
        console.warn("Using offline master safety notices:", err.message);
        const fallbackList = fallbackSafety.safetyNotices || [];
        setNotices(fallbackList);
        setSelectedNotice(fallbackList[0]);
        setIsLiveDb(false);
      } finally {
        setLoading(false);
      }
    }
    loadNotices();
  }, []);

  // Filter notices
  const filteredNotices = notices.filter((n) => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      !q ||
      n.noticeId?.toLowerCase().includes(q) ||
      n.regulation?.toLowerCase().includes(q) ||
      n.parameter?.toLowerCase().includes(q) ||
      n.colliery?.name?.toLowerCase().includes(q) ||
      n.collieryName?.toLowerCase().includes(q);

    const matchSeverity =
      severityFilter === "All" || n.severity?.toUpperCase() === severityFilter.toUpperCase();

    const matchStatus =
      statusFilter === "All" || n.status?.toUpperCase() === statusFilter.toUpperCase();

    return matchQuery && matchSeverity && matchStatus;
  });

  // KPIs
  const totalCount = notices.length;
  const criticalCount = notices.filter((n) => n.severity === "CRITICAL" || n.severity === "HIGH").length;
  const activeCount = notices.filter((n) => n.status === "ACTIVE").length;
  const resolvedCount = notices.filter((n) => n.status === "RESOLVED" || n.status === "EXECUTED").length;

  return (
    <div className="mm-safety-details-view">
      {/* Top Header */}
      <div className="mm-env-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 className="mm-env-title">DGMS Statutory Safety &amp; Inquiries Desk</h1>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: "12px",
                backgroundColor: isLiveDb ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                color: isLiveDb ? "#10b981" : "#f59e0b",
                border: `1px solid ${isLiveDb ? "#10b981" : "#f59e0b"}`,
              }}
            >
              {isLiveDb ? "⚡ Live Neon PostgreSQL Connected" : "📦 Cached Master Records"}
            </span>
          </div>
          <p className="mm-env-sub">
            Statutory Violations, Section 22 Stop-Work Orders, CMR 2017 Regulatory Compliance &amp; Cloudinary Photogrammetric Evidence.
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
            onClick={() => onShowToast(`Exported DGMS Violation Dossier (${notices.length} Notices) to PDF`, "success")}
          >
            📥 Export Statutory Notice Dossier
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mm-env-filter-bar">
        <div style={{ flex: "1" }}>
          <label>Search Regulation / Colliery / Finding</label>
          <input
            type="text"
            placeholder="Search by Notice ID, CMR Regulation, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "6px 10px", borderRadius: "4px", border: "1px solid #475569", background: "#0f172a", color: "#fff" }}
          />
        </div>

        <div>
          <label>Severity Level</label>
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
            <option value="All">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="WATCH">Watch / Moderate</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <div>
          <label>Statutory Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="ACTIVE">ACTIVE (Open Order)</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="EXECUTED">EXECUTED (Stop-Work)</option>
          </select>
        </div>

        <button
          type="button"
          className="mm-btn-apply-filters"
          onClick={() => {
            setSearchQuery("");
            setSeverityFilter("All");
            setStatusFilter("All");
            onShowToast("Filters reset to show all statutory notices", "info");
          }}
        >
          ↺ Reset
        </button>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="mm-env-kpis-row">
        <div className="mm-env-kpi-card is-green">
          <div className="mm-ekpi-icon">🛡️</div>
          <div>
            <strong className="mm-ekpi-num">{totalCount}</strong>
            <span className="mm-ekpi-lbl">Total Statutory Notices</span>
            <small className="mm-ekpi-sub">DGMS Eastern &amp; Central Zones</small>
          </div>
        </div>

        <div className="mm-env-kpi-card is-rose">
          <div className="mm-ekpi-icon">⚠️</div>
          <div>
            <strong className="mm-ekpi-num">{criticalCount}</strong>
            <span className="mm-ekpi-lbl">Critical / High Violations</span>
            <small className="mm-ekpi-sub is-rose">CMR Section 22 Action Required</small>
          </div>
        </div>

        <div className="mm-env-kpi-card is-amber">
          <div className="mm-ekpi-icon">📋</div>
          <div>
            <strong className="mm-ekpi-num">{activeCount}</strong>
            <span className="mm-ekpi-lbl">Active Regulatory Orders</span>
            <small className="mm-ekpi-sub is-amber">Pending Statutory Compliance</small>
          </div>
        </div>

        <div className="mm-env-kpi-card is-blue">
          <div className="mm-ekpi-icon">✅</div>
          <div>
            <strong className="mm-ekpi-num">{resolvedCount}</strong>
            <span className="mm-ekpi-lbl">Executed / Rectified</span>
            <small className="mm-ekpi-sub">Cleared by Inspector</small>
          </div>
        </div>
      </div>

      {/* Master DGMS Safety Notices Table */}
      <div className="mm-card" style={{ marginTop: "14px" }}>
        <div className="mm-card-head">
          <h2 className="mm-card-title">
            <Icon name="warning" size={16} /> DGMS Statutory Violation Tracker &amp; Legal Notices
          </h2>
          <span style={{ fontSize: "12px", color: "var(--muted, #94a3b8)" }}>
            Showing {filteredNotices.length} of {notices.length} statutory notices
          </span>
        </div>

        <div className="mm-env-table-wrap" style={{ maxHeight: "380px", overflowY: "auto" }}>
          {loading ? (
            <div style={{ padding: "30px", textAlign: "center", color: "#94a3b8" }}>
              ⏳ Fetching live statutory notices from Neon PostgreSQL...
            </div>
          ) : filteredNotices.length === 0 ? (
            <div style={{ padding: "30px", textAlign: "center", color: "#94a3b8" }}>
              No statutory notices found matching your criteria.
            </div>
          ) : (
            <table className="mm-env-table">
              <thead>
                <tr>
                  <th>Notice ID</th>
                  <th>Colliery / Unit</th>
                  <th>Regulation Breached</th>
                  <th>Parameter / Finding</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Cloudinary Evidence</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotices.map((n) => {
                  const isSelected = selectedNotice?.noticeId === n.noticeId;
                  const collieryName = n.colliery?.name || n.collieryName || "Moonidih UG Seam XVI";
                  const sev = n.severity?.toUpperCase() || "HIGH";

                  return (
                    <tr
                      key={n.noticeId}
                      className={isSelected ? "is-selected-row" : ""}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedNotice(n)}
                    >
                      <td>
                        <strong className="mm-cyan">{n.noticeId}</strong>
                      </td>
                      <td style={{ fontSize: "12px" }}>{collieryName}</td>
                      <td>
                        <strong style={{ color: "#f87171" }}>{n.regulation}</strong>
                      </td>
                      <td style={{ fontSize: "12px", maxWidth: "240px" }}>{n.parameter}</td>
                      <td>
                        <span
                          className={`mm-status-badge is-${
                            sev === "CRITICAL" ? "rejected" : sev === "HIGH" ? "rejected" : "pending"
                          }`}
                        >
                          {sev}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`mm-status-badge is-${
                            n.status === "ACTIVE" ? "pending" : "completed"
                          }`}
                        >
                          {n.status}
                        </span>
                      </td>
                      <td>
                        {n.evidenceUrl ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewImage(n.evidenceUrl);
                            }}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              fontSize: "11px",
                              backgroundColor: "rgba(6, 182, 212, 0.15)",
                              color: "#22d3ee",
                              border: "1px solid rgba(6, 182, 212, 0.4)",
                              cursor: "pointer",
                            }}
                          >
                            📷 View Photo
                          </button>
                        ) : (
                          <span style={{ color: "#64748b", fontSize: "11px" }}>None</span>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="mm-btn-table-view"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedNotice(n);
                            onShowToast(`Selected statutory dossier ${n.noticeId}`, "info");
                          }}
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Bottom Grid: Selected Notice Dossier + Statutory Evidence Photo + Legal Actions */}
      <div className="mm-env-bottom-grid" style={{ marginTop: "16px" }}>
        {/* Selected Safety Issue Details */}
        <div className="mm-card mm-selected-issue-card" style={{ flex: "1.4" }}>
          <h2 className="mm-card-title">⚖️ Statutory Violation Dossier &amp; Evidence</h2>
          {selectedNotice ? (
            <div className="mm-issue-content">
              <div className="mm-issue-props">
                <div>
                  <span className="mm-lbl">Notice ID</span>
                  <strong className="mm-val mm-cyan">{selectedNotice.noticeId}</strong>
                </div>
                <div>
                  <span className="mm-lbl">CMR Statutory Regulation</span>
                  <strong className="mm-val" style={{ color: "#f87171" }}>
                    {selectedNotice.regulation}
                  </strong>
                </div>
                <div>
                  <span className="mm-lbl">Colliery Location</span>
                  <strong className="mm-val">
                    {selectedNotice.colliery?.name || selectedNotice.collieryName || "Moonidih Deep Seam UG"}
                  </strong>
                </div>
                <div>
                  <span className="mm-lbl">Severity &amp; Status</span>
                  <span className="mm-status-badge is-rejected">
                    {selectedNotice.severity} · {selectedNotice.status}
                  </span>
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <span className="mm-lbl">Mandatory Statutory Directive</span>
                  <strong className="mm-val" style={{ color: "#f59e0b" }}>
                    {selectedNotice.statutoryAction || "Immediate cessation of operations under Section 22(1) until rectified."}
                  </strong>
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <span className="mm-lbl">Regulatory Finding / Parameter</span>
                  <p style={{ margin: "4px 0", fontSize: "12px", color: "#cbd5e1" }}>
                    {selectedNotice.parameter}
                  </p>
                </div>
              </div>

              {/* Cloudinary Evidence Inline Preview */}
              <div className="mm-evidence-box" style={{ marginTop: "12px" }}>
                <span className="mm-lbl">Cloudinary Verified Photographic Evidence</span>
                {selectedNotice.evidenceUrl ? (
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "6px" }}>
                    <img
                      src={selectedNotice.evidenceUrl}
                      alt="DGMS Evidence"
                      style={{
                        width: "140px",
                        height: "90px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid #475569",
                        cursor: "pointer",
                      }}
                      onClick={() => setPreviewImage(selectedNotice.evidenceUrl)}
                    />
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                      <p><strong>Cloudinary CDN URL:</strong></p>
                      <a
                        href={selectedNotice.evidenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#38bdf8", wordBreak: "break-all", textDecoration: "underline" }}
                      >
                        {selectedNotice.evidenceUrl}
                      </a>
                      <p style={{ marginTop: "4px" }}>Click photo to expand high-resolution statutory inspection capture.</p>
                    </div>
                  </div>
                ) : (
                  <p style={{ fontSize: "11px", color: "#64748b" }}>No photographic evidence attached to this notice.</p>
                )}
              </div>
            </div>
          ) : (
            <p style={{ color: "#94a3b8" }}>Select any statutory notice from the table above.</p>
          )}
        </div>

        {/* Legal Action & Remediation Controls */}
        <div className="mm-card mm-compliance-card" style={{ flex: "1" }}>
          <h2 className="mm-card-title">📌 Mine Manager Statutory Response</h2>
          <div className="mm-compliance-details" style={{ fontSize: "12px" }}>
            <div>
              <span className="mm-lbl">Statutory Role Required</span>
              <strong>First Class Mine Manager (CMR Reg 27)</strong>
            </div>
            <div>
              <span className="mm-lbl">Action Protocol</span>
              <strong>Issue Form VI Work Rectification Notice</strong>
            </div>
            <div>
              <span className="mm-lbl">DGMS Inspector Contact</span>
              <span className="mm-cyan">dgms.dhanbad@dgms.gov.in</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "14px" }}>
            <button
              type="button"
              className="mm-btn-action-primary"
              onClick={() => onShowToast(`Section 22 Rectification Plan submitted for ${selectedNotice?.noticeId}`, "success")}
            >
              ✓ Submit Rectification &amp; Form VI
            </button>
            <button
              type="button"
              className="mm-btn-action-secondary"
              onClick={() => onShowToast("Dispatched Emergency Ventilation Crew", "info")}
            >
              🛠️ Dispatch Emergency Safety Crew
            </button>
            <button
              type="button"
              className="mm-btn-action-danger"
              onClick={() => onShowToast(`Escalated ${selectedNotice?.noticeId} to CMD BCCL & Chairman CIL`, "warning")}
            >
              ⚠️ Escalate to Subsidiary CMD
            </button>
          </div>
        </div>
      </div>

      {/* Modal for full-resolution photographic preview */}
      {previewImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setPreviewImage(null)}
        >
          <div style={{ maxWidth: "800px", maxHeight: "80vh", position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <img
              src={previewImage}
              alt="Full Resolution Evidence"
              style={{ width: "100%", maxHeight: "75vh", objectFit: "contain", borderRadius: "8px", border: "2px solid #06b6d4" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
              <span style={{ color: "#e2e8f0", fontSize: "12px" }}>DGMS Photogrammetric Forensic Capture · Cloudinary CDN</span>
              <button
                type="button"
                className="mm-btn-outline"
                onClick={() => setPreviewImage(null)}
                style={{ background: "#ef4444", color: "#fff", borderColor: "#ef4444" }}
              >
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
