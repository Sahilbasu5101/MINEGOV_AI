import { useState, useEffect } from "react";
import Icon from "./Icons";
import { MineMap } from "../../views/components/MineMap";
import { api } from "../../services/api";
import fallbackHazardMaps from "../../data/hazardMapsData.json";
import "./MineManagerDashboard.css";

const assetsList = [
  { id: "HT-07", type: "Haul Truck", status: "Moving", location: "East Pit", speed: "32 km/h", fuel: "78%", operator: "Ravi Singh", updated: "11 Sep 2026, 10:29 AM" },
  { id: "EX-12", type: "Excavator", status: "Active", location: "West Pit", speed: "0 km/h", fuel: "64%", operator: "Vikram R.", updated: "11 Sep 2026, 10:28 AM" },
  { id: "DR-03", type: "Heavy Drill", status: "Active", location: "Main Pit", speed: "2 km/h", fuel: "91%", operator: "Amit S.", updated: "11 Sep 2026, 10:25 AM" },
  { id: "LD-05", type: "Wheel Loader", status: "Caution", location: "Workshop", speed: "0 km/h", fuel: "40%", operator: "Unassigned", updated: "11 Sep 2026, 10:20 AM" },
  { id: "AQ-01", type: "Air Sensor", status: "Normal", location: "South Ramp", speed: "N/A", fuel: "Solar", operator: "Automated", updated: "11 Sep 2026, 10:30 AM" },
];

