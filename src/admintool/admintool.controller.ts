import {BadRequestException, Body, Controller, HttpStatus, Post, Res, UnauthorizedException} from '@nestjs/common';
import {AdminToolService} from "./admintool.service";
import {CreateLectureDto} from "./dto/CreateLecture.dto";
import {catchError, map, Observable} from "rxjs";
import {CreateSubjectDto} from "./dto/CreateSubject.dto";
import {Response} from "express";

@Controller('admintool')
export class AdminToolController {
    constructor(private readonly adminService: AdminToolService) {
    }

    @Post("/create-lecture")
    createLecture(@Body() body: CreateLectureDto, @Res() res:Response): Observable<Response> {
        return this.adminService.createLecture(body).pipe(
            map(e => {
                if (e) {
                    return res.status(HttpStatus.OK).send(e);
                }
            }),
            catchError(err => {
                console.log("Create fail!");
                throw new BadRequestException();
            })
        );
    }

    @Post('/create-subject')
    createSubject(@Body() body: CreateSubjectDto, @Res() res: Response): Observable<Response>{
        return this.adminService.createSubject(body).pipe(
            map(e => {
                if (e) {
                    return res.status(HttpStatus.OK).send(e);
                }
            }),
            catchError(err => {
                console.log("Create fail!");
                throw new BadRequestException();
            })
        )
    }
}
