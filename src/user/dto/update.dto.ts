import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
    @IsNotEmpty()
    readonly firstname: string;
    readonly lastname: string;
    @IsEmail()
    readonly email: string;
}
