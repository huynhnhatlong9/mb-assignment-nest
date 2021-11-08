import { IsEmail, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLectureDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsPhoneNumber()
    phone: number;
    @ApiProperty()
    subject: string;
}
