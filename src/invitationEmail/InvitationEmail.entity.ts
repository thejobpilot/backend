import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class InvitationEmail {
      @ApiProperty()
      to: string;

      @ApiProperty()
      from: string;

      @ApiProperty()
      subject: string;

      @ApiProperty()
      text: string;
}