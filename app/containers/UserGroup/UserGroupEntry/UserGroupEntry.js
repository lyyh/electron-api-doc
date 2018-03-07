/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import {LOADING_STATUS} from "mixins/statusMixins";
import {fetchUserInfo} from "actions/user";

class UserGroupEntryContainer extends Component{
  handleClick = (e) =>{
    const targetKey = e.currentTarget.getAttribute('data-key')
    const {user,dispatch} = this.props
    dispatch(fetchUserInfo({
      key: user.key,
      userGroupKey: targetKey
    }))
    // const {history,user} = this.props
    // const nextHistory = {
    //   pathname: '/manager',
    //   state:{
    //     user: user,
    //     userGroup: {
    //       key: targetKey
    //     }
    //   }
    // }
    // history.push(nextHistory)
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

export default connect((state) => {
  const currentUser = state['user']
  return currentUser && currentUser['state']? {
    state: currentUser['state'],
    data: currentUser['data'] || [],
    error: currentUser['error'],
  }:{
    data: []
  }
})(UserGroupEntryContainer)
