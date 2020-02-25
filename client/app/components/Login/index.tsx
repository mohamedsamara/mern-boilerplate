import React from 'react';

import useFetch from 'use-http';
import { Form, Icon, Input, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Link, useHistory } from 'react-router-dom';

import Button from '../Button';

import Loading from '../Loading';
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
  const history = useHistory();
  const { request, response, loading } = useFetch('/api/auth');
  const { setAuth } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const result = await request.post('/login', values);
        if (response.ok) {
          setAuth(result.data.token);
          history.push('/dashboard');
          message.success(result.message);
        } else {
          message.error(result.message);
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
          ></Button>
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
