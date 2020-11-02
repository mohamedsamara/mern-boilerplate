import React, { useEffect } from 'react';

import { Icon, Typography } from 'antd';
import { Link } from 'react-router-dom';

import Label from '../Label';
import { useUser } from '../../contexts/User';

const { Text } = Typography;

const Dashboard: React.FC = (): JSX.Element => {
  const {
    fetchUser,
    state: { user },
  } = useUser();

  useEffect(() => {
    fetchUser();
  }, []);

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
