import { ApiProperty } from "@nestjs/swagger";
class Score {
    @ApiProperty()
    type: string;
    @ApiProperty()
    score: number;
    @ApiProperty()
    rate: number;
}
export class InsertScoreOfStudentDto {
    @ApiProperty()
    user: string;
    @ApiProperty()
    subjectClass: string;
    @ApiProperty({ type: Array(Score) })
    score: string;
    @ApiProperty()
    total: number;
}
