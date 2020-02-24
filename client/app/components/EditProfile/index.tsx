import React, { useEffect, useState } from 'react';

import useFetch from 'use-http';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  //   Typography,
  Divider,
  Switch,
  Tooltip,
} from 'antd';

import Button from '../Button';
import Label from '../Label';
import Loading from '../Loading';
import { useAuth } from '../../contexts/Auth';
import useToggle from '../../hooks/useToggle';

const { Option } = Select;
const { TextArea } = Input;
// const { Text } = Typography;
const text = 'Delete account';

const userState = {
  profile: {
    firstName: '',
    lastName: '',
  },
};

const EditProfile = props => {
  const { getFieldDecorator } = props.form;
  const { request, response, loading } = useFetch('/api');
  const [user, setUser] = useState(userState);
  const [collapsed, setCollapsed] = useToggle(false);
  const { getUserId } = useAuth();

  console.log(user);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const id = getUserId();
    const result = await request.get(`/user/${id}`);

    if (response.ok && result.data) {
      setUser(result.data.user);
    }
  };

  const updateUser = async values => {
    const id = getUserId();
    const result = await request.put(`/user/${id}`, values);

    if (response.ok) {
      console.log('result ', result);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, fieldsValues) => {
      if (!err) {
        const values = {
          ...fieldsValues,
          'date-picker': fieldsValues['date-picker'].format('YYYY-MM-DD'),
        };

        updateUser(values);
      }
    });
  };

  return (
    <div className="profile">
      <Loading loading={loading} />
      <div className="profile-header">
        <h2>Edit Profile</h2>
        <Tooltip placement="leftTop" title={text}>
          <Switch onChange={setCollapsed} />
        </Tooltip>
      </div>

      <Form onSubmit={handleSubmit} className="update-profile-form">
        <Row gutter={16}>
          <Col xs={24} sm={12} className="gutter-row">
            <Label text="First Name" />
            <Form.Item>
              {getFieldDecorator('firstName', {
                rules: [
                  { required: true, message: 'Please input your first Name!' },
                ],
              })(<Input placeholder="First Name" />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} className="gutter-row">
            <Label text="Last Name" />
            <Form.Item>
              {getFieldDecorator('lastName', {
                rules: [
                  { required: true, message: 'Please input your Last Name!' },
                ],
              })(<Input placeholder="Last Name" />)}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12} className="gutter-row">
            <Label text="Website" />
            <Form.Item>
              {getFieldDecorator('website')(<Input placeholder="First Name" />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} className="gutter-row">
            <Label text="Bio" />
            <Form.Item>
              {getFieldDecorator('bio')(
                <TextArea rows={4} placeholder="Bio" allowClear />,
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} className="gutter-row">
            <Form.Item label="Gender">
              {getFieldDecorator('gender')(
                <Select placeholder="Select a gender">
                  <Option value="m">Male</Option>
                  <Option value="f">Female</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} className="gutter-row">
            <Form.Item label="Your Birthdate">
              {getFieldDecorator('date-picker')(<DatePicker />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={8} className="gutter-row">
            <Form.Item>
              <Button
                text="Update"
                htmlType="submit"
                className="update-profile-button"
              ></Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={`hidden-delete-account${collapsed ? ' show' : ''}`}>
        <Divider />
      </div>
    </div>
  );
};

export default Form.create({ name: 'editProfile' })(EditProfile);
