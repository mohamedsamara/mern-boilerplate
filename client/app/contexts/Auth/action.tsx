import { AuthActionTypes, SetAuthData, UnsetAuthData } from './types';

export const setAuthData = (token: string): SetAuthData => {
  return {
    type: AuthActionTypes.SET_AUTH_DATA,
    payload: token,
  };
};

export const unsetAuthData = (): UnsetAuthData => {
  return {
    type: AuthActionTypes.UNSET_AUTH_DATA,
  };
};
