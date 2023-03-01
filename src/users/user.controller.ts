import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: User,
  },
  params: {
    email: {
      field: 'email',
      type: 'string',
      primary: true,

    },
  },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'getOneBase', 'deleteOneBase'],
  },
})
@ApiTags('users')
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
