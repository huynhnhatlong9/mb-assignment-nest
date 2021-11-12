import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/core/decorators/guards/public.guards.decorator';
import { MailRequestDto } from './models/mailrequesr.dto';
import { MailService } from './services/mail.service';
@Controller('mail')
export class MaiController {
    constructor(private readonly mailService: MailService) {}

    @Public()
    @Post('test1')
    sendmail(@Body() body: MailRequestDto) {
        return this.mailService.sendMailText(body);
    }
}
