/**
 * @author liuyanhao
 * @date 2018-01-26
 * @Description:
 */
import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox,Select,Menu } from 'antd';
// import {createMemoryHisLocation} from 'utils/historyUtil'
// import {browserHistory} from "react-router";
const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const location = {
          pathname: '/userGroup',
          state: {
            user: {
              uId: values.userName,
              uName: values.userName
            }
          }
        }

        this.props.history.push(location)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (

      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
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

const LoginContainer = Form.create()(LoginForm);
export default LoginContainer
