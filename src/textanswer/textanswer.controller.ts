import {Controller,} from '@nestjs/common';
import {Crud, CrudController,} from '@nestjsx/crud';

import {ApiTags} from '@nestjs/swagger';
import {TextAnswerService} from './textanswer.service';
import {TextAnswer} from "../entity/textanswer.entity";

@Crud({
    model: {
        type: TextAnswer,
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
@ApiTags('text_answer')
@Controller('/response/:responseId/question/:questionId/textanswer')
export class TextAnswerController implements CrudController<TextAnswer> {
    constructor(
        public service: TextAnswerService,
    ) {
    }
}
