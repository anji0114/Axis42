import { Module } from '@nestjs/common';
import { FunctionsController } from './functions.controller';
import { FunctionsService } from './functions.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FunctionsController],
  providers: [FunctionsService],
  exports: [FunctionsService],
})
export class FunctionsModule {}
