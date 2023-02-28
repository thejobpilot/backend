import {Column, Entity, PrimaryColumn} from 'typeorm';

export enum UserType {
    APPLICANT = "applicant",
    RECRUITER = "recruiter",
    EMPLOYER = "employer"
}

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

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