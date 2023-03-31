import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TextAnswerService} from "./textanswer.service";
import {TextAnswer} from "../entity/textanswer.entity";
import {TextAnswerController} from "./textanswer.controller";
import {ResponseService} from "../responses/response.service";
import {ResponseModule} from "../responses/response.module";

@Module({
    imports: [TypeOrmModule.forFeature([TextAnswer]), ResponseModule],
    providers: [TextAnswerService],
    exports: [TextAnswerService],
    controllers: [TextAnswerController],
})
export class TextAnswerModule {
}
