import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MaiController } from './mail.controller';
import { MailService } from './services/mail.service';

@Module({
    imports: [
        MailerModule.forRoot({
            // transport:"smtps://user:pass@zimbra.netpower.no",
            transport: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'bk4L27017@gmail.com', //'jobspace@netpower.no' //jobspace/net12344321*(&)
                    pass: 'LocT@2031',
                },
            },
            defaults: {
                from: '"No Reply" <noreply@gmail.com>', // outgoing email ID
            },
        }),
    ],
    controllers: [MaiController],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
