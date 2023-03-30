import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import configuration from './config/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {DetailedErrorFilter} from "./errorHandling/detailed-error.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new DetailedErrorFilter());
  const config = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  Logger.log(
    `JobPilot backend running at http://localhost:${configuration().port}/api`,
  );
  await app.listen(configuration().port);
}

bootstrap();
