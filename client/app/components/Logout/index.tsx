import React, { useEffect, useState } from 'react';

import useFetch from 'use-http';
import { useHistory } from 'react-router-dom';
import { Result, message } from 'antd';

import { useAuth } from '../../containers/Auth';

const Logout = () => {
  const { request, response } = useFetch('/api/auth');
  const [seconds, setSeconds] = useState(2);
  const history = useHistory();
  const { unsetAuth } = useAuth();

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(interval);
      history.push('/login');
    }

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    logoutApi();
  }, []);

  const logoutApi = async () => {
    const result = await request.post('/logout');
    if (response.ok) {
      unsetAuth();
      message.success(result.message);
    }
  };

  return (
    <Result
      status="success"
      title="You have logged out successfully!"
      subTitle={`You will be redirected to the home page in ${seconds} seconds`}
    />
  );
};

export default Logout;
