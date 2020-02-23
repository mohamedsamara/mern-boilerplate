import React from 'react';

import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import useToggle from '../../hooks/useToggle';
import { useAuth } from '../../contexts/Auth';

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useToggle(true);
  const { state } = useAuth();

  const handleMenuToggle = () => {
    document.body.classList.remove('sidebar-active');
  };

  const loggedInMenuItems = () => {
    return (
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1">
          <NavLink
            to="/"
            className="sidebar-link"
            activeClassName="active"
            exact
          >
            <Icon type="home" />
            <span>Home</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink
            to="/dashboard"
            className="sidebar-link"
            activeClassName="active"
            exact
          >
            <Icon type="dashboard" />
            <span>dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink
            to="/notes"
            className="sidebar-link"
            activeClassName="active"
            exact
          >
            <Icon type="file" />
            <span>My Notes</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink
            to="/logout"
            className="sidebar-link"
            activeClassName="active"
            exact
          >
            <Icon type="logout" />
            <span>Logout</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  };

  const menuItems = () => {
    return (
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1">
          <NavLink
            to="/"
            className="sidebar-link"
            activeClassName="active"
            exact
          >
            <Icon type="home" />
            <span>Home</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink
            to="/login"
            className="sidebar-link"
            activeClassName="active"
            exact
          >
            <Icon type="login" />
            <span>login</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink
            to="/register"
            className="sidebar-link"
            activeClassName="active"
            exact
          >
            <Icon type="user" />
            <span>sign up</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="sidebar"
      >
        <div className="app-brand">
          <Icon type="close" onClick={handleMenuToggle} />
        </div>
        {state.authenticated ? loggedInMenuItems() : menuItems()}
      </Sider>
      <div className="dark-shadow-bg" aria-hidden onClick={handleMenuToggle} />
    </>
  );
};

export default SideBar;
