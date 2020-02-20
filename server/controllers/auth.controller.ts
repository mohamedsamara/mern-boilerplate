import { Request, Response } from 'express';
import { Container } from 'typedi';
import * as uuidv4 from 'uuid/v4';

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
      responderInstance.setError(400, 'Some details are missing');
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
        const updatedUser = await usersServiceInstance.saveRefreshToken(
          user._id,
          uuidv4(),
        );

        const jwt = auth.createToken(updatedUser);
        const refreshToken = auth.createRefreshToken(updatedUser);
        const foundUser = await usersServiceInstance.findUser(user._id);

        const data = {
          token: `Bearer ${jwt}`,
          //   refresh_token: refreshToken,
          user: foundUser,
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
      responderInstance.setError(400, 'Some details are missing');
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
        refresh_token: uuidv4(),
      };

      const createdUser = await usersServiceInstance.register(newUser);

      const jwt = auth.createToken(createdUser);
      const refreshToken = auth.createRefreshToken(createdUser);

      const foundUser = await usersServiceInstance.findUser(createdUser._id);

      const data = {
        token: `Bearer ${jwt}`,
        // refresh_token: refreshToken,
        user: foundUser,
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

  public async logout(req: Request, res: Response) {
    res.cookie('refresh_token', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    responderInstance.setSuccess(200, 'You have been logged out successfully.');
    return responderInstance.send(res);
  }

  public async getToken(req: Request, res: Response) {
    const refreshTokenHeader = req.cookies.refresh_token;
    if (!refreshTokenHeader) {
      responderInstance.setError(400, 'Invalid no header refresh token');
      return responderInstance.send(res);
    }

    try {
      const payload: any = await auth.verifyRefreshToken(refreshTokenHeader);

      if (!payload) {
        responderInstance.setError(
          401,
          'Sorry, you are not authorized to access this resource.',
          'unauthorized',
        );
        return responderInstance.send(res);
      }

      const user = await usersServiceInstance.findById(payload.id);

      if (!user) {
        responderInstance.setError(400, 'Invalid refresh token');
        return responderInstance.send(res);
      }

      if (user.refresh_token !== payload.refresh_token) {
        responderInstance.setError(400, 'Invalid refresh token');
        return responderInstance.send(res);
      }

      const updatedUser = await usersServiceInstance.saveRefreshToken(
        user._id,
        uuidv4(),
      );

      const jwt = auth.createToken(updatedUser);
      const refreshToken = auth.createRefreshToken(updatedUser);
      const foundUser = await usersServiceInstance.findUser(user._id);

      const data = {
        token: `Bearer ${jwt}`,
        // refresh_token: refreshToken,
        user: foundUser,
      };

      cookie.setCookie(res, refreshToken);
      responderInstance.setSuccess(200, 'You are authorized again', data);
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }

  //   public async verifyRefreshToken(){}
}

export default AuthController;
