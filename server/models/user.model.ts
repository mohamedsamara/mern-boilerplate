import { Schema, model } from 'mongoose';

import { IUser, UserModelType } from '../types/user.types';

class UserModel {
  private model: UserModelType;

  constructor() {
    this.init();
  }

  public init() {
    const schema = new Schema({
      email: {
        type: String,
        required: true,
      },
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
      role: {
        type: String,
        enum: ['ROLE_MEMBER', 'ROLE_ADMIN'],
        default: 'ROLE_MEMBER',
      },
      password: {
        type: String,
        required: true,
      },
      refreshToken: {
        type: String,
      },
      resetPasswordToken: {
        type: String,
      },
      resetPasswordExpires: {
        type: Date,
      },
      meta: {
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        updatedAt: {
          type: Date,
        },
      },
    });

    this.model = <UserModelType>model<IUser>('User', schema);
  }

  public get(): UserModelType {
    return this.model;
  }
}

export default UserModel;
