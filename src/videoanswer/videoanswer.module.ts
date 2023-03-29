import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VideoAnswerService} from "./videoanswer.service";
import {VideoAnswerController} from "./videoanswer.controller";
import {VideoAnswer} from "../entity/videoanswer.entity";

@Module({
    imports: [TypeOrmModule.forFeature([VideoAnswer])],
    providers: [VideoAnswerService],
    exports: [VideoAnswerService],
    controllers: [VideoAnswerController],
})
export class VideoAnswerModule {
}
