/**
 * @author liuyanhao
 * @date 2018-01-30
 * @Description:
 */
import React,{PureComponent} from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button,message } from 'antd';
import { connect } from 'react-redux';
import {doRegister} from "actions/register";
import {LOADING_STATUS} from "../../mixins/statusMixins";
import './register.less'

const FormItem = Form.Item;

class RegistrationForm extends PureComponent {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    const {dispatch} = this.props
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(doRegister(values))
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleMessage(data){
    if(data.success){
      message.success('注册成功!')
    }else{
      message.error(data.err.errors || data.err.message)
    }
  }

  goBackToLogin = () => {
    const {history} = this.props
    const nextLocation = {
      pathname: '/login',
      state:{}
    }
    history.push(nextLocation)
  }

  render() {
    const {data,state} = this.props
    // data && this.handleMessage(data)
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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

    return (
      <div className="register-container">
        <h1 style={{textAlign:'center'}}>账号注册</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入名称！',
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="账号"
          >
            {getFieldDecorator('account', {
              rules: [{
                required: true, message: '请输入账号！',
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码！',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请确认密码！',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>注册</Button>
            <Button type="default" htmlType="button" onClick={this.goBackToLogin}>返回登录页</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default connect((state)=> {
  const currentRegister = state['register'];
  return currentRegister ? {
    state: currentRegister['state'] || null,
    data: currentRegister['data'] || null,
    error: currentRegister['error'] || null
  }:{
    state: LOADING_STATUS
  }
})(WrappedRegistrationForm)
