import { Request, Response } from 'express';
import { Container } from 'typedi';

import UsersService from '../services/users.service';
import Responder from '../helpers/responder';
import * as auth from '../utils/auth';
import * as cookie from '../utils/cookie';

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
        const refreshToken = auth.createRefreshToken(user);

        if (refreshToken && user) {
          await usersServiceInstance.saveRefreshToken(user._id, refreshToken);
        }

        const data = {
          token: `Bearer ${jwt}`,
          refresh_token: refreshToken,
          user,
        };

        cookie.setCookie(res, refreshToken);

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

      let jwt;
      let refreshToken;

      const createdUser = await usersServiceInstance
        .register(newUser)
        .then(async user => {
          jwt = auth.createToken(user);
          refreshToken = auth.createRefreshToken(user);

          if (refreshToken && user) {
            await usersServiceInstance.saveRefreshToken(user._id, refreshToken);
          }
        });

      const data = {
        token: `Bearer ${jwt}`,
        refresh_token: refreshToken,
        user: createdUser,
      };

      cookie.setCookie(res, refreshToken);

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

  public async getToken(req: Request, res: Response) {
    const { refreshToken } = req.cookies['refresh_token'];

    console.log('refresh_token is', refreshToken);

    const { email } = req.body;
    try {
      const user = await usersServiceInstance.findByEmail(email);

      if (!user) {
        responderInstance.setError(
          400,
          'No user found for this email address.',
        );
        return responderInstance.send(res);
      }

      const jwt = auth.createToken(user);
      const refreshToken = auth.createRefreshToken(user);

      if (refreshToken && user) {
        await usersServiceInstance.saveRefreshToken(user._id, refreshToken);
      }

      const data = {
        token: `Bearer ${jwt}`,
        user,
      };

      cookie.setCookie(res, refreshToken);

      responderInstance.setSuccess(
        200,
        'You have logged in successfully',
        data,
      );

      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }
}

export default AuthController;
