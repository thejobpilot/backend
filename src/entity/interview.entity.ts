import {
  Column,
  Entity, JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Position } from './position.entity';
import { ApiProperty } from '@nestjs/swagger';
import {IsNumber, IsOptional} from "class-validator";

@Entity()
export class Interview {
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: true })
  @Column()
  name: string;

  @ApiProperty({ required: true })
  @Column()
  prepTime: number;

  @IsOptional({ always: true })
  @IsNumber({}, { always: true })
  @Column({ nullable: false })
  positionId?: number;

  @ApiProperty({ readOnly: true })
  @ManyToOne(() => Position, (position) => position.interviews, {
    nullable: true,
  })
  position?: Position;

  @ApiProperty({ readOnly: true })
  @OneToMany(() => Question, (question) => question.interview, {
    nullable: true,
  })
  questions: Question[];
}
