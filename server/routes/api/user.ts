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
    this.updatePassword();
    this.get();
    this.put();
    this.delete();
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

  private async updatePassword() {
    this.router.post(
      '/update-password',
      auth.verifyRoute,
      userControllerInstance.updatePassword,
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

  private async delete() {
    this.router.delete(
      '/:id',
      auth.verifyRoute,
      userControllerInstance.deleteUser,
    );
  }
}

export default UserRoute;
