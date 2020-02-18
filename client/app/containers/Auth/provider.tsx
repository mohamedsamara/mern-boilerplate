import React, { useEffect, useReducer } from 'react';

import jwtDecode from 'jwt-decode';
import { Provider } from 'use-http';

import AuthContext from './context';
import { authReducer, initialState } from './reducer';

import { setAuthData, unsetAuthData } from './action';

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setAuth(token);
      handleToken();
    } else {
      unsetAuth();
    }
  }, []);

  const handleToken = () => {
    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    console.log('exp', exp);
    console.log('currentTime', currentTime);

    if (exp < currentTime) {
      console.log('expired');

      unsetAuth();
    }
  };

  const setAuth = token => {
    localStorage.setItem('token', token);
    dispatch(setAuthData(token));
  };

  const unsetAuth = () => {
    localStorage.removeItem('token');
    dispatch(unsetAuthData());
  };

  const options = {
    headers: {
      Authorization: token,
    },
  };

  return (
    <AuthContext.Provider value={{ state, setAuth, unsetAuth }}>
      <Provider options={options}>{children}</Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
