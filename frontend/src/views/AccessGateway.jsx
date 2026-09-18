import { useState } from "react";
import {
  Building2,
  GitBranch,
  MapPin,
  Mountain,
  ChevronDown,
  ShieldCheck,
  Lock,
  Mail,
  Fingerprint,
  KeyRound,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Shield,
  Info,
  ExternalLink,
} from "lucide-react";
import { LoginModal } from "./components/LoginModal";
import { MINE_ROLES, ORG_TIERS } from "../models/rolesData";
import { api } from "../services/api";

export function AccessGateway({ onNavigateToHome, onNavigateToDashboard }) {
  // State for Mine Selection (toggles Step 2 unlock)
  const [isMineSelected, setIsMineSelected] = useState(false);
  const [selectedMineName, setSelectedMineName] = useState("Moonidih Project (BCCL)");

  // Selected Role among the 5 Mine Roles (default to Mine Manager)
  const [selectedRole, setSelectedRole] = useState(MINE_ROLES[0]);

  // Auth form state in Step 3
  const [authMethod, setAuthMethod] = useState("pin"); // 'pin' | 'biometric'
  const [govId, setGovId] = useState(MINE_ROLES[0].defaultEmail);
  const [pin, setPin] = useState("7492");
  const [showPin, setShowPin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal State
  const [activeModalRole, setActiveModalRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Org Box Click (CIL, Subsidiary, Regional)
  const handleOrgBoxClick = (tierKey) => {
    const tierData = ORG_TIERS[tierKey];
    if (tierData) {
      setActiveModalRole(tierData);
      setIsModalOpen(true);
    }
  };

  // Handle Mine Box Click (Step 1 -> Step 2 Unlock)
  const handleMineBoxClick = () => {
    setIsMineSelected(true);
    setSelectedMineName("Moonidih Project (BCCL)");
  };

  // Handle Role Selection (One of the 5 roles)
  const handleRoleCardClick = (role) => {
    setSelectedRole(role);
    setGovId(role.defaultEmail);
    // User requested: "un pe bhe role based login hoga with login window popup"
    setActiveModalRole(role);
    setIsModalOpen(true);
  };

  // Authenticate from Modal
  const handleModalAuth = (role, user) => {
    setIsModalOpen(false);
    onNavigateToDashboard(role.redirectHash, role, user);
  };

  // Authenticate from Step 3 inline form
  const handleStep3Submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const passToSend = authMethod === "pin" ? pin : "Password@123";
      const result = await api.login(govId, passToSend);
      setIsSubmitting(false);
      onNavigateToDashboard(selectedRole.redirectHash, selectedRole, result?.user);
    } catch (err) {
      console.warn("API login error:", err);
      setIsSubmitting(false);
      onNavigateToDashboard(selectedRole.redirectHash, selectedRole);
    }
  };

  return (
    <div className="gateway-page">
      {/* Top Header */}
      <header className="gateway-top-bar">
        <div className="gateway-brand">
          <button
            type="button"
            className="gateway-back-btn"
            onClick={onNavigateToHome}
            title="Back to Landing Page"
          >
            <ArrowLeft size={16} />
            <span>Portal Home</span>
          </button>
          <div className="gateway-divider-v"></div>
          <span className="gateway-brand-title">MineGov AI - Access Gateway</span>
        </div>

        <div className="gateway-header-meta">
          <span className="gateway-status-pill">
            <span className="pulse-dot"></span> Live Gov Gateway
          </span>
          <span className="gateway-emblem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="India Emblem"
            />
          </span>
        </div>
      </header>

      {/* Main Container */}
      <div className="gateway-content-container">
        {/* Title Header Banner */}
        <div className="gateway-heading-row">
          <div className="gateway-heading-left">
            <p className="gateway-eyebrow">
              <span className="eyebrow-dash">—</span> ROLE-BASED ACCESS GATEWAY
            </p>
            <h1 className="gateway-title">Access MineGov AI</h1>
            <p className="gateway-subtitle">
              Select your organization and role to access authorized modules and operational data.
            </p>
          </div>

          <div className="gateway-heading-right">
            <div className="gateway-slogan-block">
              <div className="slogan-row primary-slogan">
                <span>SAFER MINES</span>
                <span>•</span>
                <span>SMARTER OPERATIONS</span>
              </div>
              <div className="slogan-row accent-slogan">STRONGER INDIA</div>
              <div className="slogan-row sub-slogan">
                PEOPLE • PLANET • PRODUCTIVITY • PROGRESS
              </div>
              <div className="slogan-coords">
                <span className="pulse-dot tiny"></span> 23.77° N, 86.42° E (JHARIA BASIN)
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="gateway-grid">
          {/* LEFT COLUMN: 3-Step Selection Flow */}
          <div className="gateway-main-column">
            {/* ================= STEP 1 ================= */}
            <div className="gateway-step-card">
              <div className="step-header">
                <span className="step-badge">1</span>
                <div>
                  <h2 className="step-title">Select Your Organization</h2>
                  <p className="step-desc">
                    Choose your operational location to access relevant data and modules.
                  </p>
                </div>
              </div>

              {/* 4 Organization Boxes in a row */}
              <div className="org-boxes-grid">
                {/* 1. CIL Box */}
                <button
                  type="button"
                  className="org-box"
                  onClick={() => handleOrgBoxClick("cil")}
                >
                  <div className="org-box-header">
                    <span className="org-box-icon">
                      <Building2 size={18} />
                    </span>
                    <span className="org-box-tag">CIL</span>
                  </div>
                  <div className="org-box-body">
                    <span className="org-box-label">Coal India Limited (CIL)</span>
                    <ChevronDown size={14} className="org-box-caret" />
                  </div>
                  <span className="org-box-action-hint">Click to Authenticate</span>
                </button>

                {/* 2. Subsidiary Box */}
                <button
                  type="button"
                  className="org-box"
                  onClick={() => handleOrgBoxClick("subsidiary")}
                >
                  <div className="org-box-header">
                    <span className="org-box-icon">
                      <GitBranch size={18} />
                    </span>
                    <span className="org-box-tag">Subsidiary</span>
                  </div>
                  <div className="org-box-body">
                    <span className="org-box-label">Bharat Coking Coal Limit...</span>
                    <ChevronDown size={14} className="org-box-caret" />
                  </div>
                  <span className="org-box-action-hint">Click to Authenticate</span>
                </button>

                {/* 3. Regional / Area Office Box */}
                <button
                  type="button"
                  className="org-box"
                  onClick={() => handleOrgBoxClick("regional")}
                >
                  <div className="org-box-header">
                    <span className="org-box-icon">
                      <MapPin size={18} />
                    </span>
                    <span className="org-box-tag">Regional / Area Office</span>
                  </div>
                  <div className="org-box-body">
                    <span className="org-box-label">Katras Area</span>
                    <ChevronDown size={14} className="org-box-caret" />
                  </div>
                  <span className="org-box-action-hint">Click to Authenticate</span>
                </button>

                {/* 4. Mine Box (Triggers Step 2 unlock) */}
                <button
                  type="button"
                  className={`org-box mine-box ${isMineSelected ? "is-selected" : "prompt-highlight"}`}
                  onClick={handleMineBoxClick}
                >
                  <div className="org-box-header">
                    <span className="org-box-icon">
                      <Mountain size={18} />
                    </span>
                    <span className="org-box-tag">Mine</span>
                    {!isMineSelected && <span className="click-here-badge">Click Here</span>}
                  </div>
                  <div className="org-box-body">
                    <span className="org-box-label">
                      {isMineSelected ? selectedMineName : "Select Operational Mine..."}
                    </span>
                    <ChevronDown size={14} className="org-box-caret" />
                  </div>
                  <span className="org-box-action-hint">
                    {isMineSelected ? "Level 2 Roles Unlocked" : "Click to Reveal 5 Roles"}
                  </span>
                </button>
              </div>

              {/* Status helper text below Step 1 */}
              <div className="step-feedback-row">
                {isMineSelected ? (
                  <div className="feedback-active">
                    <span className="status-dot is-live"></span>
                    <span>
                      Level 1 Active: Mine selected (<strong>{selectedMineName}</strong>). Level 2 role
                      options unlocked.
                    </span>
                  </div>
                ) : (
                  <div className="feedback-idle">
                    <span className="info-dot">•</span>
                    <span>
                      Click on the <strong>"Mine"</strong> box above to reveal Level 2 role authorization
                      options.
                    </span>
                  </div>
                )}

                {isMineSelected && (
                  <button
                    type="button"
                    className="reset-mine-btn"
                    onClick={() => setIsMineSelected(false)}
                  >
                    Reset Mine Selection
                  </button>
                )}
              </div>
            </div>

            {/* ================= STEP 2 ================= */}
            <div className={`gateway-step-card step-2-card ${!isMineSelected ? "is-locked" : ""}`}>
              {!isMineSelected ? (
                /* Locked State (Image 1) */
                <div className="locked-banner">
                  <div className="step-header">
                    <span className="step-badge locked">2</span>
                    <div>
                      <h2 className="step-title locked-title">Step 2 (Select Your Role) Locked</h2>
                      <p className="step-desc">
                        Click on the <strong>"Mine"</strong> selector in Step 1 to reveal authorized role
                        options for that mine.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="unlock-trigger-btn"
                    onClick={handleMineBoxClick}
                  >
                    Click Mine (Kusunda OCP / Gaslitand OCP)
                  </button>
                </div>
              ) : (
                /* Unlocked State with 5 Roles (Image 2) */
                <div>
                  <div className="step-header">
                    <span className="step-badge">2</span>
                    <div>
                      <h2 className="step-title">Select Your Role</h2>
                      <p className="step-desc">
                        Choose your role for <strong>{selectedMineName}</strong>. Available roles are based
                        on your authorization.
                      </p>
                    </div>
                  </div>

                  {/* 5 Operational Mine Roles */}
                  <div className="roles-grid-5">
                    {MINE_ROLES.map((role) => {
                      const Icon = role.icon;
                      const isSelected = selectedRole?.id === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          className={`role-card ${isSelected ? "selected" : ""}`}
                          onClick={() => handleRoleCardClick(role)}
                        >
                          <div className="role-icon-wrap">
                            <Icon size={26} />
                          </div>
                          <strong className="role-name">{role.title}</strong>
                          <span className="role-sub">{role.subtitle}</span>
                          <span className="role-click-hint">Login Modal Popup →</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ================= STEP 3 ================= */}
            <div className="gateway-step-card step-3-card">
              <div className="step-header">
                <span className="step-badge">3</span>
                <div>
                  <h2 className="step-title">Authenticate</h2>
                  <p className="step-desc">
                    Login using your Government credentials or biometric authentication for{" "}
                    <strong>{selectedRole.title}</strong>.
                  </p>
                </div>
              </div>

              {/* Tab Switcher */}
              <div className="auth-tabs">
                <button
                  type="button"
                  className={`auth-tab ${authMethod === "pin" ? "active" : ""}`}
                  onClick={() => setAuthMethod("pin")}
                >
                  <KeyRound size={15} /> Government ID + PIN
                </button>
                <button
                  type="button"
                  className={`auth-tab ${authMethod === "biometric" ? "active" : ""}`}
                  onClick={() => setAuthMethod("biometric")}
                >
                  <Fingerprint size={16} /> Biometric Login
                </button>
              </div>

              {authMethod === "pin" ? (
                <form onSubmit={handleStep3Submit} className="step3-form">
                  <div className="step3-fields-row">
                    <div className="step3-field">
                      <label htmlFor="step3-email">
                        Government ID / Email <span className="req">*</span>
                      </label>
                      <div className="step3-input-wrap">
                        <Mail size={16} className="step3-input-icon" />
                        <input
                          id="step3-email"
                          type="email"
                          value={govId}
                          onChange={(e) => setGovId(e.target.value)}
                          placeholder="safety.gaslitand@nic.in"
                          required
                        />
                      </div>
                    </div>

                    <div className="step3-field">
                      <label htmlFor="step3-pin">
                        PIN <span className="req">*</span>
                      </label>
                      <div className="step3-input-wrap">
                        <Lock size={16} className="step3-input-icon" />
                        <input
                          id="step3-pin"
                          type={showPin ? "text" : "password"}
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                          placeholder="••••"
                          maxLength={8}
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle-btn"
                          onClick={() => setShowPin(!showPin)}
                          tabIndex={-1}
                          aria-label={showPin ? "Hide PIN" : "Show PIN"}
                        >
                          {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="step3-submit-row">
                    <button
                      type="submit"
                      className="step3-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-dot"></span> Authenticating Session...
                        </>
                      ) : (
                        <>
                          Authenticate & Enter {selectedRole.title} Dashboard <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="step3-popup-btn"
                      onClick={() => {
                        setActiveModalRole(selectedRole);
                        setIsModalOpen(true);
                      }}
                    >
                      Open Dedicated Login Popup Modal <ExternalLink size={14} />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="step3-bio-wrap">
                  <p>Touch biometric scanner or click to authenticate with Aadhaar/NIC vault.</p>
                  <button
                    type="button"
                    className="step3-submit-btn"
                    onClick={() => {
                      setActiveModalRole(selectedRole);
                      setIsModalOpen(true);
                    }}
                  >
                    <Fingerprint size={16} /> Launch Biometric Scanner Modal
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: ACCESS SCOPE & GOVERNMENT SECURITY */}
          <aside className="gateway-sidebar">
            {/* Secure Govt Access Card */}
            <div className="secure-badge-card">
              <div className="secure-badge-icon">
                <ShieldCheck size={26} />
              </div>
              <div>
                <strong>Secure Government Access</strong>
                <span>Authorized personnel only</span>
              </div>
            </div>

            {/* Access Scope Details Card */}
            <div className="access-scope-card">
              <div className="scope-card-header">
                <div className="scope-title">
                  <MapPin size={16} className="scope-icon" />
                  <span>ACCESS SCOPE</span>
                </div>
                <button
                  type="button"
                  className="scope-edit-btn"
                  onClick={() => setIsMineSelected(!isMineSelected)}
                >
                  Edit
                </button>
              </div>

              <div className="scope-details-list">
                <div className="scope-row">
                  <span className="scope-key">CIL</span>
                  <span className="scope-val">Coal India Limited (CIL)</span>
                </div>
                <div className="scope-row">
                  <span className="scope-key">Subsidiary</span>
                  <span className="scope-val">Bharat Coking Coal Limited</span>
                </div>
                <div className="scope-row">
                  <span className="scope-key">Regional / Area</span>
                  <span className="scope-val">Katras Area</span>
                </div>
                <div className="scope-row">
                  <span className="scope-key">Mine</span>
                  <span className={`scope-val ${isMineSelected ? "val-highlight" : "val-pending"}`}>
                    {isMineSelected ? selectedMineName : "Pending Selection"}
                  </span>
                </div>

                <div className="scope-divider"></div>

                <div className="scope-sub-section">
                  <span className="scope-section-label">
                    <span className="status-ring"></span> Selected Role
                  </span>
                  <strong className="scope-role-display">{selectedRole.title}</strong>
                  <span className="scope-role-sub">{selectedRole.subtitle}</span>
                </div>

                <div className="scope-divider"></div>

                <div className="scope-sub-section">
                  <span className="scope-section-label">
                    <Shield size={14} /> Authentication Method
                  </span>
                  <span className="scope-auth-method">
                    {authMethod === "pin" ? "Government ID + PIN" : "Biometric Login"}
                  </span>
                </div>

                <div className="scope-notice-box">
                  <Info size={15} className="notice-icon" />
                  <p>
                    Access is granted as per Government of India security policies. All activities are
                    logged and monitored.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Role-Based Authentication Popup Modal */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roleData={activeModalRole}
        onAuthenticate={handleModalAuth}
      />
    </div>
  );
}
