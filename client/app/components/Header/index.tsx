import React from 'react';
import { Row, Col, Layout, Icon } from 'antd';

// import { useAuth } from '../../containers/Auth';

const { Header: HeaderAntd } = Layout;

const Header = () => {
  // const { state } = useAuth();

  // console.log(state);

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
        <Col xs={3} sm={3}>
          <div className="menu-bars">
            <Icon type="menu" onClick={handleMenuToggle} />
          </div>
        </Col>
        <Col xs={21} sm={21} md={12} lg={12} xl={12}>
          <div className="header-info">
            {/* {state.user && <div>Welcome {state.user.profile.firstName}!</div>} */}
          </div>
        </Col>
      </Row>
    </HeaderAntd>
  );
};

export default Header;
