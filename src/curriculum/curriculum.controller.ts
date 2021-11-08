import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Request,
    Response,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import {
    INTERNAL_SERVER_ERROR,
    INVALID_INPUT,
} from 'src/common/constants/status-message.const';
import {
    ICreateCurrilum,
    IDeleteCurriculum,
    IGetAllCurriculum,
    IGetOneCurriculum,
    IUpdateCurriculum,
} from './interface/curriculum-interface';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';

let imageID = uuidv4();

const storage = {
    storage: diskStorage({
        destination: './uploads/image/curriculums',
        filename: (req, file, cb) => {
            const filename: string =
                imageID + path.parse(file.originalname).name.replace(/\s/g, '');
            const extention: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extention}`);
        },
    }),
};

@Controller('curriculum')
export class CurriculumController {
    constructor(private readonly curriculumService: CurriculumService) {}

    @Post()
    async create(
        @Request() req,
        @Response() res,
        @Body() createCurriculumDto: CreateCurriculumDto,
    ): Promise<ICreateCurrilum> {
        if (
            createCurriculumDto.status &&
            !this.curriculumService.checkStatusInput(createCurriculumDto.status)
        ) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: INVALID_INPUT,
            });
        }
        try {
            createCurriculumDto.image = createCurriculumDto.image
                ? imageID + createCurriculumDto.image
                : '';

            const createdCurriculum = await this.curriculumService.create(
                createCurriculumDto,
            );

            return res.status(HttpStatus.CREATED).json({
                success: true,
                createdCurriculum,
            });
        } catch (error) {
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }

    @Get(`:page/:limit`)
    async findAll(@Request() req, @Response() res): Promise<IGetAllCurriculum> {
        try {
            const page = req.params.page;
            const limit = req.params.limit;
            const curriculums = await this.curriculumService.findAll(
                page,
                limit,
            );
            return res.status(HttpStatus.OK).json({
                success: true,
                curriculums,
            });
        } catch (error) {
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Response() res,
    ): Promise<IGetOneCurriculum> {
        try {
            const foundCurriculum = await this.curriculumService.findOne(id);
            return res.status(HttpStatus.OK).json({
                success: true,
                foundCurriculum,
            });
        } catch (error) {
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCurriculumDto: UpdateCurriculumDto,
        @Response() res,
    ): Promise<IUpdateCurriculum> {
        try {
            const updatedCurriculum = await this.curriculumService.update(
                id,
                updateCurriculumDto,
            );
            return res.status(HttpStatus.OK).json({
                success: true,
                updatedCurriculum,
            });
        } catch (error) {
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Response() res,
    ): Promise<IDeleteCurriculum> {
        try {
            await this.curriculumService.remove(id);
            return res.status(HttpStatus.OK).json({
                success: true,
                message: 'Deleted successfully',
            });
        } catch (error) {
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image/curriculums', storage))
    uploadFile(@UploadedFile() file) {
        console.log('hello');
        return { imagePath: file.filename };
    }
}
