import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';

const SideBar = () => {
  const [collapsed, setCollapse] = useState(false);

  const { Sider } = Layout;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapse}
      className="antd-sidebar"
    >
      <div className="app-brand"></div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" className="test">
          <Icon type="home" />
          <span className="sidebar-link">
            <Link to="/">Home</Link>
          </span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="dashboard" />
          <span className="sidebar-link">
            <Link to="/">dashboard</Link>
          </span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="file" />
          <span className="sidebar-link">
            <Link to="/notes">notes</Link>
          </span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="user" />
          <span className="sidebar-link">
            <Link to="/register">sign up</Link>
          </span>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="login" />
          <span className="sidebar-link">
            <Link to="/login">login</Link>
          </span>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="logout" />
          <span className="sidebar-link">
            <Link to="/logout">Logout</Link>
          </span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
