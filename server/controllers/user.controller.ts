import { Request, Response } from 'express';
import { Container } from 'typedi';

import UsersService from '../services/users.service';
import Responder from '../helpers/responder';
// import * as auth from '../utils/auth';

const usersServiceInstance = Container.get(UsersService);
const responderInstance = Container.get(Responder);

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

  public async updateUser(req: Request, res: Response) {
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

      // const foundUser = await usersServiceInstance.findUser(id);
      const data = {
        user: 'updated',
        Id: id,
      };

      responderInstance.setSuccess(200, 'User data fetched successfully', data);
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }
}

export default User;
