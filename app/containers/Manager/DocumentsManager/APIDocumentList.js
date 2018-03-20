/**
 * @author liuyanhao
 * @date 2018-01-29
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {Menu, Icon, Button, Row, Col, Breadcrumb, Table, Form} from 'antd';
import APIDocOperaiton from './APIDocumentOperation'
import {LOADING_STATUS} from "mixins/statusMixins";


const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

class APIDocumentContainer extends Component{
  state = {
    columns:[{
      title: 'name',
      dataIndex: 'name',
      render: (text,record,index) => {
        return <a href='#' onClick={() => {
          this.setState({
            apiOperation: true
          })
        }}>{text}</a>
      }
    }, {
      title: 'id',
      dataIndex: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }, {
      title: 'Action',
      dataIndex: 'action',
      render: (item,record,index) => {
        return <a href='#'>编辑</a>
      }
    }],
    data: data,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    apiOperation: false
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  handleAction = (e)=>{
    e.preventDefault()

  }
  componentWillMount(){

  }
  render() {
    const { loading, selectedRowKeys,apiOperation,columns,data } = this.state;
    // const {columns, data} = this.props
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return !apiOperation?(
          <div className="apidoc-scroll-wrapper">
            <div style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                onClick={this.start}
                disabled={!hasSelected}
                loading={loading}
              >
                Reload
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
              </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    ):<APIDocOperaiton/>
  }
}


export default connect((state) => {
  const currentApiDoc = state['apiDoc']
  return currentApiDoc && currentApiDoc['state']?{
    state: currentApiDoc['state'],
    data: currentApiDoc['data'],
    error: currentApiDoc['error']
  }:{
    data: null,
    state: LOADING_STATUS,
    error: null
  }
})(APIDocumentContainer)

// export default APIDocumentContainer
