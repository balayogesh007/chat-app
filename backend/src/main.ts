import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
    },
  });
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);
  Logger.log(`Server Running on port ${PORT}`)
}
bootstrap();
