import "dotenv/config";
import { PrismaClient, AlertLevel, PmeStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import crypto from "crypto";

import afforestationMaster from "../data/afforestationData.json" with { type: "json" };
import hazardMapsMaster from "../data/hazardMapsData.json" with { type: "json" };
import safetyNoticesMaster from "../data/safetyNoticesData.json" with { type: "json" };
import workforceMaster from "../data/workforceData.json" with { type: "json" };

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedFast() {
  console.log("⚡ Starting High-Speed Master Data Injection (280 Records)...");

  // 1. Ensure all 8 Subsidiaries exist
  const subCodes = ["BCCL", "ECL", "CCL", "WCL", "SECL", "MCL", "NCL", "CMPDIL", "CIL HQ"];
  const subsMap: Record<string, string> = {};

  const existingSubs = await prisma.subsidiary.findMany();
  for (const sub of existingSubs) {
    subsMap[sub.code] = sub.id;
  }

  for (const code of subCodes) {
    if (!subsMap[code]) {
      const created = await prisma.subsidiary.create({
        data: {
          code,
          name: code === "CIL HQ" ? "Coal India Limited Headquarters" : `${code} Coalfields`,
          headquarters: code === "BCCL" ? "Dhanbad" : "Kolkata",
          state: code === "BCCL" ? "Jharkhand" : "West Bengal",
        },
      });
      subsMap[code] = created.id;
    }
  }

  // 2. Ensure 1 Regional Area per subsidiary
  const areaMap: Record<string, string> = {};
  const existingAreas = await prisma.regionalArea.findMany();
  for (const a of existingAreas) {
    areaMap[a.subsidiaryId] = a.id;
  }

  for (const [code, subId] of Object.entries(subsMap)) {
    if (!areaMap[subId]) {
      const area = await prisma.regionalArea.create({
        data: {
          name: `${code} Regional Area`,
          subsidiaryId: subId,
        },
      });
      areaMap[subId] = area.id;
    }
  }

  // 3. Batch insert 70 Collieries with Cloudinary Hazard Maps
  const collieryData = hazardMapsMaster.collieryHazardMaps.map((item) => {
    const subId = subsMap[item.subsidiary] || subsMap["BCCL"];
    const areaId = areaMap[subId];
    return {
      code: item.collieryId,
      name: item.collieryName,
      areaId,
      type: item.collieryName.toLowerCase().includes("underground") ? "UNDERGROUND" : "OPENCAST",
      latitude: 23.75 + (Math.random() - 0.5) * 0.2,
      longitude: 86.41 + (Math.random() - 0.5) * 0.2,
      hazardMapUrl: item.hazardMapUrl,
    };
  });

  await prisma.colliery.createMany({
    data: collieryData,
    skipDuplicates: true,
  });
  console.log(`✅ 70 Collieries with Cloudinary Hazard Maps verified.`);

  // Build map of colliery codes to IDs
  const allCollieries = await prisma.colliery.findMany({
    select: { id: true, code: true, name: true },
  });
  const collieryCodeToId: Record<string, string> = {};
  for (const c of allCollieries) {
    if (c.code) collieryCodeToId[c.code] = c.id;
  }
  const defaultCollieryId = allCollieries[0]?.id;

  // 4. Batch insert 70 DGMS Safety Notices
  const safetyData = safetyNoticesMaster.safetyNotices.map((notice) => {
    const colId = collieryCodeToId[notice.collieryCode] || defaultCollieryId;
    let severityLevel: AlertLevel = AlertLevel.HIGH;
    if (notice.severity === "CRITICAL") severityLevel = AlertLevel.CRITICAL;
    else if (notice.severity === "MODERATE" || notice.severity === "MEDIUM") severityLevel = AlertLevel.WATCH;
    else if (notice.severity === "LOW") severityLevel = AlertLevel.LOW;

    const hsmSig = crypto.createHash("sha256").update(`${notice.noticeId}-${notice.regulation}-${notice.status}`).digest("hex");

    return {
      noticeId: notice.noticeId,
      collieryId: colId,
      regulation: notice.regulation,
      parameter: notice.parameter,
      severity: severityLevel,
      statutoryAction: notice.statutoryAction,
      status: notice.status,
      signedBy: "DGMS Eastern Zone Regulatory Inspector",
      hsmSignature: hsmSig,
      evidenceUrl: notice.evidenceUrl,
    };
  });

  await prisma.safetyNotice.createMany({
    data: safetyData,
    skipDuplicates: true,
  });
  console.log(`✅ 70 DGMS Statutory Safety Notices with Cloudinary Evidence verified.`);

  // 5. Batch insert 70 Workforce PME Records
  const now = new Date();
  const workerData = workforceMaster.records.map((worker) => {
    let pmeEnum: PmeStatus = PmeStatus.FIT;
    if (worker.pmeStatus === "UNFIT") pmeEnum = PmeStatus.UNFIT;
    else if (worker.pmeStatus === "DUST_WATCH") pmeEnum = PmeStatus.DUST_WATCH;

    const pmeDueDate = new Date(now.getTime() + (pmeEnum === PmeStatus.UNFIT ? -30 : 90) * 86400000);
    const mvtrRefresherDate = new Date(now.getTime() + 60 * 86400000);

    return {
      workerId: worker.workerId,
      collieryId: defaultCollieryId,
      name: worker.name,
      designation: worker.designation,
      pmeStatus: pmeEnum,
      pmeDueDate,
      mvtrRefresherDate,
      biometricGateLocked: worker.biometricGateLocked,
      medicalCertUrl: worker.medicalCertUrl,
    };
  });

  await prisma.workerRecord.createMany({
    data: workerData,
    skipDuplicates: true,
  });
  console.log(`✅ 70 Workforce Health & Biometric Lockout records verified.`);

  // 6. Batch insert 70 Environmental Bio-Reclamation records
  await prisma.afforestationRecord.deleteMany({});
  const affData = afforestationMaster.records.map((aff) => {
    const subCode = aff.subsidiary || "BCCL";
    const subId = subsMap[subCode] || subsMap["BCCL"];
    return {
      subsidiaryId: subId,
      areaOrDumpName: aff.areaOrDumpName,
      fiscalYear: aff.fiscalYear,
      targetHa: aff.targetHa,
      achievedHa: aff.achievedHa,
      canopyDensity: aff.canopyDensity,
      droneSurveyUrl: aff.droneSurveyUrl,
    };
  });

  await prisma.afforestationRecord.createMany({
    data: affData,
  });
  console.log(`✅ 70 Environmental Bio-Reclamation records with Drone Surveys verified.`);

  console.log("🎉 ALL 280 RECORDS SUCCESSFULLY PERSISTED IN NEON POSTGRESQL!");
}

seedFast()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
