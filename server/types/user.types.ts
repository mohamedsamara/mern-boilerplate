import { Document, Model } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  website: string;
  bio: string;
  birthdate: string;
  gender: string;
  role: Role;
  password: string;
  refresh_token: string;
  reset_password_token: string;
  reset_password_expires: Date;
  meta: IMeta;
}

export interface IUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  website: string;
  bio: string;
  birthdate: string;
  gender: string;
  refreshToken: string;
}

enum Role {
  ROLE_MEMBER,
  ROLE_ADMIN,
}

interface IMeta {
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel {}

export type UserModelType = Model<IUser> & IUserModel & IUser;
