import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class PersonalInformationDto {
    @ApiProperty()
    @IsNotEmpty()
    idcard: string;
    @ApiProperty()
    @IsNotEmpty()
    phonenumber: string;
    @ApiProperty()
    @IsNotEmpty()
    birthday: Date;
    @ApiProperty()
    @IsNotEmpty()
    address: string
}
