import * as express from 'express';
import { Container } from 'typedi';

import AuthController from '../../controllers/auth.controller';

const authController = Container.get(AuthController);

class AuthRoute {
  public static path = '/auth';

  private router = express.Router();

  private constructor() {
    this.login();
    this.register();
    this.expire();
    this.reset();
    this.forgot();
    this.logout();
    this.token();
  }

  static get router() {
    const notesInstance = new AuthRoute();
    return notesInstance.router;
  }

  private async login() {
    this.router.post('/login', authController.login);
  }

  private async register() {
    this.router.post('/register', authController.register);
  }

  private async expire() {
    this.router.post(
      '/reset-password/expire/:token',
      authController.checkExpire,
    );
  }

  private async reset() {
    this.router.post('/reset-password/:token', authController.resetPassword);
  }

  private async forgot() {
    this.router.post('/forgot-password', authController.forgotPassword);
  }

  private async logout() {
    this.router.post('/logout', authController.logout);
  }

  private async token() {
    this.router.post('/refresh-token', authController.getToken);
  }
}

export default AuthRoute;
