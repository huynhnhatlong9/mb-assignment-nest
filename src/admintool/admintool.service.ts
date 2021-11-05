import { SEMESTER_MODEL } from './../database/database.constants';
import { CreateRegisterSubjectDto } from './dto/createRegisterSubject.dto';
import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import {
    LECTURER_MODEL,
    SUBJECT_MODEL,
    REGISTERSUBJECT_MODEL,
} from '../database/database.constants';
import { LecturerModel } from '../database/model/lecturer.model';
import { Subject, SubjectModel } from '../database/model/subject.model';
import { RegisterSubjectModel } from 'src/database/model/registersubject.model';
import { CreateLectureDto } from './dto/CreateLecture.dto';
import { from, Observable } from 'rxjs';
import { CreateSubjectDto } from './dto/CreateSubject.dto';
import { CustomResponse } from 'src/common/models/customresponse';
import { CustomThrowException } from 'src/common/exceptions/customThrowException';
import { SemesterModel } from 'src/database/model/semester.model';
import { CreateSemesterDto } from './dto/semester.dto';
@Injectable()
export class AdminToolService {
    constructor(
        @Inject(LECTURER_MODEL) private lectureModel: LecturerModel,
        @Inject(SUBJECT_MODEL) private subjectModel: SubjectModel,
        @Inject(REGISTERSUBJECT_MODEL)
        private registerModel: RegisterSubjectModel,
        @Inject(SEMESTER_MODEL) private semesterModel: SemesterModel,
    ) { }

    createLecture(lecture: CreateLectureDto): Observable<any> {
        return from(this.lectureModel.create(lecture));
    }

    createSubject(subject: CreateSubjectDto): Observable<Subject> {
        return from(this.subjectModel.create(subject));
    }

    async creatRegistSubject(
        registrationTime: CreateRegisterSubjectDto,
    ): Promise<CustomResponse> {
        return this.registerModel
            .create(registrationTime)
            .then((result) => {
                // console.log(result);
                return new CustomResponse({
                    success: true,
                    statusCode: HttpStatus.OK,
                    result: {
                        data: result,
                        message: 'Create successfully',
                    },
                });
            })
            .catch(() => {
                // console.log(err);
                throw CustomThrowException(
                    'Create register subject failed',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }

    createSemester(semester: CreateSemesterDto) {
        return this.semesterModel
            .create(semester)
            .then((result) => {
                return new CustomResponse({
                    success: true,
                    statusCode: HttpStatus.OK,
                    result: {
                        data: result,
                        message: 'Create successfully',
                    },
                });
            })
            .catch(() => {
                throw CustomThrowException(
                    'Create register subject failed',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }

}
