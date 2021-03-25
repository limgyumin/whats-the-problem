import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';

const port = config.APP.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  await app.listen(port);

  Logger.log(`Server is listening on port ${port}`, 'Bootstrap');
}
bootstrap();
