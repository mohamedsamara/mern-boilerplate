import { Container } from 'typedi';

import UsersModel from '../models/users.model';

const usersModelInstance = Container.get(UsersModel);
const usersModel = usersModelInstance.getModel();

class NotesService {
  public async register(newUser: any) {
    try {
      return usersModel.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  public async saveRefreshToken(id: any, refreshToken: string) {
    try {
      const query = { _id: id };
      const update = { refresh_token: refreshToken };
      const options = { new: true };

      return await usersModel.findOneAndUpdate(query, update, options);
    } catch (error) {
      throw error;
    }
  }

  public async findByRefreshToken(refreshToken: any) {
    try {
      return await usersModel.findOne({ refresh_token: refreshToken });
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

  public async findById(id: any) {
    try {
      return await usersModel.findById(id);
    } catch (error) {
      throw error;
    }
  }
}

export default NotesService;
