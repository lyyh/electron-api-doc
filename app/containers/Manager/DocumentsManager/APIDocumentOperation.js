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
    const {data} = this.props

    return (
      <section style={{height:'100%'}}>
        <Tabs
          defaultActiveKey={data[0].key}
          tabPosition='top'
          className='apidoc-scroll-wrapper apidoc-tabcard-wrapper'
        >
          {
            data.map((api,index)=>
              <TabPane tab={api.key} key={api.key}>
                <Tabs
                  defaultActiveKey={api.details[0].url}
                  tabPosition='top'
                  className='apidoc-scroll-wrapper apidoc-tabcard-wrapper'
                >
                  {
                    api.details.map((item,index)=>{
                      return (
                        <TabPane tab={item.url} key={item.url}>
                          <APIDocDetail detailData={item}/>
                        </TabPane>
                      )
                    })
                  }
                </Tabs>
              </TabPane>
            )
          }
        </Tabs>
      </section>
    );
  }
}
export default APIDocumentOperation
