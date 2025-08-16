import { Module } from '@nestjs/common';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';
import { PrismaModule } from '@/core/database/prisma/prisma.module';
import { AnthropicModule } from '@/modules/anthropic/anthropic.module';

@Module({
  imports: [PrismaModule, AnthropicModule],
  controllers: [ComponentsController],
  providers: [ComponentsService],
  exports: [ComponentsService],
})
export class ComponentsModule {}
