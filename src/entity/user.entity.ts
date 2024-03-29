import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Interview } from './interview.entity';
import { UserType } from './usertype.entity';
import { Type } from 'class-transformer';
import { Position } from './position.entity';
import { InterviewType } from './interviewtype.entity';
import {Response} from "./response.entity";
import {UserInterviewRanking} from "./userinterviewranking.entity";

@Entity()
export class User {
  @PrimaryColumn({ name: 'email', unique: true })
  email: string;

  @IsString()
  @Column()
  username: string;

  @Column()
  fullName: string;

  @IsDateString()
  @ApiProperty({ default: '2001-01-01' })
  @Column({ type: 'date' })
  graduationDate: string;

  @Column()
  gpa: number;

  @Column()
  resumeLink: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.APPLICANT,
  })
  userType: UserType;

  @Column({ nullable: true })
  retakes: boolean;

  @Column({ nullable: true })
  jobPreference: string;

  @Column({ nullable: true })
  rolePreference: string;

  @Column({ nullable: true })
  locationPreference: string;

  @ApiProperty({ readOnly: true, required: false })
  @ManyToMany(() => Interview, {
    nullable: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinTable({
    name: 'user_interviews',
    joinColumn: {
      name: 'emailId',
      referencedColumnName: 'email',
    },
    inverseJoinColumn: {
      name: 'interviewId',
      referencedColumnName: 'id',
    },
  })
  interviews: Interview[];

  @ApiProperty({ readOnly: true, required: false })
  @OneToMany(() => Position, (position) => position.creator, {
    nullable: true,
  })
  @Type((t) => Position)
  positions: Position[];

  @ApiProperty({ readOnly: true, required: false })
  @OneToMany(() => Response, (position) => position.applicant, {
    nullable: true,
  })
  @Type((t) => Response)
  responses: Response[];

  @ApiProperty({ readOnly: true, required: false })
  @OneToMany(() => UserInterviewRanking, (response) => response.user, {
    nullable: true,
  })
  userInterviewRankings: UserInterviewRanking[];
}
