import config from '../config/keys';

class MailerService {
  private sender = config.mailgun.sender;

  private mailgun: any;

  //   constructor() {
  //     // this.init();
  //   }

  public init() {
    this.mailgun({
      apiKey: config.mailgun.key,
      domain: config.mailgun.domain,
    });
  }

  public async sendSignupEmail(recepient: any, message: any) {
    try {
      const data = {
        from: `Mern Boilerplate <${this.sender}>`,
        to: recepient,
        subject: message.subject,
        text: message.text,
      };

      await this.mailgun.messages().send(data);
      return { delivered: 1, status: 'ok' };
    } catch (error) {
      throw error;
    }
  }

  public async sendResetConfirmEmail(recepient: any, message: any) {
    try {
      const data = {
        from: `Mern Boilerplate <${this.sender}>`,
        to: recepient,
        subject: message.subject,
        text: message.text,
      };

      await this.mailgun.messages().send(data);
      return { delivered: 1, status: 'ok' };
    } catch (error) {
      throw error;
    }
  }
}

export default MailerService;
