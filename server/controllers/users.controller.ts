import { Request, Response } from 'express';
import { Container } from 'typedi';

import UsersService from '../services/users.service';
import Responder from '../helpers/responder';
import * as auth from '../utils/auth';

const usersServiceInstance = Container.get(UsersService);
const responderInstance = Container.get(Responder);

class NotesController {
  public async signin(req: Request, res: Response) {
    try {
      responderInstance.setSuccess(200, 'found user');

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

    const user = await usersServiceInstance.findByEmail(email);

    if (user) {
      responderInstance.setError(400, 'That email address is already in use.');
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

    try {
      const createdUser = await usersServiceInstance.register(newUser);
      const jwt = auth.createToken(createdUser);

      const data = {
        token: `Bearer ${jwt}`,
        user: createdUser,
      };

      responderInstance.setSuccess(
        201,
        'user has been added successfully',
        data,
      );
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error.message);
      return responderInstance.send(res);
    }
  }
}

export default NotesController;
