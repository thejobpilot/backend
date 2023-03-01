import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsDate, IsDateString, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

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
  @ApiProperty({default: "2001-01-01"})
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

  @Column({
    nullable: true,
  })
  retakes: boolean;
}
