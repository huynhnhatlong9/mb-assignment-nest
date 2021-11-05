import { MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
    @ApiProperty()
    @MinLength(4)
    username: string;
    
    @ApiProperty()
    @MinLength(4)
    password: string;
}
