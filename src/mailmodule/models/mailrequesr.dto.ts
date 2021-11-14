/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class MailRequestDto {
    @ApiProperty()
    from?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    to_emails: string;

    @ApiProperty()
    @IsNotEmpty()
    subject: string;

    content?: string;

    @ApiProperty()
    @IsNotEmpty()
    body: string;
}
