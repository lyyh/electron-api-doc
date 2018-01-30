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
  handleClick = ({key}) => {
    console.log(key)
    const {history} = this.props
    const nextLocation = {
      pathname: key,
      state:{}
    }
    history.push(nextLocation)
  }
  render(){
    const {uName,uId} = this.props
    return (
      <Menu onClick={this.handleClick}>
        <Item key="1">uName</Item>
        <Item key="2">uId</Item>
        <Item key="/login">退出登录</Item>
      </Menu>
    )
  }
}

class UserIcon extends Component {
  render() {
    const {style,user,history} = this.props
    const {uName,uId} = user
    const menuHtml = (
      <UserIconMenu
        history={history}
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
