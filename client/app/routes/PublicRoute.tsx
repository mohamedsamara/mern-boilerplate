import React from 'react';

import { Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

const PublicRoute = route => {
  return route.protected ? (
    <ProtectedRoute>
      <Route
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={props => <route.component {...props} />}
      />
    </ProtectedRoute>
  ) : (
    <Route
      path={route.path}
      exact={route.exact}
      name={route.name}
      render={props => <route.component {...props} />}
    />
  );
};

export default PublicRoute;
