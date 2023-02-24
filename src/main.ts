import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";
import { ValidationPipe } from '@nestjs/common'
import configuration from "./config/configuration";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  Logger.log(`JobPilot backend running at http://localhost:${configuration().port}`)
  await app.listen(configuration().port);
}
bootstrap();
