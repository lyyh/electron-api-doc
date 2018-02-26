/**
 * @author liuyanhao
 * @date 2018-02-25
 * @Description:
 */
import React,{PureComponent} from 'react'
import { Select, Spin } from 'antd';
import { connect } from 'react-redux'
import {LOADING_STATUS} from "mixins/statusMixins";
import {fetchSimilarUsers,fetchOver,FETCH_USERS_OVER_ACTION} from "actions/user";
import {debounce} from 'lodash';
import {SUCCESS_STATUS} from "../../mixins/statusMixins";
const Option = Select.Option;

class UserSelectContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }
  state = {
    value: []
  }
  fetchUser = (value) => {
    const {dispatch,user} = this.props
    const {key,name} = user
    const params = {
      queryParams:JSON.stringify({
        name:value
      }),
      userName: user.name
    }
    dispatch(fetchSimilarUsers(params))
  }
  handleChange = (value) => {
    const {dispatch} = this.props
    this.setState({
      value
    });
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
        /*value={value}*/
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={handleSelectChange}
        style={{ width: '100%' }}
      >
        {data.map(d => <Option key={d.key}>{d.name}</Option>)}
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
