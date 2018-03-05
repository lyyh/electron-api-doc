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
const Option = Select.Option;

class UserSelectContainer extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    value: []
  }

  handleChange = (value) => {
    const {dispatch,fetchUserAndSelect} = this.props
    fetchUserAndSelect(value,dispatch)
  }

  render() {
    const { fetching, data,mode} = this.props;

    return (
      <Select
        mode={mode || 'combobox'}
        labelInValue
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onChange={this.handleChange}
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
