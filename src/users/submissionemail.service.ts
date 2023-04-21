import FormData from 'form-data';
import configuration from '../config/configuration';
import { NodeMailgun } from 'ts-mailgun';

export class SubmissionEmailService {
  public async sendSubmissionEmail(to: string, fullName, position) {
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
        'Interview Submission',
        `Hello ${fullName}! Thank you for submitting your interview for the ${position} position!`,
      )
      .catch((error) => {
        throw error;
      })
      .then((result) =>
        console.log('Successfully sent email to: ' + to, result),
      )
  }
}
