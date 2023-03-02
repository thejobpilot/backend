import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entity/user.entity';
import {InterviewsService} from "../interviews/interviews.service";
import {InterviewModule} from "../interviews/interview.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), InterviewModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
