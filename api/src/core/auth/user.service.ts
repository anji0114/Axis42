import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { GoogleProfile } from 'src/shared/types/googleProfile';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateUser(googleProfile: GoogleProfile) {
    // GoogleプロフィールからユーザーIDを取得
    const googleId = googleProfile.id;

    // 既存のOAuthアカウントを検索
    const existingOAuth = await this.prisma.oAuthAccount.findUnique({
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
      await this.prisma.user.update({
        where: { id: existingOAuth.userId },
        data: { lastLoginAt: new Date() },
      });
      return existingOAuth.user;
    }

    // 新規ユーザーとOAuthアカウントを作成
    return await this.prisma.user.create({
      data: {
        email: googleProfile.emails[0].value,
        name: `${googleProfile.name.givenName} 
  ${googleProfile.name.familyName}`,
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

  async findById(userId: string) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
