import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { weekdayEnum } from 'src/common/enums/weekday.enum';
class Exam {
    @ApiProperty()
    time: Date;
    @ApiProperty()
    address: string;
}
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
    weekday: weekdayEnum;

    @ApiProperty()
    @IsNotEmpty()
    period: Array<string>;

    @ApiProperty()
    @IsNotEmpty()
    room: string;

    @ApiProperty()
    @IsNotEmpty()
    maxStudent: number;

    @ApiProperty()
    @IsNotEmpty()
    minStudent: number;

    listStudent?: Array<number>;

    numOfStudent: number;

    @ApiProperty({ type: Exam })
    midExamSchedule: string;

    @ApiProperty({ type: Exam })
    finalExamSchedule: string;

    @ApiProperty({ default: 1 })
    @IsNotEmpty()
    status: number;
}
