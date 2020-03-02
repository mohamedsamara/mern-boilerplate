import { Container } from 'typedi';

import UsersModel from '../models/users.model';

const usersModelInstance = Container.get(UsersModel);
const usersModel = usersModelInstance.getModel();

class UserService {
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

  public async forgotPassword(id: any, resetToken: any, expires: any) {
    try {
      const query = { _id: id };
      const update = {
        resetPasswordToken: resetToken,
        resetPasswordExpires: expires,
      };
      const options = { new: true };

      return await usersModel.findByIdAndUpdate(query, update, options);
    } catch (error) {
      throw error;
    }
  }

  public async resetPasswordExpires(token: string) {
    try {
      return await usersModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
    } catch (error) {
      throw error;
    }
  }

  public async findUserInitial(id: any) {
    try {
      return await usersModel.findById(id).select('profile.firstName');
    } catch (error) {
      throw error;
    }
  }

  public async findUser(id: any) {
    try {
      return await usersModel.findById(id, ['-refresh_token', '-password']);
    } catch (error) {
      throw error;
    }
  }

  public async findByEmail(email: string) {
    try {
      return await usersModel.findOne({ email });
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

  public async updatePassword(id: any, password: any) {
    try {
      const userToUpdate = await usersModel.findById(id);

      if (userToUpdate) {
        return await userToUpdate.updateOne({ password });
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(id: any, newProfile: any) {
    try {
      const userToUpdate = await usersModel.findById(id);

      if (userToUpdate) {
        await userToUpdate.updateOne({ profile: newProfile });
        return newProfile;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(id: any) {
    try {
      const userToDelete = await usersModel.findById(id);

      if (userToDelete) {
        const deletedUser = await usersModel.deleteOne({
          _id: id,
        });

        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
