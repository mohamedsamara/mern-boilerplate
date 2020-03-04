import { Container } from 'typedi';

import UserModel from '../models/user.model';
import { IUser, IUserInput } from '../types/user.types';

const userModel = Container.get(UserModel);
const user = userModel.get();

class UserService {
  public async register(newUser: IUserInput): Promise<IUser> {
    try {
      return user.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  public async saveRefreshToken(id: any, refreshToken: string): Promise<IUser> {
    try {
      const query = { _id: id };
      const update = { refresh_token: refreshToken };
      const options = { new: true };

      return await user.findOneAndUpdate(query, update, options);
    } catch (error) {
      throw error;
    }
  }

  public async forgotPassword(id: any, resetToken: any, expires: any) {
    try {
      const query = { _id: id };
      const update = {
        reset_password_token: resetToken,
        reset_password_expires: expires,
      };
      const options = { new: true };

      return await user.findByIdAndUpdate(query, update, options);
    } catch (error) {
      throw error;
    }
  }

  public async resetPasswordExpires(token: string) {
    try {
      return await user.findOne({
        reset_password_token: token,
        reset_password_expires: { $gt: Date.now() },
      });
    } catch (error) {
      throw error;
    }
  }

  public async findUserInitial(id: any) {
    try {
      return await user.findById(id).select('profile.first_name');
    } catch (error) {
      throw error;
    }
  }

  public async findUser(id: any) {
    try {
      return await user.findById(id, [
        '-refresh_token',
        '-password',
        '-reset_password_token',
        '-reset_password_expires',
        '-meta',
        '-__v',
      ]);
    } catch (error) {
      throw error;
    }
  }

  public async findByEmail(email: string) {
    try {
      return await user.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: any) {
    try {
      return await user.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async updatePassword(id: any, password: any) {
    try {
      const userToUpdate = await user.findById(id);

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
      const userToUpdate = await user.findById(id);

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
      const userToDelete = await user.findById(id);

      if (userToDelete) {
        const deletedUser = await user.deleteOne({
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
