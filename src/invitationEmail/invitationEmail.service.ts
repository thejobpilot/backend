import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';

export class invitationEmailService {
  static async sendEmail(to, from, subject, text) {
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to, // Change to your recipient
    from, // Change to your verified sender
    subject,
    text,
  };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}