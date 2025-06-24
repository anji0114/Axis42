import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ← これで全体で使える
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
