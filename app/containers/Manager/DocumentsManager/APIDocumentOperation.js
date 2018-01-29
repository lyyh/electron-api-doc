/**
 * @author liuyanhao
 * @date 2018-01-28
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import {Icon, Button,Row, Col,Tabs, Radio  } from 'antd';
import APIDocDetail from './APIDocumentDetail'
const TabPane = Tabs.TabPane;
class APIDocumentOperation extends Component{
  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
    };
  }
  render() {
    const { mode } = this.state;
    // const {data} = this.props
    const data = [{
      name: 'biz',
      key: 'biz',
      list: 'adfdfs'
    },{
      name: 'category',
      key: 'category',
      list: 'adfdfs'
    },{
      name: 'user',
      key: 'user',
      list: 'adfdfs'
    },{
      name: 'aaa',
      key: 'aaa',
      list: 'adfdfs'
    }]
    return (
      <section>
        <Tabs
          defaultActiveKey={data[0].key}
          tabPosition='top'
        >
          {
            data.map((item,index)=>
              <TabPane tab={item.name} key={item.key}>
                <APIDocDetail/>
              </TabPane>
            )
          }
        </Tabs>
      </section>
    );
  }
}
export default APIDocumentOperation
