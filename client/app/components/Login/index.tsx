import React from 'react';

import useFetch from 'use-http';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

import Loading from '../Loading';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Login = props => {
  const { getFieldDecorator } = props.form;
  const { request, response, loading } = useFetch('/api/user');

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const result = await request.post('/login', values);
        if (response.ok) {
          console.log(result);
        }
      }
    });
  };

  return (
    <>
      <Loading loading={loading} />
      <Form {...formItemLayout} onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot password
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or{' '}
          <Link to="/register" className="register-link">
            register now!
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Form.create({ name: 'login' })(Login);
