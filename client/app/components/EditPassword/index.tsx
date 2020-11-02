import React from 'react';

import useFetch from 'use-http';
import { Row, Col, Form, Input, Icon, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { useHistory } from 'react-router-dom';

import Button from '../Button';
import Label from '../Label';
import PageHeader from '../PageHeader';

const EditPassword: React.FC<FormComponentProps> = (props): JSX.Element => {
  const history = useHistory();
  const { request, response, loading } = useFetch('/api/user');
  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        resetPassword(values);
      }
    });
  };

  const resetPassword = async values => {
    const result = await request.post('/update-password', values);

    if (response.ok) {
      message.info(result.message);
      history.push('/logout');
    } else {
      message.error(result.message);
    }
  };

  const onBack = () => {
    history.goBack();
  };

  return (
    <div className="edit-password">
      <PageHeader onBack={onBack} loading={loading} />
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit} className="edit-password-form">
        <Row gutter={16}>
          <Col span={24} className="gutter-row">
            <Label text="Current Password" />
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your current password!',
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Current Password"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={24} className="gutter-row">
            <Label text="New Password" />
            <Form.Item>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your new password!',
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="New Password"
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={8} className="gutter-row">
            <Form.Item>
              <Button
                text="Update Password"
                htmlType="submit"
                className="edit-password-btn"
              ></Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Form.create({ name: 'editPassword' })(EditPassword);
