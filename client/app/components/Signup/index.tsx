import React, { useState } from 'react';

import { Form, Input, Button } from 'antd';

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
  const { getFieldDecorator } = props.form;

  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
        {getFieldDecorator('firstname', {
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
        {getFieldDecorator('lastname', {
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
        <Button type="primary" htmlType="submit" className="signup-form-button">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: 'register' })(Signup);
