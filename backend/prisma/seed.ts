import "dotenv/config";
import { PrismaClient, UserRole, SensorType, AlertLevel, PmeStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting MINEGOV_AI database seed on Neon PostgreSQL...");

  // Clear existing data safely
  await prisma.auditLedgerEntry.deleteMany({});
  await prisma.boardEscalation.deleteMany({});
  await prisma.workerRecord.deleteMany({});
  await prisma.ocemsReading.deleteMany({});
  await prisma.afforestationRecord.deleteMany({});
  await prisma.safetyNotice.deleteMany({});
  await prisma.sensorReading.deleteMany({});
  await prisma.pit.deleteMany({});
  await prisma.colliery.deleteMany({});
  await prisma.regionalArea.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.subsidiary.deleteMany({});

  console.log("🧹 Cleaned existing tables.");

  // 1. Seed 8 Coal India Subsidiaries
  const subsidiariesData = [
    { code: "BCCL", name: "Bharat Coking Coal Limited", headquarters: "Dhanbad", state: "Jharkhand" },
    { code: "ECL", name: "Eastern Coalfields Limited", headquarters: "Sanctoria", state: "West Bengal" },
    { code: "CCL", name: "Central Coalfields Limited", headquarters: "Ranchi", state: "Jharkhand" },
    { code: "WCL", name: "Western Coalfields Limited", headquarters: "Nagpur", state: "Maharashtra" },
    { code: "SECL", name: "South Eastern Coalfields Limited", headquarters: "Bilaspur", state: "Chhattisgarh" },
    { code: "MCL", name: "Mahanadi Coalfields Limited", headquarters: "Sambalpur", state: "Odisha" },
    { code: "NCL", name: "Northern Coalfields Limited", headquarters: "Singrauli", state: "Madhya Pradesh" },
    { code: "CMPDIL", name: "Central Mine Planning & Design Institute", headquarters: "Ranchi", state: "Jharkhand" },
  ];

  const subsidiaries: Record<string, any> = {};
  for (const sub of subsidiariesData) {
    subsidiaries[sub.code] = await prisma.subsidiary.create({ data: sub });
  }
  console.log(`✅ Seeded ${Object.keys(subsidiaries).length} CIL subsidiaries.`);

  // 2. Seed Regional Areas
  const katrasArea = await prisma.regionalArea.create({
    data: {
      name: "Katras Regional Area",
      subsidiaryId: subsidiaries["BCCL"].id,
    },
  });

  const kusmundaArea = await prisma.regionalArea.create({
    data: {
      name: "Kusmunda Area",
      subsidiaryId: subsidiaries["SECL"].id,
    },
  });

  const singrauliArea = await prisma.regionalArea.create({
    data: {
      name: "Singrauli Basin Area",
      subsidiaryId: subsidiaries["NCL"].id,
    },
  });

  // 3. Seed Collieries & Pits
  const moonidihColliery = await prisma.colliery.create({
    data: {
      name: "Moonidih Deep Seam UG",
      areaId: katrasArea.id,
      latitude: 23.7428,
      longitude: 86.3456,
      type: "UNDERGROUND",
      pits: {
        create: [
          { name: "Shaft-1 Seam XVI", status: "ACTIVE" },
          { name: "Longwall Face West", status: "WATCH" },
        ],
      },
    },
  });

  const gevraColliery = await prisma.colliery.create({
    data: {
      name: "Gevra Mega Opencast",
      areaId: kusmundaArea.id,
      latitude: 22.3486,
      longitude: 82.5936,
      type: "OPENCAST",
      pits: {
        create: [
          { name: "East Bench Pit 14", status: "ACTIVE" },
          { name: "Deep Sump Quarry", status: "ACTIVE" },
        ],
      },
    },
  });

  const jayantColliery = await prisma.colliery.create({
    data: {
      name: "Jayant Opencast Block",
      areaId: singrauliArea.id,
      latitude: 24.1121,
      longitude: 82.6841,
      type: "OPENCAST",
      pits: {
        create: [{ name: "Main Bench 03", status: "ACTIVE" }],
      },
    },
  });
  console.log("✅ Seeded Regional Areas, Collieries, and Pits.");

  // 4. Seed Users with multi-tier RBAC
  const defaultPasswordHash = await bcrypt.hash("Password@123", 10);

  const usersData = [
    {
      email: "chairman@coalindia.in",
      fullName: "P. M. Prasad (Apex CIL Chairman)",
      apexId: "CIL-APEX-001",
      role: UserRole.CHAIRMAN_CIL,
      passwordHash: defaultPasswordHash,
    },
    {
      email: "dir.tech@coalindia.in",
      fullName: "Dr. B. Veera Reddy (Director Technical)",
      apexId: "CIL-DIR-TECH-01",
      role: UserRole.DIRECTOR_TECH,
      passwordHash: defaultPasswordHash,
    },
    {
      email: "cmd.bccl@coalindia.in",
      fullName: "Samiran Dutta (CMD BCCL)",
      apexId: "BCCL-CMD-01",
      role: UserRole.SUBSIDIARY_CMD,
      subsidiaryId: subsidiaries["BCCL"].id,
      passwordHash: defaultPasswordHash,
    },
    {
      email: "gm.katras@bccl.gov.in",
      fullName: "A. K. Sharma (Area General Manager)",
      apexId: "BCCL-GM-KATRAS",
      role: UserRole.AREA_GM,
      subsidiaryId: subsidiaries["BCCL"].id,
      areaId: katrasArea.id,
      passwordHash: defaultPasswordHash,
    },
    {
      email: "manager.moonidih@bccl.gov.in",
      fullName: "R. K. Singh (Mine Manager First Class)",
      apexId: "MINE-MGR-MOONIDIH",
      role: UserRole.MINE_MANAGER,
      subsidiaryId: subsidiaries["BCCL"].id,
      areaId: katrasArea.id,
      collieryId: moonidihColliery.id,
      passwordHash: defaultPasswordHash,
    },
    {
      email: "dgms.inspector@dgms.gov.in",
      fullName: "Prabhat Kumar (DGMS Central Regulatory Inspector)",
      apexId: "DGMS-CENTRAL-09",
      role: UserRole.DGMS_INSPECTOR,
      passwordHash: defaultPasswordHash,
    },
    {
      email: "cpcb.desk@cpcb.nic.in",
      fullName: "Sunita Narain (CPCB OCEMS Regulator)",
      apexId: "CPCB-REG-04",
      role: UserRole.CPCB_OFFICER,
      passwordHash: defaultPasswordHash,
    },
  ];

  for (const user of usersData) {
    await prisma.user.create({ data: user });
  }
  console.log(`✅ Seeded ${usersData.length} Multi-Tier RBAC Users (Default password: Password@123).`);

  // 5. Seed Real-Time SCADA Telemetry Readings
  const now = new Date();
  const telemetryData = [
    { collieryId: moonidihColliery.id, sensorType: SensorType.CH4, value: 0.65, unit: "% vol", status: AlertLevel.NORMAL, recordedAt: now },
    { collieryId: moonidihColliery.id, sensorType: SensorType.CO, value: 18.2, unit: "PPM", status: AlertLevel.WATCH, recordedAt: now },
    { collieryId: moonidihColliery.id, sensorType: SensorType.AIR_VELOCITY, value: 1.8, unit: "m/s", status: AlertLevel.NORMAL, recordedAt: now },
    { collieryId: moonidihColliery.id, sensorType: SensorType.ROOF_CONVERGENCE, value: 4.2, unit: "mm/day", status: AlertLevel.WATCH, recordedAt: now },
    { collieryId: gevraColliery.id, sensorType: SensorType.PM10, value: 142.5, unit: "ug/m3", status: AlertLevel.WATCH, recordedAt: now },
    { collieryId: gevraColliery.id, sensorType: SensorType.PH, value: 7.2, unit: "pH", status: AlertLevel.NORMAL, recordedAt: now },
    { collieryId: jayantColliery.id, sensorType: SensorType.NOISE, value: 78.4, unit: "dB(A)", status: AlertLevel.NORMAL, recordedAt: now },
  ];

  for (const t of telemetryData) {
    await prisma.sensorReading.create({ data: t });
  }
  console.log("✅ Seeded SCADA Sensor Readings.");

  // 6. Seed DGMS Safety Notice & Section 22 Orders
  await prisma.safetyNotice.create({
    data: {
      noticeId: "SEC22-2026-001",
      collieryId: moonidihColliery.id,
      regulation: "CMR 153 (Gas Monitoring in Gassy Seams Degree III)",
      parameter: "CH4 local pocket exceedance > 1.25%",
      severity: AlertLevel.CRITICAL,
      statutoryAction: "IMMEDIATE SECTION 22 STOP-WORK ORDER ON SHAFT 1 WEST CUTTER",
      status: "ACTIVE",
      signedBy: "Prabhat Kumar (DGMS Inspector)",
      hsmSignature: crypto.createHash("sha256").update("SEC22-2026-001-DGMS-SIGNED-TRUE").digest("hex"),
    },
  });

  // 7. Seed CPCB OCEMS & Bio-Reclamation
  await prisma.ocemsReading.create({
    data: {
      collieryId: gevraColliery.id,
      parameter: "PM10 Ambient Air Dust",
      value: 184.0,
      statutoryLimit: 100.0,
      thresholdBreached: true,
    },
  });

  await prisma.afforestationRecord.create({
    data: {
      subsidiaryId: subsidiaries["BCCL"].id,
      fiscalYear: "2025-26",
      targetHa: 250.0,
      achievedHa: 218.4,
      canopyDensity: 0.42,
    },
  });

  // 8. Seed Workforce PME & Biometric Lockout
  await prisma.workerRecord.create({
    data: {
      workerId: "EMP-BCCL-89421",
      collieryId: moonidihColliery.id,
      name: "Rameshwar Mahato",
      designation: "Heavy Duty Continuous Miner Operator",
      pmeStatus: PmeStatus.DUST_WATCH,
      pmeDueDate: new Date("2026-10-15"),
      mvtrRefresherDate: new Date("2026-11-20"),
      biometricGateLocked: false,
    },
  });

  await prisma.workerRecord.create({
    data: {
      workerId: "EMP-BCCL-41209",
      collieryId: moonidihColliery.id,
      name: "Dinesh Kumar Bauri",
      designation: "Roof Bolter Underground",
      pmeStatus: PmeStatus.UNFIT,
      pmeDueDate: new Date("2026-08-01"),
      mvtrRefresherDate: new Date("2026-07-15"),
      biometricGateLocked: true, // Gatepass Locked Out
    },
  });

  // 9. Seed Cryptographic Audit Ledger Entry
  const prevHash = "0000000000000000000000000000000000000000000000000000000000000000";
  const entityId = "SEC22-2026-001";
  const actionType = "DGMS_SECTION_22_ISSUED";
  const actorId = "DGMS-CENTRAL-09";
  const timestamp = new Date().toISOString();
  const currentHash = crypto.createHash("sha256").update(prevHash + entityId + actionType + actorId + timestamp).digest("hex");

  await prisma.auditLedgerEntry.create({
    data: {
      entityType: "SAFETY_NOTICE",
      entityId,
      actionType,
      actorId,
      previousHash: prevHash,
      currentHash,
    },
  });

  console.log("✅ Seeded Cryptographic HSM Audit Ledger Genesis Entry.");
  console.log("🎉 Seeding completed successfully on Neon PostgreSQL!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });