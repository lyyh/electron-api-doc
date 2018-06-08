/**
 * @author liuyanhao
 * @date 2018-01-30
 * @Description:
 */
import React,{PureComponent} from 'react'
import { Select, Spin } from 'antd';
import { connect } from 'react-redux'
import {LOADING_STATUS} from "mixins/statusMixins";
import {fetchSimilarUsers,fetchOver,FETCH_USERS_OVER_ACTION} from "actions/user";
import {debounce} from 'lodash';
import {SUCCESS_STATUS} from "../../../mixins/statusMixins";
const Option = Select.Option;
const dbDatas = ['asdf','qwer','zcxv']

class UserSelectContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }
  state = {
    value: []
  }
  // 请求用户数据
  fetchUser = (value) => {
    const {dispatch,user} = this.props
    const {key,name} = user
    const params = {
      queryParams:JSON.stringify({
        name:value
      }),
      userName: user.name
    }
    // 调用fetchSimilarUsers方法来实现模糊查询
    dispatch(fetchSimilarUsers(params))
  }
  // 处理change事件
  handleChange = (value) => {
    const {dispatch} = this.props
    this.setState({
      value
    });
    // 事件完成
    dispatch({
      type: FETCH_USERS_OVER_ACTION,
      state: SUCCESS_STATUS
    })
  }
  render() {
    const { fetching, data,handleSelectChange} = this.props;
    const {value} = this.state

    return (
      <Select
        mode="multiple"
        labelInValue
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={handleSelectChange}
        style={{ width: '100%' }}
      >
        <Option key={'123'}>123</Option>
        <Option key={'321'}>321</Option>
        <Option key={'liuyanhao'}>liuyanhao</Option>
        <Option key={'admin'}>admin</Option>
      </Select>
    );
  }
}

export default connect((state) => {
  const currentUser = state['user']
  return currentUser && currentUser['state']? {
      state: currentUser['state'],
      data: currentUser['data'] || [],
      error: currentUser['error'],
      fetching: currentUser['state'] == 'loading'?true:false
  }:{
    data: [],
    fetching: false
  }
})(UserSelectContainer)
