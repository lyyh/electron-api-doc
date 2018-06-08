/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {fetchUserInfo} from "actions/user";
import { Menu, Icon, Button,Row, Col,Breadcrumb,Card,Avatar } from 'antd';
import './index.less'
import {LOADING_STATUS} from "../../../mixins/statusMixins";
import NewMember from './NewMember'
import DeleteMember from './DeleteMember'
const { Meta } = Card;
const BreadcrumbItem = Breadcrumb.Item

class MembersMannagerContainer extends Component{
  state={
    addFlag: false,
    deleteFlag: false
  }

  clickAddMember = (e) =>{
    this.setState({
      addFlag: true
    })
  }
  clickDeleteMember = (e) => {
    this.state({
      deleteFlag: true
    })
  }

  clickMemberManage = (e) => {
    this.setState({
      addFlag: false,
      deleteFlag: false
    })
  }

  componentWillMount(){
    const {user,userGroupKey,dispatch} = this.props
    dispatch(fetchUserInfo({
      key: user.key,
      userGroupKey: userGroupKey
    }))
  }

  render(){
    const {addFlag,deleteFlag} = this.state
    const {data,dispatch,userGroupKey} = this.props
    return(
      <section className='manage-members-wrapper'>
        <div className='manager-members-head'>
          <Breadcrumb>
            <BreadcrumbItem><a onClick={this.clickMemberManage}>成员管理</a></BreadcrumbItem>
            <BreadcrumbItem>{addFlag?'添加成员':''}</BreadcrumbItem>
            <BreadcrumbItem>{deleteFlag?"删除成员":""}</BreadcrumbItem>
          </Breadcrumb>
          {addFlag||deleteFlag?"":<a className='manager-members-add' onClick={this.clickAddMember}>
            <Icon type='plus'/>
            <span>添加成员</span>
          </a>}
          {deleteFlag||addFlag?"":<a className='manager-members-delete' onClick={this.clickDeleteMember}>
            <Icon type='minus'/>
            <span>删除成员</span>
          </a>}
        </div>
        {
            addFlag?
              <NewMember userGroupKey={userGroupKey} user={data} dispatch={dispatch}/>:
              deleteFlag?
                <DeleteMember userGroupKey={userGroupKey} user={data} dispathc={dispatch}/>:
                  <MembersContainer data={data} userGroupKey={userGroupKey}/>
        }
      </section>
    )
  }
}

class MembersContainer extends Component{
  getMembersFromUserGroup = (data,userGroupKey) => {
    if(!data||!data.userGroups)return data
    for(let userItem of data.userGroups){
      if(userItem.key==userGroupKey){
        return userItem.users
      }
    }
  }

  render(){
    const {data,userGroupKey} = this.props
    let members = this.getMembersFromUserGroup(data,userGroupKey)
    return (
      <Row gutter={16} className='manager-members-card-wrapper'>
        {
          members && members.map((item,index)=>{
            return (
              <Col span={8} key={item.key}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                  <Meta
                    title={item.name}
                    description={item.permission=='0'?'成员':'管理员'}
                  />
                </Card>
              </Col>
            )
          })
        }
      </Row>
    )
  }
}

export default connect((state) => {
  const currentUser = state['user']
  return currentUser && currentUser['state']?{
    state: currentUser['state'],
    data: currentUser['data'],
    error: currentUser['error']
  }:{
    data: null,
    state: LOADING_STATUS,
    error: null
  }
})(MembersMannagerContainer)
