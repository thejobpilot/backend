import FormData from 'form-data';
import configuration from '../config/configuration';
import { NodeMailgun } from 'ts-mailgun';

export class AcceptanceEmailService {
  public async sendAcceptanceEmail(to: string, fullName, position) {
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
        'Interview Application Update',
        `Hello ${fullName}! We are excited to announce that you have been accepted for the ${position} position!
         We are excited to have you join our team and work with us.`,
      )
      .catch((error) => {
        throw error;
      })
      .then((result) =>
        console.log('Successfully sent email to: ' + to, result),
      )
  }
}
