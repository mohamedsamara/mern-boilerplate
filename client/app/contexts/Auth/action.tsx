import { AuthActionTypes, SetAuthData } from './types';

export const setAuthData = (payload): SetAuthData => {
  return {
    type: AuthActionTypes.SET_AUTH_DATA,
    payload,
  };
};
