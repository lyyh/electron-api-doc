/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { Menu, Icon, Button,Row, Col,Breadcrumb,Card } from 'antd';
import APIDocDetail from './APIDocumentDetail'
import './index.less'
class APIDocEntryContainer extends Component{
  state = {
    activateEntry: false
  }
  hanldeEdit = (event) => {
    event.preventDefault()
    console.log('edit')
  }
  handleEntry = () => {
    this.setState({
      activateEntry: true
    })
  }
  render(){
    const {data,rootMenuName} = this.props
    const {activateEntry} = this.state
    return(
      !activateEntry?
        <section className="apidoc-scroll-wrapper">
          <div className='manager-members-head'>
            <Breadcrumb>
              <Breadcrumb.Item>{rootMenuName}</Breadcrumb.Item>
              <Breadcrumb.Item>{data.name}</Breadcrumb.Item>
            </Breadcrumb>
            <a className='manager-members-add' onClick={this.hanldeEdit}>
              <Icon type='plus'/>
              <span>编辑</span>
            </a>
          </div>
          <Row gutter={10} className='apidoc-entry-wrapper'>
            <Col span={8}>
              <Card hoverable title="Card title" bordered={false} className='ant-card-grid apidoc-entry-item' onClick={this.handleEntry}>Card content</Card>
            </Col>
            <Col hoverable span={8}>
              <Card title="Card title" bordered={false} className='ant-card-grid apidoc-entry-item' onClick={this.handleEntry}>Card content</Card>
            </Col>
            <Col hoverable span={8}>
              <Card title="Card title" bordered={false} className='ant-card-grid apidoc-entry-item' onClick={this.handleEntry}>Card content</Card>
            </Col>
          </Row>
        </section>:
        <section className="apidoc-scroll-wrapper">
          <APIDocDetail/>
        </section>
    )
  }
}
export default APIDocEntryContainer
