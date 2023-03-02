import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Interview } from './interview.entity';
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsNumber, IsOptional, IsString} from "class-validator";
import {User} from "./user.entity";

@Entity()
export class Position {
  @ApiProperty({ readOnly: true, required: false })

  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    required: true
  })
  @Column()
  name: string;

  @ApiProperty({ readOnly: true, required: false })
  @OneToMany(() => Interview, (interview) => interview.position, {
    nullable: true
  })
  @Type((t) => Interview)
  interviews: Interview[];


  @Column({ nullable: true})
  @ApiProperty({ readOnly: true, required: false })
  creatorEmail?: string;


  @ApiProperty({ readOnly: true, required: false })
  @ManyToOne(() => User, (interview) => interview.positions, {
    nullable: true,
  })
  creator: User;
}
