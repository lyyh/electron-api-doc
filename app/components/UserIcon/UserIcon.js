/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox,Select,Tabs,Card,Dropdown,Avatar,Menu } from 'antd';
import './UserIcon.less';
const {MenuItem} = Menu.Item
class UserIconMenu extends Component{
  handleClick = ({key}) => {
    const {history} = this.props
    const nextLocation = {
      pathname: key,
      state:{}
    }
    history.push(nextLocation)
  }
  render(){
    const {name,key} = this.props.data
    return (
      <Menu onClick={this.handleClick}>
        <MenuItem key="1">{name}</MenuItem>
        <MenuItem key="2">{key}</MenuItem>
        <MenuItem key="/login">退出登录</MenuItem>
      </Menu>
    )
  }
}

class UserIcon extends Component {
  render() {
    const {style,user,history} = this.props
    const {name,key} = user
    const menuHtml = (
      <UserIconMenu
        data={user}
        history={history}
      />
    )
    return (
      <section style={style}>
        <Dropdown overlay={menuHtml} placement="bottomRight">
          <div className="ant-dropdown-link avatar-action" href="#">
            <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
              {name}
            </Avatar>
            <span>{name}</span>
          </div>
        </Dropdown>
      </section>
    )
  }
}
export default UserIcon
