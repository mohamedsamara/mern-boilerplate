import * as express from 'express';
import { Container } from 'typedi';

import UserController from '../../controllers/user.controller';
import * as auth from '../../utils/auth';

const userControllerInstance = Container.get(UserController);

class UserRoute {
  public static path = '/user';

  private router = express.Router();

  private constructor() {
    this.getInitial();
    this.get();
    this.put();
  }

  static get router() {
    const notesInstance = new UserRoute();
    return notesInstance.router;
  }

  private async getInitial() {
    this.router.get(
      '/initial/:id',
      auth.verifyRoute,
      userControllerInstance.getUserInitial,
    );
  }

  private async get() {
    this.router.get('/:id', auth.verifyRoute, userControllerInstance.getUser);
  }

  private async put() {
    this.router.put(
      '/:id',
      auth.verifyRoute,
      userControllerInstance.updateUser,
    );
  }
}

export default UserRoute;
