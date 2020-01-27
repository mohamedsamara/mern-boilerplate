import React from 'react';

import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const Login = props => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <Form.Item>
        {getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please input your email!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item>
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
      <Form.Item>
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot password
        </Link>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or{' '}
        <Link to="/register" className="register-link">
          register now!
        </Link>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: 'login' })(Login);
