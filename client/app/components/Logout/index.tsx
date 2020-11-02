import React, { useEffect, useState } from 'react';

import { Result } from 'antd';

import { useAuth } from '../../contexts/Auth';

const Logout: React.FC = (): JSX.Element => {
  const [seconds, setSeconds] = useState(1);
  const { logout } = useAuth();

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(interval);
      logout();
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
