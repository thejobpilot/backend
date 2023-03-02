import {ApiProperty} from "@nestjs/swagger";

export default class AssignInterviewDTO {
    @ApiProperty()
    interviewId: number
}