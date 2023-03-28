import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { ApiTags } from '@nestjs/swagger';
import { ResponseService } from './response.service';
import { Response } from '../entity/response.entity';
import { Question } from '../entity/question.entity';

@Crud({
  model: {
    type: Response,
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
@ApiTags('response')
@Controller('/interview/:interviewId/response')
export class ResponseController implements CrudController<Response> {
  constructor(public service: ResponseService) {}
}
