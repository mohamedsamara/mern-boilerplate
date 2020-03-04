import React from 'react';

import {
  Row,
  Col,
  Layout,
  Icon,
  Avatar,
  Typography,
  Menu,
  Dropdown,
  Button,
} from 'antd';

import { Link } from 'react-router-dom';

import { useUser } from '../../contexts/User';

const { Header: HeaderAntd } = Layout;
const { Text } = Typography;

const Header: React.FC = (): JSX.Element => {
  const { state } = useUser();

  const handleMenuToggle = () => {
    document.body.classList.add('sidebar-active');
  };

  const menu = (
    <Menu className="header-user-dropdown">
      <Menu.Item key="1">
        <Link to="/dashboard">
          <Icon type="dashboard" />
          Dashoard
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/profile">
          <Icon type="profile" />
          Profile
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderAntd
      className="header"
      style={{
        position: 'fixed',
        zIndex: 3,
        width: '100%',
        background: '#fff',
        padding: 0,
      }}
    >
      <Row>
        <Col span={3}>
          <div className="menu-bars">
            <Icon type="menu" onClick={handleMenuToggle} />
          </div>
        </Col>
        <Col span={21}>
          {state.user && (
            <div className="header-info">
              <Dropdown overlay={menu}>
                <Button>
                  <Avatar size="large">
                    <Text strong>
                      {state.user.profile.first_name.charAt(0)}
                    </Text>
                  </Avatar>
                  <Icon type="down" />
                </Button>
              </Dropdown>
            </div>
          )}
        </Col>
      </Row>
    </HeaderAntd>
  );
};

export default Header;
