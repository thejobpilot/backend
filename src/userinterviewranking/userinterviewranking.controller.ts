import {Controller} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {UserInterviewRankingService} from './userinterviewranking.service';
import {ApiTags} from '@nestjs/swagger';
import {UserInterviewRanking} from "../entity/userinterviewranking.entity";

@Crud({
    model: {
        type: UserInterviewRanking,
    },
    routes: {
        only: ['createOneBase', 'updateOneBase', 'getOneBase', 'deleteOneBase'],
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
        userEmail: {
            field: 'userEmail',
            type: 'string',
        },
    },
})
@ApiTags('ranking')
@Controller('/user/:email/interview/:interviewId')
export class UserInterviewRankingController implements CrudController<UserInterviewRanking> {
    constructor(public service: UserInterviewRankingService) {
    }
}
