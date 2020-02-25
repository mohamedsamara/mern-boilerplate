import React from 'react';

import { Divider, Popconfirm, Icon, Typography } from 'antd';

import Button from '../Button';

const { Text } = Typography;

const DeleteAccount = props => {
  return (
    <div className={`hidden-delete-account${props.collapsed ? ' show' : ''}`}>
      <Divider />
      <Text strong>
        If you deleted your account, all of your data will be deleted including
        your email.
      </Text>
      <Popconfirm
        icon={<Icon type="delete" style={{ color: 'red' }} />}
        placement="top"
        title="Are you sure you want to delete your account?"
        onConfirm={props.deleteUser}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="danger"
          text="Delete Account"
          className="delete-account-btn"
        ></Button>
      </Popconfirm>
    </div>
  );
};

export default DeleteAccount;
