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
import PublicRoute from './publicRoute';
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

const routeMapper = [
  {
    path: '/login',
    component: Login,
    routeComponent: PublicRoute,
    exact: true,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    routeComponent: UserRoute,
    exact: true,
  },
  {
    path: '/profile',
    component: Profile,
    routeComponent: UserRoute,
    exact: true,
  },
  {
    path: '/add-new-user',
    component: AddNewUser,
    routeComponent: AdminRoute,
    exact: true,
  },
  {
    path: '/edit-user/:id',
    component: EditUser,
    routeComponent: AdminRoute,
    exact: true,
  },
  {
    path: '/manage-users',
    component: ManageUsers,
    routeComponent: AdminRoute,
    exact: true,
  },
];

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
  const dispatch = useDispatch();
  useEffect(() => {
    loaderCount > 0 && dispatch(setReduxLoaderCount(0));
  }, []);
  let isAuthenticated = !token;
  let isAdmin = profile && profile.is_admin;
  return (
    <Router>
      {/* <Suspense fallback={<FullScreenLoader />}> */}
      <ScrollToTop>
        <Switch>
          {/* This is used to redirect the user as we don't have a "/" route */}
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to={isAuthenticated ? '/dashboard' : '/login'} />
            )}
          />
          {routeMapper.map(
            ({ component, exact, path, routeComponent: RouteComponent }) => (
              <RouteComponent
                isAuthenticated={isAuthenticated}
                component={component}
                path={path}
                isAdmin={isAdmin}
                loaderCount={loaderCount}
                exact={exact}
              />
            ),
          )}
        </Switch>
      </ScrollToTop>
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
