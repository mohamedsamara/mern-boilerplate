import React, { useEffect, useReducer } from 'react';

import useFetch, { Provider } from 'use-http';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import { authReducer, initialState } from './reducer';
import { setAuthData } from './action';
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
  const history = useHistory();

  useEffect(() => {
    const payload = {
      authenticated: !!token,
      token,
    };

    if (token) {
      dispatch(setAuthData(payload));
    } else {
      dispatch(setAuthData(payload));
    }
  }, []);

  const setAuth = token => {
    setToken(token);

    const payload = {
      authenticated: !!token,
      token,
    };

    dispatch(setAuthData(payload));
  };

  const handleToken = async () => {
    try {
      let newToken = null;

      if (token) {
        const { exp } = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (exp < currentTime) {
          newToken = await refreshToken();
        } else {
          newToken = token;
        }
      }
      return newToken;
    } catch (error) {
      message.error('Something went wrong!');
    }
  };

  const refreshToken = async () => {
    const result = await request.post('/refresh-token');
    let newToken = null;
    if (response.ok) {
      setAuth(result.data.token);
      newToken = result.data.token;
    } else {
      logout();
      message.error(result.message);
    }

    return newToken;
  };

  const logout = async () => {
    const result = await request.post('/logout');

    if (response.ok) {
      setAuth(null);
      message.success(result.message);
    }
  };

  const login = async values => {
    try {
      const result = await request.post('/login', values);

      if (response.ok) {
        setAuth(result.data.token);
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error(error);
    }
  };

  const signup = async values => {
    try {
      const result = await request.post('/register', values);
      if (response.ok) {
        setAuth(result.data.token);
        history.push('/dashboard');
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error(error);
    }
  };

  const fetchOptions = {
    headers: {
      authorization: token,
    },
    interceptors: {
      request: async options => {
        const newToken = await handleToken();
        options.headers.authorization = newToken;

        return options;
      },
      response: response => {
        return response;
      },
    },
  };

  return (
    <AuthContext.Provider value={{ state, loading, login, signup, logout }}>
      <Loading loading={loading} fullscreen />
      <Provider options={fetchOptions}>{children}</Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
