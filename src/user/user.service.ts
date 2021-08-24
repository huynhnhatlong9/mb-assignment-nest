import {Inject, Injectable} from '@nestjs/common';
import {USER_MODEL} from "../database/database.constants";
import {User, UserModel} from "../database/model/user.model";
import {from, Observable, of} from "rxjs";
import {RegisterDto} from "./register.dto";

@Injectable()
export class UserService {
    constructor(@Inject(USER_MODEL) private userModel: UserModel) {
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
}
