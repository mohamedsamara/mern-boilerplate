import React from 'react';

import { Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/Auth';

const PrivateRoute = ({ children }) => {
  const {
    state: { authenticated, loading },
  } = useAuth();

  if (!authenticated && !loading) return <Redirect to="/login" />;

  return children;
};

export default PrivateRoute;
