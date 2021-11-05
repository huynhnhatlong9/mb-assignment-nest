import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthenticatedRequest } from '../interface/authenticated-request.interface';
import { RolesType } from '../../shared/roles-type.enum';
import { HAS_ROLE } from '../auth.constants';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles: RolesType[] = this.reflector.get<RolesType[]>(
            HAS_ROLE,
            context.getHandler(),
        );
        if (!roles || roles.length == 0) {
            return true;
        }
        const { user } = context
            .switchToHttp()
            .getRequest() as AuthenticatedRequest;
        return user.roles && user.roles.some((role) => roles.includes(role));
    }
}
