import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfirmationAccount, RegisterMail } from 'src/models';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailRegister(data: RegisterMail): Promise<any> {
    try {
      await this.mailerService.sendMail({
        to: data.email,
        from: 'noreply@analytics.com',
        subject: 'Bientôt parmi nous ✔',
        template: 'registerBackoffice', // The `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          name: data.fullname
        }
      });
      return {
        success: true,
        message: 'Mail envoyé'
      };
    } catch (error) {
      console.log(error);
    }
  }

  async sendMailConfirmation(data: ConfirmationAccount): Promise<void> {
    const equipe = 'analyweb';
    const mail = data.valid ? 'confirmationMail' : 'refusValidationMail';
    try {
      await this.mailerService.sendMail({
        to: data.email,
        from: `noreply@${equipe}.com`,
        subject: 'Votre compte a été confirmé ✔',
        template: mail, // The `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          equipe
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
