import * as express from 'express';

class ApiRoute {
  public static path = '/api';

  private router = express.Router();

  private constructor() {
    this.router.get('/', this.get);
  }

  static get router() {
    const apiInstance = new ApiRoute();
    return apiInstance.router;
  }

  private async get(req: express.Request, res: express.Response) {
    res.status(200).json({ message: 'Welcome to APIs route!' });
  }
}

export default ApiRoute;
