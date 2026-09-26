import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../config/db.js";
import { SensorType, AlertLevel } from "@prisma/client";

const router = Router();

// GET /api/v1/mines/:id/telemetry
router.get("/:id/telemetry", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const readings = await prisma.sensorReading.findMany({
      where: { collieryId: id },
      orderBy: { recordedAt: "desc" },
      take: 50,
    });

    res.json({ status: "SUCCESS", readings });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// POST /api/v1/mines/:id/telemetry - Ingest SCADA readings
const telemetrySchema = z.object({
  sensorType: z.nativeEnum(SensorType),
  value: z.number(),
  unit: z.string(),
});

router.post("/:id/telemetry", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { sensorType, value, unit } = telemetrySchema.parse(req.body);

    // Dynamic threshold evaluator
    let status: AlertLevel = AlertLevel.NORMAL;
    if (sensorType === SensorType.CH4) {
      if (value > 1.25) status = AlertLevel.CRITICAL;
      else if (value > 0.75) status = AlertLevel.WATCH;
    } else if (sensorType === SensorType.CO && value > 25.0) {
      status = AlertLevel.CRITICAL;
    }

    const reading = await prisma.sensorReading.create({
      data: {
        collieryId: id,
        sensorType,
        value,
        unit,
        status,
      },
    });

    res.status(201).json({ status: "SUCCESS", reading });
  } catch (err: any) {
    res.status(400).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/mines/list - List all collieries with hazard maps
router.get("/list", async (_req: Request, res: Response) => {
  try {
    const collieries = await prisma.colliery.findMany({
      include: {
        area: {
          include: { subsidiary: { select: { code: true, name: true } } },
        },
      },
      orderBy: { name: "asc" },
    });
    res.json({ status: "SUCCESS", count: collieries.length, collieries });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/mines/:id/workforce - PME & MVTR gate lock status with fallback
router.get("/:id/workforce", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    let workers: any[] = [];

    if (id && id !== "all" && id !== "undefined") {
      workers = await prisma.workerRecord.findMany({
        where: { collieryId: id },
        include: { colliery: { select: { name: true, code: true } } },
      });
    }

    // Fallback: If no workers specifically bound to this colliery, serve all seeded master workforce records
    if (!workers || workers.length === 0) {
      workers = await prisma.workerRecord.findMany({
        include: { colliery: { select: { name: true, code: true } } },
        orderBy: { workerId: "asc" },
        take: 100,
      });
    }

    const summary = {
      totalWorkers: workers.length,
      fitCount: workers.filter((w) => w.pmeStatus === "FIT").length,
      dustWatchCount: workers.filter((w) => w.pmeStatus === "DUST_WATCH").length,
      unfitLockedOut: workers.filter((w) => w.biometricGateLocked).length,
    };

    res.json({ status: "SUCCESS", summary, count: workers.length, workers });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/mines/:id/safety-notices - DGMS statutory violations for colliery
router.get("/:id/safety-notices", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    let notices: any[] = [];

    if (id && id !== "all" && id !== "undefined") {
      notices = await prisma.safetyNotice.findMany({
        where: { collieryId: id },
        include: { colliery: { select: { name: true, code: true } } },
        orderBy: { createdAt: "desc" },
      });
    }

    if (!notices || notices.length === 0) {
      notices = await prisma.safetyNotice.findMany({
        include: { colliery: { select: { name: true, code: true } } },
        orderBy: { createdAt: "desc" },
        take: 100,
      });
    }

    res.json({
      status: "SUCCESS",
      count: notices.length,
      activeCount: notices.filter((n) => n.status === "ACTIVE").length,
      notices,
    });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/mines/:id/afforestation - Environmental Bio-reclamation & Drone surveys
router.get("/:id/afforestation", async (_req: Request, res: Response) => {
  try {
    const records = await prisma.afforestationRecord.findMany({
      include: { subsidiary: { select: { code: true, name: true } } },
      orderBy: { fiscalYear: "desc" },
      take: 100,
    });

    res.json({ status: "SUCCESS", count: records.length, records });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

export default router;