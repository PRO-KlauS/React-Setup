import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AdminLayout } from '../components';

const AdminRoute = ({
  component: Component,
  loaderCount,
  isAuthenticated,
  isAdmin,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAdmin ? (
          <AdminLayout
            component={Component}
            loaderCount={loaderCount}
            {...props}
          />
        ) : isAuthenticated ? (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: props.location },
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default AdminRoute;
