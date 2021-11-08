import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRegisterSubjectDto {
    @ApiProperty({ type: Date })
    @IsNotEmpty()
    timeStart: string;
    @ApiProperty({ type: Date })
    @IsNotEmpty()
    timeEnd: string;
    @ApiProperty()
    @IsNotEmpty()
    semester: any;
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    order: string;
}
