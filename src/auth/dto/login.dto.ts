import {IsEmail, MinLength} from "class-validator";

export class LoginDto{
    @MinLength(4)
    username: string;

    @MinLength(4)
    password: string;
}