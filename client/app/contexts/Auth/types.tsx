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
  setAuth: (id: string) => void;
  unsetAuth: () => void;
  getUserId: () => void;
}

export interface AuthContextProviderProps {
  children?: ReactNode;
}

export interface SetAuthData {
  type: AuthActionTypes.SET_AUTH_DATA;
  payload: string;
}

export interface UnsetAuthData {
  type: AuthActionTypes.UNSET_AUTH_DATA;
}

export type AuthActions = SetAuthData | UnsetAuthData;

export enum AuthActionTypes {
  SET_AUTH_DATA = 'SET_AUTH_DATA',
  UNSET_AUTH_DATA = 'UNSET_AUTH_DATA',
}
