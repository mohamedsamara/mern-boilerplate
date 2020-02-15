import React from 'react';

import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import useToggle from '../../hooks/useToggle';
import { useAuth } from '../../containers/Auth';

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useToggle(true);
  const { state } = useAuth();

  const handleMenuToggle = () => {
    document.body.classList.remove('sidebar-active');
  };

  const loggedInMenuItems = () => {
    return (
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <Link to="/dashboard" className="sidebar-link">
            <Icon type="dashboard" />
            <span>dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/notes" className="sidebar-link">
            <Icon type="file" />
            <span>notes</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/logout" className="sidebar-link">
            <Icon type="logout" />
            <span>Logout</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  };

  const menuItems = () => {
    return (
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <Link to="/" className="sidebar-link">
            <Icon type="home" />
            <span>Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/login" className="sidebar-link">
            <Icon type="login" />
            <span>login</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/register" className="sidebar-link">
            <Icon type="user" />
            <span>sign up</span>
          </Link>
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
