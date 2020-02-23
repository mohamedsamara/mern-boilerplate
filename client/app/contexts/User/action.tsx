import { SET_USER_DATA, UNSET_USER_DATA } from './constants';

export const setUserData = user => {
  return {
    type: SET_USER_DATA,
    payload: user,
  };
};

export const unsetUserData = () => {
  return {
    type: UNSET_USER_DATA,
  };
};
