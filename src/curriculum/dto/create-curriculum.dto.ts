import { IsBoolean, IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateCurriculumDto {
    @IsString()
    @IsDefined()
    curriculumName: string;

    @IsNumber()
    @IsDefined()
    price: number;

    @IsString()
    @IsDefined()
    author: string;

    image?: string;

    status?: string;
}
