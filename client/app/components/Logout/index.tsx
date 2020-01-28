import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Typography, Icon, Row, Col } from 'antd';

const Logout = () => {
  const [seconds, setSeconds] = useState(3);
  const history = useHistory();
  const { Paragraph } = Typography;

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(interval);
      history.push('/');
    }

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="logout">
      <Row type="flex" align="middle">
        <Col span={3}>
          <Icon
            type="check-circle"
            theme="outlined"
            style={{ fontSize: '30px', color: '#08c' }}
          />
        </Col>
        <Col span={21}>
          <Paragraph>You have logged out successfully!</Paragraph>
          <Paragraph>
            You will be redirected to the home page in{' '}
            <span className="seconds">{seconds}</span> seconds
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default Logout;
