import React from 'react';
import AuthContext from './context';

const Auth = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default Auth;
