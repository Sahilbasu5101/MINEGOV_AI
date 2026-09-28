import { useState, useEffect } from "react";
import Icon from "./Icons";
import { api } from "../../services/api";
import fallbackAfforestation from "../../data/afforestationData.json";
import "./MineManagerDashboard.css";

const envReadingsData = [
  { id: 1, time: "11 Sep 2026, 10:24", param: "Air Quality (AQI)", section: "Moonidih Pit-Head", val: 42, unit: "-", limit: "< 50", status: "Good" },
  { id: 2, time: "11 Sep 2026, 09:15", param: "Dust (PM10)", section: "Coal Handling Plant (CHP)", val: 56, unit: "µg/m³", limit: "< 100", status: "Normal" },
  { id: 3, time: "10 Sep 2026, 18:40", param: "Noise Level", section: "Main Shaft Hoist Room", val: 82, unit: "dB", limit: "< 85", status: "Moderate" },
  { id: 4, time: "10 Sep 2026, 12:10", param: "Water pH", section: "Mine Effluent Discharge", val: 7.2, unit: "pH", limit: "6.5 - 8.5", status: "Good" },
  { id: 5, time: "09 Sep 2026, 16:55", param: "SO2", section: "Thermal Power Boundary", val: 0.12, unit: "ppm", limit: "< 0.30", status: "Good" },
  { id: 6, time: "09 Sep 2026, 11:30", param: "NO2", section: "Katras Haul Road Ramp", val: 0.34, unit: "ppm", limit: "< 0.30", status: "High" },
  { id: 7, time: "08 Sep 2026, 14:20", param: "CO Level", section: "Return Airway No. 2", val: 8, unit: "ppm", limit: "< 10", status: "Good" },
];

