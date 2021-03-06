/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox,Select,Menu,Tabs,Card,Dropdown } from 'antd';
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import './UserGroup.less'
import UserGroupEntryContainer from './UserGroupEntry/UserGroupEntry';
import UserIcon from 'components/UserIcon/UserIcon';
import NewUserGroupContainer from './NewUserGroup'
import {LOADING_STATUS} from "mixins/statusMixins";
import {fetchUserGroups} from 'actions/userGroup'
const TabPane = Tabs.TabPane;

class UserGroupContainer extends Component {
  state = {
    selectedTab: 'userGroup'
  }

  handleChange = key => {
    this.setState({
      selectedTab: key
    })
  }

  handleBackAction = () => {
    const targetTab = 'userGroup'
    this.setState({
      selectedTab: targetTab
    })
  }

  componentWillMount(){
    const {dispatch,location} = this.props
    const {key,name} = location.state.user
    dispatch(fetchUserGroups({key}))
  }

  // shouldComponentUpdate(nextProps,nextState){
  //   return false
  // }

  render(){
    const {location,history,data,state,dispatch} = this.props
    const {selectedTab} = this.state
    const {key,name} = location.state.user
    const UserIconHtml = (
      <UserIcon
        history={history}
        user={location.state.user}
      />
    )
    return (
      <section className={'usergroup-container'}>
        <Tabs activeKey={selectedTab} tabBarExtraContent={UserIconHtml} onChange={this.handleChange} type="card" style={{height:"100%"}}>
          <TabPane tab="用户组" key="userGroup">
            <UserGroupEntryContainer
              history={history}
              dispatch={dispatch}
              user={location.state.user}
              data={data}
            />
          </TabPane>
          <TabPane tab="新建用户组" key="newUserGroup">
            <NewUserGroupContainer
              dispatch={dispatch}
              onReturn={this.handleBackAction}
              user={location.state.user}
            />
          </TabPane>
        </Tabs>
      </section>
      )
  }
}

export default connect((state) => {
  const currentUserGroup = state['userGroup']
  return currentUserGroup ? {
    state: currentUserGroup['state'],
    data: currentUserGroup['data'] || [],
    error: currentUserGroup['error']
  }:{
    state: LOADING_STATUS,
    data: [],
    error: null
  }
})(UserGroupContainer)
