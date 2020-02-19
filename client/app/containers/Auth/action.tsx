import { SET_AUTH_DATA, UNSET_AUTH_DATA } from './constants';

export const setAuthData = authData => {
  return {
    type: SET_AUTH_DATA,
    payload: authData,
  };
};

export const unsetAuthData = () => {
  return {
    type: UNSET_AUTH_DATA,
  };
};
