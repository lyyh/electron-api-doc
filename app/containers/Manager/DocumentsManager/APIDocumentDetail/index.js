/**
 * @author liuyanhao
 * @date 2018-01-29
 * @Description:
 */
import React,{Component,PureComponent} from 'react'
import { Card,Button,Table, Row,Form,Input,Icon,Tooltip,Col,Menu,Dropdown } from 'antd';
import './APIDocumentDetail.less'
import '../index.less'
const { TextArea } = Input;
const ButtonGroup = Button.Group;
const MenuItem = Menu.Item

class APIDocDetailForm extends PureComponent {
  state = {
    key: '',
    noTitleKey: 'article',
    actionable: false,
    executable: false,
    reqColumns:[{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Description',
      dataIndex: 'description',
      render: (text,record,index) => {
        const {actionable} = this.state
        const {getFieldDecorator} = this.props.form
        return (
          <div>
            <span className={actionable?'api-invisible': ''}>{text}</span>
            <div className={!actionable?'api-invisible': ''}>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Tooltip title="prompt text">
                  <Icon type="question-circle" />
                </Tooltip>} placeholder="Username" />
              )}
            </div>
          </div>
        )
      }
    }],
    resColumns:[{
      title: 'Code',
      dataIndex: 'code',
    }, {
      title: 'resDetail',
      dataIndex: 'message',
      render: (text,record,index) => {
        const {actionable} = this.state
        return (
          <div>
            <span className={actionable?'api-invisible': ''}>{text}</span>
            <div className={!actionable?'api-invisible': ''}>
              <TextArea value={text} placeholder="Autosize height based on content lines" autosize />
            </div>
          </div>
        )
      }
    }],
    reqData:[{
      key: '1',
      name: 'John Brown',
      message: 'asdf'
    }, {
      key: '2',
      name: 'Jim Green',
      message: 'asdf'
    }, {
      key: '3',
      name: 'Joe Black',
      message: 'asdf'
    },{
      key: '4',
      name: 'Joe Black',
      message: 'asdf'
    },{
      key: '5',
      name: 'Joe Black',
      message: 'asdf'
    }],
    resData:[{
      key: '1',
      code: '200',
      message: '{a:1,b:2}'
    },{
      key: '2',
      code: '201',
      message: '{a:1,b:2}'
    }]
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  }

  hanldeAction = (e) => {
    console.log(e)
    e.preventDefault()
    const {actionable} = this.state
    this.setState({
      actionable: !actionable
    })
  }

  handleExecutor = (e) => {
    this.setState({
      executable: true
    })
  }

  handleClear = () =>{
    this.setState({
      executable: false
    })
  }
  render() {
    const {reqColumns,resColumns,reqData,resData,actionable,executable,key} = this.state
    const {data} = this.props
    const {infos,url} = data

    // card tab title
    const tabList = infos.map((item,index)=>{
      return {
        tab: item.method,
        key: item.method
      }
    })

    // method map to html conent
    let cardPaneList = {}
    for(let info of infos){
      const tableList = (
        <Table columns={reqColumns} dataSource={info.params} pagination={false}/>
      )
      cardPaneList[info.method] = (
        <div>
          <h4>Parameters</h4>
          {tableList}
          <Row className={!actionable?'api-invisible': ''} >
            <Col span={executable?12:24}>
              <Button type="primary" style={{width:'100%'}} onClick={this.handleExecutor}>Execute</Button>
            </Col>
            <Col span={12} className={!executable?'api-invisible': ''}>
              <Button style={{width:'100%'}} onClick={this.handleClear}>Clear</Button>
            </Col>
          </Row>
          <div className={!executable?'api-invisible': ''}>
            <Row>
              <Col><h4>Curl</h4></Col>
              <Col><TextArea placeholder="Autosize height based on content lines" autosize /></Col>
            </Row>
            <Row>
              <Col><h4>Request Url</h4></Col>
              <Col><TextArea placeholder="Autosize height based on content lines" autosize /></Col>
            </Row>
          </div>
        </div>
      )
    }

    return (
      <section>
        <Card
          title={<div>{url}<span className='api-detail-description'>this is a db</span></div>}
          extra={<Button onClick={this.hanldeAction}>{actionable?'cancel':'Try it'}</Button>}
          tabList={tabList}
          onTabChange={(key) => { this.onTabChange(key, 'key'); }}
        >
          {key==''?Object.values(cardPaneList)[0]:cardPaneList[key]}
        </Card>
      </section>
    );
  }
}

export default Form.create()(APIDocDetailForm)
