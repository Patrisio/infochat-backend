import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://thirsty-kirch-c8b82a.netlify.app', 'http://localhost:3001'],
  });
  await app.listen(process.env.PORT || 3005);
}
bootstrap();
