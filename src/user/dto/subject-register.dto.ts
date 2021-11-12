import { IsString } from 'class-validator';

export class SubjectRegisterDto {
    @IsString()
    subjectName: string;

    @IsString()
    semesterName: string;
}
