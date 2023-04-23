interface Response {
  status: (code: number) => any;
  json: (response: any) => any;
}

interface Result {
  status: string;
  message: string | null;
  data: any | null;
}

export default class ResponseHandler {
  statusCode: number | null;
  type: string | null;
  data: any | null;
  message: string | null;

  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(
    statusCode: number,
    message: string,
    data: any,
    res: Response
  ): void {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'success';

    this.send(res);
  }

  setError(statusCode: number, message: string, res: Response): void {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';

    this.send(res);
  }

  send(res: Response): void {
    const result: Result = {
      status: this.type!,
      message: this.message,
      data: this.data,
    };

    if (this.type === 'success') {
      res.status(this.statusCode!).json(result);
    } else {
      res.status(this.statusCode!).json({
        status: this.type!,
        message: this.message,
      });
    }
  }
}
