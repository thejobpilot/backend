import {Column, Entity, PrimaryColumn} from 'typeorm';
import {IsDate, IsDateString, IsString} from "class-validator";

export enum UserType {
    APPLICANT = "applicant",
    RECRUITER = "recruiter",
    EMPLOYER = "employer"
}

@Entity()
export class User {
    @PrimaryColumn({name: "email"})
    email: string;

    @IsString()
    @Column()
    username: string;

    @Column()
    fullName: string;

    @IsDateString()
    @Column({type: "date"})
    graduationDate: string;

    @Column()
    gpa: number;

    @Column()
    resumeLink: string;

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.APPLICANT
    })
    userType: UserType
}