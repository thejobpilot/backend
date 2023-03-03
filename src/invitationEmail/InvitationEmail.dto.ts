import { ApiProperty } from '@nestjs/swagger';

export class InvitationEmailDTO {
  @ApiProperty()
  to: string;

  @ApiProperty()
  fullName: string;
}
