/**
 * @author liuyanhao
 * @date 2018-03-07
 * @Description:
 */
import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import SelectRemoteUser from 'components/User/SelectRemoteUser'
class SelectUserContainer extends Component{
  handleChange = (value) => {
    const {dispatch,fetchUserAndSelect} = this.props
    fetchUserAndSelect(value,dispatch)
  }

  render(){
    const {fetching,data,mode} = this.props
    return(
      <SelectRemoteUser
        onChange={this.handleChange}
        fetching={fetching}
        data={data}
        mode={mode}
      />
    )
  }
}

export default connect((state) => {
  const currentSelectUser = state['selectUser']
  return currentSelectUser && currentSelectUser['state']? {
    state: currentSelectUser['state'],
    data: currentSelectUser['data'] || [],
    error: currentSelectUser['error'],
    fetching: currentSelectUser['state'] == 'loading'?true:false
  }:{
    data: [],
    fetching: false
  }
})(SelectUserContainer)
