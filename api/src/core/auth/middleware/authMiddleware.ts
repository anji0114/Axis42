import { Request, Response, NextFunction } from "express";
import { authService } from "../authService";
import type { AuthRequest } from "../types";

// JWT認証ミドルウェア
export async function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const payload = await authService.verifyAccessToken(token);
    (req as AuthRequest).user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
      message: error instanceof Error ? error.message : "Authentication failed",
    });
  }
}