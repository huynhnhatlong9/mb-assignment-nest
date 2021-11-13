import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionRepository } from './repositories/question.repository';

@Injectable()
export class QuestionService {
    constructor(private questionRepository: QuestionRepository) {}

    async create(createQuestionDto: CreateQuestionDto) {
        return await this.questionRepository.createNewQuestion(
            createQuestionDto,
        );
    }
}
