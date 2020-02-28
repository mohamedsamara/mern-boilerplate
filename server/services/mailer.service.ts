import { Service } from 'typedi';

import * as mailgun from 'mailgun-js';

import config from '../config/keys';

@Service()
class MailerService {
  private sender = config.mailgun.sender;

  private emailProvider = mailgun({
    apiKey: config.mailgun.key,
    domain: config.mailgun.domain,
  });

  public async sendSignupEmail(recepient: any, message: any) {
    try {
      const data = {
        from: `Mern Boilerplate <${this.sender}>`,
        to: recepient,
        subject: message.subject,
        text: message.text,
      };

      await this.emailProvider.messages().send(data);
      return { delivered: 1, status: 'ok' };
    } catch (error) {
      throw error;
    }
  }

  public async sendPasswordChangedEmail(recepient: any, message: any) {
    try {
      const data = {
        from: `Mern Boilerplate <${this.sender}>`,
        to: recepient,
        subject: message.subject,
        text: message.text,
      };

      await this.emailProvider.messages().send(data);
      return { delivered: 1, status: 'ok' };
    } catch (error) {
      throw error;
    }
  }
}

export default MailerService;
