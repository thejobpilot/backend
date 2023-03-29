import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TextAnswerService} from "./textanswer.service";
import {TextAnswer} from "../entity/textanswer.entity";
import {TextAnswerController} from "./textanswer.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TextAnswer])],
    providers: [TextAnswerService],
    exports: [TextAnswerService],
    controllers: [TextAnswerController],
})
export class TextAnswerModule {
}
