import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Interview } from './interview.entity';
import { UserType } from './usertype.entity';

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

  @IsOptional({ always: true })
  @IsNumber({}, { always: true })
  @Column({ nullable: true })
  @ApiProperty({ readOnly: true, required: false })
  interviewId?: number;

  @ApiProperty({ readOnly: true, required: false })
  @ManyToOne(() => Interview, {
    nullable: true,
  })
  interview: Interview;
}
