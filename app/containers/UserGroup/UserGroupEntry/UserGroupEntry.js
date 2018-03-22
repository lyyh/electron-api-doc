/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import {LOADING_STATUS} from "mixins/statusMixins";
import {fetchUserInfo} from "actions/user";

class UserGroupEntryContainer extends Component{
  params = {
    userGroupKey:''
  }

  handleClick = (e) =>{
    this.params.userGroupKey = e.currentTarget.getAttribute('data-key')
    const {user,dispatch,history} = this.props
    const nextHistory = {
      pathname: '/manager',
      state:{
        user: user,
        userGroup: {
          key: this.params.userGroupKey
        }
      }
    }
    history.push(nextHistory)
  }

  // componentWillReceiveProps(nextProps){
  //   const {data} = nextProps
  //   const {history,user} = this.props
  //   // let nextHistory = null
  //   // if(data && !Array.isArray(data)){
  //   const nextHistory = {
  //       pathname: '/manager',
  //       state:{
  //         user: data,
  //         userGroup: {
  //           key: this.params.userGroupKey
  //         }
  //       }
  //     }
  //     history.push(nextHistory)
  //   // }
  // }

  // shouldComponentUpdate(nextProps,nextState){
  //   const {data} = nextProps
  //   if(data && !Array.isArray(data)){
  //     return false
  //   }
  //   return true
  // }

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

export default UserGroupEntryContainer
