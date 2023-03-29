import { Controller, Post, Body } from '@nestjs/common';
import { AcceptanceEmailService } from './acceptanceEmail.service';
import { AcceptanceEmailDTO } from './acceptanceEmail.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags("email")
@Controller('emails')
export class AcceptanceEmailController {
  constructor(
    public acceptanceEmailService: AcceptanceEmailService,
  ) {}

  @Post('acceptance')
  async sendEmail(@Body() emailData: AcceptanceEmailDTO): Promise<any> {
      try {
        const response = await this.acceptanceEmailService.sendAcceptanceEmail(
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
