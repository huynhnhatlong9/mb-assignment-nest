import {Body, Controller, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guard/local-auth.guard";
import {Response} from "express";
import {map, Observable} from "rxjs";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Req() req: any, @Res() res: Response): Observable<Response> {
        return this.authService.login(req.user).pipe(
            map((token) => {
                return res
                    .header('Authorization', 'Bearer ' + token.accessToken)
                    .json(token)
                    .send();
            })
        );
    }
}
