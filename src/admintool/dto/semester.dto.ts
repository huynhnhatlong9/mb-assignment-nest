import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateSemesterDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    startTime: Date;

    @ApiProperty()
    @IsNotEmpty()
    endTime: Date;
}