export function EnvironmentDetailsView({ onShowToast, onClose }) {
  const [affRecords, setAffRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiveDb, setIsLiveDb] = useState(false);
  const [activeTab, setActiveTab] = useState("afforestation"); // "afforestation" | "ocems"
  const [searchQuery, setSearchQuery] = useState("");
  const [subsidiaryFilter, setSubsidiaryFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [previewDronePhoto, setPreviewDronePhoto] = useState(null);

  useEffect(() => {
    async function loadAfforestation() {
      try {
        setLoading(true);
        const res = await api.getMineAfforestation("all");
        if (res?.status === "SUCCESS" && res?.records?.length > 0) {
          setAffRecords(res.records);
          setSelectedRecord(res.records[0]);
          setIsLiveDb(true);
        } else {
          throw new Error("Empty afforestation DB response");
        }
      } catch (err) {
        console.warn("Using offline master afforestation records:", err.message);
        const fallbackList = fallbackAfforestation.records || [];
        setAffRecords(fallbackList);
        setSelectedRecord(fallbackList[0]);
        setIsLiveDb(false);
      } finally {
        setLoading(false);
      }
    }
    loadAfforestation();
  }, []);

  // Filter records
  const filteredAff = affRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      !q ||
      r.areaOrDumpName?.toLowerCase().includes(q) ||
      r.subsidiary?.code?.toLowerCase().includes(q) ||
      (typeof r.subsidiary === "string" && r.subsidiary.toLowerCase().includes(q));

    const subCode = r.subsidiary?.code || r.subsidiary || "BCCL";
    const matchSub = subsidiaryFilter === "All" || subCode === subsidiaryFilter;

    return matchQuery && matchSub;
  });

  // KPI calculations
  const totalTargetHa = affRecords.reduce((acc, curr) => acc + (Number(curr.targetHa) || 0), 0);
  const totalAchievedHa = affRecords.reduce((acc, curr) => acc + (Number(curr.achievedHa) || 0), 0);
  const avgDensity = "0.38 (Moderate Dense)";

  return (
    <div className="mm-env-details-view">
      {/* Top Header */}
      <div className="mm-env-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 className="mm-env-title">Environmental Compliance &amp; Ecological Restoration</h1>
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
            CPCB Continuous OCEMS Telemetry, Overburden Dump Bio-Reclamation, and Cloudinary Drone Orthomosaic Surveys.
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
            onClick={() => onShowToast(`Exported Environmental Restoration Audit (${affRecords.length} Dumps) to PDF`, "success")}
          >
            📥 Export Restoration Report
          </button>
        </div>
      </div>

      {/* Top 4 KPI Summary Cards */}
      <div className="mm-env-kpis-row">
        <div className="mm-env-kpi-card is-green">
          <div className="mm-ekpi-icon">🌲</div>
          <div>
            <strong className="mm-ekpi-num">{totalAchievedHa.toFixed(1)} Ha</strong>
            <span className="mm-ekpi-lbl">Total Bio-Reclaimed Area</span>
            <small className="mm-ekpi-sub">Target: {totalTargetHa.toFixed(1)} Ha (92% achieved)</small>
          </div>
        </div>

        <div className="mm-env-kpi-card is-cyan">
          <div className="mm-ekpi-icon">🛰️</div>
          <div>
            <strong className="mm-ekpi-num">{affRecords.length}</strong>
            <span className="mm-ekpi-lbl">Drone Surveyed Dumps</span>
            <small className="mm-ekpi-sub">Cloudinary Verified Orthomosaics</small>
          </div>
        </div>

        <div className="mm-env-kpi-card is-blue">
          <div className="mm-ekpi-icon">📊</div>
          <div>
            <strong className="mm-ekpi-num">{avgDensity}</strong>
            <span className="mm-ekpi-lbl">Mean Canopy Density</span>
            <small className="mm-ekpi-sub">CMPDIL Remote Sensing Standard</small>
          </div>
        </div>

        <div className="mm-env-kpi-card is-amber">
          <div className="mm-ekpi-icon">🍃</div>
          <div>
            <strong className="mm-ekpi-num">42 AQI</strong>
            <span className="mm-ekpi-lbl">Ambient Air Quality</span>
            <small className="mm-ekpi-sub">Within CPCB National Norms</small>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--line, #334155)", paddingBottom: "10px", marginTop: "12px" }}>
        <button
          type="button"
          className={`mm-btn-outline ${activeTab === "afforestation" ? "is-selected-tab" : ""}`}
          style={{
            backgroundColor: activeTab === "afforestation" ? "var(--cyan, #06b6d4)" : "transparent",
            color: activeTab === "afforestation" ? "#000" : "inherit",
            fontWeight: activeTab === "afforestation" ? "700" : "500",
          }}
          onClick={() => setActiveTab("afforestation")}
        >
          🌲 Bio-Reclamation &amp; Drone Surveys ({filteredAff.length} Records)
        </button>
        <button
          type="button"
          className={`mm-btn-outline ${activeTab === "ocems" ? "is-selected-tab" : ""}`}
          style={{
            backgroundColor: activeTab === "ocems" ? "var(--cyan, #06b6d4)" : "transparent",
            color: activeTab === "ocems" ? "#000" : "inherit",
            fontWeight: activeTab === "ocems" ? "700" : "500",
          }}
          onClick={() => setActiveTab("ocems")}
        >
          💨 Continuous OCEMS SCADA Telemetry (CPCB Portal)
        </button>
      </div>

      {/* TAB 1: AFFORESTATION & DRONE SURVEYS */}
      {activeTab === "afforestation" && (
        <div style={{ marginTop: "14px" }}>
          {/* Filter Bar */}
          <div className="mm-env-filter-bar">
            <div style={{ flex: "1" }}>
              <label>Search Dump / Area Name</label>
              <input
                type="text"
                placeholder="Search by overburden dump, colliery or subsidiary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", padding: "6px 10px", borderRadius: "4px", border: "1px solid #475569", background: "#0f172a", color: "#fff" }}
              />
            </div>

            <div>
              <label>Subsidiary</label>
              <select value={subsidiaryFilter} onChange={(e) => setSubsidiaryFilter(e.target.value)}>
                <option value="All">All Subsidiaries</option>
                <option value="BCCL">BCCL (Dhanbad)</option>
                <option value="CCL">CCL (Ranchi)</option>
                <option value="ECL">ECL (Sanctoria)</option>
                <option value="WCL">WCL (Nagpur)</option>
                <option value="SECL">SECL (Bilaspur)</option>
                <option value="MCL">M MCL (Sambalpur)</option>
                <option value="NCL">NCL (Singrauli)</option>
              </select>
            </div>

            <button
              type="button"
              className="mm-btn-apply-filters"
              onClick={() => {
                setSearchQuery("");
                setSubsidiaryFilter("All");
                onShowToast("Filters reset to show all afforestation dumps", "info");
              }}
            >
              ↺ Reset
            </button>
          </div>

          {/* Master Afforestation Table */}
          <div className="mm-card" style={{ marginTop: "14px" }}>
            <div className="mm-card-head">
              <h2 className="mm-card-title">
                <Icon name="leaf" size={16} /> Statutory Overburden Plantation &amp; Bio-Reclamation Ledger
              </h2>
              <span style={{ fontSize: "12px", color: "var(--muted, #94a3b8)" }}>
                Showing {filteredAff.length} of {affRecords.length} reclamation sites
              </span>
            </div>

            <div className="mm-env-table-wrap" style={{ maxHeight: "380px", overflowY: "auto" }}>
              {loading ? (
                <div style={{ padding: "30px", textAlign: "center", color: "#94a3b8" }}>
                  ⏳ Loading live bio-reclamation data from Neon PostgreSQL...
                </div>
              ) : filteredAff.length === 0 ? (
                <div style={{ padding: "30px", textAlign: "center", color: "#94a3b8" }}>
                  No afforestation records found matching your filters.
                </div>
              ) : (
                <table className="mm-env-table">
                  <thead>
                    <tr>
                      <th>Subsidiary</th>
                      <th>Area / Overburden Dump Name</th>
                      <th>Fiscal Year</th>
                      <th>Target (Ha)</th>
                      <th>Achieved (Ha)</th>
                      <th>Canopy Density</th>
                      <th>Drone Survey</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAff.map((rec, idx) => {
                      const subCode = rec.subsidiary?.code || rec.subsidiary || "BCCL";
                      const isSelected = selectedRecord?.areaOrDumpName === rec.areaOrDumpName;
                      const pct = rec.targetHa > 0 ? Math.round((rec.achievedHa / rec.targetHa) * 100) : 100;

                      return (
                        <tr
                          key={rec.id || idx}
                          className={isSelected ? "is-selected-row" : ""}
                          style={{ cursor: "pointer" }}
                          onClick={() => setSelectedRecord(rec)}
                        >
                          <td>
                            <strong className="mm-cyan">{subCode}</strong>
                          </td>
                          <td>
                            <strong>{rec.areaOrDumpName}</strong>
                          </td>
                          <td>{rec.fiscalYear || "2025-26"}</td>
                          <td>{rec.targetHa} Ha</td>
                          <td>
                            <span style={{ color: pct >= 90 ? "#34d399" : "#fbbf24", fontWeight: 700 }}>
                              {rec.achievedHa} Ha ({pct}%)
                            </span>
                          </td>
                          <td style={{ fontSize: "12px" }}>{rec.canopyDensity || "0.35 - Moderate"}</td>
                          <td>
                            {rec.droneSurveyUrl ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewDronePhoto(rec.droneSurveyUrl);
                                }}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  fontSize: "11px",
                                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                                  color: "#34d399",
                                  border: "1px solid rgba(16, 185, 129, 0.4)",
                                  cursor: "pointer",
                                }}
                              >
                                🛰️ Drone Photo
                              </button>
                            ) : (
                              <span style={{ color: "#64748b", fontSize: "11px" }}>N/A</span>
                            )}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="mm-btn-table-view"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRecord(rec);
                                onShowToast(`Inspecting ${rec.areaOrDumpName}`, "info");
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

          {/* Selected Bio-Reclamation Dump Details + Cloudinary Drone Photo */}
          <div className="mm-env-bottom-grid" style={{ marginTop: "16px" }}>
            <div className="mm-card mm-selected-issue-card" style={{ flex: "1.4" }}>
              <h2 className="mm-card-title">🌱 Selected Reclamation Dump Dossier</h2>
              {selectedRecord ? (
                <div className="mm-issue-content">
                  <div className="mm-issue-props">
                    <div>
                      <span className="mm-lbl">Overburden Dump Site</span>
                      <strong className="mm-val mm-cyan">{selectedRecord.areaOrDumpName}</strong>
                    </div>
                    <div>
                      <span className="mm-lbl">Subsidiary &amp; Fiscal Year</span>
                      <strong className="mm-val">
                        {selectedRecord.subsidiary?.code || selectedRecord.subsidiary || "BCCL"} · {selectedRecord.fiscalYear || "2025-26"}
                      </strong>
                    </div>
                    <div>
                      <span className="mm-lbl">Afforestation Target</span>
                      <strong className="mm-val">{selectedRecord.targetHa} Hectares</strong>
                    </div>
                    <div>
                      <span className="mm-lbl">Achieved Bio-Reclamation</span>
                      <strong className="mm-val" style={{ color: "#34d399" }}>
                        {selectedRecord.achievedHa} Hectares
                      </strong>
                    </div>
                    <div>
                      <span className="mm-lbl">Canopy Density Factor</span>
                      <span className="mm-status-badge is-completed">{selectedRecord.canopyDensity}</span>
                    </div>
                    <div>
                      <span className="mm-lbl">Statutory Authority</span>
                      <strong className="mm-val">Ministry of Coal &amp; CPCB Eco-Restoration Cell</strong>
                    </div>
                  </div>

                  {/* Drone Survey Cloudinary Preview */}
                  <div className="mm-evidence-box" style={{ marginTop: "12px" }}>
                    <span className="mm-lbl">High-Resolution Drone Orthomosaic Survey</span>
                    {selectedRecord.droneSurveyUrl ? (
                      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "6px" }}>
                        <img
                          src={selectedRecord.droneSurveyUrl}
                          alt="Drone Survey"
                          style={{
                            width: "160px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            border: "1px solid #475569",
                            cursor: "pointer",
                          }}
                          onClick={() => setPreviewDronePhoto(selectedRecord.droneSurveyUrl)}
                        />
                        <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                          <p><strong>Cloudinary Drone Survey Link:</strong></p>
                          <a
                            href={selectedRecord.droneSurveyUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#38bdf8", wordBreak: "break-all", textDecoration: "underline" }}
                          >
                            {selectedRecord.droneSurveyUrl}
                          </a>
                          <p style={{ marginTop: "4px" }}>Click image to examine plantation density and contour terraces.</p>
                        </div>
                      </div>
                    ) : (
                      <p style={{ fontSize: "11px", color: "#64748b" }}>No drone survey linked to this dump.</p>
                    )}
                  </div>
                </div>
              ) : (
                <p style={{ color: "#94a3b8" }}>Select a reclamation record above.</p>
              )}
            </div>

            {/* Statutory Directive Card */}
            <div className="mm-card mm-compliance-card" style={{ flex: "1" }}>
              <h2 className="mm-card-title">📜 Environmental Statutory Directives</h2>
              <div style={{ fontSize: "12px", color: "#cbd5e1", lineHeight: "1.6" }}>
                <p style={{ marginBottom: "8px" }}>
                  <strong style={{ color: "#10b981" }}>Mines &amp; Minerals Act &amp; CIL Eco-Charter:</strong> All opencast overburden dumps must undergo three-tier biological reclamation (grass cover, shrubs, and native trees) within 3 years of de-coaling.
                </p>
                <p style={{ marginBottom: "8px" }}>
                  <strong style={{ color: "#06b6d4" }}>CMPDIL Satellite &amp; Drone Auditing:</strong> Periodic photogrammetry verifies canopy density &gt; 0.4 before environmental clearance renewal.
                </p>
                <button
                  type="button"
                  className="mm-btn-save-main"
                  style={{ width: "100%", marginTop: "12px" }}
                  onClick={() => onShowToast(`Initiated Drone Re-survey flight schedule for ${selectedRecord?.areaOrDumpName}`, "success")}
                >
                  🛸 Schedule Automated Drone Survey
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OCEMS SCADA READINGS */}
      {activeTab === "ocems" && (
        <div style={{ marginTop: "14px" }}>
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
                <span>Water Discharge (pH)</span>
                <small className="mm-txt-green">Normal (6.5 - 8.5)</small>
              </div>
              <div className="mm-param-val-row">
                <strong className="mm-param-num">7.2</strong>
                <span className="mm-status-pill is-running">Compliant</span>
              </div>
            </div>

            <div className="mm-param-card">
              <div className="mm-param-head">
                <span>Noise Level (Main Shaft)</span>
                <small className="mm-txt-rose">Near Threshold</small>
              </div>
              <div className="mm-param-val-row">
                <strong className="mm-param-num">82 dB</strong>
                <span className="mm-status-pill is-idle">Moderate</span>
              </div>
            </div>

            <div className="mm-param-card">
              <div className="mm-param-head">
                <span>Dust (PM10)</span>
                <small className="mm-txt-green">Sprinklers Active</small>
              </div>
              <div className="mm-param-val-row">
                <strong className="mm-param-num">56 µg/m³</strong>
                <span className="mm-status-pill is-running">Normal</span>
              </div>
            </div>
          </div>

          {/* Readings Table */}
          <div className="mm-card" style={{ marginTop: "14px" }}>
            <div className="mm-card-head">
              <h2 className="mm-card-title"><Icon name="leaf" size={16} /> CPCB Online Continuous Emission Monitoring (OCEMS)</h2>
            </div>
            <div className="mm-env-table-wrap">
              <table className="mm-env-table">
                <thead>
                  <tr>
                    <th>Date &amp; Time</th>
                    <th>Parameter</th>
                    <th>Section / Sensor Station</th>
                    <th>Reading</th>
                    <th>Unit</th>
                    <th>Permissible Limit</th>
                    <th>Compliance</th>
                  </tr>
                </thead>
                <tbody>
                  {envReadingsData.map((row) => (
                    <tr key={row.id}>
                      <td className="mm-time-cell">{row.time}</td>
                      <td><strong>{row.param}</strong></td>
                      <td>{row.section}</td>
                      <td><strong className="mm-cyan">{row.val}</strong></td>
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
        </div>
      )}

      {/* Modal for Drone Survey photo preview */}
      {previewDronePhoto && (
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
          onClick={() => setPreviewDronePhoto(null)}
        >
          <div style={{ maxWidth: "800px", maxHeight: "80vh", position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <img
              src={previewDronePhoto}
              alt="Full Resolution Drone Survey"
              style={{ width: "100%", maxHeight: "75vh", objectFit: "contain", borderRadius: "8px", border: "2px solid #10b981" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
              <span style={{ color: "#e2e8f0", fontSize: "12px" }}>Overburden Bio-Reclamation Drone Survey · Cloudinary CDN</span>
              <button
                type="button"
                className="mm-btn-outline"
                onClick={() => setPreviewDronePhoto(null)}
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
