import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entity/user.entity';
import { Position } from '../entity/position.entity';

@Injectable()
export class PositionService extends TypeOrmCrudService<Position> {
  constructor(@InjectRepository(Position) repo) {
    super(repo);
  }
}
