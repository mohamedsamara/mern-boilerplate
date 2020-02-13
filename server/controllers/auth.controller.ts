import { Request, Response } from 'express';
import { Container } from 'typedi';

import UsersService from '../services/users.service';
import Responder from '../helpers/responder';
import * as auth from '../utils/auth';

const usersServiceInstance = Container.get(UsersService);
const responderInstance = Container.get(Responder);

class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      responderInstance.setError(400, 'some details are missing');
      return responderInstance.send(res);
    }

    try {
      const user = await usersServiceInstance.findByEmail(email);

      if (!user) {
        responderInstance.setError(
          400,
          'No user found for this email address.',
        );
        return responderInstance.send(res);
      }

      const passwordMatches = auth.verifyPassword(password, user.password);

      if (passwordMatches) {
        const jwt = auth.createToken(user);

        const data = {
          token: `Bearer ${jwt}`,
          user,
        };

        responderInstance.setSuccess(
          200,
          'You have logged in successfully',
          data,
        );
      } else {
        responderInstance.setError(400, 'Wrong password.');
        return responderInstance.send(res);
      }

      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }

  public async register(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      responderInstance.setError(400, 'some details are missing');
      return responderInstance.send(res);
    }

    try {
      const user = await usersServiceInstance.findByEmail(email);

      if (user) {
        responderInstance.setError(
          400,
          'That email address is already in use.',
        );
        return responderInstance.send(res);
      }

      const hashedPassword = auth.hashPassword(req.body.password);

      const newUser = {
        email,
        password: hashedPassword,
        profile: {
          firstName,
          lastName,
        },
      };

      const createdUser = await usersServiceInstance.register(newUser);
      const jwt = auth.createToken(createdUser);

      const data = {
        token: `Bearer ${jwt}`,
        user: createdUser,
      };

      responderInstance.setSuccess(
        201,
        'You have been registered successfully.',
        data,
      );
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error.message);
      return responderInstance.send(res);
    }
  }
}

export default AuthController;
