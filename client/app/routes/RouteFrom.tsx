import React from 'react';

import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';

const RouteFrom = route => {
  const renderPrivateRoute = () => {
    return (
      route.private && (
        <PrivateRoute>
          <Route
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={props => <route.component {...props} />}
          />
        </PrivateRoute>
      )
    );
  };

  const renderProtectedRoute = () => {
    return (
      route.protected && (
        <ProtectedRoute>
          <Route
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={props => <route.component {...props} />}
          />
        </ProtectedRoute>
      )
    );
  };

  const renderRoute = () => {
    return (
      !route.private &&
      !route.protected && (
        <Route
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={props => <route.component {...props} />}
        />
      )
    );
  };

  return (
    <>
      {renderPrivateRoute()}
      {renderProtectedRoute()}
      {renderRoute()}
    </>
  );
};

export default RouteFrom;
