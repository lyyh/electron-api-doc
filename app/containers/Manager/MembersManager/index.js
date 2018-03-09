/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {fetchUsers} from "actions/userGroup";
import { Menu, Icon, Button,Row, Col,Breadcrumb,Card,Avatar } from 'antd';
import './index.less'
import {LOADING_STATUS} from "../../../mixins/statusMixins";
import NewMember from './NewMember'
const { Meta } = Card;
const BreadcrumbItem = Breadcrumb.Item

class MembersMannagerContainer extends Component{
  state={
    addFlag: false
  }
  hanldeAddMember = (e) =>{
    e.preventDefault()
    this.setState({
      addFlag: true
    })
    console.log('add')
  }
  componentWillMount(){
    const {dispatch,userGroupKey} = this.props
    dispatch(fetchUsers({key:userGroupKey}))
  }
  render(){
    const {data,userData,dispatch} = this.props
    const {addFlag} = this.state
    return(
      <section className='manageMembersManagerr-members-wrapper'>
        <div className='manager-members-head'>
          <Breadcrumb>
            <BreadcrumbItem>成员管理</BreadcrumbItem>
            <BreadcrumbItem>{addFlag?'添加成员':''}</BreadcrumbItem>
          </Breadcrumb>
          <a className='manager-members-add' onClick={this.hanldeAddMember}>
            <Icon type='plus'/>
            <span>添加成员</span>
          </a>
        </div>
        {
          addFlag?<NewMember userGroup={data} user={userData} dispatch={dispatch}/>:<MembersContainer data={data}/>
        }
      </section>
    )
  }
}

class MembersContainer extends Component{
  render(){
    const {data} = this.props
    return (
      <Row gutter={16} className='manager-members-card-wrapper'>
        {
          data && data.users && data.users.map((item,index)=>{
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
  const currentMembers = state['userGroup']
  const currentUser = state['user']
  return currentMembers && currentUser && currentMembers['state']?{
    state: currentMembers['state'],
    data: currentMembers['data'],
    userData: currentUser['data'] || null,
    error: currentMembers['error'],
  }:{
    data: null,
    state: LOADING_STATUS,
    error: null
  }
})(MembersMannagerContainer)
// export default MembersMannagerContainer
