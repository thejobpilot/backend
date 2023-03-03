import {
  Body,
  Controller, Delete,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Request,
  UseInterceptors
} from "@nestjs/common";
import {Crud, CrudController, CrudRequest, CrudRequestInterceptor, ParsedRequest} from '@nestjsx/crud';

import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Interview } from '../entity/interview.entity';
import AssignInterviewDTO from "../dto/AssignInterviewDTO";
import {InterviewsService} from "../interviews/interviews.service";
import { InvitationEmailService } from "../invitationEmail/invitationEmail.service";

@Crud({
  model: {
    type: User,
  },
  params: {
    email: {
      field: 'email',
      type: 'string',
      primary: true,
    },
  },
  query: {
    join: {
      interviews: {
        eager: true
      },
      positions: {
        eager: true
      },
      'positions.interviews': {
        eager: true,
        alias: "interviewQuestions",
      },
      'positions.interviews.questions': {
        eager: true,
      },
    },
  },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'getOneBase', 'deleteOneBase'],
  },
})
@ApiTags('users')
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService, public interviewService: InterviewsService, public emailService: InvitationEmailService) {}

  @UseInterceptors(CrudRequestInterceptor)
  @Post(':email/assign-interview')
  async assignInterview(
    @ParsedRequest() request: CrudRequest,
    @Param('email') email: string,
    @Body() body:  AssignInterviewDTO,
  ): Promise<User> {
    const user = await this.service.findOne({ where: { email: email } });
    const interview = await this.interviewService.findOne({ where: { id: body.interviewId } });

    if (!user) {
      throw new HttpException('User with that ID does not exist', HttpStatus.I_AM_A_TEAPOT);
    }

    if (!interview) {
      throw new HttpException('Interview with that ID does not exist', HttpStatus.I_AM_A_TEAPOT);
    }
    if(user.interviews == null) {
      user.interviews = [];
    }
    user.interviews.push(interview);
    await this.service.updateOne(request, user);
    await this.emailService.sendInvitationEmail(user.email, user.fullName);
    return user;
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Delete(':email/remove-interview')
  async removeInterview(
    @ParsedRequest() request: CrudRequest,
    @Param('email') email: string,
    @Body() body:  AssignInterviewDTO,
  ): Promise<User> {
    const user = await this.service.findOne({ where: { email: email } , relations: ['interviews']});
    if (!user) {
      throw new HttpException('User with that ID does not exist', HttpStatus.I_AM_A_TEAPOT);
    }

    if(user.interviews != null) {
      let interviewId = body.interviewId;
      user.interviews = user.interviews.filter(interview => interview.id !== interviewId);
      await this.service.updateOne(request, user);
    }
    return user;
  }
}
