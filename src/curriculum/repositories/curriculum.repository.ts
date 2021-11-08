import { Inject, Injectable } from '@nestjs/common';
import { IsNumberOptions } from 'class-validator';
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

    async getAllCurriculum(page: number, limit: number) {
        const skipData: number = page > 1 ? (page - 1) * limit - 1 : 0;
        const curriculums = await this.curriculumModel
            .find()
            .skip(skipData)
            .limit(4);
        return curriculums;
    }

    async getCurriculumById(id: string) {
        return await this.curriculumModel.findById(id);
    }

    async updateCurriculum(
        curriculumUpdateCondition: { _id: string },
        updatedCurriculum: UpdateCurriculumDto,
    ) {
        const curriculum = await this.curriculumModel.findOneAndUpdate(
            curriculumUpdateCondition,
            updatedCurriculum,
            { new: true, useFindAndModify: false },
        );
        return curriculum;
    }

    async deleteCurriculum(curriculumDeleteCondition: { _id: string }) {
        return await this.curriculumModel.findOneAndDelete(
            curriculumDeleteCondition,
        );
    }
}
