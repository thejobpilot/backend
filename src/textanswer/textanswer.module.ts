import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TextAnswerService} from "./textanswer.service";
import {TextAnswer} from "../entity/textanswer.entity";
import {TextAnswerController} from "./textanswer.controller";
import {ResponseService} from "../responses/response.service";
import {ResponseModule} from "../responses/response.module";
import {QuestionModule} from "../questions/question.module";

@Module({
    imports: [TypeOrmModule.forFeature([TextAnswer]), ResponseModule, QuestionModule],
    providers: [TextAnswerService],
    exports: [TextAnswerService],
    controllers: [TextAnswerController],
})
export class TextAnswerModule {
}
