import { Request, Response } from 'express';
import { Container } from 'typedi';
import * as uuidv4 from 'uuid/v4';

import UserService from '../services/user.service';
import MailerService from '../services/mailer.service';
import Responder from '../helpers/responder';
import { IUserInput } from '../types/user.types';

import * as auth from '../utils/auth';
import * as cookie from '../utils/cookie';
import * as templates from '../utils/email.templates';
import config from '../config/keys';

const userService = Container.get(UserService);
const responder = Container.get(Responder);
const mailer = Container.get(MailerService);

class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      responder.error(400, 'some details are missing');
      return responder.send(res);
    }

    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        responder.error(400, 'no user found for this email address');
        return responder.send(res);
      }

      const passwordMatches = auth.verifyPassword(password, user.password);

      if (passwordMatches) {
        const updatedUser = await userService.saveRefreshToken(
          user._id,
          uuidv4(),
        );

        const jwt = auth.createToken(updatedUser);
        const refreshToken = auth.createRefreshToken(updatedUser);
        const foundUser = await userService.findUser(user._id);

        const data = {
          token: `Bearer ${jwt}`,
          //   refresh_token: refreshToken,
          user: foundUser,
        };
        cookie.set(res, refreshToken);
        responder.success(200, 'you are logged in', data);
      } else {
        responder.error(400, 'wrong password.');
        return responder.send(res);
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  }

  public async register(req: Request, res: Response) {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || first_name || last_name) {
      responder.error(400, 'some details are missing');
      return responder.send(res);
    }

    try {
      const user = await userService.findByEmail(email);

      if (user) {
        responder.error(400, 'that email address is already in use');
        return responder.send(res);
      }

      const hashedPassword = auth.hashPassword(password);
      const newUser = {
        email,
        password: hashedPassword,
        profile: {
          first_name,
          last_name,
        },
        refresh_token: uuidv4(),
      };

      const createdUser = await userService.register(newUser as IUserInput);

      const jwt = auth.createToken(createdUser);
      const refreshToken = auth.createRefreshToken(createdUser);
      const foundUser = await userService.findUser(createdUser._id);

      if (foundUser) {
        const data = {
          token: `Bearer ${jwt}`,
          // refresh_token: refreshToken,
          user: foundUser,
        };

        cookie.set(res, refreshToken);
        const message = templates.signupEmail(newUser.profile);
        await mailer.send(createdUser.email, message);
        responder.success(201, 'You have been registered successfully.', data);
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error.message);
      return responder.send(res);
    }
  }

  public async checkExpire(req: Request, res: Response) {
    const { token } = req.params;

    if (!token) {
      responder.error(
        400,
        'no token in your request. please attempt to click the link from your email again!',
      );
      return responder.send(res);
    }

    try {
      const user = await userService.resetPasswordExpires(token);

      if (!user) {
        responder.error(
          400,
          'your token has expired. please attempt to reset your password again!',
        );
        return responder.send(res);
      }

      responder.success(200, null);
      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  }

  public async resetPassword(req: Request, res: Response) {
    const { password } = req.body;
    const { token } = req.params;

    if (!password) {
      responder.error(400, 'your password is missing');
      return responder.send(res);
    }

    try {
      const user = await userService.resetPasswordExpires(token);

      if (!user) {
        responder.error(
          400,
          'your token has expired. please attempt to reset your password again!',
        );
        return responder.send(res);
      }

      const hashedPassword = auth.hashPassword(password);
      const updatedUser = await userService.updatePassword(
        user._id,
        hashedPassword,
      );

      if (updatedUser) {
        const message = templates.passwordChanged();
        await mailer.send(user.email, message);
        responder.success(200, 'password changed');
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  }

  public async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      responder.error(400, 'your email is missing');
      return responder.send(res);
    }

    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        responder.error(400, 'no user found for this email address');
        return responder.send(res);
      }

      const resetToken = await auth.createResetToken();
      const updatedUser = await userService.forgotPassword(
        user._id,
        resetToken,
        config.password.tokenExpire,
      );

      if (updatedUser) {
        const message = templates.resetPassword(req, resetToken);
        await mailer.send(email, message);
        responder.success(
          200,
          'kindly check your email for more instructions!',
        );
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  }

  public async logout(req: Request, res: Response) {
    cookie.remove(res);
    responder.success(200, 'you are logged out');
    return responder.send(res);
  }

  public async getToken(req: Request, res: Response) {
    const refreshTokenHeader = req.cookies.refresh_token;
    if (!refreshTokenHeader) {
      responder.error(401, 'invalid refresh token not found in server cookie ');
      return responder.send(res);
    }

    try {
      const payload: any = await auth.verifyRefreshToken(refreshTokenHeader);

      console.log('payload in auth', payload);

      if (!payload) {
        responder.error(401, 'invalid payload');
        return responder.send(res);
      }

      const user = await userService.findById(payload.id);

      if (!user) {
        responder.error(400, 'user not found');
        return responder.send(res);
      }

      if (user.refresh_token !== payload.refresh_token) {
        responder.error(400, 'Invalid refresh token and not equal');
        return responder.send(res);
      }

      const updatedUser = await userService.saveRefreshToken(
        user._id,
        uuidv4(),
      );
      const jwt = auth.createToken(updatedUser);
      const refreshToken = auth.createRefreshToken(updatedUser);

      const data = {
        token: `Bearer ${jwt}`,
        // refresh_token: refreshToken,
      };

      cookie.set(res, refreshToken);
      responder.success(200, null, data);
      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  }
}

export default AuthController;
