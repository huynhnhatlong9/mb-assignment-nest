import { IsDefined, IsString } from 'class-validator';

export class CreateCartDto {
    @IsDefined()
    @IsString()
    userId: string;

    curriculums?: string[];

    phone?: string;

    address?: string;
}
