import React from 'react';

import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import useToggle from '../../hooks/useToggle';

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useToggle(true);

  const handleMenuToggle = () => {
    document.body.classList.remove('sidebar-active');
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
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Link to="/" className="sidebar-link">
              <Icon type="home" />
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/dashboard" className="sidebar-link">
              <Icon type="dashboard" />
              <span>dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/notes" className="sidebar-link">
              <Icon type="file" />
              <span>notes</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/register" className="sidebar-link">
              <Icon type="user" />
              <span>sign up</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/login" className="sidebar-link">
              <Icon type="login" />
              <span>login</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/logout" className="sidebar-link">
              <Icon type="logout" />
              <span>Logout</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <div className="dark-shadow-bg" aria-hidden onClick={handleMenuToggle} />
    </>
  );
};

export default SideBar;
