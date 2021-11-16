import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Post(':username')
    async create(
        @Body() createQuestionDto: CreateQuestionDto,
        @Param('username') username: string,
    ) {
        const foundUser = await this.questionService.findUserByUsername(
            username,
        );
        return this.questionService.create(foundUser._id, createQuestionDto);
    }
}
