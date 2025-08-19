import { Request, Response, NextFunction } from "express";
import { authService } from "../authService";
import type { AuthRequest } from "../types";

// Cookieからトークンを抽出するミドルウェア
export function extractTokenFromCookie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.access_token;
  next();
}

// JWT認証ミドルウェア
export async function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

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

// オプショナル認証ミドルウェア（トークンがなくてもエラーにしない）
export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

    if (token) {
      const payload = await authService.verifyAccessToken(token);
      (req as AuthRequest).user = payload;
    }

    next();
  } catch (error) {
    // トークンが無効でも続行
    next();
  }
}
