import { ApiProperty } from "@nestjs/swagger"
export class SearchSubjectDto {
    @ApiProperty()
    keyword: string;
}
