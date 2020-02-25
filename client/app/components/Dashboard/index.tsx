import React, { useEffect } from 'react';

import useFetch from 'use-http';
import { Descriptions, Icon } from 'antd';
import { Link } from 'react-router-dom';

import useUser from '../../hooks/user/useUser';
import { useAuth } from '../../contexts/Auth';

const Dashboard: React.FC = (): JSX.Element => {
  const { request, response } = useFetch('/api');
  const { user, setUser } = useUser();
  const { getUserId } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const id = getUserId();
    const result = await request.get(`/user/${id}`);

    if (response.ok && result.data) {
      setUser(result.data.user);
    }
  };

  return (
    <div className="dashboard">
      <Descriptions title="Account Details">
        <Descriptions.Item span={3}>
          <div className="dashboard-actions">
            <Link to="profile">Edit Profile</Link>
            <Link to="reset-password">Reset Password</Link>
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Full Name">
          {`${user.profile.firstName} ${user.profile.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Role">
          {user.role === 'ROLE_MEMBER' ? 'Member' : 'Admin'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <Icon type="mail" />
              <span className="description-label-text">Email</span>
            </>
          }
        >
          {' '}
          {user.email}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <Icon type="user" />
              <span className="description-label-text">Gender</span>
            </>
          }
        >
          {user.profile.gender === 'm' ? 'Male' : 'Female'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <Icon type="calendar" />
              <span className="description-label-text">Birthdate</span>
            </>
          }
        >
          {user.profile.birthdate}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Dashboard;
