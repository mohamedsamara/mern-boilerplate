// router.use('/notes', noteRoutes);
// router.use('/notes', noteRoutes);
// router.use('/notes', noteRoutes);

import * as express from 'express';

import NotesRoute from './notes';

class ApiRoute {
  public static path = '/api';

  private router = express.Router();

  private constructor() {
    this.router.get('/', this.get);
    this.router.use(NotesRoute.path, NotesRoute.router);
  }

  static get router() {
    const apiInstance = new ApiRoute();
    return apiInstance.router;
  }

  private get = async (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: 'Welcome to APIs route!' });
  };
}

export default ApiRoute;
