import { SET_AUTH_DATA, UNSET_AUTH_DATA } from './constants';

const initialState = {
  authenticated: false,
  loading: true,
  token: null,
  refresh_token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        authenticated: true,
        loading: false,
        token: action.payload.token,
        refresh_token: action.payload.refresh_token,
      };
    case UNSET_AUTH_DATA:
      return {
        ...state,
        authenticated: false,
        loading: false,
        token: null,
        refresh_token: null,
      };
    default:
      return state;
  }
};

export { authReducer, initialState };
