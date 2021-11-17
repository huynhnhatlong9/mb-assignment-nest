import { ApiProperty } from '@nestjs/swagger';
export class CloseClassDto {
    @ApiProperty()
    listClass: Array<string>;
}
