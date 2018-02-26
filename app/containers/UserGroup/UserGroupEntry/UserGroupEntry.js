/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import {LOADING_STATUS} from "mixins/statusMixins";

export default class UserGroupEntryContainer extends Component{
  handleClick = (e) =>{
    const targetKey = e.currentTarget.getAttribute('data-key')
    const {history,user} = this.props
    const newHistory = {
      pathname: '/manager',
      state:{
        user: user,
        userGroup: {
          key: targetKey
        }
      }
    }
    history.push(newHistory)
  }
  render(){
    const {data} = this.props
    return(
      <section>
        {
          data.map((item,index)=>{
            return (
              <Card data-key={item.key} key={item.key} onClick={this.handleClick} key={item.key} hoverable className='ant-card-grid' title={item.name} extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>{item.description}</p>
                <p>{item.description}</p>
                <p>{item.description}</p>
              </Card>
            )
          })
        }
      </section>
    )
  }
}
