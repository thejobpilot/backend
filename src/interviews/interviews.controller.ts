import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { InterviewsService } from './interviews.service';
import { Interview } from '../entity/interview.entity';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Interview,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
    positionId: {
      field: 'positionId',
      type: 'number',
    },
  },
  query: {
    join: {
      position: {},
      questions: {
        eager: true
      }
    },
  },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'getOneBase', 'deleteOneBase'],
  },
})
@ApiTags('interview')
@Controller('/position/:positionId/interview')
export class InterviewsController implements CrudController<Interview> {
  constructor(public service: InterviewsService) {}
}
