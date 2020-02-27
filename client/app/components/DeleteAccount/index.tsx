import React, { MouseEvent } from 'react';

import { Divider, Popconfirm, Icon, Typography } from 'antd';

import Button from '../Button';

const { Text } = Typography;

interface Props {
  collapsed?: boolean;
  deleteUser?: (event: MouseEvent<HTMLElement>) => void;
}

const DeleteAccount: React.FC<Props> = (props): JSX.Element => {
  return (
    <div className={`hidden-delete-account${props.collapsed ? ' show' : ''}`}>
      <Divider />
      <Text strong>
        If you no longer need to use mern boilerplate, you can delete your
        account. Deleting your account will permananetly delete your data,
        including your email. This action cannot be reversed.
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
