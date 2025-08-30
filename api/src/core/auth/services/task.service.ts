import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AuthService } from '../auth.service';

@Injectable()
export class TaskService {
  constructor(private authService: AuthService) {}

  // 毎日深夜2時に実行
  @Cron('0 2 * * *')
  async handleTokenCleanup() {
    console.log('Starting expired refresh token cleanup...');

    try {
      await this.authService.cleanupExpiredTokens();
      console.log('Expired refresh token cleanup completed successfully');
    } catch (error) {
      console.error('Failed to cleanup expired refresh tokens:', error);
    }
  }
}
