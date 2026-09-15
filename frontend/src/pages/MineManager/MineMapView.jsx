import { useState } from "react";
import Icon from "./Icons";
import { MineMap } from "../../views/components/MineMap";
import "./MineManagerDashboard.css";

const assetsList = [
  { id: "HT-07", type: "Haul Truck", status: "Moving", location: "East Pit", speed: "32 km/h", fuel: "78%", operator: "Ravi Singh", updated: "11 Sep 2026, 10:29 AM", image: "https://images.unsplash.com/photo-1579412690850-bd41cd0af397?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: "EX-12", type: "Excavator", status: "Active", location: "West Pit", speed: "0 km/h", fuel: "64%", operator: "Vikram R.", updated: "11 Sep 2026, 10:28 AM" },
  { id: "DR-03", type: "Heavy Drill", status: "Active", location: "Main Pit", speed: "2 km/h", fuel: "91%", operator: "Amit S.", updated: "11 Sep 2026, 10:25 AM" },
  { id: "LD-05", type: "Wheel Loader", status: "Caution", location: "Workshop", speed: "0 km/h", fuel: "40%", operator: "Unassigned", updated: "11 Sep 2026, 10:20 AM" },
  { id: "AQ-01", type: "Air Sensor", status: "Normal", location: "South Ramp", speed: "N/A", fuel: "Solar", operator: "Automated", updated: "11 Sep 2026, 10:30 AM" },
];

export function MineMapView({ onShowToast, onOpenSection }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLayer, setSelectedLayer] = useState("All");
  const [selectedSectionFilter, setSelectedSectionFilter] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState(assetsList[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [layers, setLayers] = useState({
    sections: true,
    equipment: true,
    workers: true,
    sensors: true,
    riskZones: true,
    haulRoads: true,
  });

  const toggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetView = () => {
    setSearchQuery("");
    setSelectedLayer("All");
    setSelectedSectionFilter("All");
    setSelectedAsset(assetsList[0]);
    onShowToast("Map view reset to default center.", "info");
  };

  return (
    <div className={`mm-map-view ${isFullscreen ? "is-fullscreen" : ""}`}>
      {/* Top Header & Search Control Bar */}
      <div className="mm-map-topbar">
        <div className="mm-map-title-box">
          <h1 className="mm-map-page-title">Mine Map</h1>
          <p className="mm-map-page-sub">
            Interactive view of mine layout, assets, sensors, workers and risk zones.
          </p>
        </div>

        <div className="mm-map-controls-row">
          <div className="mm-map-search-box">
            <Icon name="search" size={14} />
            <input
              type="text"
              placeholder="Search location, asset, sensor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="mm-map-select"
            value={selectedLayer}
            onChange={(e) => setSelectedLayer(e.target.value)}
          >
            <option value="All">All Layers ▾</option>
            <option value="equipment">Equipment Layer</option>
            <option value="sensors">Sensors Layer</option>
            <option value="risk">Risk Zones</option>
          </select>

          <select
            className="mm-map-select"
            value={selectedSectionFilter}
            onChange={(e) => setSelectedSectionFilter(e.target.value)}
          >
            <option value="All">All Sections ▾</option>
            <option value="east">East Pit</option>
            <option value="west">West Pit</option>
            <option value="main">Main Pit</option>
            <option value="crusher">Crusher Area</option>
          </select>

          <button
            type="button"
            className="mm-map-btn-outline"
            onClick={() => onShowToast("Filter by Date & Time Range...", "info")}
          >
            📅 Date &amp; Time ▾
          </button>

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
        {/* Left/Center: Large Interactive Map Canvas */}
        <div className="mm-map-canvas-container">
          <MineMap />

          {/* Shaded Risk Zone Badge Overlay */}
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

          {/* Compass & Scale Overlay */}
          <div className="mm-map-compass">N ⬆</div>
          <div className="mm-map-scale-bar">
            <span>0</span>
            <span>250</span>
            <span>500</span>
            <span>1,000 m</span>
          </div>
        </div>

        {/* Right Side Panel: Controls, Legend, Selected Asset & Section Cards */}
        <div className="mm-map-side-panel">
          {/* Map Controls & Legend Card */}
          <div className="mm-card mm-map-legend-card">
            <h2 className="mm-card-title">Map Controls &amp; Legend</h2>
            
            <div className="mm-legend-split">
              {/* Layers Checklist */}
              <div className="mm-legend-col">
                <span className="mm-legend-heading">Layers</span>
                <label className="mm-layer-check">
                  <input type="checkbox" checked={layers.sections} onChange={() => toggleLayer("sections")} />
                  <span>Sections / Benches</span>
                </label>
                <label className="mm-layer-check">
                  <input type="checkbox" checked={layers.equipment} onChange={() => toggleLayer("equipment")} />
                  <span>Equipment</span>
                </label>
                <label className="mm-layer-check">
                  <input type="checkbox" checked={layers.workers} onChange={() => toggleLayer("workers")} />
                  <span>Workers</span>
                </label>
                <label className="mm-layer-check">
                  <input type="checkbox" checked={layers.sensors} onChange={() => toggleLayer("sensors")} />
                  <span>Sensors</span>
                </label>
                <label className="mm-layer-check">
                  <input type="checkbox" checked={layers.riskZones} onChange={() => toggleLayer("riskZones")} />
                  <span>Risk Zones</span>
                </label>
                <label className="mm-layer-check">
                  <input type="checkbox" checked={layers.haulRoads} onChange={() => toggleLayer("haulRoads")} />
                  <span>Haul Roads</span>
                </label>
              </div>

              {/* Legend List */}
              <div className="mm-legend-col">
                <span className="mm-legend-heading">Legend</span>
                <div className="mm-legend-item-row"><span className="mm-dot is-green" /> Normal</div>
                <div className="mm-legend-item-row"><span className="mm-dot is-amber" /> Caution</div>
                <div className="mm-legend-item-row"><span className="mm-dot is-rose" /> High Risk</div>
                <div className="mm-legend-item-row">🚚 Truck</div>
                <div className="mm-legend-item-row">🚜 Excavator</div>
                <div className="mm-legend-item-row">⚙️ Drill</div>
                <div className="mm-legend-item-row">📷 Camera / Sensor</div>
                <div className="mm-legend-item-row"><span className="mm-hash-box" /> Risk Zone</div>
              </div>
            </div>
          </div>

          {/* Selected Asset Card */}
          <div className="mm-card mm-map-asset-card">
            <div className="mm-card-head">
              <h2 className="mm-card-title">Selected Asset</h2>
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
                  onClick={() => onShowToast(`Telemetry log for ${selectedAsset.id} opened`, "info")}
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>

          {/* Selected Location / Section Card */}
          <div className="mm-card mm-map-section-card">
            <div className="mm-card-head">
              <h2 className="mm-card-title">Selected Location / Section</h2>
            </div>
            
            <div className="mm-section-content">
              <div className="mm-section-head-row">
                <strong className="mm-section-title">East Pit</strong>
                <span className="mm-status-pill is-moving">Active</span>
              </div>

              <div className="mm-asset-grid-details">
                <div>
                  <span className="mm-lbl">Section ID</span>
                  <strong className="mm-val">EP-01</strong>
                </div>
                <div>
                  <span className="mm-lbl">Status</span>
                  <strong className="mm-val">Active</strong>
                </div>
                <div>
                  <span className="mm-lbl">Current Activity</span>
                  <strong className="mm-val">Hauling</strong>
                </div>
                <div>
                  <span className="mm-lbl">Active Assets</span>
                  <strong className="mm-val">12</strong>
                </div>
                <div>
                  <span className="mm-lbl">Risk Level</span>
                  <span className="mm-status-pill is-idle" style={{ fontSize: "9px" }}>Caution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom KPI Row (4 Cards) */}
      <div className="mm-map-kpis-row">
        <div className="mm-map-kpi-card" onClick={() => onOpenSection("alerts")}>
          <div className="mm-map-kpi-icon is-rose">
            <Icon name="warning" size={18} />
          </div>
          <div>
            <span className="mm-map-kpi-lbl">Risk Zones</span>
            <strong className="mm-map-kpi-val">3</strong>
            <span className="mm-map-kpi-sub">Active Risk Zones</span>
            <button type="button" className="mm-kpi-link">View Details →</button>
          </div>
        </div>

        <div className="mm-map-kpi-card" onClick={() => onOpenSection("live")}>
          <div className="mm-map-kpi-icon is-cyan">
            <Icon name="truck" size={18} />
          </div>
          <div>
            <span className="mm-map-kpi-lbl">Total Equipment</span>
            <strong className="mm-map-kpi-val">24</strong>
            <span className="mm-map-kpi-sub"><span className="is-green">18 Active</span> · <span className="is-amber">4 Idle</span> · 2 Offline</span>
            <button type="button" className="mm-kpi-link">View Details →</button>
          </div>
        </div>

        <div className="mm-map-kpi-card">
          <div className="mm-map-kpi-icon is-amber">
            <Icon name="signal" size={18} />
          </div>
          <div>
            <span className="mm-map-kpi-lbl">Active Sensors</span>
            <strong className="mm-map-kpi-val">48</strong>
            <span className="mm-map-kpi-sub"><span className="is-green">44 Normal</span> · <span className="is-amber">3 Warning</span> · <span className="is-rose">1 Critical</span></span>
            <button type="button" className="mm-kpi-link">View Details →</button>
          </div>
        </div>

        <div className="mm-map-kpi-card">
          <div className="mm-map-kpi-icon is-green">
            <Icon name="people" size={18} />
          </div>
          <div>
            <span className="mm-map-kpi-lbl">Workers On-Site</span>
            <strong className="mm-map-kpi-val">186</strong>
            <span className="mm-map-kpi-sub"><span className="is-green">180 Present</span> · <span className="is-rose">6 Absent</span></span>
            <button type="button" className="mm-kpi-link">View Details →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
