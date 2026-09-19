import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../config/db.js";

const router = Router();

const inspectionSchema = z.object({
  reportNumber: z.string().optional(),
  collieryId: z.string().optional(),
  inspectorId: z.string().optional(),
  shift: z.string().default("Shift A (06:00 - 14:00)"),
  workingLocation: z.string().default("Working Face - 1"),
  dateSubtitle: z.string().optional(),
  status: z.string().default("SUBMITTED"),
  checklistItems: z.array(z.any()),
  summaryCounts: z.object({
    total: z.number().optional(),
    completed: z.number().optional(),
    pending: z.number().optional(),
    issues: z.number().optional(),
  }).optional(),
});

// POST /api/v1/inspections - Submit or sync daily inspection report from mobile
router.post("/", async (req: Request, res: Response) => {
  try {
    const parseResult = inspectionSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        status: "ERROR",
        errors: parseResult.error.format(),
      });
    }

    const data = parseResult.data;

    // Resolve default colliery if not specified
    let targetCollieryId = data.collieryId;
    if (!targetCollieryId) {
      const defaultColliery = await prisma.colliery.findFirst();
      targetCollieryId = defaultColliery?.id;
    }

    if (!targetCollieryId) {
      return res.status(400).json({ status: "ERROR", message: "No colliery found in database" });
    }

    // Resolve inspector
    let targetInspectorId = data.inspectorId;
    if (!targetInspectorId) {
      const defaultInspector = await prisma.user.findFirst({
        where: { role: "SIRDAR" },
      });
      targetInspectorId = defaultInspector?.id;
    }

    if (!targetInspectorId) {
      const fallbackUser = await prisma.user.findFirst();
      targetInspectorId = fallbackUser?.id;
    }

    if (!targetInspectorId) {
      return res.status(400).json({ status: "ERROR", message: "No inspector user found in database" });
    }

    const reportCount = await prisma.inspectionReport.count();
    const reportNumber = data.reportNumber || `INSP-${new Date().getFullYear()}-${String(reportCount + 1).padStart(3, "0")}`;

    const report = await prisma.inspectionReport.create({
      data: {
        reportNumber,
        collieryId: targetCollieryId,
        inspectorId: targetInspectorId,
        shift: data.shift,
        workingLocation: data.workingLocation,
        dateSubtitle: data.dateSubtitle || "(Today)",
        status: data.status,
        checklistItemsJson: data.checklistItems,
        summaryCounts: data.summaryCounts ? (data.summaryCounts as any) : undefined,
      },
      include: {
        colliery: {
          select: { name: true, type: true },
        },
        inspector: {
          select: { fullName: true, role: true, apexId: true },
        },
      },
    });

    res.status(201).json({
      status: "SUCCESS",
      message: "Daily inspection report successfully saved to Neon PostgreSQL database.",
      report,
    });
  } catch (err: any) {
    console.error("Inspection Save Error:", err);
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/inspections - List recent daily inspection reports
router.get("/", async (req: Request, res: Response) => {
  try {
    const collieryId = req.query.collieryId as string | undefined;
    const limit = Math.min(Number(req.query.limit) || 20, 100);

    const reports = await prisma.inspectionReport.findMany({
      where: collieryId ? { collieryId } : undefined,
      include: {
        colliery: {
          select: { name: true, type: true },
        },
        inspector: {
          select: { fullName: true, role: true, apexId: true },
        },
        _count: {
          select: { issues: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    res.json({
      status: "SUCCESS",
      count: reports.length,
      reports,
    });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/inspections/:id - Get specific inspection report details
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const report = await prisma.inspectionReport.findUnique({
      where: { id: req.params.id as string },
      include: {
        colliery: true,
        inspector: {
          select: { id: true, fullName: true, role: true, apexId: true, email: true },
        },
        issues: true,
      },
    });

    if (!report) {
      return res.status(404).json({ status: "ERROR", message: "Inspection report not found" });
    }

    res.json({ status: "SUCCESS", report });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

export default router;
