import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { PositionService } from './position.service';
import { Position } from '../entity/position.entity';
import {ApiTags} from "@nestjs/swagger";

@Crud({
  model: {
    type: Position,
  },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'getOneBase', 'deleteOneBase'],
  },
})
@ApiTags("position")
@Controller('position')
export class PositionController implements CrudController<Position> {
  constructor(public service: PositionService) {}
}
