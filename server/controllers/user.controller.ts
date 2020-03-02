import { Request, Response } from 'express';
import { Container } from 'typedi';

import UsersService from '../services/users.service';
import MailerService from '../services/mailer.service';
import Responder from '../helpers/responder';

import * as auth from '../utils/auth';
import * as templates from '../utils/email.templates';

const usersServiceInstance = Container.get(UsersService);
const responderInstance = Container.get(Responder);
const mailerInstance = Container.get(MailerService);

class User {
  public async getUserInitial(req: Request, res: Response) {
    const { id } = req.params;

    try {
      //   const payload: any = await auth.getUser(req);

      //   if (!payload) {
      //     responderInstance.setError(
      //       401,
      //       'Sorry, you are not authorized to access this resource.',
      //       'unauthorized',
      //     );
      //     return responderInstance.send(res);
      //   }

      const foundUser = await usersServiceInstance.findUserInitial(id);
      const data = {
        user: foundUser,
      };

      responderInstance.setSuccess(200, null, data);
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }

  public async getUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const foundUser = await usersServiceInstance.findUser(id);
      const data = {
        user: foundUser,
      };

      responderInstance.setSuccess(200, null, data);
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }

  public async updatePassword(req: Request, res: Response) {
    const { password, newPassword, userId } = req.body;

    if (!password || !newPassword) {
      responderInstance.setError(400, 'Some details are missing');
      return responderInstance.send(res);
    }

    try {
      const user = await usersServiceInstance.findById(userId);

      if (!user) {
        responderInstance.setError(
          400,
          'Something went wrong with changing your password!',
        );
        return responderInstance.send(res);
      }

      const passwordMatches = auth.verifyPassword(password, user.password);

      if (passwordMatches) {
        const hashedPassword = auth.hashPassword(newPassword);
        const updatedUser = await usersServiceInstance.updatePassword(
          userId,
          hashedPassword,
        );

        if (updatedUser) {
          const message = templates.passwordChanged();
          await mailerInstance.send(user.email, message);

          responderInstance.setSuccess(
            200,
            'You have changed your password successfully',
          );
        }
      } else {
        responderInstance.setError(400, 'Please enter your current password!');
        return responderInstance.send(res);
      }

      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }

  public async updateUser(req: Request, res: Response) {
    const newProfile = req.body;
    const { id } = req.params;

    try {
      const updatedUser = await usersServiceInstance.updateUser(id, newProfile);
      const data = {
        user: updatedUser,
      };

      responderInstance.setSuccess(200, 'Updated profile successfully', data);
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const userToDelete = await usersServiceInstance.deleteUser(id);

      if (userToDelete) {
        responderInstance.setSuccess(
          200,
          'Your Account has been deleted successfully',
        );
      } else {
        responderInstance.setError(
          404,
          `Something went wrong with deleting your account!`,
        );
      }
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }
}

export default User;
