import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Post(':userId')
    create(
        @Body() createQuestionDto: CreateQuestionDto,
        @Param('userId') userId: string,
    ) {
        return this.questionService.create(userId, createQuestionDto);
    }
}
