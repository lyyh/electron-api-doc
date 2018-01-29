/**
 * @author liuyanhao
 * @date 2018-01-29
 * @Description:
 */
import React,{PureComponent} from 'react'
import { Card,Button,Table, Row,Form } from 'antd';
import './APIDocumentDetail.less'
import '../index.less'

const tabList = [{
  key: 'get',
  tab: 'get'
}, {
  key: 'post',
  tab: 'post'
}, {
  key: 'put',
  tab: 'put'
}, {
  key: 'delete',
  tab: 'delete'
}];

const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

const contentListNoTitle = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};

class APIDocDetailForm extends PureComponent {
  state = {
    key: 'tab1',
    noTitleKey: 'article',
    actionable: false,
    columns:[{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Description',
      dataIndex: 'detail',
      render: (text,record,index) => {
        const {actionable} = this.state
        const {getFieldDecorator} = this.props
        return (
          <div>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </div>
        )
      }
    }],
    data:[{
      key: '1',
      name: 'John Brown',
      detail: 'asdf'
    }, {
      key: '2',
      name: 'Jim Green',
      detail: 'asdf'
    }, {
      key: '3',
      name: 'Joe Black',
      detail: 'asdf'
    }]
  }
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  }
  render() {
    const {columns,data} = this.state
    const {getFieldDecorator} = this.props
    return (
      <section>
        <Card
          style={{ width: '100%' }}
          title={<p>dbs<span className='api-detail-description'>this is a db</span></p>}
          extra={<Button>Try it</Button>}
          tabList={tabList}
          onTabChange={(key) => { this.onTabChange(key, 'key'); }}
        >
          <Table columns={columns} dataSource={data} pagination={false}/>
          {/*{contentList[this.state.key]}*/}
        </Card>
      </section>
    );
  }
}
export default Form.create()(APIDocDetailForm)
