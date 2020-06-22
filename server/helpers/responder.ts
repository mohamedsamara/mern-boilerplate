import { Response } from 'express';

class Responder {
  private type: string = null;

  private code: number = null;

  private message: string = null;

  private data: any = null;

  public async success(code: number, message: string, data?: any) {
    this.type = 'success';
    this.code = code;
    this.message = message;
    this.data = data;
  }

  public async error(code: number, message: string) {
    this.type = 'error';
    this.code = code;
    this.message = message;
  }

  public async send(res: Response) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data,
    };

    if (this.type === 'success') {
      return res.status(this.code).json(result);
    }

    return res.status(this.code).json({
      status: this.type,
      message: this.message,
    });
  }
}

export default Responder;
