import React, { useEffect, useReducer, useState } from 'react';

import jwtDecode from 'jwt-decode';

import useFetch, { Provider } from 'use-http';
import { message } from 'antd';

import AuthContext from './context';
import { authReducer, initialState } from './reducer';
import { setAuthData, unsetAuthData } from './action';
import { AuthState, AuthActions, AuthContextProviderProps } from './types';

import Loading from '../../components/Loading';
import useLocalStorage from '../../hooks/useLocalStorage';

const AuthProvider: React.FC<AuthContextProviderProps> = ({
  children,
}): JSX.Element => {
  const { request, response, loading } = useFetch('/api/auth');
  const [state, dispatch] = useReducer<React.Reducer<AuthState, AuthActions>>(
    authReducer,
    initialState,
  );
  const [token, setToken] = useLocalStorage('token', null);
  const [calls, setCalls] = useState(0);

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

  const getUserId = () => {
    const { id } = jwtDecode(token);
    return id;
  };

  const refreshToken = async () => {
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
    console.log('has ever handled');

    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // if (exp - exp + 5 < currentTime) {
    if (exp < currentTime) {
      refreshToken();
    }
  };

  const handleLogout = () => {
    // making sure that we are calling logout only one time if reponse code is 401
    if (calls === 1) {
      logout();
    }
  };

  const fetchOptions = {
    headers: {
      Authorization: token,
    },
    interceptors: {
      request: (options, url, path, route) => {
        if (token) {
          if (url !== '/api/auth' && route.search('user/initial') !== -1) {
            handleToken();
          }
        }
        setCalls(prevState => prevState + 1);
        return options;
      },
      response: response => {
        if (response.status === 401) {
          handleLogout();
        }

        setTimeout(() => {
          setCalls(0);
        }, 3000);

        return response;
      },
    },
  };

  return (
    <AuthContext.Provider
      value={{ state, setAuth, unsetAuth, loading, getUserId }}
    >
      <Loading loading={loading} fullscreen />
      <Provider options={fetchOptions}>{children}</Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
