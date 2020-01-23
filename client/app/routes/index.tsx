import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Dashboard from '../components/Dashboard';
import Homepage from '../components/Homepage';
import Login from '../components/Login';

const AppRouter = () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route path="/login" component={Login} />
    <PrivateRoute>
      <Route path="/dashboard" component={Dashboard} />
    </PrivateRoute>
  </Switch>
);

export default AppRouter;
