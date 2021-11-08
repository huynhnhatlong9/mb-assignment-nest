import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateClassDto {
    @ApiProperty()
    @IsNotEmpty()
    semester: string;
    @ApiProperty()
    @IsNotEmpty()
    subject: string;
    @ApiProperty()
    @IsNotEmpty()
    lecturer: string;
    @ApiProperty()
    @IsNotEmpty()
    weekStudy: Array<number>;
    @ApiProperty()
    @IsNotEmpty()
    room: string;
    @ApiProperty()
    @IsNotEmpty()
    maxStudent: number;
    @ApiProperty()
    @IsNotEmpty()
    minStudent: number;
    listStudent: Array<number>;
    numOfStudent: number;
    @IsNotEmpty()
    midExamSchedule: Date;
    @IsNotEmpty()
    finalExamSchedule: Date;
}
