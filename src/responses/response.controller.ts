import {
  Body,
  Controller,
  FileTypeValidator,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  ParsedRequest,
} from '@nestjsx/crud';

import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseService } from './response.service';
import { Response } from '../entity/response.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import {S3UploaderService} from "./s3uploader.service";

@Crud({
  model: {
    type: Response,
  },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'getOneBase', 'deleteOneBase', 'getManyBase'],
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
    },
    interviewId: {
      field: 'interviewId',
      type: 'number',
    },
    applicantEmail: {
      field: 'applicantEmail',
      type: 'string',
    },
  },
  query: {
    join: {
      interview: {},
      textAnswers: {
        eager: true
      },
      videoAnswers: {
        eager: true
      },
    },
  },
})
@ApiTags('response')
@Controller('/interview/:interviewId/response/:applicantEmail')
export class ResponseController implements CrudController<Response> {
  constructor(
    public service: ResponseService,
  ) {}



}
