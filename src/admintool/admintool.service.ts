import { ClassOfStudentModel } from 'src/database/model/classofstudent.model';
import { InsertScoreOfStudentDto } from './dto/scoreofstudent.dto';
import { CreateClassDto } from './dto/createClass.dto';
import { SEMESTER_MODEL } from './../database/database.constants';
import { CreateRegisterSubjectDto } from './dto/createRegisterSubject.dto';
import { Inject, Injectable, HttpStatus, Catch } from '@nestjs/common';
import {
    LECTURER_MODEL,
    SUBJECT_MODEL,
    REGISTERSUBJECT_MODEL,
    SUBJECT_CLASS_MODEL,
    SUBJECT_SCORE_MODEL,
    CLASSOFSTUDENT_MODEL,
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
import { SubjectClassModel } from 'src/database/model/subject-class.model';
import { SubjectScoreModel } from 'src/database/model/subject-score.model';
import { Types } from 'mongoose';

@Injectable()
export class AdminToolService {
    constructor(
        @Inject(LECTURER_MODEL) private lectureModel: LecturerModel,
        @Inject(SUBJECT_MODEL) private subjectModel: SubjectModel,
        @Inject(REGISTERSUBJECT_MODEL)
        private registerModel: RegisterSubjectModel,
        @Inject(SEMESTER_MODEL) private semesterModel: SemesterModel,
        @Inject(SUBJECT_CLASS_MODEL)
        private subjectClassModel: SubjectClassModel,
        @Inject(SUBJECT_SCORE_MODEL)
        private subjectScoreModel: SubjectScoreModel,
        @Inject(CLASSOFSTUDENT_MODEL)
        private classOfStudentModel: ClassOfStudentModel,
    ) {}

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
            .catch((err) => {
                console.log(err);
                throw CustomThrowException(
                    'Create register subject failed',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }
    findAllSemester() {
        return this.semesterModel
            .find()
            .exec()
            .then((listSemester) => {
                return new CustomResponse({
                    success: true,
                    statusCode: HttpStatus.OK,
                    result: {
                        data: listSemester,
                        message: 'Get all semester successfully',
                    },
                });
            })
            .catch(() => {
                throw CustomThrowException(
                    'find all semesters failed',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }
    async createClass(classSubject: CreateClassDto) {
        const foundClass = await this.subjectClassModel.findOne({
            semester: classSubject.semester,
            lecturer: classSubject.lecturer,
            subject: classSubject.subject,
        });

        if (foundClass) {
            return new CustomResponse({
                success: false,
                statusCode: HttpStatus.BAD_REQUEST,
                result: {
                    message: 'Class is existing',
                },
            });
        }
        return this.subjectClassModel
            .create(classSubject)
            .then((classResult) => {
                return new CustomResponse({
                    success: true,
                    statusCode: HttpStatus.OK,
                    result: {
                        data: classResult,
                        message: 'Create class successfully',
                    },
                });
            })
            .catch((err) => {
                throw CustomThrowException(
                    err.message,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }
    async insertScoreOfStudent(score: InsertScoreOfStudentDto) {
        try {
            const checkClass = await this.classOfStudentModel.find({
                studentId: score.user,
                listClass: { $elemMatch: { $eq: score.subjectClass } },
            });
            if (checkClass.length === 0) {
                CustomThrowException(
                    'userId or ClassId incorrect',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const checkSore = await this.subjectScoreModel.find({
                user: score.user,
                subjectClass: score.subjectClass,
            });
            if (checkSore.length !== 0) {
                CustomThrowException(
                    'Score subject of user was updated before ',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const scoreObject = await this.subjectScoreModel.create(score);
            return new CustomResponse({
                success: true,
                statusCode: HttpStatus.OK,
                result: {
                    data: scoreObject,
                    message: 'Insert score for student successfully',
                },
            });
        } catch (err) {
            throw CustomThrowException(
                err.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    getAllClassOfStudent() {
        return this.classOfStudentModel.find();
    }
    async  closeClass(listClass: Array<string>) {
        const listPromise = [];
        listClass.forEach((element) => {
            listPromise.push(
                this.subjectClassModel.updateOne(
                    {
                        _id: Types.ObjectId(element),
                    },
                    { $set: { status: 0 } },
                ),
            );
        });
        try {
            const result = await  Promise.all(listPromise);
            return new CustomResponse({
                success: true,
                statusCode: HttpStatus.OK,
                result: result,
            });
        } catch (err) {
            throw CustomThrowException(
                err.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
