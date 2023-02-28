import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

export enum UserType {
    APPLICANT = "applicant",
    RECRUITER = "recruiter",
    EMPLOYER = "employer"
}

@Entity()
export class User {
    @PrimaryColumn()
    auth0Id: number;

    @Column()
    username: string;

    @Column()
    fullName: string;

    @Column()
    email: string;

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