import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.entity';

@Controller()
export class QuestionController {
  constructor(private readonly QuestionService: QuestionService) {}

    /*@Post()
    async create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
      return this.QuestionService.create(createQuestionDto);
    }*/

  @Post()
  async create(@Body() QuestionData: Question): Promise<Question> {
    const createdQuestion = await this.QuestionService.create(QuestionData);
    return createdQuestion;
  }
}
