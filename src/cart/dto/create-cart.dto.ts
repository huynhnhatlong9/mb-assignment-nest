import { IsDefined, IsString } from 'class-validator';

export class CreateCartDto {
    username?: string;

    userId?: string;

    curriculums?: string[];

    phone?: string;

    address?: string;
}
