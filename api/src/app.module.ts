import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { FunctionsModule } from './functions/functions.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, ProjectsModule, FunctionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
