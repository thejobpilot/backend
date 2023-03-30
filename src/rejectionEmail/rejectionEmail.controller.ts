import { Controller, Post, Body } from '@nestjs/common';
import { RejectionEmailService } from './rejectionEmail.service';
import { RejectionEmailDTO } from './rejectionEmail.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags("email")
@Controller('emails')
export class RejectionEmailController {
  constructor(
    public rejectionEmailService: RejectionEmailService,
  ) {}

  @Post('rejection')
  async sendEmail(@Body() emailData: RejectionEmailDTO): Promise<any> {
      try {
        const response = await this.rejectionEmailService.sendRejectionEmail(
          emailData.to,
          emailData.fullName,
          emailData.position,
        );
        return { message: 'Email sent successfully' };
      } catch (error) {
        console.log(error);
        throw new Error('Failed to send email');
      }
    }
  }