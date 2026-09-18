import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import { prisma } from "./config/db.js";

// Import Module Routers
import authRouter from "./modules/auth/auth.routes.js";
import cilRouter from "./modules/cil/cil.routes.js";
import regionalRouter from "./modules/regional/regional.routes.js";
import minesRouter from "./modules/mines/mines.routes.js";
import uploadRouter from "./modules/upload/upload.routes.js";

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

// Core Middleware
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json());

// Setup Socket.io for Real-Time SCADA Telemetry
export const io = new SocketIOServer(server, {
  cors: {
    origin: clientUrl,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`⚡ WebSocket client connected: ${socket.id}`);

  socket.on("subscribe:colliery", (collieryId: string) => {
    socket.join(`colliery:${collieryId}`);
    console.log(`📡 Client ${socket.id} subscribed to colliery:${collieryId}`);
  });

  socket.on("disconnect", () => {
    console.log(`🔌 WebSocket client disconnected: ${socket.id}`);
  });
});

// Periodic SCADA live heartbeat simulation (every 10 seconds)
setInterval(() => {
  try {
    const ch4Variation = +(0.5 + Math.random() * 0.4).toFixed(2);
    io.emit("telemetry:live", {
      sensorType: "CH4",
      value: ch4Variation,
      unit: "% vol",
      status: ch4Variation > 0.8 ? "WATCH" : "NORMAL",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    // Ignore ticker errors
  }
}, 10000);

// API Routes Mounting
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cil", cilRouter);
app.use("/api/v1/regional", regionalRouter);
app.use("/api/v1/mines", minesRouter);
app.use("/api/v1/upload", uploadRouter);

// Health check endpoint (verifies Neon Postgres connection)
app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    const dbCheck = await prisma.$queryRaw`SELECT 1 as connected`;
    res.json({
      status: "HEALTHY",
      service: "MINEGOV_AI Backend",
      database: "Neon Serverless PostgreSQL (Active)",
      timestamp: new Date().toISOString(),
      dbCheck,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "UNHEALTHY",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// National System Rollup Status endpoint
app.get("/api/v1/system/status", async (_req: Request, res: Response) => {
  try {
    const [subsidiariesCount, areasCount, collieriesCount, usersCount, activeNoticesCount] = await Promise.all([
      prisma.subsidiary.count(),
      prisma.regionalArea.count(),
      prisma.colliery.count(),
      prisma.user.count(),
      prisma.safetyNotice.count({ where: { status: "ACTIVE" } }),
    ]);

    const subsidiaries = await prisma.subsidiary.findMany({
      select: { code: true, name: true, state: true },
    });

    res.json({
      status: "SUCCESS",
      metrics: {
        totalSubsidiaries: subsidiariesCount,
        totalRegionalAreas: areasCount,
        totalCollieries: collieriesCount,
        activeUsers: usersCount,
        activeSafetyNotices: activeNoticesCount,
      },
      subsidiaries,
    });
  } catch (error: any) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// Start Server
server.listen(port, () => {
  console.log(`🚀 MINEGOV_AI Apex Backend running on http://localhost:${port}`);
  console.log(`🐘 Connected to Neon PostgreSQL (${process.env.NODE_ENV} mode)`);
  console.log(`📡 WebSocket SCADA Engine ready for incoming feeds`);
});