import { Module } from '@nestjs/common';
import { InvitationEmailService } from './invitationEmail.service';
import { InvitationEmailController } from './invitationEmail.controller';
import { InvitationEmailDTO } from './InvitationEmail.dto';

@Module({
  imports: [],
  providers: [InvitationEmailService],
  exports: [InvitationEmailService],
  controllers: [InvitationEmailController],
})
export class InvitationEmailModule {}