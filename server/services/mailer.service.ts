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

  public async send(recepient: any, message: any) {
    try {
      const data = {
        from: `Mern Boilerplate <${this.sender}>`,
        to: recepient,
        subject: message.subject,
        text: message.text,
      };

      return await this.emailProvider.messages().send(data);
    } catch (error) {
      throw error;
    }
  }
}

export default MailerService;
