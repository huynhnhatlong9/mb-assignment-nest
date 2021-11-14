import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { DatabaseModule } from 'src/database/database.module';
import { QuestionRepository } from './repositories/question.repository';
import { MailModule } from 'src/mailmodule/mailmodule.module';

@Module({
    imports: [DatabaseModule, MailModule],
    controllers: [QuestionController],
    providers: [QuestionService, QuestionRepository],
    exports: [QuestionService],
})
export class QuestionModule {}
