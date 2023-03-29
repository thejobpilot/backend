import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {VideoAnswer} from "../entity/videoanswer.entity";

@Injectable()
export class VideoAnswerService extends TypeOrmCrudService<VideoAnswer> {
    constructor(@InjectRepository(VideoAnswer) repo) {
        super(repo);
    }
}
