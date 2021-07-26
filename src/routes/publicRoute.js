import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PublicRouteLayout } from '../components';

const PublicRoute = ({
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
          <PublicRouteLayout
            component={Component}
            loaderCount={loaderCount}
            {...props}
          />
        )
      }
    />
  );
};
export default PublicRoute;
