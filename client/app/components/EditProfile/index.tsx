import React, { useEffect } from 'react';

import useFetch from 'use-http';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Switch,
  Tooltip,
  message,
} from 'antd';

import moment from 'moment';
import { useHistory } from 'react-router-dom';

import Button from '../Button';
import Label from '../Label';
import DeleteAccount from '../DeleteAccount';
import Loading from '../Loading';
import useToggle from '../../hooks/useToggle';
import useUser from '../../hooks/user/useUser';
import { useAuth } from '../../contexts/Auth';

const { Option } = Select;
const { TextArea } = Input;

const dateFormat = 'YYYY/MM/DD';

const EditProfile = props => {
  const { getFieldDecorator } = props.form;
  const { request, response, loading } = useFetch('/api');
  const { user, setUser } = useUser();
  const [collapsed, setCollapsed] = useToggle(false);
  const history = useHistory();
  const { getUserId } = useAuth();

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
    const result = await request.put(`/user/${user._id}`, values);

    if (response.ok) {
      message.info(result.message);
    }
  };

  const deleteUser = async () => {
    const result = await request.delete(`/user/${user._id}`);

    if (response.ok) {
      message.info(result.message);
      history.push('/logout');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, fieldsValues) => {
      if (!err) {
        const values = {
          ...fieldsValues,
          birthdate: fieldsValues['birthdate'].format('YYYY-MM-DD'),
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
        <Tooltip placement="leftTop" title="Delete account">
          <Switch onChange={setCollapsed} />
        </Tooltip>
      </div>
      <Form onSubmit={handleSubmit} className="profile-form">
        <Row gutter={16}>
          <Col xs={24} sm={12} className="gutter-row">
            <Label text="First Name" />
            <Form.Item>
              {getFieldDecorator('firstName', {
                initialValue: user.profile.firstName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your first Name!',
                  },
                ],
              })(<Input placeholder="First Name" />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} className="gutter-row">
            <Label text="Last Name" />
            <Form.Item>
              {getFieldDecorator('lastName', {
                initialValue: user.profile.lastName,
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
              {getFieldDecorator('website', {
                initialValue: user.profile.website,
              })(<Input placeholder="First Name" />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} className="gutter-row">
            <Label text="Bio" />
            <Form.Item>
              {getFieldDecorator('bio', {
                initialValue: user.profile.bio,
              })(
                <TextArea
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  placeholder="Bio"
                  allowClear
                />,
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} className="gutter-row">
            <Label text="Gender" />
            <Form.Item>
              {getFieldDecorator('gender', {
                initialValue: user.profile.gender,
              })(
                <Select placeholder="Select a gender">
                  <Option value="m">Male</Option>
                  <Option value="f">Female</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} className="gutter-row">
            <Label text="Your Birthdate" />
            <Form.Item>
              {getFieldDecorator('birthdate', {
                initialValue: user.profile.birthdate
                  ? moment(user.profile.birthdate, dateFormat)
                  : moment(),
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  disabledDate={current => {
                    return current && current > moment();
                  }}
                />,
              )}
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
      <div className="profile-footer">
        <DeleteAccount deleteUser={deleteUser} collapsed={collapsed} />
      </div>
    </div>
  );
};

export default Form.create({ name: 'editProfile' })(EditProfile);
