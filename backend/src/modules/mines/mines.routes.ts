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

// GET /api/v1/mines/:id/workforce - PME & MVTR gate lock status
router.get("/:id/workforce", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const workers = await prisma.workerRecord.findMany({
      where: { collieryId: id },
    });

    const summary = {
      totalWorkers: workers.length,
      fitCount: workers.filter((w) => w.pmeStatus === "FIT").length,
      dustWatchCount: workers.filter((w) => w.pmeStatus === "DUST_WATCH").length,
      unfitLockedOut: workers.filter((w) => w.biometricGateLocked).length,
    };

    res.json({ status: "SUCCESS", summary, workers });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

export default router;