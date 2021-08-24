import {Body, ConflictException, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import {UserService} from "./user.service";
import {RegisterDto} from "./register.dto";
import {Response} from "express";
import {map, mergeMap} from "rxjs";

@Controller('user')
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
}
