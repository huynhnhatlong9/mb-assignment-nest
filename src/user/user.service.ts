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
@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

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
}
