/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Button,Row, Col } from 'antd';
import UserIcon from 'components/UserIcon/UserIcon'

const { Header, Content, Footer, Sider } = Layout;
export default class ManagerContainer extends Component{
  state = {
    collapsed: false,
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
  render() {
    const {location,histroy} = this.props
    const {uName,uId} = location.state.user
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
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
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              ...
              <br />
              Really
              <br />...<br />...<br />...<br />
              long
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />
              content
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
