import { Module } from '@nestjs/common';
import { AcceptanceEmailService } from './acceptanceEmail.service';
import { AcceptanceEmailController } from './acceptanceEmail.controller';
import { AcceptanceEmailDTO } from './acceptanceEmail.dto';

@Module({
  imports: [],
  providers: [AcceptanceEmailService],
  exports: [AcceptanceEmailService],
  controllers: [AcceptanceEmailController],
})
export class AcceptanceEmailModule {}