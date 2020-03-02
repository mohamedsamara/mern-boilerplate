import React from 'react';

import useFetch from 'use-http';
import { Form, Icon, Input, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import Button from '../Button';

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

const ForgotPassword: React.FC<FormComponentProps> = (props): JSX.Element => {
  const { request, response, loading } = useFetch('/api/auth');
  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        forgotPassword(values);
      }
    });
  };

  const forgotPassword = async values => {
    const result = await request.post('/forgot-password', values);

    if (response.ok) {
      message.info(result.message);
    } else {
      message.error(result.message);
    }
  };

  return (
    <>
      <Loading loading={loading} />
      <Form
        {...formItemLayout}
        onSubmit={handleSubmit}
        className="forgot-password-form"
      >
        <h2>Forgot Password</h2>
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
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            text="Send"
            htmlType="submit"
            className="forgot-password-form-btn"
          />
          <Link to="/login" className="login-link">
            Back to login{' '}
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Form.create({ name: 'forgot-password' })(ForgotPassword);
