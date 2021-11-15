import { IsString } from 'class-validator';

export class SubjectRegisterDto {
    @IsString()
    classId: string;
}
