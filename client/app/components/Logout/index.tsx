import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Result } from 'antd';

import { useAuth } from '../../containers/Auth';

const Logout = () => {
  const [seconds, setSeconds] = useState(2);
  const history = useHistory();
  const { unsetAuth } = useAuth();

  useEffect(() => {
    let interval = null;
    unsetAuth();
    interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(interval);
      history.push('/login');
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
