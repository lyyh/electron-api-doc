/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox,Select,Menu,Tabs,Card,Dropdown } from 'antd';
import {Link} from "react-router-dom";
import './UserGroup.less'
import UserGroupEntryContainer from './UserGroupEntry/UserGroupEntry'
import UserIcon from '../../components/UserIcon/UserIcon'
const TabPane = Tabs.TabPane;

class UserGroupContainer extends Component {
  handleChange = e => {
    console.log(213)
  }
  render(){
    const {location,history} = this.props
    const {uId,uName} = location.state.user
    const UserIconHtml = (
      <UserIcon
        user={location.state.user}
      />
    )
    return (
      <section>
        <Tabs tabBarExtraContent={UserIconHtml} onChange={this.handleChange} type="card">
          <TabPane tab="用户组" key="userGroup">
            <UserGroupEntryContainer
              history={history}
            />
          </TabPane>
          <TabPane tab="创建用户组" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
        </Tabs>
        <Button type='primary' onClick={()=>{
          this.props.history.push('/login')
        }}>返回登录界面</Button>
      </section>
      )
  }
}

export default UserGroupContainer
