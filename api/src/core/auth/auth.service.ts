import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(user: User, userAgent?: string, ipAddress?: string) {
    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
    };

    // Access Tokenを生成
    const access_token = await this.jwtService.signAsync(payload);

    // Refresh Tokenを生成
    const refresh_token = await this.generateRefreshToken(
      user.id,
      userAgent,
      ipAddress,
    );

    return {
      access_token,
      refresh_token,
      user,
    };
  }

  // Refresh Token生成
  private async generateRefreshToken(
    userId: string,
    userAgent?: string,
    ipAddress?: string,
  ) {
    // ランダムなトークンを生成
    const randomToken = crypto.randomBytes(32).toString('hex');

    // 7日後の有効期限
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // DBに保存してIDを取得
    const savedToken = await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: '', // 後で更新
        expiresAt,
        userAgent,
        ipAddress,
      },
    });

    // randomToken部分のみハッシュ化
    const tokenHash = await bcrypt.hash(randomToken, 10);

    // ハッシュ値を更新
    await this.prisma.refreshToken.update({
      where: { id: savedToken.id },
      data: { tokenHash },
    });

    // tokenId.randomTokenの形式で結合
    const refreshToken = `${savedToken.id}.${randomToken}`;
    return refreshToken;
  }

  // Refresh Token検証・新しいAccess Token発行
  async refreshAccessToken(
    refreshToken: string,
    userAgent?: string,
    ipAddress?: string,
  ) {
    // tokenId.randomTokenを分割
    const parts = refreshToken.split('.');
    if (parts.length !== 2) {
      throw new Error('Invalid refresh token format');
    }

    const [tokenId, randomToken] = parts;

    // 特定のtokenIdで検索（高速）
    const validToken = await this.prisma.refreshToken.findFirst({
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
      throw new Error('Refresh token not found or expired');
    }

    // ハッシュ値を照合（1回だけ）
    const isValid = await bcrypt.compare(randomToken, validToken.tokenHash);
    if (!isValid) {
      throw new Error('Invalid refresh token');
    }

    // 使用済みRefresh Tokenを無効化
    await this.prisma.refreshToken.update({
      where: { id: validToken.id },
      data: {
        isRevoked: true,
        lastUsedAt: new Date(),
      },
    });

    // 新しいAccess Token + Refresh Tokenを発行
    const payload = {
      userId: validToken.user.id,
      email: validToken.user.email,
      name: validToken.user.name,
    };

    const access_token = await this.jwtService.signAsync(payload);
    const new_refresh_token = await this.generateRefreshToken(
      validToken.user.id,
      userAgent,
      ipAddress,
    );

    return {
      access_token,
      refresh_token: new_refresh_token,
      user: validToken.user,
    };
  }

  // Refresh Token無効化（ログアウト時）
  async revokeRefreshTokens(userId: string) {
    await this.prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true },
    });
  }

  // 期限切れRefresh Tokenクリーンアップ
  async cleanupExpiredTokens() {
    await this.prisma.refreshToken.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: new Date() } }, { isRevoked: true }],
      },
    });
  }
}
