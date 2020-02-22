import React, { useState } from 'react';

import useFetch from 'use-http';
import { Form, Input, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';

import Button from '../Button';
import Loading from '../Loading';
import { useAuth } from '../../containers/Auth';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
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

const Signup = props => {
  const history = useHistory();
  const { getFieldDecorator } = props.form;
  const [confirmDirty, setConfirmDirty] = useState(false);
  const { request, response, loading } = useFetch('/api/auth');
  const { setAuth } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const result = await request.post('/register', values);
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

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  return (
    <>
      <Loading loading={loading} />
      <Form {...formItemLayout} onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input placeholder="Email" />)}
        </Form.Item>
        <Form.Item label={<span>First Name</span>}>
          {getFieldDecorator('firstName', {
            rules: [
              {
                required: true,
                message: 'Please input your first name!',
                whitespace: true,
              },
            ],
          })(<Input placeholder="First Name" />)}
        </Form.Item>
        <Form.Item label={<span>Last Name</span>}>
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                message: 'Please input your last name!',
                whitespace: true,
              },
            ],
          })(<Input placeholder="Last Name" />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password placeholder="Password" />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(
            <Input.Password
              placeholder="Confirm Password"
              onBlur={handleConfirmBlur}
            />,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            text="Register"
            htmlType="submit"
            className="signup-form-button"
          ></Button>
          Or{' '}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Form.create({ name: 'register' })(Signup);
