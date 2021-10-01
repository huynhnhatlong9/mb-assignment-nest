import {
    Body,
    ConflictException,
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Post,
    Put,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import {UserService} from "./user.service";
import {RegisterDto} from "./dto/register.dto";
import {Response} from "express";
import {map, mergeMap, Observable} from "rxjs";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {AuthenticatedRequest} from "../auth/interface/authenticated-request.interface";
import {UserProfile} from "./interface/user-profile.interface";
import {UpdateProfileDto} from "./dto/update.dto";
import {HasRole} from "../auth/guard/has-role.decorator";
import {RolesType} from "../shared/roles-type.enum";
import {RolesGuard} from "../auth/guard/roles.guard";

@Controller({path:"user"})
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('/register')
    register(@Body() data: RegisterDto, @Res() res: Response) {
        const {username, email} = data;
        return this.userService.existByUsername(username).pipe(
            mergeMap(isUsernameExist => {
                    if (isUsernameExist) {
                        throw new ConflictException(`Username: ${username} is exist!`);
                    } else {
                        return this.userService.existByMail(email).pipe(
                            mergeMap((isEmailExist) => {
                                if (isEmailExist) {
                                    throw  new ConflictException(`Email: ${email} is exist!`);
                                } else {
                                    return this.userService.register(data)
                                        .pipe(
                                            map(user => res
                                                .status(HttpStatus.OK)
                                                .send({
                                                    username: username,
                                                    email: email
                                                })
                                            )
                                        );
                                }
                            })
                        );
                    }

                }
            )
        );
    }

    @Get('/profile')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HasRole([RolesType.ADMIN])
    profile(@Req() req: AuthenticatedRequest, @Res() res: Response): Observable<Response> {
        return this.userService.findUserByName(req.user.username).pipe(
            map(user => {
                if (user) {
                    let userProfile: UserProfile = {
                        username: user.username,
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname
                    };
                    return res
                        .status(HttpStatus.OK)
                        .send(userProfile);
                } else {
                    throw new NotFoundException('User not found!');
                }
            })
        );
    }

    @Put("/update")
    @UseGuards(JwtAuthGuard)
    update(@Req() req: AuthenticatedRequest, @Res() res: Response, @Body() body: UpdateProfileDto):Observable<Response>{
        return this.userService.updateProfile(req.user.username,body).pipe(
            map(user=>{
                if(user){
                    return res.status(HttpStatus.OK).send(user);
                }
                else {
                    throw new NotFoundException('User not Found')
                }
            })
        )
    }
}
