import { useState } from "react";
import Icon from "./Icons";
import "./MineManagerDashboard.css";

const assetsTableData = [
  { id: "AS-001", name: "Haul Truck HT-01", category: "Vehicle", location: "North Pit", status: "Active", updated: "10 Sep 2026" },
  { id: "AS-002", name: "Conveyor Belt-2", category: "Infrastructure", location: "Processing Plant", status: "Active", updated: "10 Sep 2026" },
  { id: "AS-003", name: "Ventilation Fan V-1", category: "Equipment", location: "Main Shaft", status: "Maintenance", updated: "09 Sep 2026" },
  { id: "AS-004", name: "Power Generator", category: "Utility", location: "East Zone", status: "Active", updated: "09 Sep 2026" },
  { id: "AS-005", name: "Water Pump WP-3", category: "Equipment", location: "West Zone", status: "Inactive", updated: "08 Sep 2026" },
];

const sensorsTableData = [
  { id: "SN-001", name: "Temperature-01", type: "Temperature", location: "North Pit", val: "28.5 °C", status: "Online", updated: "11 Sep 2026" },
  { id: "SN-002", name: "Gas Sensor-01", type: "Methane", location: "Main Shaft", val: "0.12 %", status: "Online", updated: "11 Sep 2026" },
  { id: "SN-003", name: "Vibration-01", type: "Vibration", location: "Processing Plant", val: "2.4 mm/s", status: "Warning", updated: "11 Sep 2026" },
  { id: "SN-004", name: "Dust Sensor-01", type: "PM2.5", location: "East Zone", val: "56 µg/m³", status: "Online", updated: "10 Sep 2026" },
  { id: "SN-005", name: "Noise Sensor-01", type: "Noise", location: "West Zone", val: "82 dB", status: "Offline", updated: "11 Sep 2026" },
];

const equipmentTableData = [
  { id: "EQ-001", name: "Excavator EX-01", category: "Excavator", model: "CAT 320D", location: "North Pit", status: "Operational", nextService: "15 Sep 2026" },
  { id: "EQ-002", name: "Drill Rig DR-02", category: "Drilling", model: "Atlas Copco D65", location: "Main Shaft", status: "Maintenance", nextService: "20 Sep 2026" },
  { id: "EQ-003", name: "Haul Truck HT-03", category: "Haulage", model: "Komatsu 930E", location: "East Zone", status: "Operational", nextService: "18 Sep 2026" },
  { id: "EQ-004", name: "Loader LD-01", category: "Loading", model: "CAT 980K", location: "West Zone", status: "Operational", nextService: "25 Sep 2026" },
  { id: "EQ-005", name: "Conveyor CV-01", category: "Conveyor", model: "Custom", location: "North Pit", status: "Out of Service", nextService: "-" },
];

const cameraFeedsData = [
  { id: "CAM-01", name: "CAM-01 | North Pit - Entrance", date: "10 Sep 2026, 14:32:10", status: "Live" },
  { id: "CAM-02", name: "CAM-02 | Processing Plant", date: "10 Sep 2026, 14:32:10", status: "Live" },
  { id: "CAM-03", name: "CAM-03 | Main Shaft", date: "10 Sep 2026, 14:32:10", status: "Live" },
  { id: "CAM-04", name: "CAM-04 | Conveyor Belt", date: "10 Sep 2026, 14:32:10", status: "Live" },
  { id: "CAM-05", name: "CAM-05 | East Zone", date: "10 Sep 2026, 14:28:03", status: "Offline" },
  { id: "CAM-06", name: "CAM-06 | Explosive Storage", date: "10 Sep 2026, 14:32:10", status: "Live" },
];

