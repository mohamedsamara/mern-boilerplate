import { Request, Response } from 'express';
import { Container } from 'typedi';

import AuthController from './auth.controller';

import UserService from '../services/user.service';
import MailerService from '../services/mailer.service';
import Responder from '../helpers/responder';
import * as templates from '../templates';

const authController = Container.get(AuthController);
const userService = Container.get(UserService);
const responder = Container.get(Responder);
const mailerInstance = Container.get(MailerService);

class User {
  public getUserInitial = async (req: Request, res: Response) => {
    const { id }: any = req.payload;

    try {
      const user = await userService.findUserInitial(id);

      responder.success(200, null, { user });
      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  };

  public getUser = async (req: Request, res: Response) => {
    const { id }: any = req.payload;

    try {
      const user = await userService.findUser(id);

      responder.success(200, null, { user });
      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  };

  public updatePassword = async (req: Request, res: Response) => {
    const { id }: any = req.payload;
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
      responder.error(400, 'some details are missing');
      return responder.send(res);
    }

    try {
      const user = await userService.findById(id);

      if (!user) {
        responder.error(400, 'user not found');
        return responder.send(res);
      }

      const passwordMatches = await authController.verifyPassword(
        password,
        user.password,
      );
      if (passwordMatches) {
        const hashedPassword = await authController.hashPassword(newPassword);
        const updatedUser = await userService.updatePassword(
          id,
          hashedPassword,
        );

        if (updatedUser) {
          const message = templates.passwordChanged();
          await mailerInstance.send(user.email, message);

          responder.success(200, 'password changed');
        }
      } else {
        responder.error(400, 'your current password is incorrect');
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    const { id }: any = req.payload;
    const newProfile = req.body;

    try {
      const user = await userService.updateUser(id, newProfile);

      if (user) {
        responder.success(200, 'profile updated', { user });
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const { id }: any = req.payload;
      const deletedUser = await userService.deleteUser(id);

      if (deletedUser) {
        responder.success(200, 'account deleted');
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  };
}

export default User;
