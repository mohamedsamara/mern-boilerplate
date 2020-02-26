import React, { useEffect, useReducer } from 'react';

import useFetch from 'use-http';

import UserContext from './context';
import { userReducer, initialState } from './reducer';
import { setUserData, unsetUserData } from './action';
import { UserState, UserActions, UserContextProviderProps } from './types';

import { useAuth } from '../Auth';

const UserProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<UserState, UserActions>>(
    userReducer,
    initialState,
  );
  const { request, response } = useFetch('api', globalOptions => {
    return {
      ...globalOptions,
    };
  });

  const { state: auth, getUserId } = useAuth();

  useEffect(() => {
    if (!auth.loading && auth.authenticated) {
      fetchUser();
    } else {
      unsetUser();
    }
  }, [auth.authenticated]);

  const fetchUser = async () => {
    const id = getUserId();
    const result = await request.get(`/user/initial/${id}`);

    if (response.ok) {
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
    <UserContext.Provider value={{ state, setUser, unsetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
