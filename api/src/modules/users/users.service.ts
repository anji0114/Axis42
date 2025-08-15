import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { GoogleProfile } from '@/shared/types/googleProfile';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateUser(googleProfile: GoogleProfile): Promise<User> {
    const googleId = googleProfile.id;

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
      await this.prisma.user.update({
        where: { id: existingOAuth.userId },
        data: { lastLoginAt: new Date() },
      });
      return existingOAuth.user;
    }

    return await this.prisma.user.create({
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

  async findById(userId: string): Promise<User | null> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
