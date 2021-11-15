import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateQuestionDto {
    @IsString()
    @IsDefined()
    title: string;

    content?: string;

    @IsEmail()
    @IsDefined()
    email: string;

    body?: string;

    file?: string;
}
