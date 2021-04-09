import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import config from './config';

const port = config.APP.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.use('/public', express.static(join(__dirname, '../public')));

  await app.listen(port);

  Logger.log(`Server is listening on port ${port}`, 'Bootstrap');
}
bootstrap();
