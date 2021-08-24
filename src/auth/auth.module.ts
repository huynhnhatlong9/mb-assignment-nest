import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {LocalStrategy} from "./strategy/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {DatabaseModule} from "../database/database.module";
import {UserModule} from "../user/user.module";

@Module({
    imports:[
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { },
        }),
        DatabaseModule,
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService]
})
export class AuthModule {
}
