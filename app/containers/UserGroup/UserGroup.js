/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox,Select,Menu,Tabs } from 'antd';
import {Link} from "react-router-dom";
const TabPane = Tabs.TabPane;

class UserGroupContainer extends Component {
  handleChange = e => {
    console.log(213)
  }
  render(){
    const {location} = this.props
    const {uId,uName} = location.state.user
    return (
      <section>
        <Tabs onChange={this.handleChange} type="card">
          <TabPane tab="Tab 1" key="1">{uId} {uName}</TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
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
