import { ApiProperty } from "@nestjs/swagger";
export class CreateSubjectDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    credit: number;
    //so tiet
    @ApiProperty()
    lession: number;
    @ApiProperty()
    durationPerLession: number;
}
