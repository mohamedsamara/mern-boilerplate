import { Request, Response } from 'express';
import { Container } from 'typedi';
import * as uuidv4 from 'uuid/v4';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import * as crypto from 'crypto';
import { sign, verify } from 'jsonwebtoken';

import UserService from '../services/user.service';
import MailerService from '../services/mailer.service';
import Responder from '../helpers/responder';
import { IUserInput, IUser } from '../types/user.types';
import * as templates from '../templates';

import config from '../config/keys';

const userService = Container.get(UserService);
const responder = Container.get(Responder);
const mailer = Container.get(MailerService);

class AuthController {
  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        responder.error(400, 'some details are missing');
        return responder.send(res);
      }

      const user = await userService.findByEmail(email);

      if (!user) {
        responder.error(400, 'no user found for this email address');
        return responder.send(res);
      }

      const passwordMatches = this.verifyPassword(password, user.password);

      if (passwordMatches) {
        const updatedUser = await userService.saveRefreshToken(
          user._id,
          uuidv4(),
        );

        const jwt = await this.createAccessToken(updatedUser);
        const refreshToken = await this.createRefreshToken(updatedUser);
        const foundUser = await userService.findUser(user._id);

        const data = {
          token: `Bearer ${jwt}`,
          user: foundUser,
        };

        this.attachUser(req, updatedUser);
        this.setRefreshToken(res, refreshToken);

        responder.success(200, 'you are logged in', data);
      } else {
        responder.error(400, 'wrong password.');
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  };

  public register = async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password || !firstName || !lastName) {
        responder.error(400, 'some details are missing');
        return responder.send(res);
      }

      const user = await userService.findByEmail(email);

      if (user) {
        responder.error(400, 'that email address is already in use');
        return responder.send(res);
      }

      const hashedPassword = await this.hashPassword(password);
      const newUser = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        refreshToken: uuidv4(),
      };

      const createdUser = await userService.register(newUser as IUserInput);

      const jwt = await this.createAccessToken(createdUser);
      const refreshToken = await this.createRefreshToken(createdUser);
      const foundUser = await userService.findUser(createdUser._id);

      if (foundUser) {
        const data = {
          token: `Bearer ${jwt}`,
          user: foundUser,
        };

        this.attachUser(req, createdUser);
        this.setRefreshToken(res, refreshToken);
        const message = templates.signupEmail(newUser);
        await mailer.send(createdUser.email, message);
        responder.success(201, 'You have been registered successfully.', data);
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error.message);
      return responder.send(res);
    }
  };

  public checkExpire = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;

      if (!token) {
        responder.error(
          400,
          'no token in your request. please attempt to click the link from your email again!',
        );
        return responder.send(res);
      }

      const user = await userService.resetPasswordExpires(token);

      if (!user) {
        responder.error(
          400,
          'your token has expired. please attempt to reset your password again!',
        );
      }

      responder.success(200, null);
      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  };

  public resetPassword = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const { token } = req.params;

      if (!password) {
        responder.error(400, 'your password is missing');
        return responder.send(res);
      }

      const user = await userService.resetPasswordExpires(token);

      if (!user) {
        responder.error(
          400,
          'your token has expired. please attempt to reset your password again!',
        );
        return responder.send(res);
      }

      const hashedPassword = await this.hashPassword(password);
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
  };

  public forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        responder.error(400, 'your email is missing');
        return responder.send(res);
      }

      const user = await userService.findByEmail(email);

      if (!user) {
        responder.error(400, 'no user found for this email address');
        return responder.send(res);
      }

      const resetToken = await this.createResetToken();
      const updatedUser = await userService.forgotPassword(
        user._id,
        resetToken,
        config.password.tokenExpire,
      );

      if (updatedUser) {
        const message = templates.resetPassword(req, resetToken);
        const emailSent = await mailer.send(email, message);

        responder.success(
          200,
          emailSent
            ? 'kindly check your email for more instructions!'
            : 'Please try again!',
        );
      }

      return responder.send(res);
    } catch (error) {
      responder.error(400, error);
      return responder.send(res);
    }
  };

  public logout = async (req: Request, res: Response) => {
    this.removeRefreshToken(res);
    responder.success(200, 'you are logged out');
    return responder.send(res);
  };

  public getToken = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.refresh_token;

      if (!token) {
        responder.error(401, 'invalid token');
      }

      let payload: any = null;
      payload = verify(token, config.jwt.refreshTokenSecret);

      const user = await userService.findUser(payload.id);

      if (!user) {
        responder.error(401, 'invalid token');
      }

      const jwt = await this.createAccessToken(user);
      const foundUser = await userService.findUser(user._id);

      const data = {
        token: `Bearer ${jwt}`,
      };

      this.attachUser(req, foundUser);
      responder.success(200, 'you are logged in', data);

      return responder.send(res);
    } catch (error) {
      responder.error(401, 'invalid token');
      return responder.send(res);
    }
  };

  // create access token (short time token)
  public createAccessToken = async (user: IUser) => {
    const { accessTokenSecret, accessTokenLife } = config.jwt;
    const payload = {
      id: user._id,
    };
    return sign(payload, accessTokenSecret, {
      algorithm: 'HS256',
      expiresIn: accessTokenLife,
    });
  };

  // create refresh token (long lived token)
  public createRefreshToken = async (user: IUser) => {
    const { refreshTokenSecret, refreshTokenLife } = config.jwt;

    const payload = {
      id: user._id,
      refreshToken: user.refreshToken,
    };

    return sign(payload, refreshTokenSecret, {
      algorithm: 'HS256',
      expiresIn: refreshTokenLife,
    });
  };

  public setRefreshToken = (res: Response, token: string) => {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      path: '/',
    });
  };

  public removeRefreshToken = (res: Response) => {
    res.cookie('refresh_token', '', {
      httpOnly: true,
      expires: new Date(0),
    });
  };

  public attachUser = (req: any, user: IUser) => {
    req.user = user;
  };

  public hashPassword = (password: string) => {
    const salt = genSaltSync(12);
    return hashSync(password, salt);
  };

  public verifyPassword = async (password: string, hashedPassword: string) => {
    return compareSync(password, hashedPassword);
  };

  public createResetToken = async () => {
    const buffer = await crypto.randomBytes(48);
    return buffer.toString('hex');
  };
}

export default AuthController;
