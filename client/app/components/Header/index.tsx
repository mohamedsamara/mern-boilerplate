import React, { useState } from 'react';
import { Row, Col, Layout, Menu, Dropdown, Icon } from 'antd';

const Header = () => {
  const [visible, setVisible] = useState(false);
  const { Header: HeaderAntd } = Layout;

  const menu = (
    <Menu>
      <Menu.Item key="1">Clicking me will not close the menu.</Menu.Item>
      <Menu.Item key="2">Clicking me will not close the menu also.</Menu.Item>
      <Menu.Item key="3">Clicking me will close the menu</Menu.Item>
    </Menu>
  );

  return (
    <HeaderAntd className="header" style={{ background: '#fff', padding: 0 }}>
      <Row>
        <Col span={12}>
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
        <Col span={12}>
          <div className="header-dropdown-coulmn">
            <Dropdown
              overlay={menu}
              onVisibleChange={setVisible}
              visible={visible}
            >
              <a className="ant-dropdown-link" href="#">
                Hover me <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </HeaderAntd>
  );
};

export default Header;
