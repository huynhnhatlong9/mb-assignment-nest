import {
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable, take } from 'rxjs';
import { METADATA } from 'src/common/constants/api-metadata.const';
import { CustomThrowException } from 'src/common/exceptions/customThrowException';
import { UserService } from 'src/user/user.service';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private reflector: Reflector,
        private userService: UserService,
    ) {
        super();
    }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            METADATA.IS_PUBLIC,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    handleRequest(err, user) {
        if (!user || err) {
            throw new UnauthorizedException();
        }
        this.userService
            .findUserByName(user.username)
            .pipe(take(1))
            .subscribe({
                next: (userval) => {
                    // console.log(userval)
                    if (!userval)
                        throw CustomThrowException('User not exits', 400);
                },
                error: (err) => {
                    throw CustomThrowException('Something wrong', 500);
                },
            });
        console.log(user);
        return user;
    }
}
