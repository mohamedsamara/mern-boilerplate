import { Schema, model } from 'mongoose';

import { IUser, UserModel } from '../types/users.types';

class UsersModel {
  private model: UserModel;

  constructor() {
    this.initSchema();
  }

  public initSchema() {
    const schema = new Schema({
      email: {
        type: String,
        required: true,
      },
      profile: {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
      },
      password: {
        type: String,
        required: true,
      },
      resetPasswordToken: { type: String },
      resetPasswordExpires: { type: Date },
    });

    this.model = <UserModel>model<IUser>('users', schema);
  }

  public getModel(): UserModel {
    return this.model;
  }
}

export default UsersModel;
