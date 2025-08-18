import { prisma } from '@/core/database';
import type { GoogleProfile } from '../types';
import type { User } from '@prisma/client';

export class UserService {
  // Google OAuth ユーザー検索・作成
  async findOrCreateUser(googleProfile: GoogleProfile): Promise<User> {
    const googleId = googleProfile.id;

    // 既存のOAuthアカウントを検索
    const existingOAuth = await prisma.oAuthAccount.findUnique({
      where: {
        provider_providerId: {
          provider: 'google',
          providerId: googleId,
        },
      },
      include: {
        user: true,
      },
    });

    if (existingOAuth) {
      // 既存ユーザーの最終ログイン時刻を更新
      await prisma.user.update({
        where: { id: existingOAuth.userId },
        data: { lastLoginAt: new Date() },
      });
      return existingOAuth.user;
    }

    // 新規ユーザーとOAuthアカウントを作成
    return await prisma.user.create({
      data: {
        email: googleProfile.emails[0].value,
        name: `${googleProfile.name.givenName} ${googleProfile.name.familyName}`,
        profileImageUrl: googleProfile.photos[0].value,
        lastLoginAt: new Date(),
        oauthAccounts: {
          create: {
            provider: 'google',
            providerId: googleId,
            email: googleProfile.emails[0].value,
          },
        },
      },
      include: {
        oauthAccounts: true,
      },
    });
  }

  // ユーザーIDで検索
  async findById(userId: string): Promise<User | null> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  // メールアドレスで検索
  async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw new Error('Email is required');
    }

    return await prisma.user.findUnique({
      where: { email },
    });
  }

  // ユーザー更新
  async updateUser(
    userId: string,
    data: Partial<Pick<User, 'name' | 'profileImageUrl' | 'lastLoginAt'>>
  ): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  }
}

// シングルトンインスタンス
export const userService = new UserService();