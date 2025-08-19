import { Router, Request, Response } from "express";
import { prisma } from "@/core/database";
import { authService } from "@/core/auth/authService";
import {
  authenticateJWT,
  extractTokenFromCookie,
} from "@/core/auth/middleware/authMiddleware";
import { PassportService } from "@/core/auth/passportService";
import type { AuthRequest } from "@/core/auth/types";
import type { User } from "@prisma/client";

const router = Router();

// Google OAuth開始
router.get("/google", PassportService.getGoogleAuthMiddleware());

// Google OAuthコールバック
router.get(
  "/google/callback",
  PassportService.getGoogleCallbackMiddleware(),
  async (req: Request, res: Response) => {
    try {
      const user = (req as any).user as User;

      if (!user) {
        return res.redirect(
          `${process.env.CLIENT_URL}/login?error=auth_failed`
        );
      }

      const userAgent = req.headers["user-agent"];
      const ipAddress = req.ip || req.socket?.remoteAddress || "unknown";

      const result = await authService.login(user, userAgent, ipAddress);

      // Access Token Cookie (2時間)
      res.cookie(
        "access_token",
        result.access_token,
        getCookieOptions(2 * 60 * 60 * 1000)
      );

      // Refresh Token Cookie (7日間)
      res.cookie(
        "refresh_token",
        result.refresh_token,
        getCookieOptions(7 * 24 * 60 * 60 * 1000)
      );

      // フロントエンドにリダイレクト
      res.redirect(
        `${process.env.CLIENT_URL || "http://localhost:3000"}/dashboard`
      );
    } catch (error) {
      console.error("Google OAuth callback error:", error);
      res.redirect(
        `${
          process.env.CLIENT_URL || "http://localhost:3000"
        }/login?error=auth_failed`
      );
    }
  }
);

// Cookie設定用ヘルパー
function getCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge,
  };
}

// 認証状態チェック
router.get(
  "/me",
  extractTokenFromCookie,
  authenticateJWT,
  (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    res.json({
      user: authReq.user,
      authenticated: true,
    });
  }
);

// トークンリフレッシュ
router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }

    const userAgent = req.headers["user-agent"];
    const ipAddress = req.ip || req.socket?.remoteAddress || "unknown";

    const result = await authService.refreshAccessToken(
      refreshToken,
      userAgent,
      ipAddress
    );

    // 新しいトークンをCookieにセット
    res.cookie(
      "access_token",
      result.access_token,
      getCookieOptions(2 * 60 * 60 * 1000)
    ); // 2時間
    res.cookie(
      "refresh_token",
      result.refresh_token,
      getCookieOptions(7 * 24 * 60 * 60 * 1000)
    ); // 7日間

    res.json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    res.status(401).json({
      error: "Invalid refresh token",
      message: error instanceof Error ? error.message : "Token refresh failed",
    });
  }
});

// ログアウト
router.post(
  "/logout",
  extractTokenFromCookie,
  authenticateJWT,
  async (req: Request, res: Response) => {
    try {
      const authReq = req as AuthRequest;

      // DBのRefresh Tokenを無効化
      await authService.revokeRefreshTokens(authReq.user.userId);

      // Cookieをクリア
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");

      res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({
        error: "Logout failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

// 開発用: 手動ログイン（テスト用）
router.post("/dev-login", async (req: Request, res: Response) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({ error: "Not found" });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // ユーザー存在チェック（簡易版）
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userAgent = req.headers["user-agent"];
    const ipAddress = req.ip || req.socket?.remoteAddress || "unknown";

    const result = await authService.login(user, userAgent, ipAddress);

    // Cookieにセット
    res.cookie(
      "access_token",
      result.access_token,
      getCookieOptions(2 * 60 * 60 * 1000)
    );
    res.cookie(
      "refresh_token",
      result.refresh_token,
      getCookieOptions(7 * 24 * 60 * 60 * 1000)
    );

    res.json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Login failed",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
