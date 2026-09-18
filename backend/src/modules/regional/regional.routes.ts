import { Router, Request, Response } from "express";
import { prisma } from "../../config/db.js";

const router = Router();

// GET /api/v1/regional/matrix - Collieries KPI matrix
router.get("/matrix", async (req: Request, res: Response) => {
  try {
    const areaName = (req.query.area as string) || "Katras Regional Area";

    const area = await prisma.regionalArea.findFirst({
      where: { name: { contains: areaName, mode: "insensitive" } },
      include: {
        subsidiary: { select: { code: true, name: true } },
        collieries: {
          include: {
            pits: true,
            safetyNotices: { where: { status: "ACTIVE" } },
            sensorReadings: {
              orderBy: { recordedAt: "desc" },
              take: 5,
            },
            _count: {
              select: { workers: true },
            },
          },
        },
      },
    });

    if (!area) {
      return res.status(404).json({ status: "ERROR", message: `Regional area '${areaName}' not found` });
    }

    res.json({
      status: "SUCCESS",
      area: {
        id: area.id,
        name: area.name,
        subsidiary: area.subsidiary,
      },
      collieries: area.collieries.map((c) => ({
        id: c.id,
        name: c.name,
        type: c.type,
        totalPits: c.pits.length,
        pits: c.pits,
        activeWorkers: c._count.workers,
        activeSafetyNotices: c.safetyNotices.length,
        latestReadings: c.sensorReadings,
        hazardLevel: c.safetyNotices.length > 0 ? "HIGH" : "NORMAL",
      })),
    });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/regional/gis-hotspots - Map coordinates for MineMap.jsx
router.get("/gis-hotspots", async (_req: Request, res: Response) => {
  try {
    const collieries = await prisma.colliery.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        latitude: true,
        longitude: true,
        area: {
          select: {
            name: true,
            subsidiary: { select: { code: true } },
          },
        },
        safetyNotices: {
          where: { status: "ACTIVE" },
          select: { noticeId: true, severity: true },
        },
        sensorReadings: {
          orderBy: { recordedAt: "desc" },
          take: 1,
        },
      },
    });

    const hotspots = collieries.map((c) => ({
      id: c.id,
      name: c.name,
      type: c.type,
      lat: c.latitude || 23.74,
      lng: c.longitude || 86.34,
      area: c.area.name,
      subsidiary: c.area.subsidiary.code,
      status: c.safetyNotices.length > 0 ? "CRITICAL" : "NORMAL",
      activeNotices: c.safetyNotices.length,
      latestSensor: c.sensorReadings[0] || null,
    }));

    res.json({
      status: "SUCCESS",
      totalHotspots: hotspots.length,
      hotspots,
    });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

export default router;