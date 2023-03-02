import { Module } from '@nestjs/common';
import { invitationEmailService } from './invitationEmail.service';
import { InvitationEmailController } from './invitationEmail.controller';
import { InvitationEmail } from './invitationEmail.entity';

@Module({
  imports: [InvitationEmail],
  providers: [invitationEmailService],
  exports: [invitationEmailService],
  controllers: [InvitationEmailController],
})
export class InvitationEmailModule {}