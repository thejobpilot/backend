import FormData from 'form-data';
import configuration from '../config/configuration';
import { NodeMailgun } from 'ts-mailgun';

export class InvitationEmailService {
  public static async sendInvitationEmail(to: string, fullName) {
    const mailer = new NodeMailgun();
    mailer.apiKey = configuration().mailgun.apiKey;
    mailer.domain = configuration().mailgun.domain;
    mailer.fromEmail =
      'postmaster@sandboxcc78726d941c46f393aea7161a6762fd.mailgun.org';
    mailer.fromTitle = 'JobPilot';
    mailer.init();
    mailer
      .send(
        to,
        'New Interview Received',
        `Hello ${fullName}! You have been assigned a new interview on JobPilot. Login at https://jobpilot.tech to access it.`,
      )
      .catch((error) => {
        throw error;
      })
      .then((result) =>
        console.log('Successfully sent email to: ' + to, result),
      )
  }
}
