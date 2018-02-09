/**
 * @author liuyanhao
 * @date 2018-01-26
 * @Description:
 */
import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox,Select,Menu,message } from 'antd';
import {doLogin} from "actions/login";
const FormItem = Form.Item;

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

      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: 'Please input your account!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="account" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to='/register'>register now!</Link>
        </FormItem>
      </Form>
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
// const LoginContainer = Form.create()(LoginForm);
// export default LoginContainer
