import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "@/core/database";
import type { JwtPayload, LoginResult, RefreshTokenResult } from "./types";
import type { User } from "@prisma/client";

export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "default-secret";
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || "2h";
  }

  // JWT Access Token生成
  async generateAccessToken(payload: JwtPayload): Promise<string> {
    const options: SignOptions = {
      expiresIn: this.jwtExpiresIn as unknown as number,
    };
    return jwt.sign(payload, this.jwtSecret, options);
  }

  // JWT検証
  async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      return jwt.verify(token, this.jwtSecret) as JwtPayload;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  // ログイン処理
  async login(
    user: User,
    userAgent?: string,
    ipAddress?: string
  ): Promise<LoginResult> {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      name: user.name || "",
    };

    // Access Tokenを生成
    const access_token = await this.generateAccessToken(payload);

    // Refresh Tokenを生成
    const refresh_token = await this.generateRefreshToken(
      user.id,
      userAgent,
      ipAddress
    );

    return {
      access_token,
      refresh_token,
      user: payload,
    };
  }

  // Refresh Token生成
  private async generateRefreshToken(
    userId: string,
    userAgent?: string,
    ipAddress?: string
  ): Promise<string> {
    // ランダムなトークンを生成
    const randomToken = crypto.randomBytes(32).toString("hex");

    // 7日後の有効期限
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // DBに保存してIDを取得
    const savedToken = await prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: "", // 後で更新
        expiresAt,
        userAgent,
        ipAddress,
      },
    });

    // randomToken部分のみハッシュ化
    const tokenHash = await bcrypt.hash(randomToken, 10);

    // ハッシュ値を更新
    await prisma.refreshToken.update({
      where: { id: savedToken.id },
      data: { tokenHash },
    });

    // tokenId.randomTokenの形式で結合
    return `${savedToken.id}.${randomToken}`;
  }

  // Refresh Token検証・新しいAccess Token発行
  async refreshAccessToken(
    refreshToken: string,
    userAgent?: string,
    ipAddress?: string
  ): Promise<RefreshTokenResult> {
    // tokenId.randomTokenを分割
    const parts = refreshToken.split(".");
    if (parts.length !== 2) {
      throw new Error("Invalid refresh token format");
    }

    const [tokenId, randomToken] = parts;

    // 特定のtokenIdで検索
    const validToken = await prisma.refreshToken.findFirst({
      where: {
        id: tokenId,
        isRevoked: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    if (!validToken) {
      throw new Error("Refresh token not found or expired");
    }

    // ハッシュ値を照合
    const isValid = await bcrypt.compare(randomToken, validToken.tokenHash);
    if (!isValid) {
      throw new Error("Invalid refresh token");
    }

    // 使用済みRefresh Tokenを無効化
    await prisma.refreshToken.update({
      where: { id: validToken.id },
      data: {
        isRevoked: true,
        lastUsedAt: new Date(),
      },
    });

    // 新しいAccess Token + Refresh Tokenを発行
    const payload: JwtPayload = {
      userId: validToken.user.id,
      email: validToken.user.email,
      name: validToken.user.name || "",
    };

    const access_token = await this.generateAccessToken(payload);
    const new_refresh_token = await this.generateRefreshToken(
      validToken.user.id,
      userAgent,
      ipAddress
    );

    return {
      access_token,
      refresh_token: new_refresh_token,
      user: payload,
    };
  }

  // Refresh Token無効化（ログアウト時）
  async revokeRefreshTokens(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true },
    });
  }

  // 期限切れRefresh Tokenクリーンアップ
  async cleanupExpiredTokens(): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: new Date() } }, { isRevoked: true }],
      },
    });
  }
}

// シングルトンインスタンス
export const authService = new AuthService();
