import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import rootStore from '../../root.store';
import { ROUTE_LOGIN } from '../../routes';

// No need to specify proptypes, they're from react-router
/* eslint-disable react/jsx-props-no-spreading */
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authStore } = React.useContext(rootStore);

  return (
    <Route
      {...rest}
      render={props =>
        authStore.user.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: ROUTE_LOGIN, state: { from: props.location } }}
          />
        )
      }
    />
  );
};
// eslint-enable react/jsx-props-spreading

export default withRouter(observer(PrivateRoute));
