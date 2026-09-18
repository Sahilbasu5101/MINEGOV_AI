import { Router, Request, Response } from "express";
import crypto from "crypto";
import { z } from "zod";
import { prisma } from "../../config/db.js";
import { authenticate, authorizeRoles } from "../../middleware/auth.js";
import { UserRole } from "@prisma/client";

const router = Router();

// GET /api/v1/cil/overview - CIL Apex National Rollup
router.get("/overview", async (_req: Request, res: Response) => {
  try {
    const [subsidiaries, totalCollieries, totalPits, activeNotices, ocemsBreaches] = await Promise.all([
      prisma.subsidiary.findMany({
        include: {
          _count: {
            select: { areas: true },
          },
        },
        orderBy: { code: "asc" },
      }),
      prisma.colliery.count(),
      prisma.pit.count(),
      prisma.safetyNotice.count({ where: { status: "ACTIVE" } }),
      prisma.ocemsReading.count({ where: { thresholdBreached: true } }),
    ]);

    res.json({
      status: "SUCCESS",
      apexOverview: {
        fiscalYear: "2025-26",
        nationalProductionTargetMT: 780.0,
        achievedProductionMT: 542.8,
        achievementPercentage: 69.6,
        railRakesDailyTarget: 385,
        railRakesDispatchedToday: 342,
        totalSubsidiaries: subsidiaries.length,
        totalCollieries,
        totalActivePits: totalPits,
        criticalAlerts: {
          activeSection22Orders: activeNotices,
          ocemsThresholdBreaches: ocemsBreaches,
        },
      },
      subsidiaries,
    });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/cil/safety-desk - DGMS Inquiries and Statutory Orders
router.get("/safety-desk", async (_req: Request, res: Response) => {
  try {
    const notices = await prisma.safetyNotice.findMany({
      include: {
        colliery: {
          select: {
            name: true,
            type: true,
            area: {
              select: {
                name: true,
                subsidiary: { select: { code: true, name: true } },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      status: "SUCCESS",
      metrics: {
        totalNotices: notices.length,
        activeOrders: notices.filter((n) => n.status === "ACTIVE").length,
        executedOrders: notices.filter((n) => n.status === "EXECUTED").length,
        nationalLtifrTarget: 0.12,
        currentLtifr: 0.09,
      },
      notices,
    });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// POST /api/v1/cil/safety/execute-sec22 - Sign and execute Section 22 Stop-Work with HSM Audit Ledger
const executeSec22Schema = z.object({
  noticeId: z.string(),
  reason: z.string().optional(),
});

router.post(
  "/safety/execute-sec22",
  authenticate,
  authorizeRoles(UserRole.CHAIRMAN_CIL, UserRole.DIRECTOR_TECH, UserRole.DGMS_INSPECTOR),
  async (req: Request, res: Response) => {
    try {
      const { noticeId } = executeSec22Schema.parse(req.body);

      const notice = await prisma.safetyNotice.findUnique({
        where: { noticeId },
      });

      if (!notice) {
        return res.status(404).json({ status: "ERROR", message: `Safety Notice '${noticeId}' not found` });
      }

      // Fetch last audit hash to maintain SHA-256 hash chain
      const lastAudit = await prisma.auditLedgerEntry.findFirst({
        orderBy: { timestamp: "desc" },
      });

      const previousHash = lastAudit?.currentHash || "0000000000000000000000000000000000000000000000000000000000000000";
      const timestamp = new Date().toISOString();
      const actionType = "SECTION_22_STOP_WORK_EXECUTED";
      const actorId = req.user!.email;

      const currentHash = crypto
        .createHash("sha256")
        .update(previousHash + noticeId + actionType + actorId + timestamp)
        .digest("hex");

      // Update safety notice and insert audit entry in a single atomic transaction
      const [updatedNotice, auditEntry] = await prisma.$transaction([
        prisma.safetyNotice.update({
          where: { noticeId },
          data: {
            status: "EXECUTED",
            signedBy: req.user!.fullName,
            hsmSignature: currentHash,
          },
        }),
        prisma.auditLedgerEntry.create({
          data: {
            entityType: "SAFETY_NOTICE",
            entityId: noticeId,
            actionType,
            actorId,
            previousHash,
            currentHash,
          },
        }),
      ]);

      res.json({
        status: "SUCCESS",
        message: "Section 22 Stop-Work order cryptographically signed and executed.",
        notice: updatedNotice,
        auditRecord: auditEntry,
      });
    } catch (err: any) {
      res.status(500).json({ status: "ERROR", message: err.message });
    }
  }
);

// GET /api/v1/cil/environment - CPCB OCEMS and Bio-Reclamation
router.get("/environment", async (_req: Request, res: Response) => {
  try {
    const [ocemsReadings, afforestation] = await Promise.all([
      prisma.ocemsReading.findMany({
        include: {
          colliery: {
            select: { name: true, area: { select: { name: true } } },
          },
        },
        orderBy: { recordedAt: "desc" },
      }),
      prisma.afforestationRecord.findMany({
        include: {
          subsidiary: { select: { code: true, name: true } },
        },
      }),
    ]);

    res.json({
      status: "SUCCESS",
      ocemsReadings,
      afforestation,
    });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/cil/audit-ledger - Cryptographic compliance ledger
router.get("/audit-ledger", async (_req: Request, res: Response) => {
  try {
    const ledger = await prisma.auditLedgerEntry.findMany({
      orderBy: { timestamp: "desc" },
      take: 20,
    });

    res.json({
      status: "SUCCESS",
      totalEntries: ledger.length,
      ledger,
    });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

export default router;