import React from 'react';

import { Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/Auth';

const ProtectedRoute = ({ children }) => {
  const { state } = useAuth();

  if (state.authenticated) return <Redirect to="/dashboard" />;

  return children;
};

export default ProtectedRoute;
