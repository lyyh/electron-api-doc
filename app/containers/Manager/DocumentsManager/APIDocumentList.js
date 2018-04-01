/**
 * @author liuyanhao
 * @date 2018-01-29
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {Menu, Icon, Button, Row, Col, Breadcrumb, Table, Form,message} from 'antd';
import APIDocOperaiton from './APIDocumentOperation'
import {LOADING_STATUS} from "mixins/statusMixins";
import {fetchApiDocs,deleteApiDoc,deleteApiDocsBatch} from 'actions/apiDoc'

class APIDocumentContainer extends Component{
  state = {
    apisData: null,
    columns:[{
      title: 'name',
      dataIndex: 'name',
      render: (text,record,index) => {
        return <a href='#' onClick={() => {
          this.setState({
            apiOperation: true,
            apisData: record.apis
          })
        }}>{text}</a>
      }
    },{
      title: 'description',
      dataIndex: 'description',
    }, {
      title: 'Action',
      dataIndex: 'action',
      render: (text,record,index) => {
        const {dispatch} = this.props
        const {key} = record
        return <div><a className='apidoc-list-action'>编辑</a><a onClick={()=>{dispatch(deleteApiDoc({key}))}}>删除</a></div>
      }
    }],
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    apiOperation: false
  };
  deleteBatch = () => {
    const {selectedRowKeys} = this.state
    const {dispatch} = this.props
    dispatch(deleteApiDocsBatch({
      keys: selectedRowKeys
    }))
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  handleAction = (e)=>{
    e.preventDefault()
  }
  componentWillMount(){
    const {dispatch,userGroupKey} = this.props
    dispatch(fetchApiDocs(null,userGroupKey))
  }
  render() {
    const { loading, selectedRowKeys,apiOperation,columns,apisData } = this.state;
    let { data } = this.props
    // prevent throw TypeError for table
    if(!Array.isArray(data))data = []

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
                onClick={this.deleteBatch}
                disabled={!hasSelected}
                loading={loading}
              >
                批量删除
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
              </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data?data:[]} />
        </div>
    ):<APIDocOperaiton data={apisData}/>
  }
}

// FIXME: throw exception after add api doc
export default connect((state) => {
  const currentApiDoc = state['apiDoc']
  return currentApiDoc && currentApiDoc['state']?{
    state: currentApiDoc['state'],
    data: currentApiDoc['data'] || [],
    error: currentApiDoc['error']
  }:{
    data: [],
    state: LOADING_STATUS,
    error: null
  }
})(APIDocumentContainer)

