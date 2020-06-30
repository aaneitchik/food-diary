import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import PrivateRoute from './modules/auth/PrivateRoute';
import { ROUTE_LOGIN, ROUTE_HOME } from './routes';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={ROUTE_LOGIN} component={LoginPage} />
        <PrivateRoute path={ROUTE_HOME} component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
