import { ReactNode } from 'react';

export interface IUser {
  _id: string;
  email: string;
  role: string;
  created: string;
  __v?: number;
  firstName: string;
  lastName: string;
  website: string;
  bio: string;
  gender: string;
  birthdate: string;
}

export interface UserState {
  user: IUser;
  loading: boolean;
}

export interface IUserContextState {
  state: UserState;
  loading?: boolean;
  setUser: (id: string) => void;
  unsetUser: () => void;
}

export interface UserContextProviderProps {
  children?: ReactNode;
}

export interface SetUserData {
  type: UserActionTypes.SET_USER_DATA;
  payload: IUser;
}

export interface UnsetUserData {
  type: UserActionTypes.UNSET_USER_DATA;
}

export type UserActions = SetUserData | UnsetUserData;

export enum UserActionTypes {
  SET_USER_DATA = 'SET_USER_DATA',
  UNSET_USER_DATA = 'UNSET_USER_DATA',
}
