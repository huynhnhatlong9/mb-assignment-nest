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

    findAll() {
        return `This action returns all curriculum`;
    }

    findOne(id: number) {
        return `This action returns a #${id} curriculum`;
    }

    update(id: number, updateCurriculumDto: UpdateCurriculumDto) {
        return `This action updates a #${id} curriculum`;
    }

    remove(id: number) {
        return `This action removes a #${id} curriculum`;
    }
}
