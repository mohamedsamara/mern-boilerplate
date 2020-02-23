import React from 'react';

import { Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/Auth';

const PrivateRoute = ({ children }) => {
  const { state } = useAuth();

  if (!state.authenticated && !state.loading) return <Redirect to="/login" />;

  return children;
};

export default PrivateRoute;
