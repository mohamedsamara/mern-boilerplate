import React from 'react';

import { Row, Col, Layout, Icon } from 'antd';

const { Header: HeaderAntd } = Layout;

const Header: React.FC = (): JSX.Element => {
  const handleMenuToggle = () => {
    document.body.classList.add('sidebar-active');
  };

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
      </Row>
    </HeaderAntd>
  );
};

export default Header;
