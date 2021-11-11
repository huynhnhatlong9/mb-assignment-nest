import { CustomResponse } from './../../common/models/customresponse';
import { SubjectClassModel } from 'src/database/model/subject-class.model';
import { CustomThrowException } from './../../common/exceptions/customThrowException';
import {
    SEMESTER_MODEL,
    CLASSOFSTUDENT_MODEL,
    SUBJECT_MODEL,
    SUBJECT_CLASS_MODEL,
} from './../../database/database.constants';
import { SemesterModel } from 'src/database/model/semester.model';
import { AdminRegisterDto } from './../dto/admin-register.dto';
import { AcademicInformationEntity } from './../entities/academic-information.entity';
import { PersonalInformationDto } from './../dto/personal-information.dto';
import {
    HttpStatus,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { USER_MODEL } from '../../database/database.constants';
import { User, UserModel } from '../../database/model/user.model';
import { EMPTY, from, mergeMap, Observable, of, throwIfEmpty } from 'rxjs';
import { RegisterDto } from '../dto/register.dto';
import { UpdateProfileDto } from '../dto/update.dto';
import { PersonalInformationEntity } from '../entities/personal-information.entity';
import { ClassOfStudentModel } from 'src/database/model/classofstudent.model';
import { SubjectModel } from 'src/database/model/subject.model';
import { Types } from 'mongoose';
@Injectable()
export class UserRepository {
    constructor(
        @Inject(USER_MODEL) private userModel: UserModel,
        @Inject(SEMESTER_MODEL) private semesterModel: SemesterModel,
        @Inject(CLASSOFSTUDENT_MODEL)
        private classOfStudentModel: ClassOfStudentModel,
        @Inject(SUBJECT_MODEL) private subjectModel: SubjectModel,
        @Inject(SUBJECT_CLASS_MODEL)
        private subjectClassModel: SubjectClassModel,
    ) { }

    findUserByName(username: string): Observable<User> {
        return from(this.userModel.findOne({ username: username }).exec());
    }

    register(data: RegisterDto): Observable<User> {
        return from(this.userModel.create({ ...data }));
    }

    existByUsername(username: string): Observable<boolean> {
        return from(this.userModel.exists({ username }));
    }

    existByMail(email: string): Observable<boolean> {
        return from(this.userModel.exists({ email }));
    }

    updateProfile(username: string, data: UpdateProfileDto): Observable<User> {
        return from(
            this.userModel
                .findOneAndUpdate(
                    { username: username },
                    { ...data },
                    { new: true },
                )
                .exec(),
        ).pipe(
            mergeMap((p) => (p ? of(p) : EMPTY)),
            throwIfEmpty(
                () =>
                    new NotFoundException(
                        `username: ${username} is not found!`,
                    ),
            ),
        );
    }
    getPersonalInformation(
        username: string,
    ): Promise<PersonalInformationEntity> {
        return this.userModel
            .findOne(
                { username: username },
                { firstname: 1, lastname: 1, personalinfo: 1 },
            )
            .exec();
    }
    updatePersonalInformation(
        username: string,
        infoUpdate: PersonalInformationDto,
    ) {
        return this.userModel
            .findOneAndUpdate(
                { username: username },
                { $set: { personalinfo: infoUpdate } },
            )
            .exec();
    }
    getAcademicInformation(
        username: string,
    ): Promise<AcademicInformationEntity> {
        return this.userModel
            .findOne(
                { username: username },
                { firstname: 1, lastname: 1, academicinfo: 1 },
            )
            .exec();
    }
    registerAdmin(adminAccout: AdminRegisterDto) {
        return this.userModel.create(adminAccout);
    }
    existByUsernamePromise(username: string): Promise<boolean> {
        return this.userModel.exists({ username });
    }

    existByMailPromise(email: string): Promise<boolean> {
        return this.userModel.exists({ email });
    }
    getAllSemester() {
        return this.semesterModel.find().exec();
    }
    async getExamSchedule(username: string, semester: string) {
        try {
            const resultId = (await this.findUserIdByNamePromise(
                username,
            )) as any;
            await this.registerSubjectLookUpforTest(resultId._id);
            const listClass = await this.classOfStudentModel
                .find({ studentId: resultId._id }, { listClass: 1 })
                .exec();
            console.log(listClass);
            const getListExamPromise = [];
            listClass[0].listClass.forEach(async (element) => {
                getListExamPromise.push(
                    this.subjectClassModel.aggregate([
                        {
                            $lookup: {
                                from: 'subjects',
                                localField: 'subject',
                                foreignField: '_id',
                                as: 'subjectDetail',
                            },
                        },
                        {
                            $project: {
                                semester: 1,
                                _id: 1,
                                subject_detail: 1,
                                midExamSchedule: 1,
                                finalExamSchedule: 1,
                                subjectDetail: 1,
                            },
                        },
                        {
                            $match: {
                                semester: Types.ObjectId(semester),
                                _id: element,
                            },
                        },
                    ]),
                );
            });
            const listExam = await Promise.all(getListExamPromise);
            return new CustomResponse({
                statusCode: HttpStatus.OK,
                success: true,
                result: listExam,
            });
        } catch (err) {
            throw CustomThrowException(
                err.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    findUserIdByNamePromise(username: string) {
        return this.userModel
            .findOne({ username: username }, { _id: 1 })
            .exec();
    }
    getAllSubject() {
        return this.subjectModel.find({}).exec();
    }
    async registerSubjectLookUpforTest(userId: string) {
        try {
            await this.classOfStudentModel.deleteMany({
                studentId: userId,
            });
            const listClassOfSubject = await this.subjectClassModel
                .find({}, { _id: 1 })
                .exec();
            const listIdClass = [];
            listClassOfSubject.forEach((ele) => {
                listIdClass.push((ele as any)._id);
            });
            await this.classOfStudentModel.create({
                studentId: userId,
                listClass: listIdClass,
            });
            return true;
        } catch (err) {
            throw CustomThrowException(
                err.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    getAllClass() {
        return this.subjectClassModel.find({}).exec();
    }
    getOpenRegisterClass() {
        return this.subjectClassModel.find({ status: 1 }).exec();
    }
}
