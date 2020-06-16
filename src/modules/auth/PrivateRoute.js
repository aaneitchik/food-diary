import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import rootStore from '../../root.store';
import { ROUTE_LOGIN } from '../../routes';
import { AUTH_STATUSES } from './auth.store';

// No need to specify proptypes, they're from react-router
/* eslint-disable react/jsx-props-no-spreading */
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authStore } = React.useContext(rootStore);

  // authStatus should be defined on the top level of the render, otherwise
  // mobx won't track changes if it's used only in Route's render method
  const { authStatus } = authStore;

  return (
    <Route
      {...rest}
      render={props => {
        if (authStatus === AUTH_STATUSES.PENDING) {
          // TODO: Add some loading indicator while authenticating
          return null;
        }

        if (authStatus === AUTH_STATUSES.LOGGED_IN) {
          return <Component {...props} />;
        }

        if (authStatus === AUTH_STATUSES.LOGGED_OUT) {
          return (
            <Redirect
              to={{ pathname: ROUTE_LOGIN, state: { from: props.location } }}
            />
          );
        }

        return null;
      }}
    />
  );
};
// eslint-enable react/jsx-props-spreading

export default withRouter(observer(PrivateRoute));
