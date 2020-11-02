import * as express from 'express';
import { Container } from 'typedi';

import UserController from '../../controllers/user.controller';
import { isAuth } from '../../middlewares/isAuth';

const userController = Container.get(UserController);

class UserRoute {
  public static path = '/user';

  private router = express.Router();

  private constructor() {
    this.get();
    this.updatePassword();
    this.put();
    this.delete();
  }

  static get router() {
    const notesInstance = new UserRoute();
    return notesInstance.router;
  }

  private async get() {
    this.router.get('/', isAuth, userController.getUser);
  }

  private async updatePassword() {
    this.router.post('/update-password', isAuth, userController.updatePassword);
  }

  private async put() {
    this.router.put('/', isAuth, userController.updateUser);
  }

  private async delete() {
    this.router.delete('/', isAuth, userController.deleteUser);
  }
}

export default UserRoute;
