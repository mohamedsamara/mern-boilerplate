import { Response } from 'express';

class Responder {
  public statusCode: number = null;

  public code: string = null;

  public type: string = null;

  public data: any = null;

  public message: string = null;

  public async setSuccess(statusCode: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.type = 'success';
    this.message = message;
    this.data = data;
  }

  public async setError(statusCode: number, message: string, code?: string) {
    this.statusCode = statusCode;
    this.code = code;
    this.type = 'error';
    this.message = message;
  }

  public async send(res: Response) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data,
    };

    if (this.type === 'success') {
      return res.status(this.statusCode).json(result);
    }

    return res.status(this.statusCode).json({
      code: this.code,
      status: this.type,
      message: this.message,
    });
  }
}

export default Responder;
