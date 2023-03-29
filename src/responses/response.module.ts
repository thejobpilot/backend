import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Response} from "../entity/response.entity";
import {ResponseService} from "./response.service";
import {ResponseController} from "./response.controller";
import {S3UploaderService} from "./s3uploader.service";

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  providers: [ResponseService, S3UploaderService],
  exports: [ResponseService],
  controllers: [ResponseController],
})
export class ResponseModule {}
