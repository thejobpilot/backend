import FormData from 'form-data';
import configuration from '../config/configuration';
import { NodeMailgun } from 'ts-mailgun';

export class RejectionEmailService {
  public async sendRejectionEmail(to: string, fullName, position) {
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
        `Hello ${fullName}! We regret to inform you that we will no longer be moving forward with the interview process for ${position} position!
         We hope this email finds you well.`,
      )
      .catch((error) => {
        throw error;
      })
      .then((result) =>
        console.log('Successfully sent email to: ' + to, result),
      )
  }
}