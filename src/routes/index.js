import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { setReduxLoaderCount } from '../actions/loader';
import UserRoute from './userRoute';
import AdminRoute from './adminRoute';
import Login from '../pages/login';
import AddNewUser from '../pages/addNewUser';
import Profile from '../pages/profile';
import Dashboard from '../pages/dashboard';
import ManageUsers from '../pages/manageUsers';
import EditUser from '../pages/editUser';

// To lazy load the components and for better code splitting
// const Login = lazy(() => import("../pages/login"));
// const Dashboard = lazy(() => import("../pages/dashboard"));
// const AddNewUser = lazy(() => import("../pages/addNewUser"));
// const Profile = lazy(() => import("../pages/profile"));

const ScrollToTop = (props) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);
  return props.children;
};

const Routes = () => {
  const { profile, token, loaderCount } = useSelector((state) => ({
    token: state.token,
    loaderCount: state.loaderCount,
    profile: state.profile,
  }));
  let isAuthenticated = token;
  let isAdmin = profile && profile.is_admin;
  const dispatch = useDispatch();
  useEffect(() => {
    loaderCount > 0 && dispatch(setReduxLoaderCount(0));
  }, []);
  return (
    <Router>
      {/* <Suspense fallback={<FullScreenLoader />}> */}
      <Switch>
        <ScrollToTop>
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to={isAuthenticated ? '/dashboard' : '/login'} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              isAuthenticated ? (
                <Redirect to="/dashboard" />
              ) : (
                <Login {...props} />
              )
            }
          />
          <UserRoute
            isAuthenticated={isAuthenticated}
            component={Dashboard}
            path="/dashboard"
            loaderCount={loaderCount}
            exact
          />
          <UserRoute
            isAuthenticated={isAuthenticated}
            component={Profile}
            path="/profile"
            loaderCount={loaderCount}
            exact
          />
          <AdminRoute
            isAuthenticated={isAuthenticated}
            component={AddNewUser}
            isAdmin={isAdmin}
            path="/add-new-user"
            loaderCount={loaderCount}
            exact
          />
          <AdminRoute
            isAuthenticated={isAuthenticated}
            component={EditUser}
            isAdmin={isAdmin}
            path="/edit-user/:id"
            loaderCount={loaderCount}
            exact
          />
          <AdminRoute
            isAuthenticated={isAuthenticated}
            component={ManageUsers}
            isAdmin={isAdmin}
            path="/manage-users"
            loaderCount={loaderCount}
            exact
          />
        </ScrollToTop>
      </Switch>
      {/* </Suspense> */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </Router>
  );
};

export default Routes;
