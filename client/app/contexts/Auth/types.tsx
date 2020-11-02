import { ReactNode } from 'react';

export interface AuthState {
  authenticated: boolean;
  loading: boolean;
  token: string | null;
}

// Uncomment below if you want to pass dispatch through Auth Provider

// import { Dispatch } from 'react';
// export type AuthDispatch = Dispatch<AuthActions>;
// dispatch: AuthDispatch;

export interface IAuthContextState {
  state: AuthState;
  loading?: boolean;
  login: (values) => void;
  signup: (values) => void;
  logout: () => void;
}

export interface AuthContextProviderProps {
  children?: ReactNode;
}

export interface SetAuthData {
  type: AuthActionTypes.SET_AUTH_DATA;
  payload: {
    authenticated: boolean;
    token: string;
  };
}

export type AuthActions = SetAuthData;

export enum AuthActionTypes {
  SET_AUTH_DATA = 'SET_AUTH_DATA',
}
