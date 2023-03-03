import { Controller, Post, Body } from '@nestjs/common';
import { InvitationEmailService } from './invitationEmail.service';
import { InvitationEmailDTO } from './InvitationEmail.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags("email")
@Controller('emails')
export class InvitationEmailController {
  constructor(
    public invitationEmailService: InvitationEmailService,
  ) {}

  @Post('invitation')
  async sendEmail(@Body() emailData: InvitationEmailDTO): Promise<any> {
    try {
      const response = await this.invitationEmailService.sendInvitationEmail(
        emailData.to,
        emailData.fullName,
      );
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to send email');
    }
  }
}
