/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox,Select,Tabs,Card,Dropdown,Avatar,Menu } from 'antd';
import './UserIcon.less';
const {Item} = Menu

class UserIconMenu extends Component{
  onClick = ({key}) => {
    message.info(`Click on item ${key}`);
  }
  render(){
    const {uName,uId} = this.props
    return (
      <Menu onClick={this.onClick}>
        <Item key="1">uName</Item>
        <Item key="2">uId</Item>
        <Item key="3">退出登录</Item>
      </Menu>
    )
  }
}

class UserIcon extends Component {
  render() {
    const {style,user} = this.props
    const {uName,uId} = user
    const menuHtml = (
      <UserIconMenu/>
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
