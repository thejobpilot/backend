import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {TextAnswer} from "../entity/textanswer.entity";

@Injectable()
export class TextAnswerService extends TypeOrmCrudService<TextAnswer> {
    constructor(@InjectRepository(TextAnswer) repo) {
        super(repo);
    }
}
