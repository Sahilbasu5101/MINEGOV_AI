import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "minegov_super_enterprise_dgms_cpcb_secret_key_2026";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  apexId?: string | null;
  subsidiaryId?: string | null;
  areaId?: string | null;
  collieryId?: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const signToken = (user: AuthenticatedUser): string => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || "7d",
  });
};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "ERROR",
      message: "Authorization token missing or invalid format. Use 'Bearer <token>'",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch (err: any) {
    return res.status(401).json({
      status: "ERROR",
      message: "Invalid or expired session token",
      error: err.message,
    });
  }
};

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ status: "ERROR", message: "Unauthenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "ERROR",
        message: `Forbidden: Access restricted. Role '${req.user.role}' is not authorized for this resource.`,
      });
    }

    next();
  };
};