import React from 'react';

import { initialState } from './reducer';

const UserContext = React.createContext(initialState);

export default UserContext;
