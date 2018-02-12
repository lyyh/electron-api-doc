/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {fetchUser} from "actions/userGroup";
import { Menu, Icon, Button,Row, Col,Breadcrumb,Card,Avatar } from 'antd';
import './index.less'
const { Meta } = Card;

class MembersMannagerContainer extends Component{
  hanldeAddMember = (e) =>{
    e.preventDefault()
    console.log('add')
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(fetchUser({key:'123'}))
  }
  render(){
    const {data} = this.props
    const {users} = data
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
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
        </Row>
      </section>
    )
  }
}

export default connect((state) => {
  const currentMembers = state['userGroup']
  return currentMembers && currentMembers['state']?{
    state: currentMembers['state'],
    data: currentMembers['data'] || [],
    error: currentMembers['error'],
  }:{
    data: []
  }
})(MembersMannagerContainer)
// export default MembersMannagerContainer
