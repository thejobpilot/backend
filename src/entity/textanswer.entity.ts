import {Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional} from "class-validator";
import {Response} from './response.entity';
import {Question} from "./question.entity";

@Entity()
export class TextAnswer {
    @ApiProperty({readOnly: true, required: false})
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({readOnly: false, required: false})
    answer: string;

    @IsOptional({always: true})
    @IsNumber({}, {always: true})
    @Column({nullable: false})
    @ApiProperty({readOnly: true, required: false})
    responseId?: number;

    @ApiProperty({readOnly: true, required: false})
    @ManyToOne(() => Response, (response) => response.textAnswers, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    response: Response;

    @IsOptional({always: true})
    @IsNumber({}, {always: true})
    @Column({nullable: false})
    @ApiProperty({readOnly: true, required: false})
    questionId?: number;

    @ApiProperty({readOnly: true, required: false})
    @ManyToOne(() => Question, (question) => question.videoAnswers, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    question: Question;

    @Column({ nullable: true, default: "" })
    @ApiProperty({ readOnly: false, required: false })
    aiRating: string;
}
