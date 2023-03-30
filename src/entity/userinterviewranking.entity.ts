import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique,} from 'typeorm';
import {Interview} from './interview.entity';
import {User} from './user.entity';
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional} from "class-validator";

@Entity()
export class UserInterviewRanking {
    @ApiProperty({ readOnly: true, required: false })
    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional({always: true})
    @Column({nullable: false})
    @ApiProperty({readOnly: true, required: false})
    @Column()
    userEmail: string;

    @IsOptional({always: true})
    @IsNumber({}, {always: true})
    @Column({nullable: false})
    @ApiProperty({readOnly: true, required: false})
    @Column()
    interviewId: number;

    @ApiProperty({readOnly: true, required: false})
    @ManyToOne(() => User, (user) => user.userInterviewRankings, {
        nullable: false
    })
    @JoinColumn({name: 'userId'})
    user: User;

    @ApiProperty({readOnly: true, required: false})
    @ManyToOne(() => Interview, (interview) => interview.userInterviewRankings, {
        nullable: false
    })
    @JoinColumn({name: 'interviewId'})
    interview: Interview;

    @Column()
    ranking: number;
}
