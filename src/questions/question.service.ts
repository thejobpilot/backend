import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entity/user.entity';
import { Question } from '../entity/question.entity';

@Injectable()
export class QuestionService extends TypeOrmCrudService<Question> {
  constructor(@InjectRepository(Question) repo) {
    super(repo);
  }
}
