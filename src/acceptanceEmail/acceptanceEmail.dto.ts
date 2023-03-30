import { ApiProperty } from '@nestjs/swagger';

export class AcceptanceEmailDTO {
  @ApiProperty()
  to: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  position: string;
}
