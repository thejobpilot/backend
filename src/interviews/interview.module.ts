import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewsService } from './interviews.service';
import { InterviewsController } from './interviews.controller';
import { Interview } from '../entity/interview.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interview])],
  providers: [InterviewsService],
  exports: [InterviewsService],
  controllers: [InterviewsController],
})
export class InterviewModule {}
