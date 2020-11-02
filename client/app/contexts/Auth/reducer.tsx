import { AuthState, AuthActionTypes, AuthActions } from './types';

const initialState: AuthState = {
  authenticated: false,
  loading: true,
  token: null,
};

const authReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH_DATA:
      return {
        ...state,
        authenticated: action.payload.authenticated,
        loading: false,
        token: action.payload.token,
      };

    default:
      return state;
  }
};

export { authReducer, initialState };
