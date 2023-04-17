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
import {TextAnswer} from "./textanswer.entity";

@Entity()
export class Response {
  @ApiProperty({ readOnly: true, required: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: 0 })
  @ApiProperty({ readOnly: false, required: false })
  score: number;

  @Column({ nullable: true, default: "" })
  @ApiProperty({ readOnly: false, required: false })
  aiRating: string;

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

  @JoinColumn({ referencedColumnName: "interviews.responses.videoAnswers" }) // Add this line
  @ApiProperty({ readOnly: true, required: false })
  @OneToMany(() => VideoAnswer, (videoAnswer) => videoAnswer.response, {
    nullable: true,
  })
  videoAnswers: VideoAnswer[];

  @JoinColumn({ referencedColumnName: "interviews.responses.textAnswers" }) // Add this line
  @ApiProperty({ readOnly: true, required: false })
  @OneToMany(() => TextAnswer, (textAnswer) => textAnswer.response, {
    nullable: true,
  })
  textAnswers: TextAnswer[];

  @ApiProperty({ required: true })
  @IsNumber({}, { always: true })
  @Column({default: 10, nullable: true})
  endTime: number;

  @ApiProperty({ required: true })
  @IsNumber({}, { always: true })
  @Column({default: 10, nullable: true})
  startTime: number;
}
