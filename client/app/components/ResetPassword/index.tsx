import React from 'react';

import useFetch from 'use-http';
import { Row, Col, Form, Input, Icon, message } from 'antd';
import { useHistory } from 'react-router-dom';

import Button from '../Button';
import Label from '../Label';
import PageHeader from '../PageHeader';
import { useAuth } from '../../contexts/Auth';

const ResetPassword = props => {
  const history = useHistory();
  const { request, response, loading } = useFetch('/api/auth');
  const { getFieldDecorator } = props.form;
  const { getUserId } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        resetPassword(values);
      }
    });
  };

  const resetPassword = async values => {
    // eslint-disable-next-line no-param-reassign
    values.userId = getUserId();
    const result = await request.post('/reset-password', values);

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
    <div className="reset-password">
      <PageHeader onBack={onBack} loading={loading} />
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit} className="reset-password-form">
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
                text="Reset Password"
                htmlType="submit"
                className="update-password-btn"
              ></Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Form.create({ name: 'resetPassword' })(ResetPassword);
