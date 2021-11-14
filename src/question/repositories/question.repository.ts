import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { QUESTION_MODEL, USER_MODEL } from 'src/database/database.constants';
import { QuestionModel } from 'src/database/model/question';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { MailService } from 'src/mailmodule/services/mail.service';
import { UserModel } from 'src/database/model/user.model';

@Injectable()
export class QuestionRepository {
    constructor(
        @Inject(QUESTION_MODEL) private questionModel: QuestionModel,
        @Inject(forwardRef(() => MailService))
        private readonly mailService: MailService,
        @Inject(USER_MODEL) private userModel: UserModel,
    ) {}

    async createNewQuestion(
        from: string,
        createQuestionDto: CreateQuestionDto,
    ) {
        const createdQuestion = await this.questionModel.create(
            createQuestionDto,
        );
        this.mailService.sendMailText({
            from,
            to_emails: createQuestionDto.email,
            subject: createQuestionDto.title,
            content: createQuestionDto.content,
            body: `<p>From: ${from}</p> \n\n
                   <h3>Subject: ${createQuestionDto.title}</h3>\n
                   <p><h3>Content:</h3>${'    '} ${
                createQuestionDto.content
            }</p>
                   `,
        });
        return createdQuestion;
    }

    async findUserById(userId: string) {
        return await this.userModel.findById(userId);
    }
}
