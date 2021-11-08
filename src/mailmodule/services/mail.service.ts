import { MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Injectable } from '@nestjs/common';
import { MailServiceRes } from '../models/mail.response';
import { MailRequestDto } from '../models/mailrequesr.dto';
import { CustomThrowException } from 'src/common/exceptions/customThrowException';
@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMailText(emailRequest: MailRequestDto) {
        return this.mailerService
            .sendMail({
                from: emailRequest.from
                    ? emailRequest.from
                    : '"No Reply" <noreply@gmail.com>',
                to: emailRequest.to_emails, // list of receivers
                subject: emailRequest.subject, // Subject line
                html: emailRequest.body, // HTML body content
            })
            .then(() => {
                return new MailServiceRes({
                    success: true,
                    result: 'Email has been sent successfully',
                    statusCode: HttpStatus.OK,
                });
            })
            .catch((err) => {
                // console.log(err);
                if (err.code == 'EENVELOPE') {
                    throw CustomThrowException(
                        'No recipients defined, email not sent',
                        HttpStatus.BAD_REQUEST,
                    );
                } else {
                    throw CustomThrowException(
                        err.message,
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                }
            });
    }
}
