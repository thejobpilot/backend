import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserInterviewRankingService} from './userinterviewranking.service';
import {UserInterviewRankingController} from './userinterviewranking.controller';
import {UserInterviewRanking} from "../entity/userinterviewranking.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserInterviewRanking])],
    providers: [UserInterviewRankingService],
    exports: [UserInterviewRankingService],
    controllers: [UserInterviewRankingController],
})
export class UserInterviewRankingModule {
}
