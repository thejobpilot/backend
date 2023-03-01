import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Interview } from './interview.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prompt: string;

  @ManyToOne(() => Interview, (interview) => interview.questions, {
    nullable: true,
  })
  interview: Interview;
}
