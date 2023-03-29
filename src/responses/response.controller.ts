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
    },
  },
})
@ApiTags('response')
@Controller('/interview/:interviewId/response/:applicantEmail')
export class ResponseController implements CrudController<Response> {
  constructor(
    public service: ResponseService,
    private s3UploaderService: S3UploaderService,
  ) {}

  @UseInterceptors(CrudRequestInterceptor, FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload-video')
  async assignInterview(
    @ParsedRequest() request: CrudRequest,
    @Param('interviewId') interviewId: number,
    @Param('id') responseId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'video/webm' })],
      }),
    )
    file,
  ): Promise<Response> {
    const response: Response = await this.service.findOne({
      where: { id: responseId },
      relations: ['interview', 'applicant'],
    });
    if (!response) {
      throw new HttpException(
        'Response with that ID does not exist',
        HttpStatus.I_AM_A_TEAPOT,
      );
    }

    //upload to AWS s3 bucket here
    try {
      const fileKey = `${responseId}/${file.originalname}`;
      const fileUrl = await this.s3UploaderService.uploadFile(file, fileKey);

      // Save the file URL to the response
      //response.videoUrl = fileUrl;
      //await this.service.update(responseId, response);
    } catch (error) {
      throw new HttpException(
        `Error uploading file: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return response;
  }
}