export function MineMapView({ onShowToast, onOpenSection }) {
  const [collieries, setCollieries] = useState([]);
  const [selectedColliery, setSelectedColliery] = useState(null);
  const [viewMode, setViewMode] = useState("blueprint"); // "blueprint" | "interactive"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(assetsList[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiveDb, setIsLiveDb] = useState(false);

  const [layers, setLayers] = useState({
    sections: true,
    equipment: true,
    workers: true,
    sensors: true,
    riskZones: true,
    haulRoads: true,
  });

  useEffect(() => {
    async function loadCollieries() {
      try {
        const res = await api.getCollieriesList();
        if (res?.status === "SUCCESS" && res?.collieries?.length > 0) {
          setCollieries(res.collieries);
          setSelectedColliery(res.collieries[0]);
          setIsLiveDb(true);
        } else {
          throw new Error("Empty collieries from API");
        }
      } catch (err) {
        console.warn("Using offline master hazard maps:", err.message);
        const fallbackList = fallbackHazardMaps.collieryHazardMaps || [];
        setCollieries(fallbackList);
        setSelectedColliery(fallbackList[0]);
        setIsLiveDb(false);
      }
    }
    loadCollieries();
  }, []);

  const toggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetView = () => {
    setSearchQuery("");
    setSelectedAsset(assetsList[0]);
    if (collieries.length > 0) setSelectedColliery(collieries[0]);
    onShowToast("Map view reset to default center.", "info");
  };

  const currentHazardMapUrl =
    selectedColliery?.hazardMapUrl ||
    "https://res.cloudinary.com/fcndk1bh/image/upload/v1789737866/minegov_ai/hazard_maps/moonidih_underground_ventilation_schematic_v2.png";

  const collieryName = selectedColliery?.name || selectedColliery?.collieryName || "Moonidih Colliery (Underground)";
  const subsidiaryCode =
    selectedColliery?.area?.subsidiary?.code || selectedColliery?.subsidiary || "BCCL";

  return (
    <div className={`mm-map-view ${isFullscreen ? "is-fullscreen" : ""}`}>
      {/* Top Header & Search Control Bar */}
      <div className="mm-map-topbar">
        <div className="mm-map-title-box">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h1 className="mm-map-page-title">Mine Map &amp; Ventilation Blueprints</h1>
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
              {isLiveDb ? "⚡ Live Neon DB" : "📦 Cached Master"}
            </span>
          </div>
          <p className="mm-map-page-sub">
            Interactive GIS layout, SCADA telemetry sensors, and DGMS Statutory Hazard &amp; Ventilation Blueprints.
          </p>
        </div>

        <div className="mm-map-controls-row">
          {/* Colliery Switcher */}
          <select
            className="mm-map-select"
            style={{ maxWidth: "260px", fontWeight: 600, borderColor: "#06b6d4" }}
            value={selectedColliery?.id || selectedColliery?.collieryId || ""}
            onChange={(e) => {
              const found = collieries.find(
                (c) => (c.id || c.collieryId) === e.target.value
              );
              if (found) {
                setSelectedColliery(found);
                onShowToast(`Loaded ${found.name || found.collieryName} Blueprint`, "info");
              }
            }}
          >
            {collieries.map((c) => (
              <option key={c.id || c.collieryId} value={c.id || c.collieryId}>
                {c.area?.subsidiary?.code || c.subsidiary || "CIL"} - {c.name || c.collieryName}
              </option>
            ))}
          </select>

          {/* View Mode Toggle: Blueprint vs GIS */}
          <div style={{ display: "flex", gap: "4px", backgroundColor: "#0f172a", padding: "3px", borderRadius: "6px", border: "1px solid #334155" }}>
            <button
              type="button"
              className="mm-btn-outline"
              style={{
                backgroundColor: viewMode === "blueprint" ? "var(--cyan, #06b6d4)" : "transparent",
                color: viewMode === "blueprint" ? "#000" : "#cbd5e1",
                padding: "4px 10px",
                fontSize: "12px",
                fontWeight: 600,
                border: "none",
              }}
              onClick={() => setViewMode("blueprint")}
            >
              📐 Statutory Blueprint (CAD)
            </button>
            <button
              type="button"
              className="mm-btn-outline"
              style={{
                backgroundColor: viewMode === "interactive" ? "var(--cyan, #06b6d4)" : "transparent",
                color: viewMode === "interactive" ? "#000" : "#cbd5e1",
                padding: "4px 10px",
                fontSize: "12px",
                fontWeight: 600,
                border: "none",
              }}
              onClick={() => setViewMode("interactive")}
            >
              🗺️ GIS SCADA Map
            </button>
          </div>

          <button
            type="button"
            className="mm-map-btn-outline"
            onClick={handleResetView}
          >
            ↺ Reset View
          </button>

          <button
            type="button"
            className="mm-map-btn-primary"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? "🗗 Exit Full Screen" : "⛶ Full Screen"}
          </button>
        </div>
      </div>

      {/* Main Content Area: Map Canvas (Left/Center) + Right Side Panel */}
      <div className="mm-map-main-layout">
        {/* Left/Center: Canvas */}
        <div className="mm-map-canvas-container" style={{ position: "relative", minHeight: "520px" }}>
          {viewMode === "blueprint" ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#050b14",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                border: "1px solid #1e293b",
              }}
            >
              <img
                src={currentHazardMapUrl}
                alt="DGMS Hazard Blueprint"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                  filter: "brightness(0.95) contrast(1.1)",
                }}
              />

              {/* Statutory Overlay Watermark */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  backgroundColor: "rgba(15, 23, 42, 0.85)",
                  backdropFilter: "blur(6px)",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "1px solid rgba(6, 182, 212, 0.4)",
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                <div style={{ color: "#38bdf8", fontWeight: 700, fontSize: "13px" }}>
                  {collieryName}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "11px", marginTop: "2px" }}>
                  DGMS Statutory Ventilation &amp; Evacuation Plan (CMR 2017 Reg 160)
                </div>
              </div>

              {/* Cloudinary Link Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  backgroundColor: "rgba(15, 23, 42, 0.85)",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #334155",
                  fontSize: "11px",
                  color: "#cbd5e1",
                }}
              >
                <span>Verified Cloudinary CAD Blueprint: </span>
                <a
                  href={currentHazardMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#38bdf8", textDecoration: "underline" }}
                >
                  Open High-Res Schematic ↗
                </a>
              </div>
            </div>
          ) : (
            <>
              <MineMap />
              {layers.riskZones && (
                <div className="mm-map-risk-overlay">
                  <div className="mm-risk-zone-box">
                    <Icon name="warning" size={16} />
                    <div>
                      <strong>High Risk Zone</strong>
                      <span>Dust Level High · Crusher Ramp</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="mm-map-compass">N ⬆</div>
              <div className="mm-map-scale-bar">
                <span>0</span>
                <span>250</span>
                <span>500</span>
                <span>1,000 m</span>
              </div>
            </>
          )}
        </div>

        {/* Right Side Panel: Controls, Selected Asset & Section Cards */}
        <div className="mm-map-side-panel">
          {/* Colliery Details Dossier Card */}
          <div className="mm-card">
            <h2 className="mm-card-title">🏛️ Colliery Blueprint Dossier</h2>
            <div style={{ fontSize: "12px", display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              <div>
                <span className="mm-lbl">Colliery Name</span>
                <strong className="mm-cyan">{collieryName}</strong>
              </div>
              <div>
                <span className="mm-lbl">Subsidiary / Division</span>
                <strong>{subsidiaryCode} (Coal India Limited)</strong>
              </div>
              <div>
                <span className="mm-lbl">Mining Classification</span>
                <span className="mm-status-badge is-completed">
                  {collieryName.toLowerCase().includes("underground") ? "UNDERGROUND (DEEP SEAM)" : "OPENCAST"}
                </span>
              </div>
              <div>
                <span className="mm-lbl">Ventilation Status</span>
                <span style={{ color: "#34d399", fontWeight: 700 }}>🟢 Airflow 4,250 m³/min (Optimal)</span>
              </div>
              <div>
                <span className="mm-lbl">DGMS Approved Plan</span>
                <strong style={{ color: "#f59e0b" }}>Valid through FY 2026-27</strong>
              </div>
            </div>
          </div>

          {/* Selected Asset Card */}
          <div className="mm-card mm-map-asset-card">
            <div className="mm-card-head">
              <h2 className="mm-card-title">Selected Asset / SCADA Node</h2>
            </div>

            <div className="mm-selected-asset-content">
              <div className="mm-asset-img-placeholder">
                🚚
              </div>

              <div className="mm-asset-details-box">
                <div className="mm-asset-title-row">
                  <strong className="mm-asset-main-title">{selectedAsset.id}</strong>
                  <span className="mm-asset-sub-type">{selectedAsset.type}</span>
                  <span className="mm-status-pill is-moving">{selectedAsset.status}</span>
                </div>

                <div className="mm-asset-grid-details">
                  <div>
                    <span className="mm-lbl">ID</span>
                    <strong className="mm-val">{selectedAsset.id}</strong>
                  </div>
                  <div>
                    <span className="mm-lbl">Location</span>
                    <strong className="mm-val">{selectedAsset.location}</strong>
                  </div>
                  <div>
                    <span className="mm-lbl">Speed</span>
                    <strong className="mm-val">{selectedAsset.speed}</strong>
                  </div>
                  <div>
                    <span className="mm-lbl">Fuel</span>
                    <strong className="mm-val">{selectedAsset.fuel}</strong>
                  </div>
                  <div>
                    <span className="mm-lbl">Operator</span>
                    <strong className="mm-val">{selectedAsset.operator}</strong>
                  </div>
                  <div>
                    <span className="mm-lbl">Last Update</span>
                    <strong className="mm-val">{selectedAsset.updated}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="mm-btn-view-full"
                  onClick={() => onShowToast(`Telemetry stream for ${selectedAsset.id} opened`, "info")}
                >
                  View Real-Time Telemetry →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom KPI Row (4 Cards) */}
      <div className="mm-map-kpis-row">
        <div className="mm-map-kpi-card" onClick={() => onOpenSection && onOpenSection("alerts")}>
          <div className="mm-map-kpi-icon is-rose">
            <Icon name="warning" size={18} />
          </div>
          <div>
            <span className="mm-map-kpi-lbl">Ventilation Watch</span>
            <strong className="mm-map-kpi-val">2</strong>
            <span className="mm-map-kpi-sub">Return Airway CH4 &lt; 0.8%</span>
            <button type="button" className="mm-kpi-link">View Details →</button>
          </div>
        </div>

        <div className="mm-map-kpi-card">
          <div className="mm-map-kpi-icon is-green">
            <Icon name="truck" size={18} />
          </div>
          <div>
            <span className="mm-map-kpi-lbl">Active Machinery</span>
            <strong className="mm-map-kpi-val">24</strong>
            <span className="mm-map-kpi-sub">Continuous Miners &amp; Haulers</span>
            <button type="button" className="mm-kpi-link">View Equipment →</button>
          </div>
        </div>

        <div className="mm-map-kpi-card" onClick={() => onOpenSection && onOpenSection("labour")}>
          <div className="mm-map-kpi-icon is-blue">
            <Icon name="people" size={18} />
          </div>
          <div>
            <span className="mm-map-kpi-lbl">Personnel In-Seam</span>
            <strong className="mm-map-kpi-val">73</strong>
            <span className="mm-map-kpi-sub">Biometric Gate Cleared</span>
            <button type="button" className="mm-kpi-link">View Roster →</button>
          </div>
        </div>

        <div className="mm-map-kpi-card" onClick={() => onOpenSection && onOpenSection("environment")}>
          <div className="mm-map-kpi-icon is-amber">
            <Icon name="leaf" size={18} />
          </div>
          <div>
            <span className="mm-map-kpi-lbl">Eco Dumps</span>
            <strong className="mm-map-kpi-val">70</strong>
            <span className="mm-map-kpi-sub">Drone Monitored Terraces</span>
            <button type="button" className="mm-kpi-link">Inspect Sites →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
