import * as express from 'express';
import { Container } from 'typedi';

import UserController from '../../controllers/user.controller';
import * as auth from '../../utils/auth';

const userController = Container.get(UserController);

class UserRoute {
  public static path = '/user';

  private router = express.Router();

  private constructor() {
    this.getInitial();
    this.get();
    this.updatePassword();
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
      userController.getUserInitial,
    );
  }

  private async get() {
    this.router.get('/:id', auth.verifyRoute, userController.getUser);
  }

  private async updatePassword() {
    this.router.post(
      '/update-password',
      auth.verifyRoute,
      userController.updatePassword,
    );
  }

  private async put() {
    this.router.put('/:id', auth.verifyRoute, userController.updateUser);
  }

  private async delete() {
    this.router.delete('/:id', auth.verifyRoute, userController.deleteUser);
  }
}

export default UserRoute;
