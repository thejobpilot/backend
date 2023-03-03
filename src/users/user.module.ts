import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entity/user.entity';
import {InterviewModule} from "../interviews/interview.module";
import { InvitationEmailModule } from "../invitationEmail/invitationEmail.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), InterviewModule, InvitationEmailModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
