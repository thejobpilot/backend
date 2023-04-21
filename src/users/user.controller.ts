import {Body, Controller, Delete, HttpException, HttpStatus, Param, Post, UseInterceptors} from "@nestjs/common";
import {Crud, CrudController, CrudRequest, CrudRequestInterceptor, ParsedRequest} from '@nestjsx/crud';

import {User} from '../entity/user.entity';
import {UserService} from './user.service';
import {ApiTags} from '@nestjs/swagger';
import AssignInterviewDTO from "../dto/AssignInterviewDTO";
import {InterviewsService} from "../interviews/interviews.service";
import {InvitationEmailService} from "../invitationEmail/invitationEmail.service";
import {AcceptanceEmailService} from "../acceptanceEmail/acceptanceEmail.service";
import {RejectionEmailService} from "../rejectionEmail/rejectionEmail.service";
import {SubmissionEmailService} from "./submissionemail.service";

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
            'interviews.responses': {
                eager: true,
                alias: 'interviewResponses'
            },
            'interviews.responses.textAnswers': {
                eager: true,
                alias: 'textAnswers3'
            },
            'interviews.responses.videoAnswers': {
                eager: true,
                alias: 'videoAnswers3'
            },
            'interviews.questions': {
                eager: true,
                alias: 'interviewQuestions2'
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
            'positions.interviews.responses': {
                alias: "interviewPositionResponses",
                eager: true,
            },
            // 'interviewPositionResponses.textAnswers': {
            //     eager: true,
            //     alias: 'textAnswers'
            // },
            'positions.interviews.responses.textAnswers': {
                eager: true,
                alias: 'textAnswers2'
            },
            // 'interviewPositionResponses.videoAnswers': {
            //     eager: true,
            //     alias: 'videoAnswers'
            // },
            'positions.interviews.responses.videoAnswers': {
                eager: true,
                alias: 'videoAnswers2'
            },
        },
    },
    routes: {
        only: ['createOneBase', 'updateOneBase', 'getOneBase', 'deleteOneBase', 'getManyBase'],
    },
})
@ApiTags('users')
@Controller('user')
export class UserController implements CrudController<User> {
    constructor(public service: UserService, public interviewService: InterviewsService, public emailService: InvitationEmailService,
                public acceptanceEmailService: AcceptanceEmailService, public rejectionEmailService: RejectionEmailService, public submissionEmailService: SubmissionEmailService) {
    }

    @UseInterceptors(CrudRequestInterceptor)
    @Post(':email/assign-interview')
    async assignInterview(
        @ParsedRequest() request: CrudRequest,
        @Param('email') email: string,
        @Body() body: AssignInterviewDTO,
    ): Promise<User> {
        const user = await this.service.findOne({where: {email: email}, relations: ["interviews"]});
        const interview = await this.interviewService.findOne({where: {id: body.interviewId}});

        if (!user) {
            throw new HttpException('User with that ID does not exist', HttpStatus.I_AM_A_TEAPOT);
        }

        if (!interview) {
            throw new HttpException('Interview with that ID does not exist', HttpStatus.I_AM_A_TEAPOT);
        }
        if (user.interviews == null) {
            user.interviews = [];
        }
        user.interviews.push(interview);
        await this.service.updateOne(request, user);
        await this.emailService.sendInvitationEmail(user.email, user.fullName);
        return user;
    }

    @UseInterceptors(CrudRequestInterceptor)
    @Post(':email/send-acceptation')
    async sendAcceptation(
        @ParsedRequest() request: CrudRequest,
        @Param('email') email: string,
        @Body() body: AssignInterviewDTO
    ): Promise<void> {
        const user = await this.service.findOne({where: {email: email}, relations: ['interviews']});

        if (!user) {
            throw new HttpException('User with that email does not exist', HttpStatus.NOT_FOUND);
        }

        const interview = await this.interviewService.findOne({where: {id: body.interviewId}, relations: ['position']});
        if (!interview) {
            throw new HttpException('Interview for user position does not exist', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        await this.acceptanceEmailService.sendAcceptanceEmail(email, user.fullName, interview.position.name);
        return;
    }

    @UseInterceptors(CrudRequestInterceptor)
    @Post(':email/send-rejection')
    async sendRejection(
        @ParsedRequest() request: CrudRequest,
        @Param('email') email: string,
        @Body() body: AssignInterviewDTO
    ): Promise<void> {
        const user = await this.service.findOne({where: {email: email}, relations: ['interviews']});

        if (!user) {
            throw new HttpException('User with that email does not exist', HttpStatus.NOT_FOUND);
        }

        const interview = await this.interviewService.findOne({where: {id: body.interviewId}, relations: ['position']});
        if (!interview) {
            throw new HttpException('Interview for user position does not exist', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        await this.rejectionEmailService.sendRejectionEmail(email, user.fullName, interview.position.name);
        return;
    }

    @UseInterceptors(CrudRequestInterceptor)
    @Delete(':email/remove-interview')
    async removeInterview(
        @ParsedRequest() request: CrudRequest,
        @Param('email') email: string,
        @Body() body: AssignInterviewDTO,
    ): Promise<User> {
        const user = await this.service.findOne({where: {email: email}, relations: ['interviews']});
        if (!user) {
            throw new HttpException('User with that ID does not exist', HttpStatus.I_AM_A_TEAPOT);
        }

        if (user.interviews != null) {
            let interviewId = body.interviewId;
            user.interviews = user.interviews.filter(interview => interview.id !== interviewId);
            await this.service.updateOne(request, user);
        }
        return user;
    }


    @UseInterceptors(CrudRequestInterceptor)
    @Post(':email/send-submission')
    async sendSubmission(
        @ParsedRequest() request: CrudRequest,
        @Param('email') email: string,
        @Body() body: AssignInterviewDTO
    ): Promise<void> {
        const user = await this.service.findOne({where: {email: email}, relations: ['interviews']});

        if (!user) {
            throw new HttpException('User with that email does not exist', HttpStatus.NOT_FOUND);
        }

        const interview = await this.interviewService.findOne({where: {id: body.interviewId}, relations: ['position']});
        if (!interview) {
            throw new HttpException('Interview for user position does not exist', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        await this.submissionEmailService.sendSubmissionEmail(email, user.fullName, interview.position.name);
        return;
    }
}
