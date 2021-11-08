import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { catchError, map, Observable } from 'rxjs';
import { HasRole } from './../auth/guard/has-role.decorator';
import { RolesGuard } from './../auth/guard/roles.guard';
import { RolesType } from './../shared/roles-type.enum';
import { AdminToolService } from './admintool.service';
import { CreateClassDto } from './dto/createClass.dto';
import { CreateLectureDto } from './dto/CreateLecture.dto';
import { CreateSubjectDto } from './dto/CreateSubject.dto';
import { CreateSemesterDto } from './dto/semester.dto';
@ApiBearerAuth()
@UseGuards(RolesGuard)
@HasRole([RolesType.ADMIN])
@Controller('admintool')
export class AdminToolController {
    constructor(private readonly adminService: AdminToolService) { }

    @Post('/create-lecture')
    createLecture(
        @Body() body: CreateLectureDto,
        @Res() res: Response,
    ): Observable<Response> {
        return this.adminService.createLecture(body).pipe(
            map((e) => {
                if (e) {
                    return res.status(HttpStatus.OK).send(e);
                }
            }),
            catchError((err) => {
                console.log('Create fail!', err);
                throw new BadRequestException();
            }),
        );
    }

    @Post('/create-subject')
    createSubject(
        @Body() body: CreateSubjectDto,
        @Res() res: Response,
    ): Observable<Response> {
        return this.adminService.createSubject(body).pipe(
            map((e) => {
                if (e) {
                    return res.status(HttpStatus.OK).send(e);
                }
            }),
            catchError((err) => {
                console.log('Create fail!', err);
                throw new BadRequestException();
            }),
        );
    }
    // @Post('/create-register-subject')
    // createRegisterSubject(@Body() body: CreateRegisterSubjectDto) {
    //     return this.adminService.creatRegistSubject(body);
    // }
    @Post('/create-semester')
    createSemester(@Body() body: CreateSemesterDto) {
        return this.adminService.createSemester(body);
    }
    @Post('/create-class')
    createClass(@Body() body: CreateClassDto) {
        return this.adminService.createClass(body);
    }

    @Get('/semester')
    findAllSemester() {
        return this.adminService.findAllSemester();
    }
}
