/**
 * @author liuyanhao
 * @date 2018-02-25
 * @Description:
 */
import React,{PureComponent} from 'react'
import { Select, Spin } from 'antd';
// import { connect } from 'react-redux'
import {LOADING_STATUS} from "mixins/statusMixins";
import {fetchSimilarUsers,fetchOver,FETCH_USERS_OVER_ACTION} from "actions/user";
const Option = Select.Option;

export default class UserSelectContainer extends PureComponent {
  render() {
    const { fetching, data,mode,onChange} = this.props;

    return (
      <Select
        mode={mode || 'combobox'}
        labelInValue
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onChange={onChange}
        style={{ width: '100%' }}
      >
        {data.map(d => <Option key={d.key}>{d.name}</Option>)}
      </Select>
    );
  }
}
