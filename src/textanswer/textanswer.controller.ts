import {Controller,} from '@nestjs/common';
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest,} from '@nestjsx/crud';

import {ApiTags} from '@nestjs/swagger';
import {TextAnswerService} from './textanswer.service';
import {TextAnswer} from "../entity/textanswer.entity";
import {ResponseService} from "../responses/response.service";

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
        public responseService: ResponseService,
    ) {
    }

    get base(): CrudController<TextAnswer> {
        return this;
    }

    @Override()
    async createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: TextAnswer,
    ) {
        const { ChatGPTAPI } = await import('chatgpt')
        let response = await this.responseService.findOne({where: {id: dto.responseId}});
        // let apiKey = process.env.OPENAI_API_KEY;
        // console.log(apiKey)
        // const api = new ChatGPTAPI({
        //     apiKey: apiKey
        // })
        //
        // const responses = "I am very good at Java.";
        // const res = await api.sendMessage(`You are reviewing a candidates interview response. Rate the candidates response by its perceived quality. Base your answer primarily on its length and professionalism. Respond with a score of 0-10 rating the interviewer's response and a short explanation of why you gave them that score. Here is the user's interview responses, separated by newlines` +
        //     responses);
        // console.log(res);
        return this.base.createOneBase(req, dto);
    }
}
