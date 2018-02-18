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
const { Meta } = Card;

class MembersMannagerContainer extends Component{
  hanldeAddMember = (e) =>{
    e.preventDefault()
    console.log('add')
  }
  componentWillMount(){
    const {dispatch,userGroupKey} = this.props
    dispatch(fetchUsers({key:userGroupKey}))
  }
  render(){
    const {data} = this.props
    return(
      <section className='manageMembersManagerr-members-wrapper'>
        <div className='manager-members-head'>
          <Breadcrumb>
            <Breadcrumb.Item>成员管理</Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <a className='manager-members-add' onClick={this.hanldeAddMember}>
            <Icon type='plus'/>
            <span>添加成员</span>
          </a>
          {/*<Button type="primary" shape="circle" icon="plus" className='manager-members-add'/>*/}
        </div>
        <Row gutter={16} className='manager-members-card-wrapper'>
          {
            data && data.users && data.users.map((item,index)=>{
              return (
                <Col span={8}>
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
      </section>
    )
  }
}

export default connect((state) => {
  const currentMembers = state['userGroup']
  return currentMembers && currentMembers['state']?{
    state: currentMembers['state'],
    data: currentMembers['data'],
    error: currentMembers['error'],
  }:{
    data: null,
    state: LOADING_STATUS,
    error: null
  }
})(MembersMannagerContainer)
// export default MembersMannagerContainer
