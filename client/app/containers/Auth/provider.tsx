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
    handleToken();
  }, [state.authenticated]);

  const handleToken = () => {
    if (token) {
      const { exp } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      setAuth(token);

      if (exp < currentTime) {
        localStorage.removeItem('token');
        unsetAuth();
      }
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
