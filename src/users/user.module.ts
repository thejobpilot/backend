import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entity/user.entity';
import {InterviewModule} from "../interviews/interview.module";
import { InvitationEmailModule } from "../invitationEmail/invitationEmail.module";
import { AcceptanceEmailModule } from "../acceptanceEmail/acceptanceEmail.module";
import { RejectionEmailModule } from "../rejectionEmail/rejectionEmail.module";
import {SubmissionEmailService} from "./submissionemail.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), InterviewModule, InvitationEmailModule, AcceptanceEmailModule, RejectionEmailModule],
  providers: [UserService, SubmissionEmailService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
