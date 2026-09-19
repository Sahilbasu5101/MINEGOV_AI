import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../config/db.js";
import { AlertLevel } from "@prisma/client";

const router = Router();

const issueSchema = z.object({
  issueNumber: z.string().optional(),
  inspectionReportId: z.string().optional().nullable(),
  collieryId: z.string().optional(),
  reporterId: z.string().optional(),
  category: z.string().default("Safety"),
  itemTitle: z.string().default("Field Observation"),
  itemDescription: z.string().optional(),
  workingLocation: z.string().default("Working Face - 1"),
  observation: z.string().min(1, "Observation text is required"),
  immediateAction: z.string().optional(),
  additionalRemarks: z.string().optional(),
  severity: z.nativeEnum(AlertLevel).default(AlertLevel.MEDIUM),
  riskScore: z.number().default(50),
  riskCategory: z.string().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  gpsStatus: z.string().optional(),
  evidenceUrls: z.array(z.any()).optional().default([]),
  status: z.string().default("SUBMITTED"),
});

// POST /api/v1/issues - Ingest reported safety/operational issue from mobile
router.post("/", async (req: Request, res: Response) => {
  try {
    const parseResult = issueSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        status: "ERROR",
        errors: parseResult.error.format(),
      });
    }

    const data = parseResult.data;

    // Resolve default colliery if not provided
    let targetCollieryId = data.collieryId;
    if (!targetCollieryId) {
      const defaultColliery = await prisma.colliery.findFirst();
      targetCollieryId = defaultColliery?.id;
    }

    if (!targetCollieryId) {
      return res.status(400).json({ status: "ERROR", message: "No colliery found in database" });
    }

    // Resolve reporter user
    let targetReporterId = data.reporterId;
    if (!targetReporterId) {
      const defaultReporter = await prisma.user.findFirst({
        where: { role: "SIRDAR" },
      });
      targetReporterId = defaultReporter?.id;
    }

    if (!targetReporterId) {
      const fallbackUser = await prisma.user.findFirst();
      targetReporterId = fallbackUser?.id;
    }

    if (!targetReporterId) {
      return res.status(400).json({ status: "ERROR", message: "No reporter user found in database" });
    }

    const issueCount = await prisma.reportedIssueRecord.count();
    const issueNumber = data.issueNumber || `ISS-${new Date().getFullYear()}-${String(issueCount + 1).padStart(3, "0")}`;

    const issue = await prisma.reportedIssueRecord.create({
      data: {
        issueNumber,
        inspectionReportId: data.inspectionReportId || null,
        collieryId: targetCollieryId,
        reporterId: targetReporterId,
        category: data.category,
        itemTitle: data.itemTitle,
        itemDescription: data.itemDescription || null,
        workingLocation: data.workingLocation,
        observation: data.observation,
        immediateAction: data.immediateAction || null,
        additionalRemarks: data.additionalRemarks || null,
        severity: data.severity,
        riskScore: data.riskScore,
        riskCategory: data.riskCategory || null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        gpsStatus: data.gpsStatus || "UNAVAILABLE",
        evidenceUrls: data.evidenceUrls,
        status: data.status,
      },
      include: {
        colliery: {
          select: { name: true, type: true },
        },
        reporter: {
          select: { fullName: true, role: true, apexId: true },
        },
      },
    });

    res.status(201).json({
      status: "SUCCESS",
      message: "Safety issue successfully logged to Neon PostgreSQL with Cloudinary evidence.",
      issue,
    });
  } catch (err: any) {
    console.error("Issue Ingestion Error:", err);
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/issues - Query reported issues with filters
router.get("/", async (req: Request, res: Response) => {
  try {
    const collieryId = req.query.collieryId as string | undefined;
    const severity = req.query.severity as AlertLevel | undefined;
    const limit = Math.min(Number(req.query.limit) || 30, 100);

    const issues = await prisma.reportedIssueRecord.findMany({
      where: {
        ...(collieryId ? { collieryId } : {}),
        ...(severity ? { severity } : {}),
      },
      include: {
        colliery: {
          select: { name: true, type: true },
        },
        reporter: {
          select: { fullName: true, role: true, apexId: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    res.json({
      status: "SUCCESS",
      count: issues.length,
      issues,
    });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/issues/:id - Get specific issue
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const issue = await prisma.reportedIssueRecord.findUnique({
      where: { id: req.params.id as string },
      include: {
        colliery: true,
        reporter: true,
        inspectionReport: true,
      },
    });

    if (!issue) {
      return res.status(404).json({ status: "ERROR", message: "Issue not found" });
    }

    res.json({ status: "SUCCESS", issue });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

export default router;
