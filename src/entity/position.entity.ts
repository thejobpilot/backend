import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Interview } from './interview.entity';
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

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
}
