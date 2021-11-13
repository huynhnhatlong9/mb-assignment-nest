import { Inject, Injectable } from '@nestjs/common';
import { QUESTION_MODEL } from 'src/database/database.constants';
import { QuestionModel } from 'src/database/model/question';
import { CreateQuestionDto } from '../dto/create-question.dto';

@Injectable()
export class QuestionRepository {
    constructor(@Inject(QUESTION_MODEL) private questionModel: QuestionModel) {}

    async createNewQuestion(createQuestion: CreateQuestionDto) {
        const createdQuestion = await this.questionModel.create(createQuestion);
        return createdQuestion;
    }
}
