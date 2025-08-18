import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
    });
  }

  async connect() {
    await this.$connect();
  }

  async disconnect() {
    await this.$disconnect();
  }
}

// シングルトンインスタンス
export const prisma = new PrismaService();

// アプリケーション終了時の処理
process.on('beforeExit', async () => {
  await prisma.disconnect();
});

process.on('SIGINT', async () => {
  await prisma.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.disconnect();
  process.exit(0);
});