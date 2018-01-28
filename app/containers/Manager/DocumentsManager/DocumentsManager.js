/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { Menu, Icon, Button,Row, Col,Breadcrumb } from 'antd';
class DocManagerContainer extends Component{
  hanldeEdit = (event) => {
    event.preventDefault()
    console.log('edit')
  }
  render(){
    const {data,rootMenuName} = this.props
    return(
      <section>
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
      </section>
    )
  }
}
export default DocManagerContainer
