/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { initialState } from './reducer';
import { IAuthContextState } from './types';

const defaultAuthContextState: IAuthContextState = {
  state: initialState,
  loading: true,
  setAuth: (): void => {},
  unsetAuth: (): void => {},
  getUserId: (): void => {},
};

const AuthContext = React.createContext<IAuthContextState>(
  defaultAuthContextState,
);

export default AuthContext;
