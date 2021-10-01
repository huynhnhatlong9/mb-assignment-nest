import {Inject, Injectable, NotFoundException, Scope} from '@nestjs/common';
import {USER_MODEL} from "../database/database.constants";
import {User, UserModel} from "../database/model/user.model";
import {EMPTY, from, mergeMap, Observable, of, throwIfEmpty} from "rxjs";
import {RegisterDto} from "./dto/register.dto";
import {UpdateProfileDto} from "./dto/update.dto";


@Injectable()
export class UserService {
    constructor(
        @Inject(USER_MODEL) private userModel: UserModel
    ) {
    }

    findUserByName(username: string): Observable<User> {
        return from(this.userModel.findOne({username}).exec());
    }

    register(data: RegisterDto): Observable<User> {
        return from(this.userModel.create({...data}));
    }

    existByUsername(username: string): Observable<boolean> {
        return from(this.userModel.exists({username}));
    }

    existByMail(email: string): Observable<boolean> {
        return from(this.userModel.exists({email}));
    }

    updateProfile(username:string, data: UpdateProfileDto): Observable<User> {
        return from(
            this.userModel.findOneAndUpdate(
                {username: username},
                {...data},
                {new: true}
            ).exec()
        ).pipe(
            mergeMap((p) => (p ? of(p) : EMPTY)),
            throwIfEmpty(() => new NotFoundException(`username: ${username} is not found!`))
        );
    }

}
