import {
    Controller,
    FileTypeValidator,
    HttpException,
    HttpStatus,
    Param,
    ParseFilePipe,
    Post, Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import {Crud, CrudController, CrudRequest, CrudRequestInterceptor, ParsedRequest,} from '@nestjsx/crud';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import {ApiBody, ApiConsumes, ApiTags} from '@nestjs/swagger';
import {VideoAnswerService} from './videoanswer.service';
import {VideoAnswer} from "../entity/videoanswer.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {S3UploaderService} from "../responses/s3uploader.service";

@Crud({
    model: {
        type: VideoAnswer,
    },
    routes: {
        only: ['createOneBase', 'updateOneBase', 'getOneBase', 'deleteOneBase'],
    },
    params: {
        id: {
            field: 'id',
            type: 'number',
        },
        responseId: {
            field: 'responseId',
            type: 'number',
        },
        questionId: {
            field: 'questionId',
            type: 'number',
        },
    },
    query: {
        join: {
            question: {},
        },
    },
})
@ApiTags('video_answer')
@Controller('/response/:responseId/question/:questionId/videoanswer')
export class VideoAnswerController implements CrudController<VideoAnswer> {
    constructor(
        public service: VideoAnswerService,
        private s3UploaderService: S3UploaderService,
    ) {
    }


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
        @Query('id') videoAnswerId: number,
        @Param('responseId') responseId: number,
        @Param('questionId') questionId: number,
        @UploadedFile(
        ) file,
    ): Promise<VideoAnswer> {
        console.log("file");
        console.log(file);
        const response: VideoAnswer = await this.service.findOne({
            where: {id: videoAnswerId},
            relations: ['response', 'question'],
        });
        if (!response) {
            throw new HttpException(
                'Response with that ID does not exist',
                HttpStatus.I_AM_A_TEAPOT,
            );
        }

        //upload to AWS s3 bucket here
        try {
            const fileKey = `${uuidv4()}.webm`;
            // Save the file URL to the response
            response.videoURL = await this.s3UploaderService.uploadFile(file, fileKey);
            console.log("Before")
            console.log(response)
            await this.service.updateOne(request, response);
            console.log("After")
            console.log(await this.service.findOne({
                where: {id: videoAnswerId},
                relations: ['response', 'question'],
            }))
        } catch (error) {
            throw new HttpException(
                `Error uploading file: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return response;
    }
}
