import React from 'react';

import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const RouteFrom = route => {
  return route.private ? (
    <PrivateRoute>
      <Route
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={props => <route.component {...props} />}
      />
    </PrivateRoute>
  ) : (
    <PublicRoute {...route} />
  );
};

export default RouteFrom;
