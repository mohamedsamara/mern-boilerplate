import * as express from 'express';
import { Container } from 'typedi';

import UsersController from '../../controllers/users.controller';

const usersControllerInstance = Container.get(UsersController);

class UsersRoute {
  public static path = '/user';

  private router = express.Router();

  private constructor() {
    this.login();
    this.register();
  }

  static get router() {
    const notesInstance = new UsersRoute();
    return notesInstance.router;
  }

  private async login() {
    this.router.post('/login', usersControllerInstance.login);
  }

  private async register() {
    this.router.post('/register', usersControllerInstance.register);
  }
}

export default UsersRoute;
