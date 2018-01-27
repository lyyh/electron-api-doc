/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Button,Row, Col } from 'antd';
import MembersManager from './MembersManager/MembersManager'
import DocumentsManager from './DocumentsManager/DocumentsManager'
import UserIcon from 'components/UserIcon/UserIcon'
import './Manager.less'

const { Header, Content, Footer, Sider } = Layout;
export default class ManagerContainer extends Component{
  state = {
    collapsed: false,
    activedMenu: 'members'
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  toUserGroup = () => {
    const {history,location} = this.props
    const newHistory = {
      pathname: '/userGroup',
      state: {
        user: location.state.user
      }
    }
    history.push(newHistory)
  }
  handleMenuClick = ({key}) =>{
    this.setState({
      activedMenu: key
    })
  }
  render() {
    const {location,histroy} = this.props
    const {uName,uId} = location.state.user
    const {activedMenu} = this.state
    return (
      <Layout className='manager-wrapper'>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" onClick={this.handleMenuClick} defaultSelectedKeys={['1']}>
            <Menu.Item key="members" >
              <Icon type="user" />
              <span>成员管理</span>
            </Menu.Item>
            <Menu.Item key="apiDocuments">
              <Icon type="video-camera" />
              <span>API 文档管理</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <UserIcon
              style={{float:'right'}}
              user={location.state.user}
            />
            <Button
              style={{float:'right',marginTop:'18px'}}
              onClick={this.toUserGroup}>
              切换用户组
            </Button>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' ,display:'flex'}}>
            <div style={{ padding: 24, background: '#fff',flex:'auto'}}>
              {/*...*/}
              {/*<br />*/}
              {/*Really*/}
              {/*<br />...<br />...<br />...<br />*/}
              {/*long*/}
              {/*<br />...<br />...<br />...<br />...<br />...<br />...*/}
              {/*<br />...<br />...<br />...<br />...<br />...<br />...*/}
              {/*<br />...<br />...<br />...<br />...<br />...<br />...*/}
              {/*<br />...<br />...<br />...<br />...<br />...<br />...*/}
              {/*<br />...<br />...<br />...<br />...<br />...<br />...*/}
              {/*<br />...<br />...<br />...<br />...<br />...<br />...*/}
              {/*<br />...<br />...<br />...<br />...<br />...<br />*/}
              {/*content*/}
              {
                activedMenu==='members'?<MembersManager/>:
                  activedMenu==='apiDocuments'?<DocumentsManager/>:null
              }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
