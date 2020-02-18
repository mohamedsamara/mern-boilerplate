import { Container } from 'typedi';

import UsersModel from '../models/users.model';

const usersModelInstance = Container.get(UsersModel);
const usersModel = usersModelInstance.getModel();

class NotesService {
  public async register(newUser: any) {
    try {
      return usersModel.create(newUser, { refresh_token: 0 });
    } catch (error) {
      throw error;
    }
  }

  public async saveRefreshToken(id: any, refreshToken: string) {
    try {
      const userToUpdate = await usersModel.findById(id);

      if (userToUpdate) {
        await userToUpdate.updateOne({ refresh_token: refreshToken });
        return refreshToken;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  public async login(email: string) {
    try {
      await usersModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  public async findByEmail(email: string) {
    try {
      return await usersModel.findOne({ email }, '-refresh_token');
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string) {
    try {
      return await usersModel.findById(id);
    } catch (error) {
      throw error;
    }
  }
}

export default NotesService;
