import { AdminRegisterDto } from './../dto/admin-register.dto';
import { AcademicInformationEntity } from './../entities/academic-information.entity';
import { PersonalInformationDto } from './../dto/personal-information.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_MODEL } from '../../database/database.constants';
import { User, UserModel } from '../../database/model/user.model';
import { EMPTY, from, mergeMap, Observable, of, throwIfEmpty } from 'rxjs';
import { RegisterDto } from '../dto/register.dto';
import { UpdateProfileDto } from '../dto/update.dto';
import { PersonalInformationEntity } from '../entities/personal-information.entity';
@Injectable()
export class UserRepository {
    constructor(@Inject(USER_MODEL) private userModel: UserModel) { }

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
}
