import React from 'react';

import { Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Link } from 'react-router-dom';

import Button from '../Button';
import { useAuth } from '../../contexts/Auth';

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

const Login: React.FC<FormComponentProps> = (props): JSX.Element => {
  const { getFieldDecorator } = props.form;
  const { login } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        login(values);
      }
    });
  };

  return (
    <>
      <Form {...formItemLayout} onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Please input your email!' },
              {
                type: 'email',
                message: 'The input is not valid email!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
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
            text="Log in"
            htmlType="submit"
            className="login-form-btn"
          />
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
