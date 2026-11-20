import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.decode(token) as DecodedToken;
      const userRole = decoded["custom:role"] || "";
      req.user = {
        id: decoded.sub,
        role: userRole,
      };
      const hasAccess = allowedRoles.includes(userRole.toLocaleLowerCase());
      if (!hasAccess) {
        return res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
};
