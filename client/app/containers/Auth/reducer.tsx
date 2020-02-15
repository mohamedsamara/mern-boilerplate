import { SET_AUTH_DATA, UNSET_AUTH_DATA } from './constants';

const initialState = {
  authenticated: false,
  token: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return { ...state, authenticated: true, token: action.payload };
    case UNSET_AUTH_DATA:
      return { ...state, authenticated: false, token: '' };
    default:
      return state;
  }
};

export { authReducer, initialState };
