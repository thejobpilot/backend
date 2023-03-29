import {
  Column,
  Entity, JoinColumn,
  ManyToOne, OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Interview } from './interview.entity';
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional} from "class-validator";
import {User} from "./user.entity";
import {VideoAnswer} from "./videoanswer.entity";

@Entity()
export class Response {
  @ApiProperty({ readOnly: true, required: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ readOnly: true, required: true })
  @ManyToOne(() => Interview, (interview) => interview.responses, {
    nullable: false,
  })
  interview: Interview;

  @IsOptional({ always: true })
  @IsNumber({}, { always: true })
  @Column({ nullable: false })
  @ApiProperty({ readOnly: true, required: true })
  interviewId?: number;

  @ApiProperty({ readOnly: true, required: true })
  @ManyToOne(() => User, (user) => user.positions, {
    nullable: false,
  })
  applicant: User;

  @IsOptional({ always: true })
  @Column({ nullable: false })
  @ApiProperty({ readOnly: true, required: true })
  applicantEmail?: string;

  @ApiProperty({ readOnly: true, required: false })
  @OneToMany(() => VideoAnswer, (videoAnswer) => videoAnswer.response, {
    nullable: true,
  })
  videoAnswers: VideoAnswer[];
}
