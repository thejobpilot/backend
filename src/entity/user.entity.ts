import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import {IsDate, IsDateString, IsNumber, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Interview } from './interview.entity';
import { Type } from 'class-transformer';

export enum UserType {
  APPLICANT = 'applicant',
  RECRUITER = 'recruiter',
  EMPLOYER = 'employer',
}

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

  @Column({nullable: true})
  retakes: boolean;


  @IsOptional({ always: true })
  @IsNumber({}, { always: true })
  @Column({ nullable: true })
  @ApiProperty({ readOnly: true })
  interviewId?: number;

  @ApiProperty({ readOnly: true })
  @ManyToOne(() => Interview, {
    nullable: true,
  })
  interview: Interview;
}
