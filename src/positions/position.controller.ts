import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { PositionService } from './position.service';
import { Position } from '../entity/position.entity';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Position,
  },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'getOneBase', 'deleteOneBase'],
  },
  params: {
    id: {
      field: "id",
      type: "number"
    },
    creatorEmail: {
      field: "creatorEmail",
      type: "string"
    }
  },
  query: {
    alwaysPaginate: false,
    softDelete: true,
    join: {
      interviews: {
        eager: true,
      },
      'interviews.questions': {
        eager: true,
      },
      'interviews.responses': {
        eager: true,
      },
    },
  },
})
@ApiTags('position')
@Controller('/position/:creatorEmail')
export class PositionController implements CrudController<Position> {
  constructor(public service: PositionService) {}
}
