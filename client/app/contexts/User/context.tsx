/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import React from 'react';

import { initialState } from './reducer';
import { IUserContextState } from './types';

const defaultUserContextState: IUserContextState = {
  state: initialState,
  loading: true,
  setUser: (): void => {},
  unsetUser: (): void => {},
};

const UserContext = React.createContext<IUserContextState>(
  defaultUserContextState,
);

export default UserContext;
