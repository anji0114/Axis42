import { Module } from '@nestjs/common';
import { VariationsController } from './variations.controller';
import { VariationsService } from './variations.service';
import { PrismaModule } from '@/core/database/prisma/prisma.module';
import { AnthropicModule } from '@/modules/anthropic/anthropic.module';

@Module({
  imports: [PrismaModule, AnthropicModule],
  controllers: [VariationsController],
  providers: [VariationsService],
  exports: [VariationsService],
})
export class VariationsModule {}
