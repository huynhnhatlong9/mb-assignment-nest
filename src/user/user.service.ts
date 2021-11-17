import { RolesType } from './../shared/roles-type.enum';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../database/model/user.model';
import { CustomThrowException } from './../common/exceptions/customThrowException';
import { CustomResponse } from './../common/models/customresponse';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { PersonalInformationDto } from './dto/personal-information.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update.dto';
import { UserRepository } from './repositories/user.repository';
import { SubjectRegisterDto } from './dto/subject-register.dto';
import { IRegisterSubject } from './interface/user-profile.interface';
import { SubjectClass } from 'src/database/model/subject-class.model';
@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    findUserByName(username: string): Observable<User> {
        return this.userRepository.findUserByName(username);
    }

    register(data: RegisterDto): Observable<User> {
        return this.userRepository.register(data);
    }

    existByUsername(username: string): Observable<boolean> {
        return this.userRepository.existByUsername(username);
    }

    existByMail(email: string): Observable<boolean> {
        return this.userRepository.existByMail(email);
    }

    updateProfile(username: string, data: UpdateProfileDto): Observable<User> {
        return this.userRepository.updateProfile(username, data);
    }
    getPersonalInformation(username: string): Promise<CustomResponse> {
        return this.userRepository
            .getPersonalInformation(username)
            .then((personInfoResult) => {
                return new CustomResponse({
                    success: true,
                    result: personInfoResult,
                    statusCode: HttpStatus.OK,
                });
            })
            .catch(() => {
                throw CustomThrowException(
                    'connect mongodb failed',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }
    updatePersonalInformation(
        username: string,
        infoUpdate: PersonalInformationDto,
    ) {
        return this.userRepository
            .updatePersonalInformation(username, infoUpdate)
            .then(() => {
                return new CustomResponse({
                    statusCode: HttpStatus.OK,
                    success: true,
                    result: 'Update successfully',
                });
            })
            .catch(() => {
                throw CustomThrowException(
                    'connect mongodb failed',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }
    getAcademicInformation(username: string) {
        return this.userRepository
            .getAcademicInformation(username)
            .then((academicInfoResult) => {
                return new CustomResponse({
                    statusCode: HttpStatus.OK,
                    result: academicInfoResult,
                    success: true,
                });
            })
            .catch((err) => {
                throw CustomThrowException(
                    err.message,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }
    async registerAdmin(adminAccount: AdminRegisterDto) {
        const exitUserName = await this.userRepository.existByUsernamePromise(
            adminAccount.username,
        );
        if (exitUserName) {
            throw CustomThrowException(
                `Username ${adminAccount.username} already exist`,
                409,
            );
        }
        const exitEmail = await this.userRepository.existByMailPromise(
            adminAccount.email,
        );
        if (exitEmail) {
            throw CustomThrowException(
                `Username ${adminAccount.email} already exist`,
                409,
            );
        }
        adminAccount.roles = [RolesType.ADMIN];
        return this.userRepository
            .registerAdmin(adminAccount)
            .then(() => {
                return new CustomResponse({
                    statusCode: HttpStatus.OK,
                    result: 'register successfully',
                    success: true,
                });
            })
            .catch((err) => {
                throw CustomThrowException(
                    err.message,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }

    createListPeriod(period: string[]) {
        const startPeriod = Number(period[0]);
        const endPeriod = Number(period[1]);

        let arr = [];
        for (let i = startPeriod; i <= endPeriod; i++) {
            arr[i - startPeriod] = i;
        }
        return arr;
    }

    checkPeriod(newPeriod: number[], oldPeriod: number[]) {
        let count = 0;
        for (const itemOfNewPeriod of newPeriod) {
            for (const itemOfOldPeriod of oldPeriod) {
                if (itemOfNewPeriod === itemOfOldPeriod) count++;
            }
        }
        return count > 1 ? false : true;
    }

    findClassOpen(listClass: SubjectClass[]) {
        return listClass.filter(
            (classObj: SubjectClass) => classObj.status === 1,
        );
    }

    async registerSubject(
        userId: string,
        subjectRegisterDto: SubjectRegisterDto,
    ): Promise<IRegisterSubject> {
        const checkExistingClass =
            await this.userRepository.findClassOfIdByUserId(userId);

        if (!checkExistingClass) {
            await this.userRepository.createClassOfStudent(userId);
        }

        const classId = subjectRegisterDto.classId;

        const foundClass = await this.userRepository.findClassByClassId(
            classId,
        );

        const foundClassOfStudent =
            await this.userRepository.findClassOfIdByUserId(userId);

        const listExistingClassOfUser =
            await this.userRepository.findAllClassOfListClassId(
                foundClassOfStudent.listClass,
            );

        if (!foundClass.status) {
            return Promise.resolve({
                success: false,
                updatedListClass: this.findClassOpen(listExistingClassOfUser),
                message: 'Class is not open',
            });
        }

        if (foundClass.numOfStudent >= foundClass.maxStudent) {
            return Promise.resolve({
                success: false,
                message: 'Slot is full',
                updatedListClass: this.findClassOpen(listExistingClassOfUser),
            });
        }

        const listPeriodFoundClass = this.createListPeriod(foundClass.period);
        if (listExistingClassOfUser)
            for (const classOfUser of listExistingClassOfUser) {
                let listPeriodClassOfUser = this.createListPeriod(
                    classOfUser.period,
                );
                if (
                    !this.checkPeriod(
                        listPeriodFoundClass,
                        listPeriodClassOfUser,
                    ) &&
                    foundClass.weekday === classOfUser.weekday
                )
                    return Promise.resolve({
                        success: false,
                        updatedListClass: this.findClassOpen(
                            listExistingClassOfUser,
                        ),
                        message: 'Conflict time',
                    });
            }

        const updatedObj = {
            studentId: foundClassOfStudent.studentId,
            listClass: [...foundClassOfStudent.listClass, foundClass._id],
        };

        const updatedClassOfStudent =
            await this.userRepository.updateClassOfStudent(
                { _id: foundClassOfStudent._id },
                updatedObj,
            );

        const updatedListClass =
            await this.userRepository.findAllClassOfListClassId(
                updatedClassOfStudent.listClass,
            );

        return Promise.resolve({
            success: true,
            updatedListClass: this.findClassOpen(updatedListClass),
            message: 'Register subject successfully',
        });
    }

    findAllSemester() {
        return this.userRepository
            .getAllSemester()
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

    getExamSchedule(username: string, semester: string) {
        return this.userRepository
            .getExamSchedule(username, semester)
            .then((result) => {
                return new CustomResponse({
                    success: true,
                    statusCode: HttpStatus.OK,
                    result: {
                        data: result,
                        message: 'Get exam schedule successfully',
                    },
                });
            })
            .catch(() => {
                throw CustomThrowException(
                    'Get exam schedule failed',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }

    getAllSubject() {
        return this.userRepository
            .getAllSubject()
            .then((result) => {
                return new CustomResponse({
                    success: true,
                    statusCode: HttpStatus.OK,
                    result: {
                        data: result,
                        message: 'Get all subject successfully',
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

    getAllClass() {
        return this.userRepository
            .getAllClass()
            .then((result) => {
                return new CustomResponse({
                    success: true,
                    statusCode: HttpStatus.OK,
                    result: {
                        data: result,
                        message: 'Get all class successfully',
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

    getOpenRegisterClass() {
        return this.userRepository
            .getOpenRegisterClass()
            .then((result) => {
                return new CustomResponse({
                    success: true,
                    statusCode: HttpStatus.OK,
                    result: {
                        data: result,
                        message: 'Get opend register class successfully',
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

    async findUserByUsername(username: string) {
        return await this.userRepository.findUserByUsername(username);
    }

    getSchedule(selectedDate: Date, userName: string) {
        return this.userRepository.getSchedule(selectedDate, userName);
    }

    async getClassOfUser(username: string) {
        const foundUser = await this.findUserByUsername(username);
        const foundClassOfUser =
            await this.userRepository.findClassOfIdByUserId(foundUser._id);
        const listClass = await this.userRepository.findAllClassOfListClassId(
            foundClassOfUser.listClass,
        );
        return await this.findClassOpen(listClass);
    }
}
