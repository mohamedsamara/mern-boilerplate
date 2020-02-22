import React, { useEffect, useReducer } from 'react';

import useFetch from 'use-http';
// import { message } from 'antd';

import UserContext from './context';
import { userReducer, initialState } from './reducer';
import { setUserData, unsetUserData } from './action';

// import { useAuth } from '../Auth';

const UserProvider = ({ children }) => {
  const { request, response } = useFetch('/api');
  const [state, dispatch] = useReducer(userReducer, initialState);

  // const { state: auth } = useAuth();
  // console.log('state', auth);

  useEffect(() => {
    if (state.user) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const result = await request.get('/user');

    if (response.ok) {
      console.log('result', result);
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
