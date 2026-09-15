import { useState, useRef } from "react";
import Icon from "./Icons";
import "./MineManagerDashboard.css";

export function SettingsView({ onShowToast }) {
  const [activeTab, setActiveTab] = useState("all");

  const mineConfigRef = useRef(null);
  const userAccessRef = useRef(null);
  const alertEscalationRef = useRef(null);
  const systemDataRef = useRef(null);

  // Form State
  const [mineName, setMineName] = useState("Sukhdev Mine");
  const [mineId, setMineId] = useState("MN-001");
  const [sectionZone, setSectionZone] = useState("All Sections");
  const [shiftConfig, setShiftConfig] = useState("Day / Night");
  const [opAreas, setOpAreas] = useState("Underground + Surface");
  const [geoMap, setGeoMap] = useState("Enabled");

  const [userProfile, setUserProfile] = useState("Rahul Kumar (Mine Manager)");
  const [roles, setRoles] = useState("Manage Roles");
  const [managerAccess, setManagerAccess] = useState("Enabled");
  const [sessionTimeout, setSessionTimeout] = useState("Auto Logout (30 min)");
  const [twoFactor, setTwoFactor] = useState("Enabled");

  const [severityRules, setSeverityRules] = useState("Custom Rules");
  const [escalationThreshold, setEscalationThreshold] = useState("Configured");
  const [autoAssign, setAutoAssign] = useState("Auto Assign");
  const [notifPref, setNotifPref] = useState("Email + SMS + In-App");

  const [syncFreq, setSyncFreq] = useState("Real-time (Live)");
  const [retention, setRetention] = useState("12 Months");
  const [backup, setBackup] = useState("Scheduled (Daily)");

  const handleSave = () => {
    onShowToast("System settings & operational configuration saved successfully!", "success");
  };

  const handleReset = () => {
    setMineName("Sukhdev Mine");
    setMineId("MN-001");
    onShowToast("Settings restored to factory defaults.", "info");
  };

  const handleTabClick = (tabKey, tabLabel) => {
    setActiveTab(tabKey);
    onShowToast(`Opening ${tabLabel} content box...`, "info");

    const refMap = {
      mineConfig: mineConfigRef,
      userAccess: userAccessRef,
      alertEscalation: alertEscalationRef,
      systemData: systemDataRef,
    };

    if (refMap[tabKey]?.current) {
      setTimeout(() => {
        refMap[tabKey].current.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 60);
    }
  };

  const isSectionVisible = (key) => {
    return activeTab === "all" || activeTab === key;
  };

  return (
    <div className="mm-settings-view">
      {/* Top Header & Save Actions */}
      <div className="mm-settings-header">
        <div>
          <h1 className="mm-settings-title">Settings</h1>
          <p className="mm-settings-sub">
            Configure mine operations, access, alerts, escalation and system preferences.
          </p>
        </div>

        <div className="mm-settings-top-actions">
          <button type="button" className="mm-btn-save-main" onClick={handleSave}>
            💾 Save Changes
          </button>
          <button type="button" className="mm-btn-outline" onClick={handleReset}>
            ↺ Reset
          </button>
          <button type="button" className="mm-btn-outline" onClick={() => onShowToast("Audit history log loaded", "info")}>
            📜 View Audit History
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs Bar */}
      <div className="mm-settings-tabs">
        <button
          type="button"
          className={`mm-set-tab ${activeTab === "all" ? "is-active" : ""}`}
          onClick={() => handleTabClick("all", "All Settings")}
        >
          All Settings
        </button>
        <button
          type="button"
          className={`mm-set-tab ${activeTab === "mineConfig" ? "is-active" : ""}`}
          onClick={() => handleTabClick("mineConfig", "Mine Configuration")}
        >
          Mine Configuration
        </button>
        <button
          type="button"
          className={`mm-set-tab ${activeTab === "userAccess" ? "is-active" : ""}`}
          onClick={() => handleTabClick("userAccess", "User & Access Settings")}
        >
          User &amp; Access
        </button>
        <button
          type="button"
          className={`mm-set-tab ${activeTab === "alertEscalation" ? "is-active" : ""}`}
          onClick={() => handleTabClick("alertEscalation", "Alert & Escalation")}
        >
          Alert &amp; Escalation
        </button>
        <button
          type="button"
          className={`mm-set-tab ${activeTab === "systemData" ? "is-active" : ""}`}
          onClick={() => handleTabClick("systemData", "System & Data Preferences")}
        >
          System &amp; Data
        </button>
      </div>

      {/* Active Filter Bar (When isolated) */}
      {activeTab !== "all" && (
        <div className="mm-settings-filter-banner">
          <span>Viewing content box for: <strong>{activeTab === "mineConfig" ? "Mine Configuration" : activeTab === "userAccess" ? "User & Access Settings" : activeTab === "alertEscalation" ? "Alert & Escalation" : "System & Data"}</strong></span>
          <button type="button" className="mm-btn-outline" onClick={() => handleTabClick("all", "All Settings")}>
            View All Sections
          </button>
        </div>
      )}

      {/* Main Form Cards Grid */}
      <div className={`mm-settings-grid ${activeTab !== "all" ? "is-single-column" : ""}`}>
        {/* Card 1: Mine / Operation Configuration */}
        {isSectionVisible("mineConfig") && (
          <div
            ref={mineConfigRef}
            className={`mm-card mm-settings-card ${activeTab === "mineConfig" ? "is-focused-section" : ""}`}
            onClick={() => {
              if (activeTab !== "mineConfig") handleTabClick("mineConfig", "Mine Configuration");
            }}
          >
            <div className="mm-card-head" style={{ cursor: "pointer" }}>
              <h2 className="mm-card-title">
                <Icon name="cog" size={16} /> Mine / Operation Configuration
              </h2>
              <span className="mm-set-section-badge">Section 1</span>
            </div>

            <div className="mm-settings-form">
              <div className="mm-set-field">
                <label>Mine Name</label>
                <input type="text" value={mineName} onChange={(e) => setMineName(e.target.value)} />
              </div>

              <div className="mm-set-field">
                <label>Mine ID</label>
                <input type="text" value={mineId} onChange={(e) => setMineId(e.target.value)} />
              </div>

              <div className="mm-set-field">
                <label>Section / Zone</label>
                <select value={sectionZone} onChange={(e) => setSectionZone(e.target.value)}>
                  <option value="All Sections">All Sections</option>
                  <option value="East Pit">East Pit</option>
                  <option value="West Pit">West Pit</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Shift Configuration</label>
                <select value={shiftConfig} onChange={(e) => setShiftConfig(e.target.value)}>
                  <option value="Day / Night">Day / Night</option>
                  <option value="3-Shift 24x7">3-Shift 24x7</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Operational Areas</label>
                <select value={opAreas} onChange={(e) => setOpAreas(e.target.value)}>
                  <option value="Underground + Surface">Underground + Surface</option>
                  <option value="Open Cast Only">Open Cast Only</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Geo / Map Configuration</label>
                <select value={geoMap} onChange={(e) => setGeoMap(e.target.value)}>
                  <option value="Enabled">Enabled</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Card 2: User & Access Settings */}
        {isSectionVisible("userAccess") && (
          <div
            ref={userAccessRef}
            className={`mm-card mm-settings-card ${activeTab === "userAccess" ? "is-focused-section" : ""}`}
            onClick={() => {
              if (activeTab !== "userAccess") handleTabClick("userAccess", "User & Access Settings");
            }}
          >
            <div className="mm-card-head" style={{ cursor: "pointer" }}>
              <h2 className="mm-card-title">
                <Icon name="people" size={16} /> User &amp; Access Settings
              </h2>
              <span className="mm-set-section-badge">Section 2</span>
            </div>

            <div className="mm-settings-form">
              <div className="mm-set-field">
                <label>User Profile</label>
                <select value={userProfile} onChange={(e) => setUserProfile(e.target.value)}>
                  <option value="Rahul Kumar (Mine Manager)">Rahul Kumar (Mine Manager)</option>
                  <option value="Anita Singh (Safety Officer)">Anita Singh (Safety Officer)</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Roles &amp; Permissions</label>
                <select value={roles} onChange={(e) => setRoles(e.target.value)}>
                  <option value="Manage Roles">Manage Roles (Admin)</option>
                  <option value="Read Only">Read Only</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Manager / Supervisor Access</label>
                <select value={managerAccess} onChange={(e) => setManagerAccess(e.target.value)}>
                  <option value="Enabled">Enabled</option>
                  <option value="Restricted">Restricted</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Account &amp; Session Settings</label>
                <select value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)}>
                  <option value="Auto Logout (30 min)">Auto Logout (30 min)</option>
                  <option value="Auto Logout (60 min)">Auto Logout (60 min)</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Two-Factor Authentication</label>
                <select value={twoFactor} onChange={(e) => setTwoFactor(e.target.value)}>
                  <option value="Enabled">Enabled</option>
                  <option value="Optional">Optional</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>User Activity Logging</label>
                <select>
                  <option>Enabled (Full Trail)</option>
                  <option>Basic Audit Only</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Card 3: Alert & Escalation Settings */}
        {isSectionVisible("alertEscalation") && (
          <div
            ref={alertEscalationRef}
            className={`mm-card mm-settings-card ${activeTab === "alertEscalation" ? "is-focused-section" : ""}`}
            onClick={() => {
              if (activeTab !== "alertEscalation") handleTabClick("alertEscalation", "Alert & Escalation Settings");
            }}
          >
            <div className="mm-card-head" style={{ cursor: "pointer" }}>
              <h2 className="mm-card-title">
                <Icon name="bell" size={16} /> Alert &amp; Escalation Settings
              </h2>
              <span className="mm-set-section-badge">Section 3</span>
            </div>

            <div className="mm-settings-form">
              <div className="mm-set-field">
                <label>Severity Rules</label>
                <select value={severityRules} onChange={(e) => setSeverityRules(e.target.value)}>
                  <option value="Custom Rules">Custom Rules</option>
                  <option value="DGMS Standard">DGMS Standard</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Alert Categories</label>
                <select>
                  <option>All Categories (Gas, Dust, Safety)</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Escalation Thresholds</label>
                <select value={escalationThreshold} onChange={(e) => setEscalationThreshold(e.target.value)}>
                  <option value="Configured">Configured (15 min auto-escalate)</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Assignment / Ownership</label>
                <select value={autoAssign} onChange={(e) => setAutoAssign(e.target.value)}>
                  <option value="Auto Assign">Auto Assign to Shift Manager</option>
                  <option value="Manual Dispatch">Manual Dispatch</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Notification Preferences</label>
                <select value={notifPref} onChange={(e) => setNotifPref(e.target.value)}>
                  <option value="Email + SMS + In-App">Email + SMS + In-App</option>
                  <option value="In-App Only">In-App Only</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Escalation Matrix</label>
                <select>
                  <option>Enabled (Colliery → Director)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Card 4: System / Data Settings */}
        {isSectionVisible("systemData") && (
          <div
            ref={systemDataRef}
            className={`mm-card mm-settings-card ${activeTab === "systemData" ? "is-focused-section" : ""}`}
            onClick={() => {
              if (activeTab !== "systemData") handleTabClick("systemData", "System & Data Preferences");
            }}
          >
            <div className="mm-card-head" style={{ cursor: "pointer" }}>
              <h2 className="mm-card-title">
                <Icon name="signal" size={16} /> System / Data Settings
              </h2>
              <span className="mm-set-section-badge">Section 4</span>
            </div>

            <div className="mm-settings-form">
              <div className="mm-set-field">
                <label>Sensor / Data Sources</label>
                <select>
                  <option>All Sensors (Gas, Water, Dust, Vibration)</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Sync Status &amp; Frequency</label>
                <select value={syncFreq} onChange={(e) => setSyncFreq(e.target.value)}>
                  <option value="Real-time (Live)">Real-time (Live)</option>
                  <option value="5 Minute Intervals">5 Minute Intervals</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Data / AI Engine Status</label>
                <select>
                  <option>Enabled (Active ML Risk Prediction)</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>Data Retention / Audit Trail</label>
                <select value={retention} onChange={(e) => setRetention(e.target.value)}>
                  <option value="12 Months">12 Months</option>
                  <option value="36 Months (Statutory)">36 Months (Statutory)</option>
                </select>
              </div>

              <div className="mm-set-field">
                <label>System Status</label>
                <div className="mm-system-status-ok">● Operational (All Systems Normal)</div>
              </div>

              <div className="mm-set-field">
                <label>Backup &amp; Recovery</label>
                <select value={backup} onChange={(e) => setBackup(e.target.value)}>
                  <option value="Scheduled (Daily)">Scheduled (Daily 02:00 AM)</option>
                  <option value="Continuous Sync">Continuous Cloud Sync</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="mm-card mm-settings-footer-card">
        <div className="mm-settings-footer-left">
          <strong>Actions</strong>
          <span>Apply or reset settings, or view change history.</span>
        </div>

        <div className="mm-settings-footer-right">
          <button type="button" className="mm-btn-save-main" onClick={handleSave}>
            💾 Save Changes
          </button>
          <button type="button" className="mm-btn-outline" onClick={handleReset}>
            ↺ Reset to Default
          </button>
          <button type="button" className="mm-btn-outline" onClick={() => onShowToast("Audit history log loaded", "info")}>
            📜 View Audit History
          </button>
        </div>
      </div>
    </div>
  );
}
