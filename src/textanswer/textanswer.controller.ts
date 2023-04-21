import {Controller,} from '@nestjs/common';
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest,} from '@nestjsx/crud';

import {ApiTags} from '@nestjs/swagger';
import {TextAnswerService} from './textanswer.service';
import {TextAnswer} from "../entity/textanswer.entity";
import {ResponseService} from "../responses/response.service";
import {QuestionService} from "../questions/question.service";
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
        public questionService: QuestionService,
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
        require('isomorphic-fetch');
        let question = await this.questionService.findOne({where: {id: dto.questionId}});
        const importDynamic = new Function('modulePath', 'return import(modulePath)')
        const {ChatGPTAPI} = await importDynamic('chatgpt')
        const api = new ChatGPTAPI({apiKey: process.env.OPENAI_API_KEY,})
        const prompt = `Give this question:
        "${question.prompt}"
        
        and this response:
        
        "${dto.answer}"
        
        Can you please grade this response to the given question. I would like you to grade the answer out of 100 and give me a score, 100 being perfect and 0 being absolutely terrible. Be harsh, this response is from an interview for my company and I need to make sure I hire the best of the best. I would also like you to provide me with the reason why you gave the score.`
        const res = await api.sendMessage(prompt)
        console.log(prompt);
        console.log(res.text);
        dto.aiRating = res.text;
        return this.base.createOneBase(req, dto);
    }
}
