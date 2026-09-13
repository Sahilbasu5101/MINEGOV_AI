import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleGauge,
  ClipboardCheck,
  Globe2,
  Leaf,
  LockKeyhole,
  MapPinned,
  Menu,
  Moon,
  Radio,
  Repeat2,
  Search,
  ShieldCheck,
  Sun,
  Users,
} from "lucide-react";
import { MineMap } from "./components/MineMap";

const capabilities = [
  [Activity, "Real-time Monitoring"],
  [ShieldCheck, "Regulatory Compliance"],
  [Leaf, "Environmental Sustainability"],
  [Users, "Data-driven Governance"],
  [CircleGauge, "Operational Efficiency"],
  [Globe2, "Geospatial Intelligence"],
];

const modules = [
  [
    Building2,
    "Field Inspection App",
    "Offline-first evidence capture for teams in the field.",
    "01",
    "module-cyan",
  ],
  [
    BrainCircuit,
    "AI Risk Engine",
    "Explainable 0-100 risk scoring for every lease.",
    "02",
    "module-blue",
  ],
  [
    Repeat2,
    "Recurrence Intelligence",
    "Identify repeated incidents and emerging hotspots.",
    "03",
    "module-violet",
  ],
  [
    ClipboardCheck,
    "Corrective Action Workflow",
    "Evidence-backed verification with SLA tracking.",
    "04",
    "module-gold",
  ],
  [
    MapPinned,
    "GIS Risk Map",
    "A spatial view of compliance issues across operations.",
    "05",
    "module-green",
  ],
];

const updates = [
  ["08 Sep 2026", "Updated guidelines for mine safety compliance"],
  ["05 Sep 2026", "AI-based anomaly detection module deployed"],
  ["01 Sep 2026", "Environmental monitoring dashboard enhanced"],
];

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function ActionArrow() {
  return <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />;
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="MineGov AI home">
      <span className="brand-emblem">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
          alt="Government of India emblem"
        />
      </span>
      <span className="brand-copy">
        <small>Government of India</small>
        <strong>Ministry of Mines</strong>
        <em>National Mining Intelligence &amp; Surveillance</em>
      </span>
    </a>
  );
}

