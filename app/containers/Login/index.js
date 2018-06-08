/**
 * @author liuyanhao
 * @date 2018-01-26
 * @Description:
 */
import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Row,Col,Form, Icon, Input, Button, Checkbox,Select,Menu,message } from 'antd';
import {doLogin} from "actions/login";
import {LOADING_STATUS} from "mixins/statusMixins";
import './login.less'
const FormItem = Form.Item;
const {Content} = Layout

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {dispatch,history} = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch(doLogin(values,history))
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        <h1 style={{textAlign:'center'}}>API文档综合管理系统</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('account', {
                rules: [{ required: true, message: '请输入你的账号！' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="account" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的密码！' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住密码</Checkbox>
              )}
              <a className="login-form-forgot" href="">忘记密码</a>
              <Link to='/register' className={"register-form-button"}><Button>注册</Button></Link>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </FormItem>
          </Form>
      </div>
    );
  }
}

export default connect((state)=> {
  const currentLogin = state['login'];
  return currentLogin ? {
    state: currentLogin['state'] || null,
    data: currentLogin['data'] || null,
    error: currentLogin['error'] || null
  }:{
    state: LOADING_STATUS
  }
})(Form.create()(LoginForm))
