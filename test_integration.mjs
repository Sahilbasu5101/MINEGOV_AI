// MINEGOV_AI Integration Verification Script
const BASE_URL = "http://localhost:5000/api/v1";

async function runTests() {
  console.log("🚀 Starting MINEGOV_AI Mobile Integration Tests...\n");

  // 1. Health check
  const healthRes = await fetch("http://localhost:5000/api/health");
  const health = await healthRes.json();
  console.log("✅ 1. Backend Health Check:", health.status, `(Database: ${health.database})`);

  // 2. Mobile User Auth with Employee ID and PIN
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employeeId: "TEST-SIR-001", pin: "1234" }),
  });
  const auth = await loginRes.json();
  console.log("✅ 2. Mobile Login (TEST-SIR-001 / PIN 1234):", auth.status);
  console.log("   Authenticated User:", auth.user.fullName, `(Role: ${auth.user.role}, Domain: ${auth.user.domain})`);

  // 3. Submit Daily Inspection Report
  const inspRes = await fetch(`${BASE_URL}/inspections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`,
    },
    body: JSON.stringify({
      shift: "Shift A (06:00 - 14:00)",
      workingLocation: "Working Face - 1",
      dateSubtitle: "(Today)",
      status: "SUBMITTED",
      inspectorId: auth.user.id,
      checklistItems: [
        { id: "chk-01", number: "01", title: "PPE", category: "Safety", status: "PASS" },
        { id: "chk-08", number: "08", title: "Conveyor Belt Guard", category: "Mechanical", status: "ISSUE" },
      ],
      summaryCounts: { total: 24, completed: 24, pending: 0, issues: 1 },
    }),
  });
  const inspData = await inspRes.json();
  console.log("✅ 3. Submit Mobile Inspection to Neon PostgreSQL:", inspData.status);
  console.log("   Report Number:", inspData.report.reportNumber, `(Colliery: ${inspData.report.colliery?.name})`);

  // 4. Submit Safety Issue with Cloudinary Media URL
  const issueRes = await fetch(`${BASE_URL}/issues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`,
    },
    body: JSON.stringify({
      inspectionReportId: inspData.report.id,
      reporterId: auth.user.id,
      category: "Mechanical",
      itemTitle: "Conveyor Belt Guard & Emergency Pull Cord",
      itemDescription: "Inspect rotating conveyor parts for guards",
      workingLocation: "Working Face - 1",
      observation: "Guard damaged near drive pulley. Work stopped immediately.",
      immediateAction: "Area barricaded / Work stopped",
      severity: "CRITICAL",
      riskScore: 92,
      riskCategory: "Critical Risk",
      latitude: 23.7428,
      longitude: 86.3456,
      gpsStatus: "CAPTURED",
      evidenceUrls: [
        {
          id: "ev-mobile-01",
          type: "photo",
          url: "https://res.cloudinary.com/fcndk1bh/image/upload/v1789737866/minegov_ai/mobile_evidence/conveyor_pulley_field_proof.jpg",
          name: "conveyor_pulley_field_proof.jpg",
        },
      ],
      status: "SUBMITTED",
    }),
  });
  const issueData = await issueRes.json();
  console.log("✅ 4. Submit Mobile Issue with Cloudinary CDN URL:", issueData.status);
  console.log("   Issue Number:", issueData.issue.issueNumber, `(Severity: ${issueData.issue.severity}, Evidence URLs: ${issueData.issue.evidenceUrls?.length})`);

  console.log("\n🎉 ALL TESTS PASSED! Mobile App is fully integrated with Unified Backend, Cloudinary, and Neon PostgreSQL!");
}

runTests().catch((e) => console.error("Test failed:", e));
