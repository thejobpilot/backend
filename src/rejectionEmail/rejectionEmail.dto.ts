import { ApiProperty } from '@nestjs/swagger';

export class RejectionEmailDTO {
  @ApiProperty()
  to: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  position: string;
}
