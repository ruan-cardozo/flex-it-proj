import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix(process.env.API_PREFIX);
  
  await app.listen(process.env.PORT);

  AppDataSource.initialize();
}
bootstrap();
