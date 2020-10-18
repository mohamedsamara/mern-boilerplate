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

  const getGender = user => {
    return user.gender === 'm' ? 'Male' : 'Female';
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
          <Text>{`${user.firstName} ${user.lastName}`}</Text>
        </Label>

        <Label text="Role:">
          <Text>{user.role === 'ROLE_MEMBER' ? 'Member' : 'Admin'}</Text>
        </Label>

        <Label text="Email:" Icon={<Icon type="mail" />}>
          <Text>{user.email}</Text>
        </Label>

        <Label text="Gender:" Icon={<Icon type="user" />}>
          <Text>{user.gender ? getGender(user) : 'Not set Yet!'}</Text>
        </Label>

        <Label text="Birthdate:" Icon={<Icon type="calendar" />}>
          <Text>{user.birthdate ? user.birthdate : 'Not set Yet!'}</Text>
        </Label>
      </div>
    </div>
  );
};

export default Dashboard;
