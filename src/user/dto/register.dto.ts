import { RolesType } from './../../shared/roles-type.enum';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class PersonalInfo {
    @ApiProperty()
    idcard: string;
    @ApiProperty()
    phonenumber: string;
    @ApiProperty()
    birthday: Date;
    @ApiProperty()
    address: string;
}
class Academicinfo {
    @ApiProperty()
    status: string;
    @ApiProperty()
    faculty: string;
    @ApiProperty()
    brach: string;
    @ApiProperty()
    class: string;
    @ApiProperty()
    rank: string;
}
export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    //@Matches(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)
    readonly email: string;
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8, { message: ' The min length of password is 8 ' })
    @MaxLength(20, {
        message: " The password can't accept more than 20 characters ",
    })
    // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/,
    //     { message: " A password at least contains one numeric digit, one supercase char and one lowercase char" }
    // )
    readonly password: string;
    @ApiProperty()
    @IsNotEmpty()
    readonly firstname?: string;
    @ApiProperty()
    @IsNotEmpty()
    readonly lastname?: string;
    @ApiProperty({ type: PersonalInfo })
    personalinfo: string;

    @ApiProperty({ type: Academicinfo })
    academicinfo: string;

    roles: RolesType[];
}
