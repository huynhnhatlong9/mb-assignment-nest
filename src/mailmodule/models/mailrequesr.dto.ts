/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class MailRequestDto {
    @ApiProperty()
    from?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    to_emails: Array<string>;

    @ApiProperty()
    @IsNotEmpty()
    subject: string;

    @ApiProperty()
    @IsNotEmpty()
    body: string;
}
