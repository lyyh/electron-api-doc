/**
 * @author liuyanhao
 * @date 2018-02-25
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,message } from 'antd';
import {fetchSimilarUsers} from 'actions/selectUser'
import SelectUser from 'containers/User/selectUser'
import {addUser} from "actions/userGroup";
import {debounce} from 'lodash';
import './index.less'

const FormItem = Form.Item;

class NewMemberContainer extends Component {
  constructor(props){
    super(props)
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {user,dispatch,userGroup} = this.props
    const self = this
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(!self.isAdministrator(user)){
          message.error('没有操作权限!')
          return
        }
        const usersParams = {...values.user,permission:values.permission}
        const params = {
          users: Array.of(usersParams)
        }
        console.log('Received values of form: ', values);
        dispatch(addUser(params,userGroup.key))
      }
    });
  }

  fetchUser = (value,dispatch) => {
    const {user} = this.props
    const params = {
      queryParams:JSON.stringify({
        name:value.key
      }),
      userName: user.name
    }
    dispatch(fetchSimilarUsers(params))
  }

  // set form user value when select a user
  setUserValue = (value) => {
    const {form} = this.props
    form.setFieldsValue({
      user: value
    })
  }

  // judge user's operation permission
  isAdministrator = ({permission}) => {
    if(permission == '1')return true
    else return false
  }

  fetchUserAndSelect = (key,dispatch,selectUsers) => {
    // const fetchUserKey = value
    this.fetchUser(key,dispatch)
    if(selectUsers && selectUsers.length!=0){
      let value
      for(let el of selectUsers){
         if(el.key==key){
           value=el
         }
      }
      // const value = selectUsers
      this.setUserValue(value)
    }
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
          {getFieldDecorator('user')(
            <SelectUser
              user={user}
              fetchUserAndSelect={this.fetchUserAndSelect}
              mode='combobox'
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
            initialValue: '0'
          })(
            <Select style={{ width: 120 }}>
              <Option value="0">普通权限</Option>
              <Option value="1">管理员权限</Option>
            </Select>
          )}
        </FormItem>
        <Row>
          <Col offset={4} span={20}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            {/*<Button style={{marginLeft:'10px'}} onClick={onReturn}>返回上一层</Button>*/}
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(NewMemberContainer);

export default WrappedRegistrationForm
