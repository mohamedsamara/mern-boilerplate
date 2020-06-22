import { Request, Response } from 'express';
import { Container } from 'typedi';

import UserService from '../services/user.service';
import MailerService from '../services/mailer.service';
import Responder from '../helpers/responder';

import * as auth from '../utils/auth';
import * as templates from '../utils/email.templates';

const userService = Container.get(UserService);
const responder = Container.get(Responder);
const mailerInstance = Container.get(MailerService);

class User {
  public async getUserInitial(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await userService.findUserInitial(id);

      responder.success(200, null, { user });
      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  }

  public async getUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await userService.findUser(id);

      responder.success(200, null, { user });
      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  }

  public async updatePassword(req: Request, res: Response) {
    const { password, newPassword, userId } = req.body;

    if (!password || !newPassword) {
      responder.error(400, 'some details are missing');
      return responder.send(res);
    }

    try {
      const user = await userService.findById(userId);

      if (!user) {
        responder.error(400, 'user not found');
        return responder.send(res);
      }

      const passwordMatches = auth.verifyPassword(password, user.password);
      if (passwordMatches) {
        const hashedPassword = auth.hashPassword(newPassword);
        const updatedUser = await userService.updatePassword(
          userId,
          hashedPassword,
        );

        if (updatedUser) {
          const message = templates.passwordChanged();
          await mailerInstance.send(user.email, message);

          responder.success(200, 'password changed');
        }
      } else {
        responder.error(400, 'your current password is incorrect');
        return responder.send(res);
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  }

  public async updateUser(req: Request, res: Response) {
    const newProfile = req.body;
    const { id } = req.params;

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
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedUser = await userService.deleteUser(id);

      if (deletedUser) {
        responder.success(200, 'account deleted');
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  }
}

export default User;
