import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import routes from './routes';

const AppRouter = () => (
  <Switch>
    {routes.map((route, idx) => {
      return <RouteFrom key={idx} {...route} />;
    })}
  </Switch>
);

export default AppRouter;

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
    <Route
      path={route.path}
      exact={route.exact}
      name={route.name}
      render={props => <route.component {...props} />}
    />
  );
};
