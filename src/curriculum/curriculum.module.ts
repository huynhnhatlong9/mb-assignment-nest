import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { CurriculumRepository } from './repositories/curriculum.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [CurriculumController],
    providers: [CurriculumService, CurriculumRepository],
    exports: [CurriculumService],
})
export class CurriculumModule {}
