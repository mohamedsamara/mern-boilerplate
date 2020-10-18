import React, { useEffect, useRef } from 'react';

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
import { FormComponentProps } from 'antd/lib/form/Form';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import Button from '../Button';
import Label from '../Label';
import DeleteAccount from '../DeleteAccount';
import PageHeader from '../PageHeader';
import useToggle from '../../hooks/useToggle';
import useUser from '../../hooks/user/useUser';
import { useAuth } from '../../contexts/Auth';
import { OptionsPreview } from '../../types.d';

const { Option } = Select;
const { TextArea } = Input;

const dateFormat = 'YYYY/MM/DD';

const options: OptionsPreview = {
  cachePolicy: 'no-cache',
};

const EditProfile: React.FC<FormComponentProps> = (props): JSX.Element => {
  const { getFieldDecorator } = props.form;
  const { request, response, loading } = useFetch('/api', options);
  const [user, setUser] = useUser();
  const [collapsed, setCollapsed] = useToggle(false);
  const history = useHistory();
  const deleteAccountRef = useRef<HTMLDivElement>(null);
  const { getUserId } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const id = getUserId();

    const result = await request.get(`/user/${id}`);

    if (response.ok) {
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

  const showDeleteAccount = () => {
    if (!collapsed) {
      deleteAccountRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setCollapsed();
  };

  const onBack = () => {
    history.goBack();
  };

  return (
    <div className="profile">
      <PageHeader onBack={onBack} loading={loading} />
      <div className="profile-header">
        <h2>Edit Profile</h2>
        <Tooltip placement="leftTop" title="Delete account">
          <Switch onChange={showDeleteAccount} />
        </Tooltip>
      </div>
      <Form onSubmit={handleSubmit} className="profile-form">
        <Row gutter={16}>
          <Col xs={24} sm={12} className="gutter-row">
            <Label text="First Name" />
            <Form.Item>
              {getFieldDecorator('first_name', {
                initialValue: user.firstName,
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
              {getFieldDecorator('last_name', {
                initialValue: user.lastName,
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
                initialValue: user.website,
              })(<Input placeholder="Website" />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} className="gutter-row">
            <Label text="Bio" />
            <Form.Item>
              {getFieldDecorator('bio', {
                initialValue: user.bio,
              })(<TextArea placeholder="Bio" allowClear />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} className="gutter-row">
            <Label text="Gender" />
            <Form.Item>
              {getFieldDecorator('gender', {
                initialValue: user.gender,
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
                initialValue: user.birthdate
                  ? moment(user.birthdate, dateFormat)
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
                className="update-profile-btn"
              ></Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="profile-footer">
        <div ref={deleteAccountRef}>
          <DeleteAccount deleteUser={deleteUser} collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
};

export default Form.create({ name: 'editProfile' })(EditProfile);
