import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entity/user.entity';
import { Interview } from '../entity/interview.entity';

@Injectable()
export class InterviewsService extends TypeOrmCrudService<Interview> {
  constructor(@InjectRepository(Interview) repo) {
    super(repo);
  }
}
