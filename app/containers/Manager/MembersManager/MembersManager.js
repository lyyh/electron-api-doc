/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { Menu, Icon, Button,Row, Col,Breadcrumb,Card,Avatar } from 'antd';
import '../Manager.less'
const { Meta } = Card;

class MembersMannagerContainer extends Component{
  render(){
    return(
      <section className='manager-members-wrapper'>
        <div className='manager-members-head'>
          <Breadcrumb>
            <Breadcrumb.Item>成员管理</Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <Button type="primary" shape="circle" icon="plus" className='manager-members-add'/>
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
export default MembersMannagerContainer
