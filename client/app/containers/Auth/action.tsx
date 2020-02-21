import { SET_AUTH_DATA, UNSET_AUTH_DATA, SET_USER_DATA } from './constants';

export const setAuthData = token => {
  return {
    type: SET_AUTH_DATA,
    payload: token,
  };
};

export const unsetAuthData = () => {
  return {
    type: UNSET_AUTH_DATA,
  };
};

export const setUserData = user => {
  return {
    type: SET_USER_DATA,
    payload: user,
  };
};
