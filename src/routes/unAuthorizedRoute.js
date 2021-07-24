import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UnAuthorizedRouteLayout } from '../components';

const UnAuthorizedRoute = ({
  component: Component,
  loaderCount,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        ) : (
          <UnAuthorizedRouteLayout
            component={Component}
            loaderCount={loaderCount}
            {...props}
          />
        )
      }
    />
  );
};
export default UnAuthorizedRoute;
