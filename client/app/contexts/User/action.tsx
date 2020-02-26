import { IUser, UserActionTypes, SetUserData, UnsetUserData } from './types';

export const setUserData = (user: IUser): SetUserData => {
  return {
    type: UserActionTypes.SET_USER_DATA,
    payload: user,
  };
};

export const unsetUserData = (): UnsetUserData => {
  return {
    type: UserActionTypes.UNSET_USER_DATA,
  };
};
