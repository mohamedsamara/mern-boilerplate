import { SET_AUTH_DATA, UNSET_AUTH_DATA } from './constants';

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

// export const getToken = () => {
//   const token = localStorage.getItem('token');
//   return token;
// };
