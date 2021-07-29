import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SubMenu,
} from 'react-pro-sidebar';
import { useTranslation } from 'react-i18next';
import { setSidebarVisibility } from '../../actions/sidebar';
import {
  getSidebarMenuClasses,
  // formatDateAndTime,
  // fromNow,
  // toNow
} from '../../utility/common';
// import dayjs from 'dayjs';

const Sidebar = ({ location }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { profile, isCollapsed, isVisible } = useSelector((state) => ({
    isCollapsed: state.sidebar.isCollapsed,
    isVisible: state.sidebar.isVisible,
    profile: state.profile,
  }));
  let sidebarMenuClasses = getSidebarMenuClasses(location.pathname);
  const toggleSidebar = (value) => dispatch(setSidebarVisibility(value));
  const closeSidebar = () => toggleSidebar(false);
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
            {t('sidebar.dashboardPlaceholder')}
          </NavLink>
        </MenuItem>
        {profile.is_admin && (
          <MenuItem
            className={sidebarMenuClasses.manageUsers}
            icon={<i className="fa fa-user-plus" />}>
            <NavLink onClick={closeSidebar} to="/manage-users">
              {t('sidebar.manageUsersPlaceholder')}
            </NavLink>
          </MenuItem>
        )}
        <SubMenu
          title={t('sidebar.subMenuExamplePlaceholder')}
          icon={<i className="fa fa-user-plus" />}>
          <MenuItem>{t('sidebar.route1Placeholder')}</MenuItem>
          <SubMenu
            title={t('sidebar.nestedSubMenuPlaceholder')}
            icon={<i className="fa fa-user-plus" />}>
            <MenuItem>{t('sidebar.route2Placeholder')}</MenuItem>
            <MenuItem>{t('sidebar.route3Placeholder')}</MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>
      {/* Just for testing */}
      {/* {t("header.testNumber", { value: 345454534.4545 })}
      {"\n"}{formatDateAndTime(dayjs())}
      {"\n"}{fromNow(dayjs())} */}
    </ProSidebar>
  );
};

export default Sidebar;
