import React, { useReducer } from 'react';

import useFetch from 'use-http';

import UserContext from './context';
import { userReducer, initialState } from './reducer';
import { setUserData, unsetUserData } from './action';
import { UserState, UserActions, UserContextProviderProps } from './types';

const UserProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<UserState, UserActions>>(
    userReducer,
    initialState,
  );
  const { request, response } = useFetch('/api', globalOptions => {
    return {
      ...globalOptions,
    };
  });

  const fetchUser = async () => {
    const result = await request.get(`/user`);
    if (response.ok && result.data.user) {
      setUser(result.data.user);
    }
  };

  const setUser = user => {
    dispatch(setUserData(user));
  };

  const unsetUser = () => {
    dispatch(unsetUserData());
  };

  return (
    <UserContext.Provider value={{ state, setUser, unsetUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
