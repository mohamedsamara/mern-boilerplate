import * as express from 'express';

import ApiRoute from './api';

class BaseRoute {
  public static path = '/';

  private router = express.Router();

  private constructor() {
    this.router.get('/', this.get);
    this.router.use(ApiRoute.path, ApiRoute.router);
  }

  static get router() {
    const baseInstance = new BaseRoute();
    return baseInstance.router;
  }

  private async get(req: express.Request, res: express.Response) {
    res.status(200).json({ message: 'Welcome to base route!' });
  }
}

export default BaseRoute;
