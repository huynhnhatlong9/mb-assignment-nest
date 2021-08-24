import {Inject, Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import jwtConfig from "../../config/jwtConfig.config";
import {ConfigType} from "@nestjs/config";
import {UserPrincipal} from "../interface/user-principal";
import {JwtPayload} from "../interface/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(jwtConfig.KEY) config: ConfigType<typeof jwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: config.secretKey
        });
    }

    validate(payload: JwtPayload): UserPrincipal {
        return {
            username: payload.username,
            email: payload.email,
            firstname: payload.firstname,
            lastname: payload.lastname
        } as UserPrincipal;
    }
}
