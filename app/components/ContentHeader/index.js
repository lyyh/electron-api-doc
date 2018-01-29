/**
 * @author liuyanhao
 * @date 2018-01-28
 * @Description:
 */
import React,{PureComponent,Component} from 'react'
import { Link } from 'react-router-dom';
import { Menu, Icon, Button,Row, Col,Breadcrumb } from 'antd';
export default class ContentHeader extends Component{
  render(){
    const {data,handleEdit} = this.props
    return (
      <div className='manager-members-head'>
        <Breadcrumb>
          <Breadcrumb.Item>{data.rootName}</Breadcrumb.Item>
          <Breadcrumb.Item>{data.name}</Breadcrumb.Item>
        </Breadcrumb>
        <a className='manager-members-add' onClick={handleEdit}>
          <Icon type='plus'/>
          <span>{data.operation}</span>
        </a>
      </div>
    )
  }
}
