import React from 'react';

import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Link } from 'react-router-dom';

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
            placeholder="Username"
          />,
        )}
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          className="forgot-password-form-button"
        >
          Log in
        </Button>
        <Link to="/login" className="login-link">
          Back to login{' '}
        </Link>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: 'forgot-password' })(ForgotPassword);
