import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VideoAnswerService} from "./videoanswer.service";
import {VideoAnswerController} from "./videoanswer.controller";
import {VideoAnswer} from "../entity/videoanswer.entity";
import {S3UploaderService} from "../responses/s3uploader.service";

@Module({
    imports: [TypeOrmModule.forFeature([VideoAnswer])],
    providers: [VideoAnswerService, S3UploaderService],
    exports: [VideoAnswerService],
    controllers: [VideoAnswerController],
})
export class VideoAnswerModule {
}
