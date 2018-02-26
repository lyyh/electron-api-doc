/**
 * @author liuyanhao
 * @date 2018-02-25
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import {fetchUsers} from "actions/userGroup";
import {LOADING_STATUS, SUCCESS_STATUS} from "../../../mixins/statusMixins";
import SelectRemoteUser from 'components/User/SelectRemoteUser'
import './index.less'

const FormItem = Form.Item;

class NewMemberContainer extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleSelectChange = (selectedValue) => {
    const {dispatch,form} = this.props
    const userNames = selectedValue.map((ele,index) => {
      return {
        name: ele.key,
        permission: '0' // temporary code
      }
    })

    form.setFieldsValue({
      users: [...userNames]
    })
    dispatch({
      type: FETCH_USERS_OVER_ACTION,
      state: SUCCESS_STATUS
    })
  }

  render() {
    const {user,form} = this.props
    const {getFieldDecorator} = form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('user', {
            rules: [{
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <SelectRemoteUser
              user={user}
              handleSelectChange={this.handleSelectChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="权限"
        >
          {getFieldDecorator('permission', {
            rules: [{
              required: true, message: 'Please input your password!',
            }],
          })(
            <Input/>
          )}
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(NewMemberContainer);

export default WrappedRegistrationForm
