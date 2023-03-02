import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from '../entity/user.entity';
import { QuestionService } from './question.service';
import { Question } from '../entity/question.entity';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Question,
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
  },
  query: {
    join: {
      interview: {},
    },
  },
})
@ApiTags('question')
@Controller('/interview/:interviewId/question')
export class QuestionController implements CrudController<Question> {
  constructor(public service: QuestionService) {}
}
