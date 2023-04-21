import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Position } from './position.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { User } from './user.entity';
import { Response } from './response.entity';
import { InterviewType } from './interviewtype.entity';
import { UserInterviewRanking } from './userinterviewranking.entity';

@Entity()
export class Interview {
  @ApiProperty({ readOnly: true, required: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: true })
  @Column()
  name: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Column({ default: 0, nullable: true })
  prepTime: number;

  @ApiProperty({ required: false })
  @IsNumber({})
  @Column({ nullable: true, default: 10 })
  interviewLength: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @Column({ nullable: true })
  retakes: number;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  videoURL: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true, default: false })
  showScoreToUser: boolean;

  @IsOptional({ always: true })
  @IsNumber({}, { always: true })
  @Column({ nullable: false })
  @ApiProperty({ readOnly: true, required: false })
  positionId?: number;

  @ApiProperty({ readOnly: true, required: false })
  @ManyToMany((type) => User, (u) => u.interviews, { cascade: true })
  applicants?: User[];

  @ApiProperty({ readOnly: true, required: false })
  @JoinColumn({ name: 'positionId' })
  @ManyToOne(() => Position, (position) => position.interviews, {
    persistence: false,
  })
  position?: Position;

  @ApiProperty({ readOnly: true, required: false })
  @JoinColumn({ name: 'questionId' })
  @OneToMany(() => Question, (question) => question.interview, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  questions: Question[];

  @ApiProperty({ readOnly: true, required: false })
  @JoinColumn({ name: 'responseId' })
  @OneToMany(() => Response, (response) => response.interview, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  responses: Response[];

  @Column({ nullable: true })
  interviewType: InterviewType;

  @ApiProperty({ required: true })
  @Column({ nullable: true })
  companyName: string;

  @ApiProperty({ readOnly: true, required: false })
  @OneToMany(() => UserInterviewRanking, (response) => response.interview, {
    nullable: true,
  })
  userInterviewRankings: UserInterviewRanking[];
}
