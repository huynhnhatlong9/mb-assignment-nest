import { LoginDto } from './dto/login.dto';
import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Response } from 'express';
import { map, Observable, of } from 'rxjs';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Public } from 'src/core/decorators/guards/public.guards.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Body() user :LoginDto, @Req() req: any, @Res() res: Response): Observable<Response> {
        return this.authService.login(req.user).pipe(
            map((token) => {
                return res
                    .header('Authorization', 'Bearer ' + token.accessToken)
                    .json(token)
                    .send();
            }),
        );
    }

    @Post('/testJwt')
    testJwt(@Req() req: any, @Res() res: Response): Observable<Response> {
        return of(res.status(HttpStatus.OK).send(req.user));
    }
}
