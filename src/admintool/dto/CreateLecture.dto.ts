<<<<<<< HEAD
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLectureDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    // @IsPhoneNumber()
    phone: string;
    @ApiProperty()
    subject: string[];
}
=======
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLectureDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    // @IsPhoneNumber()
    phone: string;
    @ApiProperty()
    subject: string;
}
>>>>>>> ebf6065de81488b2cf58b185a4b06119ac5c2299
