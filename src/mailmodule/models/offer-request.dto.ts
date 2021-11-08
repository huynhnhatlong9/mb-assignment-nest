import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MailRequestDto } from './mailrequesr.dto';

export class OfferRequestDto extends PartialType(MailRequestDto) {
    @ApiProperty({type: String})
    jobId: string;

    @ApiProperty({type: Number})
    caniddateId: number;

    @ApiProperty({type: Date})
    startedWorkingDate: Date;
}