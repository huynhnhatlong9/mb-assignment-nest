import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MailRequestDto } from './mailrequesr.dto';

export class InterviewRequestDto extends PartialType(MailRequestDto) {
    @ApiProperty({type: String})
    jobId: string;

    @ApiProperty({type: Number})
    caniddateId: number;

    @ApiProperty({type: Date})
    interviewDate: Date;
}