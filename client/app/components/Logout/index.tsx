import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Result } from 'antd';

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
    <Result
      status="success"
      title="You have logged out successfully!"
      subTitle={`You will be redirected to the home page in ${seconds} seconds`}
    />
  );
};

export default Logout;
