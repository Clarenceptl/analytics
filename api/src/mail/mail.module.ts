import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: process.env.MAIL_URL_SMTP ?? {
        host: 'mailcatcher',
        port: 1025,
        ignoreTLS: true,
        secure: false
      },
      defaults: {
        from: '"larudakoé" <noreply@larudakote.com>'
      },

      template: {
        dir: 'src/mails/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
