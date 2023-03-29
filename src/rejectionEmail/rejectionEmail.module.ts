import { Module } from '@nestjs/common';
import { RejectionEmailService } from './rejectionEmail.service';
import { RejectionEmailController } from './rejectionEmail.controller';
import { RejectionEmailDTO } from './rejectionEmail.dto';

@Module({
  imports: [],
  providers: [RejectionEmailService],
  exports: [RejectionEmailService],
  controllers: [RejectionEmailController],
})
export class RejectionEmailModule {}