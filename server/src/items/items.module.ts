import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ItemsResolver } from './items.resolver';

@Module({
  providers: [ItemsService, ItemsResolver],
  imports: [PrismaModule],
})
export class ItemsModule {}
