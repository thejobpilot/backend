import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from '../entity/user.entity';
import { QuestionService } from './question.service';
import { Question } from '../entity/question.entity';
import {ApiTags} from "@nestjs/swagger";

@Crud({
  model: {
    type: Question,
  },
})
@ApiTags("question")
@Controller('question')
export class QuestionController implements CrudController<Question> {
  constructor(public service: QuestionService) {}
}
