import * as express from 'express';
import { Container } from 'typedi';

import AuthController from '../../controllers/auth.controller';

const authControllerInstance = Container.get(AuthController);

class AuthRoute {
  public static path = '/auth';

  private router = express.Router();

  private constructor() {
    this.login();
    this.register();
    this.reset();
    this.logout();
    this.token();
  }

  static get router() {
    const notesInstance = new AuthRoute();
    return notesInstance.router;
  }

  private async login() {
    this.router.post('/login', authControllerInstance.login);
  }

  private async register() {
    this.router.post('/register', authControllerInstance.register);
  }

  private async reset() {
    this.router.post('/reset-password', authControllerInstance.resetPassword);
  }

  private async logout() {
    this.router.post('/logout', authControllerInstance.logout);
  }

  private async token() {
    this.router.post('/refresh-token', authControllerInstance.getToken);
  }
}

export default AuthRoute;
