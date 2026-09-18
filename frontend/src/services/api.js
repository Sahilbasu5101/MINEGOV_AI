const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const getAuthHeaders = () => {
  const token = localStorage.getItem("minegov_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // 1. Auth & Session
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.status === "SUCCESS" && data.token) {
      localStorage.setItem("minegov_token", data.token);
      localStorage.setItem("minegov_user", JSON.stringify(data.user));
    }
    return data;
  },

  async getCurrentUser() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  async getDemoUsers() {
    const res = await fetch(`${API_BASE_URL}/auth/demo-users`);
    return res.json();
  },

  logout() {
    localStorage.removeItem("minegov_token");
    localStorage.removeItem("minegov_user");
  },

  // 2. CIL Apex Command Center
  async getCilOverview() {
    const res = await fetch(`${API_BASE_URL}/cil/overview`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  async getCilSafetyDesk() {
    const res = await fetch(`${API_BASE_URL}/cil/safety-desk`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  async executeSection22(noticeId, reason) {
    const res = await fetch(`${API_BASE_URL}/cil/safety/execute-sec22`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ noticeId, reason }),
    });
    return res.json();
  },

  async getCilEnvironment() {
    const res = await fetch(`${API_BASE_URL}/cil/environment`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  async getAuditLedger() {
    const res = await fetch(`${API_BASE_URL}/cil/audit-ledger`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // 3. Regional Area Operations
  async getRegionalMatrix(area = "Katras") {
    const res = await fetch(`${API_BASE_URL}/regional/matrix?area=${encodeURIComponent(area)}`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  async getGisHotspots() {
    const res = await fetch(`${API_BASE_URL}/regional/gis-hotspots`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // 4. Mine Level Field Operations
  async getMineTelemetry(collieryId) {
    const res = await fetch(`${API_BASE_URL}/mines/${collieryId}/telemetry`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  async getMineWorkforce(collieryId) {
    const res = await fetch(`${API_BASE_URL}/mines/${collieryId}/workforce`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // 5. Cloudinary Media & Statutory Evidence Upload
  async uploadMedia(file, category = "general") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const token = localStorage.getItem("minegov_token");
    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    return res.json();
  },
};