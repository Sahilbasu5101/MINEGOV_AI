import { useState, useMemo } from "react";
import Icon from "./Icons";
import { MineMap } from "../../views/components/MineMap";
import "./MineManagerDashboard.css";

const assetsData = [
  { id: "HT-07", type: "Trucks", name: "Haul Truck", status: "Moving", location: "East Pit", operator: "Suresh P.", speed: "42 km/h", fuel: "78%" },
  { id: "EX-12", type: "Excavators", name: "Excavator", status: "Idle", location: "West Pit", operator: "Vikram R.", speed: "0 km/h", fuel: "64%" },
  { id: "DR-03", type: "Drills", name: "Heavy Drill", status: "Running", location: "Main Pit", operator: "Amit S.", speed: "2 km/h", fuel: "91%" },
  { id: "LD-05", type: "Loaders", name: "Wheel Loader", status: "Maintenance", location: "Workshop", operator: "Unassigned", speed: "0 km/h", fuel: "40%" },
  { id: "WT-01", type: "Water Trucks", name: "Water Truck", status: "Moving", location: "North Ramp", operator: "Ramesh K.", speed: "28 km/h", fuel: "85%" },
];

const sensorReadings = [
  { icon: "🍃", name: "Air Quality (PM2.5)", val: "42 µg/m³", status: "Normal", color: "var(--green)" },
  { icon: "💧", name: "Methane (CH4)", val: "0.8 %", status: "Normal", color: "var(--green)" },
  { icon: "🔊", name: "Noise Level", val: "72 dB", status: "High", color: "var(--amber)" },
  { icon: "🌡️", name: "Temperature", val: "34 °C", status: "Normal", color: "var(--green)" },
  { icon: "💧", name: "Humidity", val: "56 %", status: "Normal", color: "var(--green)" },
  { icon: "💨", name: "Wind Speed", val: "12 km/h", status: "Normal", color: "var(--green)" },
];

const liveCams = [
  { id: 1, name: "Cam 1 - Main Pit", location: "Bench #4 Excavation", active: true },
  { id: 2, name: "Cam 2 - East Pit", location: "Haul Road Intersection", active: true },
  { id: 3, name: "Cam 3 - Haul Road", location: "South Ramp Gradient", active: true },
  { id: 4, name: "Cam 4 - Crusher", location: "Primary Crusher Hopper", active: true },
];

