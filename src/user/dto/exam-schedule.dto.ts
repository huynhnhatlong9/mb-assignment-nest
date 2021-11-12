import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ExamScheduleDto {
    @ApiProperty()
    @IsNotEmpty()
    semester: string;
}
