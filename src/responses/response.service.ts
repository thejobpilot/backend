import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entity/user.entity';
import { Question } from '../entity/question.entity';
import {Response} from "../entity/response.entity";

@Injectable()
export class ResponseService extends TypeOrmCrudService<Response> {
  constructor(@InjectRepository(Response) repo) {
    super(repo);
  }
}
