// All dummy data for the Mine Manager Dashboard.
// Replace these with API calls once the backend is ready.

export const mineInfo = {
  name: "Sukhdev Mine",
  shift: "Day Shift",
  date: "11 Sep 2026",
  manager: { name: "Rahul Kumar", role: "Mine Manager", initials: "RK" },
  lastUpdated: "11 Sep 2026, 10:30 AM",
};

export const pits = [
  { id: 1, name: "North Pit", status: "normal", top: "18%", left: "48%" },
  { id: 2, name: "West Pit", status: "warning", top: "48%", left: "14%" },
  { id: 3, name: "Main Pit", status: "critical", top: "52%", left: "45%" },
  { id: 4, name: "East Pit", status: "normal", top: "58%", left: "76%" },
  {
    id: 5,
    name: "Processing Plant",
    status: "offline",
    top: "82%",
    left: "46%",
  },
];

export const availableMines = [
  { id: "sukhdev", name: "Sukhdev Mine (BCCL)", area: "Dhanbad Coal Basin", shift: "Day Shift", type: "Mixed OCP / Deep Pit", manager: "Rahul Kumar", alertsCount: 3, riskScore: 58 },
  { id: "gaslitand", name: "Gaslitand OCP", area: "Katras Area Office", shift: "Day Shift", type: "Open Cast Project", manager: "Rahul Kumar", alertsCount: 5, riskScore: 72 },
  { id: "kusunda", name: "Kusunda Open Cast", area: "Kusunda Regional Area", shift: "Day Shift", type: "Heavy Earth OCP", manager: "Rahul Kumar", alertsCount: 2, riskScore: 44 },
  { id: "moonidih", name: "Moonidih Underground", area: "Western Jharia Coalfield", shift: "Day Shift", type: "Longwall Caved UG", manager: "Rahul Kumar", alertsCount: 4, riskScore: 65 },
];

export const pitDetailsData = {
  1: { name: "North Pit", status: "normal", depth: "142m", output: "2,840 T/day", hemm: "6 Dumpers, 2 Shovels", ch4: "0.02%", co: "4 ppm", waterPumps: "Operational (Normal)", safetyRating: "96%" },
  2: { name: "West Pit", status: "warning", depth: "185m", output: "1,920 T/day", hemm: "4 Dumpers, 1 Shovel", ch4: "0.18%", co: "9 ppm", waterPumps: "Pump #2 Servicing", safetyRating: "82%" },
  3: { name: "Main Pit", status: "critical", depth: "260m", output: "3,100 T/day", hemm: "8 Dumpers, 3 Shovels", ch4: "0.45%", co: "14 ppm (High)", waterPumps: "Operational (High Flow)", safetyRating: "68%" },
  4: { name: "East Pit", status: "normal", depth: "110m", output: "1,450 T/day", hemm: "3 Dumpers, 1 Shovel", ch4: "0.05%", co: "5 ppm", waterPumps: "Operational", safetyRating: "94%" },
  5: { name: "Processing Plant", status: "offline", depth: "Surface", output: "6,200 T/day Cap.", hemm: "Conveyor Line 2", ch4: "N/A", co: "2 ppm", waterPumps: "Circulation OK", safetyRating: "88%" },
};

export const trendDataRanges = {
  "7D": {
    labels: ["5 Sep", "6 Sep", "7 Sep", "8 Sep", "9 Sep", "10 Sep", "11 Sep"],
    production: [6200, 7100, 6600, 7400, 7900, 8200, 8450],
    safetyAlerts: [6, 9, 5, 8, 7, 6, 9],
  },
  "14D": {
    labels: ["29 Aug", "31 Aug", "2 Sep", "4 Sep", "6 Sep", "8 Sep", "11 Sep"],
    production: [5800, 6400, 6900, 6600, 7100, 7800, 8450],
    safetyAlerts: [4, 7, 8, 5, 9, 6, 9],
  },
  "30D": {
    labels: ["12 Aug", "17 Aug", "22 Aug", "27 Aug", "1 Sep", "6 Sep", "11 Sep"],
    production: [5200, 5900, 6100, 6700, 7300, 8000, 8450],
    safetyAlerts: [8, 5, 11, 7, 6, 8, 9],
  },
};

export const trendData = trendDataRanges["7D"];

export const kpiCards = [
  {
    key: "safety",
    title: "Safety",
    value: "2",
    delta: "+1",
    trend: "up",
    label: "Active Safety Alerts",
    tone: "rose",
    icon: "shield",
  },
  {
    key: "environment",
    title: "Environment",
    value: "3",
    delta: "-2",
    trend: "down",
    label: "Parameter Exceedances",
    tone: "green",
    icon: "leaf",
  },
  {
    key: "production",
    title: "Production",
    value: "8,450",
    unit: "Tons",
    delta: "+6%",
    trend: "up",
    label: "Today's Output",
    tone: "blue",
    icon: "bars",
  },
  {
    key: "labour",
    title: "Labour",
    value: "182",
    label: "On Site",
    secondValue: "0",
    secondLabel: "Absent",
    tone: "violet",
    icon: "people",
  },
];

