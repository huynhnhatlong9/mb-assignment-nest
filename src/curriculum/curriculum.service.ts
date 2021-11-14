import { Inject, Injectable } from '@nestjs/common';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { CurriculumRepository } from './repositories/curriculum.repository';

@Injectable()
export class CurriculumService {
    constructor(private curriculumRepository: CurriculumRepository) {}

    async create(createCurriculumDto: CreateCurriculumDto) {
        return await this.curriculumRepository.createNewCurriculum(
            createCurriculumDto,
        );
    }

    checkStatusInput(status: string) {
        return status === 'STOCKING' || status === 'SOLDOUT';
    }

    async findAll(page: number, limit: number) {
        return await this.curriculumRepository.getAllCurriculum(page, limit);
    }

    async findOne(id: string) {
        return await this.curriculumRepository.getCurriculumById(id);
    }

    async update(id: string, updateCurriculumDto: UpdateCurriculumDto) {
        const updateCurriculumCondition = { _id: id };
        return await this.curriculumRepository.updateCurriculum(
            updateCurriculumCondition,
            updateCurriculumDto,
        );
    }

    async remove(id: string) {
        return await this.curriculumRepository.deleteCurriculum(id);
    }

    async getCurriculumByKeywork(keywork: string) {
        const listCurriculums =
            await this.curriculumRepository.getAllCurriculums();

        let foundCurriculums = [];
        let idx = 0;
        for (const curriculum of listCurriculums) {
            if (curriculum.curriculumName.includes(keywork)) {
                foundCurriculums[idx] = curriculum;
                idx++;
            }
        }
        return Promise.resolve(foundCurriculums);
    }

    async getCurriculumByTypes(types: string) {
        return await this.curriculumRepository.getCurriculumsByTypes(types);
    }
}
