import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SidebarHeader } from 'react-pro-sidebar';
import { setSidebarVisibility } from '../../actions/sidebar';
import { getSidebarMenuClasses } from '../../utility/common';
import { constants } from '../../constants';
import 'react-pro-sidebar/dist/css/styles.css';
import '../../styles/sidebar.scss';

const Sidebar = ({ location }) => {
  const dispatch = useDispatch();
  const { profile, isCollapsed, isVisible } = useSelector((state) => ({
    isCollapsed: state.sidebar.isCollapsed,
    isVisible: state.sidebar.isVisible,
    profile: state.profile,
  }));
  let sidebarMenuClasses = getSidebarMenuClasses(location.pathname);
  const toggleSidebar = (value) => dispatch(setSidebarVisibility(value));
  const closeSidebar = () => toggleSidebar(false);
  const { manageUsersPlaceholder, dashboardPlaceholder } = constants.sidebar;
  return (
    <ProSidebar
      collapsed={isCollapsed}
      breakPoint="lg"
      toggled={isVisible}
      onToggle={toggleSidebar}>
      <SidebarHeader>
        {isCollapsed ? (
          <img
            alt="Icon logo"
            className="small-logo"
            src="/images/icon-logo.png"
          />
        ) : (
          <img alt="Logo" className="brand-logo" src="/images/logo.png" />
        )}
        <i className="fas fa-times close-sidebar" onClick={closeSidebar} />
      </SidebarHeader>
      <Menu iconShape="round">
        <MenuItem
          className={sidebarMenuClasses.dashboard}
          icon={<i className="fa fa-tachometer-alt" />}>
          <NavLink onClick={closeSidebar} to="/dashboard">
            {dashboardPlaceholder}
          </NavLink>
        </MenuItem>
        {profile.is_admin ? (
          <MenuItem
            className={sidebarMenuClasses.manageUsers}
            icon={<i className="fa fa-user-plus" />}>
            <NavLink onClick={closeSidebar} to="/manage-users">
              {manageUsersPlaceholder}
            </NavLink>
          </MenuItem>
        ) : (
          <></>
        )}
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
