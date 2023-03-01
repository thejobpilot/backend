import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Interview } from './interview.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Position {
  @ApiProperty({
    readOnly: true
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    required: true
  })
  @Column()
  name: string;

  @ApiProperty({
    readOnly: true
  })
  @OneToMany(() => Interview, (interview) => interview.position, {
    nullable: true,
  })
  interviews: Interview[];
}
