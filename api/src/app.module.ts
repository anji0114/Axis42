import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './core/database/prisma/prisma.module';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { FunctionsModule } from './functions/functions.module';
import { VariationsModule } from './variations/variations.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    FunctionsModule,
    VariationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
