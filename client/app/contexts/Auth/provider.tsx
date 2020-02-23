import React, { useEffect, useReducer } from 'react';

import jwtDecode from 'jwt-decode';

import useFetch, { Provider } from 'use-http';
import { message } from 'antd';

import AuthContext from './context';
import { authReducer, initialState } from './reducer';
import { setAuthData, unsetAuthData } from './action';

import Loading from '../../components/Loading';
import useLocalStorage from '../../hooks/useLocalStorage';

const AuthProvider = ({ children }) => {
  const { request, response, loading } = useFetch('/api/auth');
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [token, setToken] = useLocalStorage('token', null);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    if (token) {
      setAuth(token);
    } else {
      unsetAuth();
    }
  };

  const setAuth = token => {
    // localStorage.setItem('refresh_token', authData.refresh_token);
    setToken(token);
    dispatch(setAuthData(token));
  };

  const unsetAuth = () => {
    // localStorage.removeItem('refresh_token');
    setToken(null);
    dispatch(unsetAuthData());
  };

  const getToken = async () => {
    const result = await request.post('/refresh-token');

    if (response.ok) {
      setAuth(result.data.token);
    } else {
      logout();
      message.error(result.message);
    }
  };

  const logout = async () => {
    const result = await request.post('/logout');
    if (response.ok) {
      unsetAuth();
      message.success(result.message);
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

  const options = {
    headers: {
      Authorization: token,
    },
    interceptors: {
      request: (options, url, path, route) => {
        if (token) {
          if (url !== '/api/auth' && route !== '/user/initial') {
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
    <AuthContext.Provider value={{ state, setAuth, unsetAuth, loading }}>
      <Loading loading={loading} auth fullscreen />
      <Provider options={options}>{children}</Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
