import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserPrincipal } from './interface/user-principal';
import { from, map, mergeMap, Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { AccessToken } from './interface/access-token.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    validateUser(
        username: string,
        password: string,
    ): Observable<UserPrincipal> {
        return this.userService.findUserByName(username).pipe(
            mergeMap((user) => {
                if (!user) {
                    throw new UnauthorizedException('Username not match');
                } else {
                    return user.comparePassword(password).pipe(
                        map((m) => {
                            if (m) {
                                return {
                                    username: user.username,
                                    email: user.email,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    roles: user.roles,
                                } as UserPrincipal;
                            } else {
                                throw new UnauthorizedException(
                                    'Password not match',
                                );
                            }
                        }),
                    );
                }
            }),
        );
    }

    login(user: UserPrincipal): Observable<AccessToken> {
        const payload: JwtPayload = { ...user };
        return from(this.jwtService.signAsync(payload)).pipe(
            map((access_token) => {
                return { accessToken: access_token } as AccessToken;
            }),
        );
    }
}
