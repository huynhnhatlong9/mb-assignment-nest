import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {lastValueFrom} from "rxjs";
import {UserPrincipal} from "../interface/user-principal";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        });
    }

    async validate(username: string, password: string): Promise<any> {
        const user: UserPrincipal = await lastValueFrom(this.authService.validateUser(username, password));
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
