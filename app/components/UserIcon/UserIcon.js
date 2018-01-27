/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox,Select,Menu,Tabs,Card,Dropdown,Avatar } from 'antd';
import {Link} from "react-router-dom";
import './UserIcon.less'

class UserIconMenu extends Component{
  onClick = ({key}) => {
    message.info(`Click on item ${key}`);
  }
  render(){
    const {uName,uId} = this.props
    return (
      <Menu onClick={this.onClick}>
        <Menu.Item key="1">uName</Menu.Item>
        <Menu.Item key="2">uId</Menu.Item>
        <Menu.Item key="3">退出登录</Menu.Item>
      </Menu>
    )
  }
}

class UserIcon extends Component {
  render() {
    const {style,user} = this.props
    const {uName,uId} = user
    const menuHtml = (
      <UserIconMenu
        user={this.props.user}
      />
    )
    return (
      <section style={style}>
        <Dropdown overlay={menuHtml} placement="bottomRight">
          <div className="ant-dropdown-link avatar-action" href="#">
            <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
              {uName}
            </Avatar>
            <span>{uName}</span>
          </div>
        </Dropdown>
      </section>
    )
  }
}
export default UserIcon
