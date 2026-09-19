import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../../config/db.js";
import { signToken, authenticate } from "../../middleware/auth.js";

const router = Router();

const loginSchema = z.object({
  email: z.string().optional(),
  employeeId: z.string().optional(),
  password: z.string().optional(),
  pin: z.string().optional(),
});

// Domain mapping for field roles
const ROLE_DOMAINS: Record<string, string> = {
  SIRDAR: "safety",
  SAFETY_INSPECTOR: "safety",
  TECHNICAL_COMPETENT_PERSON: "safety",
  ENVIRONMENT_OFFICER: "environment",
  PRODUCTION_OFFICER: "production",
  WELFARE_OFFICER: "labour",
  MINE_MANAGER: "safety",
  DGMS_INSPECTOR: "safety",
  CPCB_OFFICER: "environment",
  IBM_REGULATOR: "safety",
};

// Common gateway aliases mapped to real seeded BCCL & CIL accounts
const EMAIL_ALIASES: Record<string, string> = {
  "manager.gaslitand@nic.in": "manager.moonidih@bccl.gov.in",
  "cil.apex@nic.in": "chairman@coalindia.in",
  "cmd.bccl@coalindia.in": "cmd.bccl@coalindia.in",
  "gm.katras@bccl.gov.in": "gm.katras@bccl.gov.in",
  "safety.gaslitand@nic.in": "safety.katras@dgms.gov.in",
  "environment.gaslitand@nic.in": "env.dhanbad@cpcb.gov.in",
  "production.gaslitand@nic.in": "prod.moonidih@bccl.gov.in",
  "welfare.gaslitand@nic.in": "welfare.katras@bccl.gov.in",
};

// POST /api/v1/auth/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        status: "ERROR",
        errors: parseResult.error.format(),
      });
    }

    const identifier = (parseResult.data.email || parseResult.data.employeeId || "").trim();
    const credential = (parseResult.data.password || parseResult.data.pin || "").trim();

    if (!identifier || !credential) {
      return res.status(400).json({
        status: "ERROR",
        message: "Please provide an email or Employee ID and a Password or PIN.",
      });
    }

    const lookupEmail = (EMAIL_ALIASES[identifier.toLowerCase()] || identifier).toLowerCase();

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: lookupEmail, mode: "insensitive" } },
          { apexId: { equals: identifier, mode: "insensitive" } },
        ],
      },
      include: {
        subsidiary: {
          select: { code: true, name: true, state: true },
        },
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "ERROR",
        message: `Invalid credentials: User '${identifier}' not found. Try TEST-SIR-001 or manager.moonidih@bccl.gov.in`,
      });
    }

    // Accept statutory PINs (7492, 1234), demo passwords, or bcrypt hash comparison
    const isPinOrDemo =
      credential === "7492" ||
      credential === "1234" ||
      credential === "Password@123" ||
      credential === "admin123";
    const isMatch = isPinOrDemo || (await bcrypt.compare(credential, user.passwordHash));

    if (!isMatch) {
      return res.status(401).json({
        status: "ERROR",
        message: "Invalid credentials: Security PIN or Password incorrect",
      });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      apexId: user.apexId,
      subsidiaryId: user.subsidiaryId,
      areaId: user.areaId,
      collieryId: user.collieryId,
    };

    const token = signToken(tokenPayload);
    const domain = ROLE_DOMAINS[user.role] || "safety";

    res.json({
      status: "SUCCESS",
      message: "Authentication successful",
      token,
      user: {
        id: user.id,
        employeeId: user.apexId || user.id,
        name: user.fullName,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        domain,
        apexId: user.apexId,
        subsidiary: user.subsidiary,
        areaId: user.areaId,
        collieryId: user.collieryId,
      },
    });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/auth/me
router.get("/me", authenticate, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        subsidiary: true,
      },
    });

    if (!user) {
      return res.status(404).json({ status: "ERROR", message: "User not found" });
    }

    const { passwordHash, ...safeUser } = user;
    res.json({ status: "SUCCESS", user: safeUser });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// GET /api/v1/auth/demo-users (For frontend role picker / quick testing)
router.get("/demo-users", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        apexId: true,
        subsidiary: {
          select: { code: true, name: true },
        },
      },
      orderBy: { role: "asc" },
    });

    res.json({
      status: "SUCCESS",
      defaultPassword: "Password@123",
      demoUsers: users,
    });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

export default router;