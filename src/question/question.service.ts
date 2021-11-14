import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionRepository } from './repositories/question.repository';

@Injectable()
export class QuestionService {
    constructor(private questionRepository: QuestionRepository) {}

    async create(userId: string, createQuestionDto: CreateQuestionDto) {
        const foundUser = await this.questionRepository.findUserById(userId);
        return await this.questionRepository.createNewQuestion(
            foundUser.email,
            createQuestionDto,
        );
    }
}
