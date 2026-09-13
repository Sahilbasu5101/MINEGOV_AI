import { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  ClipboardCheck,
  Activity,
  MapPin,
  CheckCircle2,
  Info,
  ChevronRight,
  ExternalLink,
  Lock,
} from "lucide-react";
import { REGULATORY_AUTHORITIES } from "../models/rolesData";
import { LoginModal } from "./components/LoginModal";

export function RegulatoryGateway({ onNavigateToHome, onNavigateToDashboard }) {
  const [selectedAuth, setSelectedAuth] = useState(REGULATORY_AUTHORITIES[0]);

  // Modal popup state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRoleData, setModalRoleData] = useState(null);

  // When user clicks any of the 6 authority cards: Open the Login Window Popup immediately!
  const handleAuthorityCardClick = (auth) => {
    setSelectedAuth(auth);
    setModalRoleData({
      id: auth.id,
      title: auth.fullName,
      modalTitle: auth.badgeLabel || `Login for ${auth.title} Officials`,
      badgeLabel: auth.badgeLabel || `Login for ${auth.title} Officials`,
      icon: auth.icon,
      levelTag: auth.levelTag,
      scopeDescription: auth.scopeDescription,
      defaultEmail: auth.defaultEmail,
      redirectHash: auth.redirectHash,
    });
    setIsModalOpen(true);
  };

  const handleModalAuth = (role) => {
    setIsModalOpen(false);
    onNavigateToDashboard(role.redirectHash);
  };

  return (
    <div className="reg-gateway-page">
      {/* Top Navbar */}
      <header className="reg-top-bar">
        <div className="reg-brand-group">
          <div className="reg-emblem-wrap">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="Emblem of India"
            />
          </div>
          <div className="reg-brand-titles">
            <strong>Ministry of Mines</strong>
            <small>Government of India</small>
            <em>National Mining Intelligence &amp; Surveillance</em>
          </div>
          <div className="reg-divider-v"></div>
          <div className="reg-app-title">
            <strong>MineGov AI</strong>
            <span>Secure • Compliant • Sustainable</span>
          </div>
        </div>

        <div className="reg-top-actions">
          <div className="reg-status-indicator">
            <span className="pulse-dot green"></span>
            <div>
              <strong>System Online</strong>
              <small>Last updated: 12 Sep 2026, 19:56</small>
            </div>
          </div>
          <button
            type="button"
            className="reg-back-home-btn"
            onClick={onNavigateToHome}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Banner Heading */}
      <section className="reg-heading-section">
        <div className="reg-heading-left">
          <p className="reg-eyebrow">
            <span className="reg-dash">—</span> REGULATORY ACCESS GATEWAY
          </p>
          <h1 className="reg-title">
            Authorised Regulatory <span className="reg-title-highlight">Access</span>
          </h1>
          <p className="reg-subtitle">
            Select your regulatory authority to access MineGov AI compliance data and insights.
          </p>
        </div>

        <div className="reg-heading-right">
          <div className="reg-slogan-card">
            <p className="reg-slogan-top">
              COLLABORATIVE REGULATION FOR SAFER AND SUSTAINABLE MINING
            </p>
            <div className="reg-map-graphic">
              <span className="map-node node-1"></span>
              <span className="map-node node-2"></span>
              <span className="map-node node-3"></span>
              <span className="map-node node-4"></span>
              <svg viewBox="0 0 100 80" className="map-svg-lines">
                <path
                  d="M20,20 L45,35 L75,25 L60,65 L45,35"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.35)"
                  strokeWidth="1.2"
                  strokeDasharray="2,2"
                />
              </svg>
            </div>
            <p className="reg-slogan-bottom">PEOPLE • PLANET • PRODUCTIVITY • PROGRESS</p>
          </div>
        </div>
      </section>

      {/* Main Grid: Left Stepper & Authorities | Right Scope & Actions */}
      <div className="reg-main-layout reg-clean-layout">
        {/* LEFT COLUMN: Stepper + 6 Regulatory Authority Cards */}
        <div className="reg-left-col">
          {/* Step 1 */}
          <div className="reg-step-box">
            <div className="reg-step-header">
              <span className="reg-step-number active">1</span>
              <div>
                <h2 className="reg-step-title">Select Your Regulatory Authority</h2>
                <p className="reg-step-desc">
                  Click any department box to open the secure role-based login window.
                </p>
              </div>
            </div>

            {/* 6 Authority Cards (3x2 Grid) */}
            <div className="reg-authorities-grid">
              {REGULATORY_AUTHORITIES.map((auth) => {
                const Icon = auth.icon;
                const isSelected = selectedAuth.id === auth.id;
                return (
                  <button
                    key={auth.id}
                    type="button"
                    className={`reg-auth-card ${isSelected ? "selected" : ""}`}
                    onClick={() => handleAuthorityCardClick(auth)}
                  >
                    <div
                      className="reg-auth-icon-wrap"
                      style={{ background: auth.iconBg, color: auth.iconColor }}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="reg-auth-text">
                      <strong className="reg-auth-code">{auth.title}</strong>
                      <span className="reg-auth-full">{auth.fullName}</span>
                      <span className="reg-auth-action-tag">Click to Login Window →</span>
                    </div>
                    <ChevronRight size={16} className="reg-auth-arrow" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stepper Inactive Steps (2, 3, 4, 5) */}
          <div className="reg-subsequent-steps">
            <div className="reg-step-row inactive">
              <span className="reg-step-number inactive">2</span>
              <div>
                <strong>Select Your Office / Region</strong>
                <span>Choose your regional office or jurisdiction</span>
              </div>
            </div>
            <div className="reg-step-row inactive">
              <span className="reg-step-number inactive">3</span>
              <div>
                <strong>Select Relevant Mine / Project</strong>
                <span>Search and select mine(s) under your regulatory purview</span>
              </div>
            </div>
            <div className="reg-step-row inactive">
              <span className="reg-step-number inactive">4</span>
              <div>
                <strong>Select Your Official Role</strong>
                <span>Choose your authorized role to access the system</span>
              </div>
            </div>
            <div className="reg-step-row inactive">
              <span className="reg-step-number inactive">5</span>
              <div>
                <strong>Authenticate</strong>
                <span>Login using your government credentials or biometric authentication</span>
              </div>
            </div>
          </div>

          {/* Background Quarry Vignette Note */}
          <div className="reg-quarry-note">
            <span className="quarry-kicker">REGULATING TODAY FOR A SAFER TOMORROW</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Access Scope & Official Authority Status Card */}
        <div className="reg-right-col reg-right-col-clean">
          {/* Official Clearance Launcher Card */}
          <div className="reg-clearance-launcher-card">
            <div className="launcher-badge">
              <Lock size={14} /> SECURE ROLE-BASED ACCESS
            </div>
            <h3 className="launcher-title">{selectedAuth.fullName}</h3>
            <p className="launcher-desc">
              Authorized surveillance, statutory monitoring, and clearance portal. Click below to
              launch the credentials login window.
            </p>
            <button
              type="button"
              className="reg-launch-popup-btn"
              onClick={() => handleAuthorityCardClick(selectedAuth)}
            >
              <span>Launch {selectedAuth.code} Login Window</span>
              <ExternalLink size={16} />
            </button>
          </div>

          {/* Access Scope Panel */}
          <aside className="reg-scope-card">
            <div className="reg-scope-header">
              <div className="reg-scope-icon-box">
                <ShieldCheck size={22} />
              </div>
              <div>
                <strong className="reg-scope-title">Access Scope</strong>
                <small className="reg-scope-sub">Role-based access to authorised data only</small>
              </div>
            </div>

            <div className="reg-scope-list">
              <div className="reg-scope-item">
                <ShieldCheck size={16} className="reg-scope-item-icon" />
                <span>Safety Compliance</span>
              </div>
              <div className="reg-scope-item">
                <FileText size={16} className="reg-scope-item-icon" />
                <span>Inspection Reports</span>
              </div>
              <div className="reg-scope-item">
                <ClipboardCheck size={16} className="reg-scope-item-icon" />
                <span>Regulatory Approvals</span>
              </div>
              <div className="reg-scope-item">
                <Activity size={16} className="reg-scope-item-icon" />
                <span>Environmental Monitoring</span>
              </div>
              <div className="reg-scope-item">
                <MapPin size={16} className="reg-scope-item-icon" />
                <span>Violation Tracking</span>
              </div>
              <div className="reg-scope-item">
                <CheckCircle2 size={16} className="reg-scope-item-icon" />
                <span>Corrective Actions</span>
              </div>
            </div>

            <div className="reg-scope-notice">
              <Info size={16} className="notice-icon" />
              <p>
                Access is restricted to authorised government officials only. All activities are
                logged and monitored.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="reg-footer">
        <div className="reg-footer-left">
          <strong>Ministry of Mines</strong>
          <span>Government of India</span>
        </div>
        <div className="reg-footer-links">
          <a href="#top">Privacy Policy</a>
          <a href="#top">Terms of Use</a>
          <a href="#top">Accessibility</a>
          <a href="#top">Help</a>
          <a href="#top">Contact Us</a>
        </div>
        <div className="reg-footer-right">
          <span className="indian-flag-badge">🇮🇳 भारत सरकार</span>
        </div>
      </footer>

      {/* Role-based login window popup modal */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roleData={modalRoleData}
        onAuthenticate={handleModalAuth}
      />
    </div>
  );
}
