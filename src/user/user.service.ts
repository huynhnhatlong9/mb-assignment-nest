import { CustomResponse } from './../common/models/customresponse';
import { PersonalInformationDto } from './dto/personal-information.dto';
import { CustomThrowException } from './../common/exceptions/customThrowException';
import { PersonalInformationEntity } from './entities/personal-information.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_MODEL } from '../database/database.constants';
import { User, UserModel } from '../database/model/user.model';
import { EMPTY, from, mergeMap, Observable, of, throwIfEmpty } from 'rxjs';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update.dto';
import { UserRepository } from './repositories/user.repository';
import { HttpStatus } from '@nestjs/common';
@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository
    ) { }

    findUserByName(username: string): Observable<User> {
        return this.userRepository.findUserByName(username)
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
        return this.userRepository.getPersonalInformation(username)
            .then(data => {
                return new CustomResponse({
                    success: true,
                    result: data,
                    statusCode: HttpStatus.OK
                })
            })
            .catch((err) => {
                throw CustomThrowException('connect mongodb failed', HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }
    updatePersonalInformation(username: string, infoUpdate: PersonalInformationDto) {
        return this.userRepository.updatePersonalInformation(username, infoUpdate)
            .then(data => {
                return new CustomResponse({
                    statusCode: HttpStatus.OK,
                    success: true,
                    result: 'Update successfully'
                })
            })
            .catch(err => {
                throw CustomThrowException('connect mongodb failed', HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }
    getAcademicInformation(username: string) {
        return this.userRepository.getAcademicInformation(username)
            .then(data => {
                return new CustomResponse({
                    statusCode: HttpStatus.OK,
                    result: data,
                    success: true
                })
            })
            .catch(err => {
                throw CustomThrowException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }
}
