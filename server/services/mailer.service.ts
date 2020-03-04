import * as mailgun from 'mailgun-js';

import { IMessage } from '../types/message.types';
import config from '../config/keys';

class MailerService {
  private sender = config.mailgun.sender;

  private emailProvider = mailgun({
    apiKey: config.mailgun.key,
    domain: config.mailgun.domain,
  });

  public async send(recepient: string, message: IMessage) {
    try {
      const data = {
        from: `${config.app.name} <${this.sender}>`,
        to: recepient,
        subject: message.subject,
        text: message.text,
      };

      const emailSent = await this.emailProvider.messages().send(data);

      if (emailSent) {
        return { delivered: 1, status: 'ok' };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default MailerService;