export const realtimeAlerts = [
  {
    id: 1,
    severity: "critical",
    title: "High CO Level Detected",
    location: "East Pit \u2013 Sensor E-12",
    time: "10:24 AM",
  },
  {
    id: 2,
    severity: "high",
    title: "Haul Truck Overspeed",
    location: "Truck HT-07",
    time: "09:50 AM",
  },
  {
    id: 3,
    severity: "critical",
    title: "Worker in Restricted Zone",
    location: "South Ramp",
    time: "09:15 AM",
  },
  {
    id: 4,
    severity: "high",
    title: "Dust Level High",
    location: "Crusher Area",
    time: "08:40 AM",
  },
  {
    id: 5,
    severity: "info",
    title: "Water Discharge Check Due",
    location: "Tailings Pond",
    time: "07:30 AM",
  },
];

export const riskScore = {
  score: 58,
  band: "Medium",
  factors: [
    "High dust levels in Crusher Area",
    "Increased haul truck speeding events",
    "Elevated methane levels in East Pit",
    "More workers in restricted zones",
  ],
};

export const authorityOrders = [
  {
    id: 1,
    text: "Immediate dust control measures at Crusher Area",
    date: "11 Sep 2026",
  },
  {
    id: 2,
    text: "Inspect haul roads after heavy rainfall",
    date: "10 Sep 2026",
  },
  {
    id: 3,
    text: "Safety drill to be conducted next week",
    date: "09 Sep 2026",
  },
];

export const recentActivity = [
  {
    id: 1,
    time: "10:24 AM",
    type: "Alert",
    description: "High CO level detected (Sensor E-12)",
    location: "East Pit",
    icon: "warning",
    severity: "critical",
  },
  {
    id: 2,
    time: "09:50 AM",
    type: "Event",
    description: "Haul truck HT-07 overspeed (72 km/h)",
    location: "Main Ramp",
    icon: "truck",
    severity: "high",
  },
  {
    id: 3,
    time: "08:40 AM",
    type: "Alert",
    description: "Dust level high (PM2.5: 120 \u00b5g/m\u00b3)",
    location: "Crusher Area",
    icon: "wind",
    severity: "high",
  },
  {
    id: 4,
    time: "07:15 AM",
    type: "Info",
    description: "Daily production target 85% achieved",
    location: "Processing Plant",
    icon: "bars",
    severity: "info",
  },
  {
    id: 5,
    time: "06:45 AM",
    type: "Event",
    description: "Shift handover completed successfully",
    location: "Admin Block",
    icon: "clipboard",
    severity: "info",
  },
  {
    id: 6,
    time: "06:30 AM",
    type: "Info",
    description: "182 workers checked in via biometric",
    location: "Main Gate",
    icon: "people",
    severity: "info",
  },
];

export const navItems = [
  { key: "dashboard", label: "Dashboard", icon: "home" },
  { key: "live", label: "Live Monitoring", icon: "signal" },
  { key: "map", label: "Mine Map", icon: "map" },
  { key: "reports", label: "Reports", icon: "doc" },
  { key: "alerts", label: "Alerts", icon: "bell", badge: 3 },
  { key: "settings", label: "Settings", icon: "gear" },
];

/* -------- Detail data for panels/modals -------- */

