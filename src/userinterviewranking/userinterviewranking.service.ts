import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {UserInterviewRanking} from "../entity/userinterviewranking.entity";

@Injectable()
export class UserInterviewRankingService extends TypeOrmCrudService<UserInterviewRanking> {
    constructor(@InjectRepository(UserInterviewRanking) repo) {
        super(repo);
    }
}
