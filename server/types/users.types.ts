import { Document, Model } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  profile: IUserProfile;
  password: string;
  refresh_token: string;
  reset_password_token: string;
  reset_password_expires: number;
}

interface IUserProfile {
  firstName: string;
  lastName: string;
}

export interface IUserModel {}

export type UserModel = Model<IUser> & IUserModel & IUser;
