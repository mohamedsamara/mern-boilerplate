import React, { useEffect } from 'react';

// import useFetch from 'use-http';
import Loading from '../Loading';

const Dashboard = () => {
  // const { request, response, loading } = useFetch('/api/auth');

  useEffect(() => {
    // if (state.user)  {
    // fetchUser();
    // }
  }, []);

  return (
    <div className="dashboard">
      <Loading />
    </div>
  );
};

export default Dashboard;
