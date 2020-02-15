import React from 'react';

import { initialState } from './reducer';

const AuthContext = React.createContext(initialState);

export default AuthContext;
