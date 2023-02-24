import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

    /*async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
      const question = new Question();
      question.prompt = createQuestionDto.prompt;
      question.answerTime = createQuestionDto.answerTime;
      question.prepTime = createQuestionDto.prepTime;
      question.numRetrys = createQuestionDto.numRetrys;

      return this.questionRepository.save(question);
    }*/

  async create(questionData: Question): Promise<Question> {
    const question = this.questionRepository.create(questionData);
    return this.questionRepository.save(question);
  }
}