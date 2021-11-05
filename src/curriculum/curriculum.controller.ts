import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    Response,
    HttpStatus,
} from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import {
    INTERNAL_SERVER_ERROR,
    INVALID_INPUT,
} from 'src/common/constants/status-message.const';
import { ICreateCurrilum } from './interface/curriculum-interface';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';

// let imageID = uuidv4();

// const storage = {
//   storage: diskStorage({
//     destination: './uploads/image',
//     filename: (req, file, cb) => {
//       const filename: string =
//         imageID + path.parse(file.originalname).name.replace(/\s/g, '');
//       const extention: string = path.parse(file.originalname).ext;

//       cb(null, `${filename}${extention}`);
//     }
//   })
// };

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

    @Get()
    findAll() {
        return this.curriculumService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.curriculumService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCurriculumDto: UpdateCurriculumDto,
    ) {
        return this.curriculumService.update(+id, updateCurriculumDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.curriculumService.remove(+id);
    }
}
