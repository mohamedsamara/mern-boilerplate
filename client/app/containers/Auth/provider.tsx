import React, { useEffect, useReducer } from 'react';

import jwtDecode from 'jwt-decode';

import useFetch, { Provider } from 'use-http';

import AuthContext from './context';
import { authReducer, initialState } from './reducer';

import { setAuthData, unsetAuthData } from './action';

import Loading from '../../components/Loading';

const AuthProvider = ({ children }) => {
  const { request, response, loading } = useFetch('/api/auth');
  const [state, dispatch] = useReducer(authReducer, initialState);
  const token = localStorage.getItem('token');
  //   const refreshToken = localStorage.getItem('refresh_token');

  useEffect(() => {
    if (token) {
      setAuth(token);
      handleToken();
      //   handleRefreshToken();
    } else {
      //   unsetAuth();
      dispatch(unsetAuthData());
    }
  }, []);

  const getToken = async () => {
    const result = await request.post('/refresh-token');
    if (response.ok) {
      console.log('result', result);

      //   setAuth(result.data.token);
      //   history.push('/dashboard');
      //   message.success(result.message);
    } else {
      //   message.error(result.message);
    }
  };

  const handleToken = () => {
    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    console.log('exp', exp);
    console.log('currentTime', currentTime);

    if (exp - exp + 5 < currentTime) {
      // if (exp < currentTime) {
      console.log('expired');

      getToken();

      //   unsetAuth();
    }
  };

  //   const handleRefreshToken = () => {
  //     const { exp } = jwtDecode(refreshToken);
  //     const currentTime = Date.now() / 1000;

  //     console.log('exp', exp);
  //     console.log('currentTime', currentTime);

  //     // if (exp - exp + 5 < currentTime) {
  //     if (exp < currentTime) {
  //       console.log('refresh_expired');

  //       //   unsetAuth();
  //     }
  //   };

  const setAuth = authData => {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('refresh_token', authData.refresh_token);
    dispatch(setAuthData(authData));
  };

  const unsetAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    dispatch(unsetAuthData());
  };

  const options = {
    headers: {
      Authorization: token,
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