export function OperationsAssetView({ onShowToast, onClose }) {
  const [activeTab, setActiveTab] = useState("Assets");
  const [globalSearch, setGlobalSearch] = useState("");

  return (
    <div className="mm-ops-view">
      {/* Sub Header & Tabs Bar */}
      <div className="mm-ops-header">
        <div>
          <h1 className="mm-ops-title">Mine Manager</h1>
          <p className="mm-ops-sub">Operations &amp; Asset Monitoring</p>
        </div>

        <div className="mm-ops-tabs">
          {["Dashboard", "Assets", "Sensors", "Equipment", "Cameras"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`mm-ops-tab ${activeTab === tab ? "is-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mm-ops-search-box">
          <Icon name="search" size={14} />
          <input
            type="text"
            placeholder="Search across assets, sensors, equipment, cameras..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
        </div>

        {onClose && (
          <button type="button" className="mm-btn-outline" onClick={onClose}>
            ← Back to Dashboard
          </button>
        )}
      </div>

      {/* 2x2 Main Grid Layout */}
      <div className="mm-ops-grid">
        {/* Section 1: Assets */}
        <div className="mm-card mm-ops-card">
          <div className="mm-ops-card-head">
            <div>
              <h2 className="mm-card-title"><Icon name="truck" size={16} /> Assets</h2>
              <p className="mm-card-sub">Manage all mine assets including infrastructure, vehicles and other resources.</p>
            </div>
            <button
              type="button"
              className="mm-btn-save-main"
              onClick={() => onShowToast("Add Asset modal opened", "info")}
            >
              + Add Asset
            </button>
          </div>

          {/* KPI Summary Cards */}
          <div className="mm-ops-kpis">
            <div className="mm-ops-kpi is-blue">
              <span className="mm-ops-kpi-icon">👥</span>
              <div><strong>248</strong><span>Total Assets</span><small className="mm-txt-green">↑ 6%</small></div>
            </div>
            <div className="mm-ops-kpi is-green">
              <span className="mm-ops-kpi-icon">✅</span>
              <div><strong>210</strong><span>Active</span><small className="mm-txt-green">↑ 4%</small></div>
            </div>
            <div className="mm-ops-kpi is-amber">
              <span className="mm-ops-kpi-icon">🔧</span>
              <div><strong>18</strong><span>Under Maintenance</span><small className="mm-txt-rose">↓ 2%</small></div>
            </div>
            <div className="mm-ops-kpi is-rose">
              <span className="mm-ops-kpi-icon">❌</span>
              <div><strong>20</strong><span>Inactive</span><small>– 0%</small></div>
            </div>
          </div>

          {/* Filter Row */}
          <div className="mm-ops-filter-row">
            <input type="text" placeholder="Search asset name, ID..." className="mm-ops-filter-input" />
            <select><option>All Categories</option></select>
            <select><option>All Locations</option></select>
            <select><option>All Status</option></select>
            <button type="button" className="mm-btn-outline">⚙️ Filters</button>
          </div>

          {/* Table */}
          <div className="mm-env-table-wrap">
            <table className="mm-env-table">
              <thead>
                <tr>
                  <th>Asset ID</th>
                  <th>Asset Name</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assetsTableData.map((row) => (
                  <tr key={row.id}>
                    <td><strong>{row.id}</strong></td>
                    <td>{row.name}</td>
                    <td>{row.category}</td>
                    <td>{row.location}</td>
                    <td>
                      <span className={`mm-status-badge is-${row.status === "Active" ? "completed" : row.status === "Maintenance" ? "pending" : "rejected"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="mm-time-cell">{row.updated}</td>
                    <td>
                      <button type="button" className="mm-btn-table-view">👁 Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="mm-ops-pagination">
            <span>Showing 1–5 of 248 assets</span>
            <div className="mm-ops-page-btns">
              <button type="button" disabled>&lt;</button>
              <button type="button" className="is-active">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">4</button>
              <button type="button">5</button>
              <button type="button">&gt;</button>
            </div>
          </div>
        </div>

        {/* Section 2: Sensors */}
        <div className="mm-card mm-ops-card">
          <div className="mm-ops-card-head">
            <div>
              <h2 className="mm-card-title"><Icon name="signal" size={16} /> Sensors</h2>
              <p className="mm-card-sub">Monitor and manage all IoT sensors deployed across the mine.</p>
            </div>
            <button
              type="button"
              className="mm-btn-save-main"
              onClick={() => onShowToast("Add Sensor modal opened", "info")}
            >
              + Add Sensor
            </button>
          </div>

          {/* KPI Summary Cards */}
          <div className="mm-ops-kpis">
            <div className="mm-ops-kpi is-purple">
              <span className="mm-ops-kpi-icon">📡</span>
              <div><strong>356</strong><span>Total Sensors</span><small className="mm-txt-green">↑ 8%</small></div>
            </div>
            <div className="mm-ops-kpi is-green">
              <span className="mm-ops-kpi-icon">🟢</span>
              <div><strong>328</strong><span>Online</span><small className="mm-txt-green">↑ 5%</small></div>
            </div>
            <div className="mm-ops-kpi is-rose">
              <span className="mm-ops-kpi-icon">🔴</span>
              <div><strong>18</strong><span>Offline</span><small className="mm-txt-rose">↓ 2%</small></div>
            </div>
            <div className="mm-ops-kpi is-amber">
              <span className="mm-ops-kpi-icon">⚠️</span>
              <div><strong>10</strong><span>Alerts</span><small className="mm-txt-amber">↑ 25%</small></div>
            </div>
          </div>

          {/* Filter Row */}
          <div className="mm-ops-filter-row">
            <input type="text" placeholder="Search sensor name, ID..." className="mm-ops-filter-input" />
            <select><option>All Sensor Types</option></select>
            <select><option>All Locations</option></select>
            <select><option>All Status</option></select>
            <button type="button" className="mm-btn-outline">⚙️ Filters</button>
          </div>

          {/* Table */}
          <div className="mm-env-table-wrap">
            <table className="mm-env-table">
              <thead>
                <tr>
                  <th>Sensor ID</th>
                  <th>Sensor Name</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Current Value</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sensorsTableData.map((row) => (
                  <tr key={row.id}>
                    <td><strong>{row.id}</strong></td>
                    <td>{row.name}</td>
                    <td>{row.type}</td>
                    <td>{row.location}</td>
                    <td><strong className="mm-cyan">{row.val}</strong></td>
                    <td>
                      <span className={`mm-status-badge is-${row.status === "Online" ? "completed" : row.status === "Warning" ? "pending" : "rejected"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="mm-time-cell">{row.updated}</td>
                    <td>
                      <button type="button" className="mm-btn-table-view">👁 Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="mm-ops-pagination">
            <span>Showing 1–5 of 356 sensors</span>
            <div className="mm-ops-page-btns">
              <button type="button" disabled>&lt;</button>
              <button type="button" className="is-active">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">4</button>
              <button type="button">5</button>
              <button type="button">&gt;</button>
            </div>
          </div>
        </div>

        {/* Section 3: Equipment */}
        <div className="mm-card mm-ops-card">
          <div className="mm-ops-card-head">
            <div>
              <h2 className="mm-card-title"><Icon name="cog" size={16} /> Equipment</h2>
              <p className="mm-card-sub">Manage heavy machinery, tools and equipment used in mining operations.</p>
            </div>
            <button
              type="button"
              className="mm-btn-save-main"
              onClick={() => onShowToast("Add Equipment modal opened", "info")}
            >
              + Add Equipment
            </button>
          </div>

          {/* KPI Summary Cards */}
          <div className="mm-ops-kpis">
            <div className="mm-ops-kpi is-blue">
              <span className="mm-ops-kpi-icon">🚜</span>
              <div><strong>126</strong><span>Total Equipment</span><small className="mm-txt-green">↑ 6%</small></div>
            </div>
            <div className="mm-ops-kpi is-green">
              <span className="mm-ops-kpi-icon">🛠️</span>
              <div><strong>98</strong><span>Operational</span><small className="mm-txt-green">↑ 4%</small></div>
            </div>
            <div className="mm-ops-kpi is-amber">
              <span className="mm-ops-kpi-icon">🏗️</span>
              <div><strong>16</strong><span>Under Maintenance</span><small className="mm-txt-rose">↓ 11%</small></div>
            </div>
            <div className="mm-ops-kpi is-rose">
              <span className="mm-ops-kpi-icon">❗</span>
              <div><strong>12</strong><span>Out of Service</span><small>– 0%</small></div>
            </div>
          </div>

          {/* Filter Row */}
          <div className="mm-ops-filter-row">
            <input type="text" placeholder="Search equipment name, ID..." className="mm-ops-filter-input" />
            <select><option>All Categories</option></select>
            <select><option>All Locations</option></select>
            <select><option>All Status</option></select>
            <button type="button" className="mm-btn-outline">⚙️ Filters</button>
          </div>

          {/* Table */}
          <div className="mm-env-table-wrap">
            <table className="mm-env-table">
              <thead>
                <tr>
                  <th>Equipment ID</th>
                  <th>Equipment Name</th>
                  <th>Category</th>
                  <th>Model / Type</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Next Service</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {equipmentTableData.map((row) => (
                  <tr key={row.id}>
                    <td><strong>{row.id}</strong></td>
                    <td>{row.name}</td>
                    <td>{row.category}</td>
                    <td>{row.model}</td>
                    <td>{row.location}</td>
                    <td>
                      <span className={`mm-status-badge is-${row.status === "Operational" ? "completed" : row.status === "Maintenance" ? "pending" : "rejected"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="mm-time-cell">{row.nextService}</td>
                    <td>
                      <button type="button" className="mm-btn-table-view">👁 Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="mm-ops-pagination">
            <span>Showing 1–5 of 126 equipment</span>
            <div className="mm-ops-page-btns">
              <button type="button" disabled>&lt;</button>
              <button type="button" className="is-active">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">4</button>
              <button type="button">5</button>
              <button type="button">&gt;</button>
            </div>
          </div>
        </div>

        {/* Section 4: Cameras */}
        <div className="mm-card mm-ops-card">
          <div className="mm-ops-card-head">
            <div>
              <h2 className="mm-card-title"><Icon name="expand" size={16} /> Cameras</h2>
              <p className="mm-card-sub">Monitor live feeds and manage CCTV/IP cameras across the mine.</p>
            </div>
            <button
              type="button"
              className="mm-btn-save-main"
              onClick={() => onShowToast("Add Camera modal opened", "info")}
            >
              + Add Camera
            </button>
          </div>

          {/* KPI Summary Cards */}
          <div className="mm-ops-kpis">
            <div className="mm-ops-kpi is-purple">
              <span className="mm-ops-kpi-icon">📹</span>
              <div><strong>84</strong><span>Total Cameras</span><small className="mm-txt-green">↑ 5%</small></div>
            </div>
            <div className="mm-ops-kpi is-green">
              <span className="mm-ops-kpi-icon">🟢</span>
              <div><strong>76</strong><span>Online</span><small className="mm-txt-green">↑ 3%</small></div>
            </div>
            <div className="mm-ops-kpi is-rose">
              <span className="mm-ops-kpi-icon">🔴</span>
              <div><strong>6</strong><span>Offline</span><small>– 0%</small></div>
            </div>
            <div className="mm-ops-kpi is-cyan">
              <span className="mm-ops-kpi-icon">🔴 REC</span>
              <div><strong>76</strong><span>Recording</span><small className="mm-txt-green">↑ 4%</small></div>
            </div>
          </div>

          {/* Filter Row */}
          <div className="mm-ops-filter-row">
            <input type="text" placeholder="Search camera name, ID..." className="mm-ops-filter-input" />
            <select><option>All Locations</option></select>
            <select><option>All Zones</option></select>
            <select><option>All Status</option></select>
            <button type="button" className="mm-btn-outline">⚙️ Filters</button>
          </div>

          {/* Camera Grid */}
          <div className="mm-cams-grid">
            {cameraFeedsData.map((cam) => (
              <div key={cam.id} className="mm-cam-box" onClick={() => onShowToast(`Expanded CCTV stream ${cam.id}`, "info")}>
                <div className="mm-cam-feed">
                  <span className={`mm-cam-live-badge ${cam.status === "Offline" ? "is-offline" : ""}`}>
                    {cam.status === "Offline" ? "● OFFLINE" : "● LIVE"}
                  </span>
                  <div className="mm-cam-overlay">
                    <span>{cam.name}</span>
                    <small>{cam.date}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
