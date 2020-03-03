import { Request, Response } from 'express';
import { Container } from 'typedi';
import * as uuidv4 from 'uuid/v4';
import UsersService from '../services/users.service';
import MailerService from '../services/mailer.service';
import Responder from '../helpers/responder';
import * as auth from '../utils/auth';
import * as cookie from '../utils/cookie';
import * as templates from '../utils/email.templates';

const usersServiceInstance = Container.get(UsersService);
const responderInstance = Container.get(Responder);
const mailerInstance = Container.get(MailerService);

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

      if (foundUser) {
        const data = {
          token: `Bearer ${jwt}`,
          // refresh_token: refreshToken,
          user: foundUser,
        };

        cookie.setCookie(res, refreshToken);

        const message = templates.signupEmail(newUser.profile);
        await mailerInstance.send(createdUser.email, message);

        responderInstance.setSuccess(
          201,
          'You have been registered successfully.',
          data,
        );
      }

      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error.message);
      return responderInstance.send(res);
    }
  }

  public async resetPassword(req: Request, res: Response) {
    const { password } = req.body;
    const { token } = req.params;

    if (!password) {
      responderInstance.setError(400, 'Your password is missing');
      return responderInstance.send(res);
    }

    try {
      const user = await usersServiceInstance.resetPasswordExpires(token);

      if (!user) {
        responderInstance.setError(
          400,
          'Your token has expired. Please attempt to reset your password again.',
        );
        return responderInstance.send(res);
      }

      const hashedPassword = auth.hashPassword(password);
      const updatedUser = await usersServiceInstance.updatePassword(
        user._id,
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

      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }

  public async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      responderInstance.setError(400, 'Your email is missing');
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

      const resetToken = await auth.createResetToken();

      const updatedUser = await usersServiceInstance.forgotPassword(
        user._id,
        resetToken,
        Date.now() + 3600000,
      );

      if (updatedUser) {
        const message = templates.resetPassword(req, resetToken);
        await mailerInstance.send(email, message);

        responderInstance.setSuccess(
          200,
          'Kindly check your email, You will be receiving a link to reset your password',
        );
      }

      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }

  public async checkExpire(req: Request, res: Response) {
    const { token } = req.params;

    if (!token) {
      responderInstance.setError(
        400,
        'Something went wrong with reseting your password!',
      );
      return responderInstance.send(res);
    }

    try {
      const user = await usersServiceInstance.resetPasswordExpires(token);

      if (!user) {
        responderInstance.setError(
          400,
          'Your token has expired. Please attempt to reset your password again.',
        );
        return responderInstance.send(res);
      }

      responderInstance.setSuccess(200, null);

      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
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
      responderInstance.setError(400, 'Invalid refresh token');
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
      //   const foundUser = await usersServiceInstance.findUser(user._id);

      const data = {
        token: `Bearer ${jwt}`,
        // refresh_token: refreshToken,
        // user: foundUser,
      };

      cookie.setCookie(res, refreshToken);
      responderInstance.setSuccess(200, null, data);
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }
}

export default AuthController;
