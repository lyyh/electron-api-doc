/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Card } from 'antd';
import { Link } from 'react-router-dom';

export default class UserGroupEntryContainer extends Component{
  handleClick = (e) =>{
    const {history,user} = this.props
    const newHistory = {
      pathname: '/manager',
      state:{
        user: user
      }
    }
    history.push(newHistory)
  }
  render(){
    return(
      <section>
        <Card hoverable className='ant-card-grid' title="Card title" extra={<a href="#">More</a>} style={{ width: 300 }}
          onClick={this.handleClick}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card hoverable className='ant-card-grid ant-card-grid-point' title="Card title" extra={<a href="#">More</a>} style={{ width: 300 }}
          onClick={this.handleClick}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </section>
    )
  }
}
