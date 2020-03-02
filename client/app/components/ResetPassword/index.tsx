import React, { useEffect, useState } from 'react';

import useFetch from 'use-http';
import { Row, Col, Form, Input, Icon, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../Button';
import Label from '../Label';

const ResetPassword: React.FC<FormComponentProps> = (props): JSX.Element => {
  const history = useHistory();
  const { request, response } = useFetch('/api/auth');
  const { token } = useParams();
  const { getFieldDecorator } = props.form;
  const [confirmDirty, setConfirmDirty] = useState(false);

  useEffect(() => {
    if (token) {
      checkTokenExpiration();
    }
  }, [token]);

  const checkTokenExpiration = async () => {
    const result = await request.post(`/reset-password/expire/${token}`);

    if (!response.ok) {
      message.error(result.message);
      history.push('/forgot-password');
    }
  };

  const resetPassword = async values => {
    const result = await request.post(`/reset-password/${token}`, values);

    if (response.ok) {
      message.info(result.message);
      history.push('/login');
    } else {
      message.error(result.message);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        resetPassword(values);
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
    <div className="reset-password">
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit} className="reset-password-form">
        <Row gutter={16}>
          <Col span={24} className="gutter-row">
            <Label text="Password" />
            <Form.Item>
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
          <Col span={24} className="gutter-row">
            <Label text="Confirm Password" />
            <Form.Item>
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
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  onBlur={handleConfirmBlur}
                  placeholder="Confirm Password"
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
                className="reset-password-btn"
              ></Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Form.create({ name: 'resetPassword' })(ResetPassword);
