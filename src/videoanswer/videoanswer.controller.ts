import {Controller,} from '@nestjs/common';
import {Crud, CrudController,} from '@nestjsx/crud';

import {ApiTags} from '@nestjs/swagger';
import {VideoAnswerService} from './videoanswer.service';
import {VideoAnswer} from "../entity/videoanswer.entity";

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
@Controller('/response/:responseId/question/:questionId')
export class VideoAnswerController implements CrudController<VideoAnswer> {
    constructor(
        public service: VideoAnswerService,
    ) {
    }
}