export function LandingPage({ onEnterMineGov, onEnterRegulatory }) {
  const [isLight, setIsLight] = useState(false);
  const [textScale, setTextScale] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main
      className={`landing-page ${isLight ? "light-mode" : ""}`}
      style={{ "--text-scale": textScale }}
    >
      <header className="site-header">
        <Brand />
        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <a className="active" href="#top">
            Home
          </a>
          <a href="#platform">About</a>
          <a href="#platform">
            Platform <ChevronDown size={12} />
          </a>
          <a href="#compliance">
            Compliance <ChevronDown size={12} />
          </a>
          <a href="#intelligence">
            Intelligence <ChevronDown size={12} />
          </a>
          <a href="#resources">
            Resources <ChevronDown size={12} />
          </a>
        </nav>
        <div className="header-actions">
          <button className="search-button" type="button" aria-label="Search">
            <Search size={15} />
            <span>Search...</span>
          </button>
          <div className="type-controls" aria-label="Text size controls">
            <button
              type="button"
              onClick={() => setTextScale(Math.max(0.92, textScale - 0.04))}
            >
              A-
            </button>
            <button type="button" onClick={() => setTextScale(1)}>
              A
            </button>
            <button
              type="button"
              onClick={() => setTextScale(Math.min(1.12, textScale + 0.04))}
            >
              A+
            </button>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label="Toggle theme"
            onClick={() => setIsLight(!isLight)}
          >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button className="language-button" type="button">
            <Globe2 size={14} /> EN <ChevronDown size={12} />
          </button>
          <button
            className="gateway-nav-button"
            type="button"
            onClick={onEnterMineGov}
            title="Open Role-Based Access Gateway"
          >
            <LockKeyhole size={13} /> Gateway Login
          </button>
          <button
            className="mobile-menu"
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={20} />
          </button>
          <span className="azadi-badge" aria-label="Azadi ka Amrit Mahotsav">
            <strong>75</strong>
            <span>
              Azadi Ka
              <br />
              Amrit Mahotsav
            </span>
          </span>
        </div>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-grid-lines" aria-hidden="true"></div>
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={reveal}
        >
          <p className="eyebrow">
            <span></span> SAFE MINES &nbsp; | &nbsp; RESPONSIBLE MINERALS &nbsp;
            | &nbsp; A STRONGER INDIA
          </p>
          <h1>
            Intelligent Mining
            <br />
            <em>for a Safer Tomorrow</em>
          </h1>
          <p className="hero-description">
            MineGov AI is a unified digital platform for monitoring, analysing
            and managing mining operations with real-time data, AI-driven
            insights and geospatial intelligence.
          </p>
          <div className="hero-actions">
            <button
              className="primary-action"
              type="button"
              onClick={onEnterMineGov}
            >
              <Building2 size={19} />{" "}
              <span>
                Enter MineGov AI
                <small>For CIL &amp; Mine Operational Users</small>
              </span>
              <ActionArrow />
            </button>
            <button
              className="secondary-action"
              type="button"
              onClick={onEnterRegulatory}
            >
              <ShieldCheck size={20} />{" "}
              <span>
                Regulatory Access
                <small>For Government &amp; Regulatory Officials</small>
              </span>
              <ActionArrow />
            </button>
          </div>
          <p className="access-note">
            <LockKeyhole size={13} /> Authorised access only. All activities are
            logged and monitored.
          </p>
        </motion.div>
        <motion.div
          className="hero-map-panel"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="map-panel-top">
            <span>
              <span className="pulse-dot"></span> LIVE OPERATIONS VIEW
            </span>
            <span>GEVRA / SECL · 22.3382° N, 82.5460° E</span>
          </div>
          <MineMap />
          <div className="map-floating-tag tag-one">
            <Radio size={13} /> Real-time Monitoring
          </div>
          <div className="map-floating-tag tag-two">
            <CheckCircle2 size={13} /> Safer Operations
          </div>
          <div className="map-floating-tag tag-three">
            <Leaf size={13} /> Sustainable Growth
          </div>
        </motion.div>
      </section>

      <section className="capability-strip" aria-label="Platform capabilities">
        {capabilities.map(([Icon, title]) => (
          <div className="capability" key={title}>
            <span className="capability-icon">
              <Icon size={17} />
            </span>
            <span>{title}</span>
          </div>
        ))}
      </section>

      <motion.section
        className="modules-section content-width"
        id="platform"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={reveal}
      >
        <div className="section-heading">
          <div>
            <p className="section-kicker">THE MINEGOV AI PLATFORM</p>
            <h2>
              One command center.
              <br />
              <span>Every layer of assurance.</span>
            </h2>
          </div>
          <p className="section-intro">
            From the pit to policy, connect evidence, intelligence and action in
            one trusted operating picture.
          </p>
        </div>
        <div className="module-grid">
          {modules.map(([Icon, title, text, number, tone], index) => (
            <motion.article
              className={`module-card ${tone}`}
              key={title}
              variants={reveal}
              transition={{ delay: index * 0.06 }}
            >
              <div className="module-card-top">
                <span className="module-icon">
                  <Icon size={21} />
                </span>
                <span className="module-number">{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#intelligence" aria-label={`Explore ${title}`}>
                <ArrowRight size={16} />
              </a>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="impact-section content-width"
        id="intelligence"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={reveal}
      >
        <div className="impact-header">
          <div>
            <p className="section-kicker">PLATFORM PULSE / 2026</p>
            <h2>Measured for impact.</h2>
          </div>
          <span className="live-chip">
            <span className="status-dot is-live"></span> Systems operational
          </span>
        </div>
        <div className="impact-grid">
          <div className="stat">
            <strong>1,420</strong>
            <span>
              Active Leases
              <br />
              Monitored
            </span>
          </div>
          <div className="stat">
            <strong>
              280<span>+</span>
            </strong>
            <span>
              Mines
              <br />
              Integrated
            </span>
          </div>
          <div className="stat">
            <strong>
              24<span>x7</span>
            </strong>
            <span>
              Satellite &amp; IoT
              <br />
              Surveillance
            </span>
          </div>
          <div className="stat">
            <strong>
              100<span>%</span>
            </strong>
            <span>
              Towards Sustainable
              <br />
              &amp; Compliant Mining
            </span>
          </div>
          <div className="updates-panel" id="resources">
            <div className="updates-title">
              <Bell size={15} /> <strong>What's New</strong>
              <a href="#resources">
                View all <ArrowRight size={13} />
              </a>
            </div>
            {updates.map(([date, text]) => (
              <div className="update" key={date}>
                <span className="update-dot"></span>
                <time>{date}</time>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <footer className="site-footer" id="compliance">
        <Brand />
        <div className="footer-links">
          <a href="#top">Privacy Policy</a>
          <a href="#top">Terms of Use</a>
          <a href="#top">Accessibility</a>
          <a href="#top">Help</a>
          <a href="#top">Contact Us</a>
        </div>
        <div className="footer-right">
          <span className="social-links">
            <a href="#top" aria-label="LinkedIn">
              in
            </a>
            <a href="#top" aria-label="X">
              X
            </a>
            <a href="#top" aria-label="YouTube">
              ▶
            </a>
          </span>
          <span className="footer-language">
            <Globe2 size={14} /> English <ChevronDown size={12} />
          </span>
        </div>
      </footer>
    </main>
  );
}
