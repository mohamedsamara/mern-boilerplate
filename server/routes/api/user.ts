import * as express from 'express';
import { Container } from 'typedi';

import UserController from '../../controllers/user.controller';
import * as auth from '../../utils/auth';

const userControllerInstance = Container.get(UserController);

class UserRoute {
  public static path = '/user';

  private router = express.Router();

  private constructor() {
    this.get();
  }

  static get router() {
    const notesInstance = new UserRoute();
    return notesInstance.router;
  }

  private async get() {
    this.router.get(
      '/initial',
      auth.verifyRoute,
      userControllerInstance.getUser,
    );
  }
}

export default UserRoute;
