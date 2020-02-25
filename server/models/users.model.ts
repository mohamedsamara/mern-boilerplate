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
        website: {
          type: String,
        },
        bio: {
          type: String,
        },
        birthdate: {
          type: String,
        },
        gender: {
          type: String,
        },
      },
      role: {
        type: String,
        enum: ['ROLE_MEMBER', 'ROLE_ADMIN'],
        default: 'ROLE_MEMBER',
      },
      password: {
        type: String,
        required: true,
      },
      refresh_token: {
        type: String,
      },
      resetPasswordToken: { type: String },
      resetPasswordExpires: { type: Date },
      updated: Date,
      created: {
        type: Date,
        default: Date.now,
      },
    });

    this.model = <UserModel>model<IUser>('users', schema);
  }

  public getModel(): UserModel {
    return this.model;
  }
}

export default UsersModel;
