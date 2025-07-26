import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { CLIENT_URL } from './common/constatants/urls';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookie parser
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  // Enable CORS for frontend
  app.enableCors({
    origin: CLIENT_URL || 'http://localhost:3001',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3300);
}

void bootstrap();
