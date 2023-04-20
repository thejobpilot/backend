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
import {VideoAnswer} from "./videoanswer.entity";

@Entity()
export class Question {
  @ApiProperty({ readOnly: true, required: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prompt: string;

  @IsOptional({ always: true })
  @IsNumber({}, { always: true })
  @Column({ nullable: false })
  @ApiProperty({ readOnly: true, required: false })
  interviewId?: number;

  @ApiProperty({ readOnly: true, required: false })
  @ManyToOne(() => Interview, (interview) => interview.questions, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  interview: Interview;

  @ApiProperty({ readOnly: true, required: false })
  @OneToMany(() => VideoAnswer, (videoAnswer) => videoAnswer.response, {
    nullable: true,
  })
  videoAnswers: VideoAnswer[];
}
