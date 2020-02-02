import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Typography, Icon, Row, Col } from 'antd';

const { Paragraph, Text } = Typography;

const Logout = () => {
  const [seconds, setSeconds] = useState(4);
  const history = useHistory();

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
        <Col xs={3} md={2}>
          <Icon
            type="check-circle"
            theme="outlined"
            style={{ fontSize: '30px', color: '#08c' }}
          />
        </Col>
        <Col xs={21} md={22}>
          <Paragraph>
            <Text strong>You have logged out successfully!</Text>
          </Paragraph>
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
