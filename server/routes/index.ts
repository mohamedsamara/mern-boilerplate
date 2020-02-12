import * as express from 'express';

import NotesRoute from './api/notes';
import AuthRoute from './api/auth';

class ApiRoute {
  public static path = '/api';

  private router = express.Router();

  private constructor() {
    this.router.get('/', this.get);
    this.router.use(NotesRoute.path, NotesRoute.router);
    this.router.use(AuthRoute.path, AuthRoute.router);
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
