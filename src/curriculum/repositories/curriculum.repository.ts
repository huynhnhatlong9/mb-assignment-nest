import { Inject, Injectable } from '@nestjs/common';
import { CURRICULUM_MODEL } from 'src/database/database.constants';
import {
    Curriculum,
    CurriculumModel,
} from 'src/database/model/curriculum.model';
import { CreateCurriculumDto } from '../dto/create-curriculum.dto';
import { UpdateCurriculumDto } from '../dto/update-curriculum.dto';

@Injectable()
export class CurriculumRepository {
    constructor(
        @Inject(CURRICULUM_MODEL) private curriculumModel: CurriculumModel,
    ) {}

    async createNewCurriculum(createCurriculum: CreateCurriculumDto) {
        const createdCurriculum = await this.curriculumModel.create(
            createCurriculum,
        );
        return createdCurriculum;
    }
}
