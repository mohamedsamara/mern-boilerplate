import { Document, Model } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  profile: IUserProfile;
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
  profile: IProfileInput;
  refresh_token: string;
}

interface IUserProfile {
  first_name: string;
  last_name: string;
  website: string;
  bio: string;
  birthdate: string;
  gender: string;
}

interface IProfileInput {
  first_name: string;
  last_name: string;
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