export function LiveMonitoringView({ onShowToast, onOpenSection }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState(assetsData[0]);
  const [selectedCam, setSelectedCam] = useState(null);

  // Layer switches for Live Mine Map
  const [layerFilters, setLayerFilters] = useState({
    Trucks: true,
    Excavators: true,
    Drills: true,
    Loaders: true,
    WaterTrucks: true,
    Workers: true,
    Sensors: true,
    Zones: true,
  });

  const toggleLayer = (key) => {
    setLayerFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredAssets = useMemo(() => {
    return assetsData.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.operator.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        selectedType === "All" || item.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  return (
    <div className="mm-live-view">
      {/* Top 4 KPI Summary Cards */}
      <div className="mm-live-kpis">
        <div className="mm-live-kpi-card">
          <div className="mm-live-kpi-icon is-cyan">
            <Icon name="truck" size={20} />
          </div>
          <div>
            <span className="mm-live-kpi-label">Live Equipment</span>
            <div className="mm-live-kpi-val-row">
              <strong className="mm-live-kpi-val">24</strong>
              <span className="mm-live-kpi-sub">
                <span className="is-green">18 Running</span> · <span className="is-amber">4 Idle</span> · <span className="is-slate">2 Offline</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mm-live-kpi-card">
          <div className="mm-live-kpi-icon is-green">
            <Icon name="people" size={20} />
          </div>
          <div>
            <span className="mm-live-kpi-label">Workers On-Site</span>
            <div className="mm-live-kpi-val-row">
              <strong className="mm-live-kpi-val">186</strong>
              <span className="mm-live-kpi-sub">
                <span className="is-green">180 Present</span> · <span className="is-rose">6 Absent</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mm-live-kpi-card">
          <div className="mm-live-kpi-icon is-amber">
            <Icon name="signal" size={20} />
          </div>
          <div>
            <span className="mm-live-kpi-label">Active Sensors</span>
            <div className="mm-live-kpi-val-row">
              <strong className="mm-live-kpi-val">48</strong>
              <span className="mm-live-kpi-sub">
                <span className="is-green">44 Normal</span> · <span className="is-amber">4 Warning</span> · <span className="is-rose">0 Critical</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mm-live-kpi-card">
          <div className="mm-live-kpi-icon is-rose">
            <Icon name="bell" size={20} />
          </div>
          <div>
            <span className="mm-live-kpi-label">Active Alerts</span>
            <div className="mm-live-kpi-val-row">
              <strong className="mm-live-kpi-val">5</strong>
              <span className="mm-live-kpi-sub">
                <span className="is-rose">3 High</span> · <span className="is-amber">2 Medium</span> · <span className="is-cyan">0 Low</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Grid Layout */}
      <div className="mm-live-grid">
        {/* Left Column: Selected Assets & Equipment Status Chart */}
        <div className="mm-live-col left">
          {/* Selected Assets Card */}
          <div className="mm-card mm-assets-card">
            <div className="mm-card-head">
              <h2 className="mm-card-title">Selected Assets</h2>
              <button
                type="button"
                className="mm-viewlink"
                onClick={() => onShowToast("Exporting complete machinery inventory...", "info")}
              >
                View More →
              </button>
            </div>

            {/* Search Input */}
            <div className="mm-asset-search">
              <Icon name="search" size={14} />
              <input
                type="text"
                placeholder="Search asset by ID, type or operator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter Pills */}
            <div className="mm-asset-tabs">
              {["All", "Trucks", "Excavators", "Drills", "Loaders"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`mm-asset-tab ${selectedType === tab ? "is-active" : ""}`}
                  onClick={() => setSelectedType(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Asset Items List */}
            <div className="mm-asset-list">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className={`mm-asset-item ${selectedAsset?.id === asset.id ? "is-selected" : ""}`}
                  onClick={() => setSelectedAsset(asset)}
                >
                  <div className="mm-asset-item-left">
                    <span className="mm-asset-icon">
                      <Icon name={asset.type === "Trucks" || asset.type === "Water Trucks" ? "truck" : asset.type === "Drills" ? "cog" : "bar"} size={16} />
                    </span>
                    <div>
                      <div className="mm-asset-head-row">
                        <strong className="mm-asset-id">{asset.id}</strong>
                        <span className="mm-asset-type">{asset.name}</span>
                      </div>
                      <span className="mm-asset-loc">📍 {asset.location} · {asset.operator}</span>
                    </div>
                  </div>
                  <span className={`mm-status-pill is-${asset.status.toLowerCase()}`}>
                    <span className="mm-status-dot" />
                    {asset.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Status Donut Breakdown */}
          <div className="mm-card mm-status-card">
            <h2 className="mm-card-title">Equipment Status</h2>
            <div className="mm-status-donut-wrap">
              <div className="mm-donut-ring">
                <svg viewBox="0 0 100 100" className="mm-donut-svg-sm">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--line)" strokeWidth="12" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--green)" strokeWidth="12" strokeDasharray="179 238" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--amber)" strokeWidth="12" strokeDasharray="40 238" strokeDashoffset="-179" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--rose)" strokeWidth="12" strokeDasharray="19 238" strokeDashoffset="-219" transform="rotate(-90 50 50)" />
                </svg>
                <div className="mm-donut-inner">
                  <strong className="mm-donut-total">24</strong>
                  <span className="mm-donut-sub">Total</span>
                </div>
              </div>
              <div className="mm-donut-legend">
                <div className="mm-legend-item">
                  <span className="mm-legend-dot is-running" />
                  <span>Running</span>
                  <strong>18</strong>
                </div>
                <div className="mm-legend-item">
                  <span className="mm-legend-dot is-idle" />
                  <span>Idle</span>
                  <strong>4</strong>
                </div>
                <div className="mm-legend-item">
                  <span className="mm-legend-dot is-maintenance" />
                  <span>Maintenance</span>
                  <strong>2</strong>
                </div>
                <div className="mm-legend-item">
                  <span className="mm-legend-dot is-offline" />
                  <span>Offline</span>
                  <strong>0</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Live Mine Map & Live Camera Feeds */}
        <div className="mm-live-col center">
          {/* Live Mine Map Card */}
          <div className="mm-card mm-map-card">
            <div className="mm-card-head">
              <h2 className="mm-card-title">Live Mine Map</h2>
              <button
                type="button"
                className="mm-map-btn"
                onClick={() => onOpenSection("map")}
              >
                <Icon name="expand" size={12} /> Fullscreen Map
              </button>
            </div>

            <div className="mm-live-map-wrapper">
              <MineMap />

              {/* Floating Layer Checklist Filter Panel */}
              <div className="mm-layer-filter-panel">
                <div className="mm-layer-title">Layer Filters</div>
                {Object.keys(layerFilters).map((key) => (
                  <label key={key} className="mm-layer-checkbox">
                    <input
                      type="checkbox"
                      checked={layerFilters[key]}
                      onChange={() => toggleLayer(key)}
                    />
                    <span>{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Live Camera Feeds Grid Card */}
          <div className="mm-card mm-cams-card">
            <div className="mm-card-head">
              <h2 className="mm-card-title">Live Camera Feeds</h2>
              <button
                type="button"
                className="mm-viewlink"
                onClick={() => onShowToast("Switching to CCTV Operations Matrix...", "info")}
              >
                View More →
              </button>
            </div>
            <div className="mm-cams-grid">
              {liveCams.map((cam) => (
                <div
                  key={cam.id}
                  className="mm-cam-box"
                  onClick={() => setSelectedCam(cam)}
                >
                  <div className="mm-cam-feed">
                    <span className="mm-cam-live-badge">● LIVE</span>
                    <div className="mm-cam-overlay">
                      <span>{cam.name}</span>
                      <small>{cam.location}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sensor Monitoring & Recent Alerts */}
        <div className="mm-live-col right">
          {/* Sensor Monitoring Card */}
          <div className="mm-card mm-sensors-card">
            <div className="mm-card-head">
              <h2 className="mm-card-title">Sensor Monitoring</h2>
              <button
                type="button"
                className="mm-viewlink"
                onClick={() => onShowToast("Opening In-Pit Environmental Telemetry...", "info")}
              >
                View More →
              </button>
            </div>
            <div className="mm-sensor-list">
              {sensorReadings.map((s, idx) => (
                <div key={idx} className="mm-sensor-row">
                  <span className="mm-sensor-name">
                    <span style={{ marginRight: "6px" }}>{s.icon}</span>
                    {s.name}
                  </span>
                  <div className="mm-sensor-right">
                    <strong className="mm-sensor-val">{s.val}</strong>
                    <span className={`mm-sensor-badge is-${s.status.toLowerCase()}`}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts Card */}
          <div className="mm-card mm-alerts-card">
            <div className="mm-card-head">
              <h2 className="mm-card-title">Recent Alerts</h2>
              <button
                type="button"
                className="mm-viewlink"
                onClick={() => onOpenSection("alerts")}
              >
                View More →
              </button>
            </div>
            <div className="mm-recent-alerts-list">
              <div className="mm-alert-entry is-critical">
                <span className="mm-alert-icon"><Icon name="warning" size={14} /></span>
                <div>
                  <strong>High CO Level Detected</strong>
                  <span>East Pit · Sensor E-12 · 10:24 AM</span>
                </div>
              </div>
              <div className="mm-alert-entry is-high">
                <span className="mm-alert-icon"><Icon name="warning" size={14} /></span>
                <div>
                  <strong>Haul Truck Overspeed</strong>
                  <span>Truck HT-07 · 09:50 AM</span>
                </div>
              </div>
              <div className="mm-alert-entry is-high">
                <span className="mm-alert-icon"><Icon name="user" size={14} /></span>
                <div>
                  <strong>Worker in Restricted Zone</strong>
                  <span>South Ramp · 09:15 AM</span>
                </div>
              </div>
              <div className="mm-alert-entry is-medium">
                <span className="mm-alert-icon"><Icon name="wind" size={14} /></span>
                <div>
                  <strong>Dust Level High</strong>
                  <span>Crusher Area · 08:40 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Fullscreen Modal */}
      {selectedCam && (
        <div className="mm-modal-overlay" onClick={() => setSelectedCam(null)}>
          <div className="mm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mm-modal-header">
              <h3 className="mm-modal-title">📹 {selectedCam.name}</h3>
              <button type="button" className="mm-panel-close" onClick={() => setSelectedCam(null)}>✕</button>
            </div>
            <div className="mm-modal-body">
              <div className="mm-cam-feed-lg">
                <span className="mm-cam-live-badge">● LIVE STREAM</span>
                <span className="mm-cam-location-tag">{selectedCam.location}</span>
              </div>
            </div>
            <div className="mm-modal-footer">
              <button
                type="button"
                className="mm-modal-btn is-cyan"
                onClick={() => {
                  onShowToast(`PTZ Control activated for ${selectedCam.name}`, "success");
                  setSelectedCam(null);
                }}
              >
                PTZ Control
              </button>
              <button type="button" className="mm-modal-btn is-ghost" onClick={() => setSelectedCam(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
