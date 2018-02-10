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
  // componentWillMount(){
  //   const {dispatch} = this.props
  //   dispatch(fetchAllUsers())
  // }
  fetchUser = (value) => {
    const {dispatch} = this.props
    const params = {
      name: value
    }
    dispatch(fetchSimilarUsers(params))
    // console.log('fetching user', value);
    // this.lastFetchId += 1;
    // const fetchId = this.lastFetchId;
    // this.setState({ data: [], fetching: true });
    // fetch('https://randomuser.me/api/?results=5')
    //   .then(response => response.json())
    //   .then((body) => {
    //     if (fetchId !== this.lastFetchId) { // for fetch callback order
    //       return;
    //     }
    //     const data = body.results.map(user => ({
    //       text: `${user.name.first} ${user.name.last}`,
    //       value: user.login.username,
    //     }));
    //     this.setState({ data, fetching: false });
    //   });
    // if(dbDatas.indexOf(value)>=0)
    //   this.setState({
    //     data: [{
    //       value: value,
    //       text: value
    //     }],
    //     fetching: false
    // })
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
  return currentUser ? {
      state: currentUser['state'],
      data: currentUser['data'] || [],
      error: currentUser['error'],
      fetching: currentUser['state'] == 'loading'?true:false
  }:{
    data: [],
    fetching: false
  }
})(UserSelectContainer)
