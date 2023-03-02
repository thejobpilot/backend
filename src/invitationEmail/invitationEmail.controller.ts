import { Controller, Post, Body } from '@nestjs/common';
import { invitationEmailService } from './invitationEmail.service';
import { InvitationEmail } from './invitationEmail.entity';

@Controller('emails')
export class InvitationEmailController {
  constructor(private readonly invitationEmailService: invitationEmailService) {}

  @Post('invitation')
  async sendEmail(@Body() emailData: InvitationEmail): Promise<any> {
    try {
      const response = await invitationEmailService.sendEmail(emailData.to, emailData.from, emailData.subject, emailData.text);
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to send email');
    }
  }
}
