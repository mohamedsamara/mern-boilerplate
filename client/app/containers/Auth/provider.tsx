import React, { useEffect, useReducer } from 'react';

import jwtDecode from 'jwt-decode';

import useFetch, { Provider } from 'use-http';
import { message } from 'antd';

import AuthContext from './context';
import { authReducer, initialState } from './reducer';
import { setAuthData, unsetAuthData } from './action';
import Loading from '../../components/Loading';

const AuthProvider = ({ children }) => {
  const { request, response, loading } = useFetch('/api/auth');
  const [state, dispatch] = useReducer(authReducer, initialState);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setAuth(token);
    } else {
      unsetAuth();
    }
  }, []);

  const getToken = async () => {
    const result = await request.post('/refresh-token');

    if (response.ok) {
      setAuth(result.data.token);
    } else {
      unsetAuth();
      message.error(result.message);
      await request.post('/logout');
    }
  };

  const handleToken = () => {
    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // if (exp - exp + 5 < currentTime) {
    if (exp < currentTime) {
      getToken();
    }
  };

  const setAuth = token => {
    localStorage.setItem('token', token);
    // localStorage.setItem('refresh_token', authData.refresh_token);
    dispatch(setAuthData(token));
  };

  const unsetAuth = () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('refresh_token');
    dispatch(unsetAuthData());
  };

  const options = {
    headers: {
      Authorization: token,
    },
    interceptors: {
      request: async (options, url) => {
        if (url !== '/api/auth') {
          if (token) {
            handleToken();
          }
        }
        return options;
      },
      response: response => {
        return response;
      },
    },
  };

  return (
    <AuthContext.Provider value={{ state, setAuth, unsetAuth }}>
      <Loading loading={loading} fullscreen />
      <Provider options={options}>{children}</Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
