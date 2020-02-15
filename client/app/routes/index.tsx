import React from 'react';
import { Switch } from 'react-router-dom';

import RouteFrom from './RouteFrom';
import routes from './routes';

const AppRouter = () => (
  <Switch>
    {routes.map((route, idx) => {
      return <RouteFrom key={idx} {...route} />;
    })}
  </Switch>
);

export default AppRouter;
