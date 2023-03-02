import {
  Column,
  Entity,
  JoinColumn,
  JoinTable, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Position } from './position.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import {User} from "./user.entity";

@Entity()
export class Interview {
  @ApiProperty({ readOnly: true, required: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: true })
  @Column()
  name: string;

  @ApiProperty({ required: true })
  @IsNumber({}, { always: true })
  @Column()
  prepTime: number;

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
    onDelete: 'CASCADE',
  })
  position?: Position;

  @ApiProperty({ readOnly: true, required: false })
  @JoinColumn({ name: 'questionId' })
  @OneToMany(() => Question, (question) => question.interview, {
    nullable: true,
  })
  questions: Question[];
}
