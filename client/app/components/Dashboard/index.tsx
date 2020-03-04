import React, { useEffect } from 'react';

import useFetch from 'use-http';
import { Icon, Typography } from 'antd';
import { Link } from 'react-router-dom';

import Label from '../Label';
import useUser from '../../hooks/user/useUser';
import { useAuth } from '../../contexts/Auth';
import { OptionsPreview } from '../../types.d';

const { Text } = Typography;

const options: OptionsPreview = {
  cachePolicy: 'no-cache',
};

const Dashboard: React.FC = (): JSX.Element => {
  const { request, response } = useFetch('/api', options);
  const [user, setUser] = useUser();
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
      <h2>Account Details</h2>
      <div className="dashboard-actions">
        <Link to="/profile">Edit Profile</Link>
        <Link to="/edit-password">Reset Password</Link>
      </div>
      <div className="account-details">
        <Label text="Name:">
          <Text>{`${user.profile.first_name} ${user.profile.last_name}`}</Text>
        </Label>

        <Label text="Role:">
          <Text>{user.role === 'ROLE_MEMBER' ? 'Member' : 'Admin'}</Text>
        </Label>

        <Label text="Email:" Icon={<Icon type="mail" />}>
          <Text>{user.email}</Text>
        </Label>

        <Label text="Gender:" Icon={<Icon type="user" />}>
          <Text>{user.profile.gender === 'm' ? 'Male' : 'Female'}</Text>
        </Label>

        <Label text="Birthdate:" Icon={<Icon type="calendar" />}>
          <Text>
            {user.profile.birthdate ? user.profile.birthdate : 'Not set Yet!'}
          </Text>
        </Label>
      </div>
    </div>
  );
};

export default Dashboard;
