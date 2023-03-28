import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Interview } from './interview.entity';
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional} from "class-validator";
import {User} from "./user.entity";

@Entity()
export class Response {
  @ApiProperty({ readOnly: true, required: false })

  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ readOnly: true, required: false })
  @ManyToOne(() => Interview, (interview) => interview.responses, {
    nullable: true,
  })
  interview: Interview;


  @IsOptional({ always: true })
  @IsNumber({}, { always: true })
  @Column({ nullable: true })
  @ApiProperty({ readOnly: true, required: false })
  interviewId?: number;

  @ApiProperty({ readOnly: true, required: false })
  @ManyToOne(() => User, (user) => user.positions, {
    nullable: true,
  })
  applicant: User;
}
