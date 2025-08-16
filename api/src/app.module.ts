import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '@/core/database/prisma/prisma.module';
import { AuthModule } from '@/core/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { ProjectsModule } from '@/modules/projects/projects.module';
import { ComponentsModule } from '@/modules/components/components.module';
import { AnthropicModule } from '@/modules/anthropic/anthropic.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    ComponentsModule,
    AnthropicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
