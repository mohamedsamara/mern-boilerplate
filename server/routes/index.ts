import * as express from 'express';

import NoteRoute from './api/note';
import AuthRoute from './api/auth';
import UserRoute from './api/user';

import config from '../config/keys';

class ApiRoute {
  public static path = config.api.prefix;

  private router = express.Router();

  private constructor() {
    this.router.get('/', this.get);
    this.router.use(NoteRoute.path, NoteRoute.router);
    this.router.use(AuthRoute.path, AuthRoute.router);
    this.router.use(UserRoute.path, UserRoute.router);
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
