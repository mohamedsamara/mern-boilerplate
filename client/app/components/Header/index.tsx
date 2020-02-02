import React from 'react';
import { Row, Col, Layout, Menu, Icon } from 'antd';

const { Header: HeaderAntd } = Layout;

const Header = () => {
  const handleMenuToggle = () => {
    document.body.classList.add('sidebar-active');
  };

  return (
    <HeaderAntd
      className="header"
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        background: '#fff',
        padding: 0,
      }}
    >
      <Row>
        <Col xs={3} sm={3}>
          <div className="menu-bars">
            <Icon type="menu" onClick={handleMenuToggle} />
          </div>
        </Col>
        <Col xs={21} sm={21} md={12} lg={12} xl={12}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '63px', borderBottom: 'none' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Col>
      </Row>
    </HeaderAntd>
  );
};

export default Header;