export const sectionDetails = {
  safety: {
    title: "Safety Overview",
    icon: "shield",
    items: [
      { label: "Active Alerts", value: "2", status: "critical" },
      { label: "Incidents Today", value: "0", status: "ok" },
      { label: "Near Misses (Week)", value: "3", status: "warning" },
      { label: "Safety Score", value: "87/100", status: "ok" },
      { label: "Last Incident", value: "14 days ago", status: "ok" },
      { label: "PPE Compliance", value: "96%", status: "ok" },
    ],
  },
  environment: {
    title: "Environment Status",
    icon: "leaf",
    items: [
      { label: "PM2.5 Level", value: "120 µg/m³", status: "critical" },
      { label: "PM10 Level", value: "95 µg/m³", status: "warning" },
      { label: "Noise Level", value: "72 dB", status: "ok" },
      { label: "Water pH", value: "7.2", status: "ok" },
      { label: "CO Level", value: "8 ppm", status: "warning" },
      { label: "Methane", value: "0.3%", status: "ok" },
    ],
  },
  production: {
    title: "Production Details",
    icon: "bars",
    items: [
      { label: "Today's Output", value: "8,450 Tons", status: "ok" },
      { label: "Target", value: "10,000 Tons", status: "info" },
      { label: "Achievement", value: "84.5%", status: "warning" },
      { label: "OB Removal", value: "12,300 m³", status: "ok" },
      { label: "Equipment Utilization", value: "78%", status: "ok" },
      { label: "Downtime", value: "45 min", status: "warning" },
    ],
  },
  labour: {
    title: "Labour & Workforce",
    icon: "people",
    items: [
      { label: "On Site", value: "182", status: "ok" },
      { label: "Absent", value: "0", status: "ok" },
      { label: "Contractors", value: "47", status: "info" },
      { label: "In Restricted Zones", value: "2", status: "critical" },
      { label: "Overtime Workers", value: "12", status: "warning" },
      { label: "Training Due", value: "8", status: "warning" },
    ],
  },
  risk: {
    title: "AI Risk Analysis",
    icon: "zap",
    items: [
      { label: "Overall Risk Score", value: "58/100", status: "warning" },
      { label: "Safety Risk", value: "High", status: "critical" },
      { label: "Environmental Risk", value: "Medium", status: "warning" },
      { label: "Operational Risk", value: "Low", status: "ok" },
      { label: "Compliance Risk", value: "Low", status: "ok" },
      { label: "Predicted Incidents (7d)", value: "2-3", status: "warning" },
    ],
  },
  orders: {
    title: "Authority Orders & Directives",
    icon: "file",
    items: [
      { label: "Active Orders", value: "3", status: "warning" },
      { label: "Overdue", value: "0", status: "ok" },
      { label: "Completed (Month)", value: "7", status: "ok" },
      { label: "Pending Review", value: "1", status: "warning" },
      { label: "DGMS Notices", value: "0", status: "ok" },
      { label: "Compliance Rate", value: "100%", status: "ok" },
    ],
  },
  alerts: {
    title: "All Alerts",
    icon: "bell",
    items: [
      { label: "Critical Alerts", value: "2", status: "critical" },
      { label: "High Priority", value: "2", status: "warning" },
      { label: "Informational", value: "1", status: "info" },
      { label: "Resolved Today", value: "5", status: "ok" },
      { label: "Avg Response Time", value: "4.2 min", status: "ok" },
      { label: "Escalated", value: "0", status: "ok" },
    ],
  },
  activity: {
    title: "Recent Activity Log",
    icon: "activity",
    items: [
      { label: "Events Today", value: "24", status: "info" },
      { label: "Alerts Triggered", value: "4", status: "warning" },
      { label: "Actions Taken", value: "18", status: "ok" },
      { label: "Pending Actions", value: "2", status: "warning" },
      { label: "Auto-Resolved", value: "6", status: "ok" },
      { label: "System Events", value: "12", status: "info" },
    ],
  },
  live: {
    title: "Live Monitoring",
    icon: "signal",
    items: [
      { label: "Active Sensors", value: "247", status: "ok" },
      { label: "Offline Sensors", value: "3", status: "warning" },
      { label: "Camera Feeds", value: "18/18", status: "ok" },
      { label: "GPS Trackers", value: "42", status: "ok" },
      { label: "Data Latency", value: "< 2s", status: "ok" },
      { label: "System Uptime", value: "99.7%", status: "ok" },
    ],
  },
  map: {
    title: "Mine Map Overview",
    icon: "map",
    items: [
      { label: "Active Zones", value: "4", status: "ok" },
      { label: "Restricted Zones", value: "2", status: "warning" },
      { label: "Offline Zones", value: "1", status: "info" },
      { label: "Geofence Breaches", value: "1", status: "critical" },
      { label: "Vehicle Locations", value: "23", status: "ok" },
      { label: "Worker Locations", value: "182", status: "ok" },
    ],
  },
  reports: {
    title: "Reports",
    icon: "doc",
    items: [
      { label: "Daily Reports", value: "Generated", status: "ok" },
      { label: "Weekly Summary", value: "Due Tomorrow", status: "warning" },
      { label: "Monthly Report", value: "Pending", status: "info" },
      { label: "DGMS Returns", value: "Up to date", status: "ok" },
      { label: "Incident Reports", value: "0 pending", status: "ok" },
      { label: "Audit Reports", value: "Last: 5 Sep", status: "info" },
    ],
  },
  settings: {
    title: "Settings",
    icon: "gear",
    items: [
      { label: "Alert Thresholds", value: "Configured", status: "ok" },
      { label: "Notification Channels", value: "3 active", status: "ok" },
      { label: "Auto-Escalation", value: "Enabled", status: "ok" },
      { label: "Data Retention", value: "90 days", status: "info" },
      { label: "API Integrations", value: "5 connected", status: "ok" },
      { label: "Last Backup", value: "2 hours ago", status: "ok" },
    ],
  },
};
