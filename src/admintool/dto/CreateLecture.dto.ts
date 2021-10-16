import {IsEmail, IsPhoneNumber} from "class-validator";

export class CreateLectureDto{
    name: string;
    @IsEmail()
    email: string
    @IsPhoneNumber()
    phone: number
    subject: string
}
