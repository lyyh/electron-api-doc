/**
 * @author liuyanhao
 * @date 2018-01-27
 * @Description:
 */
import React,{PureComponent} from 'react'
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { Layout, Menu, Icon, Button,Row, Col } from 'antd';
import MembersManager from './MembersManager/MembersManager'
import DocumentsManager from './DocumentsManager/DocumentsManager'
import AddAPIDocument from './DocumentsManager/AddAPIDocument'
import APIDocumentList from './DocumentsManager/APIDocumentList'
import APIDocOperation from './DocumentsManager/APIDocumentOperation'
import UserIcon from 'components/UserIcon/UserIcon'
import './Manager.less'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
export default class ManagerContainer extends PureComponent{
  static defaultProps = {
    menuKey: 'members'
  }
  state = {
    collapsed: false,
    rootMenuName: '',
    curMenuKey: 'members'
  };
  managerParams = {
    currentPrePath: '',
    user: {},
    apiDoc: {}
  }
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
  getRoutePath(nextPath,prePath){
    return `${prePath}/${nextPath}`
  }
  // handleMenuClick = ({item,key,keyPath}) =>{
  //   const {history} = this.props
  //   const path = this.managerParams.currentPrePath
  //   const targetPath = this.getRoutePath(key,path)
  //   const nextLocation = {
  //     pathname: targetPath,
  //     state:{...this.managerParams}
  //   }
  //   history.push(nextLocation)
  // }
  // componentDidMount(){
  //   const {location,history,menuKey,match} = this.props
  //   this.managerParams.currentPrePath = match.url
  //   const user = location.state.user
  //   const targetPath = this.getRoutePath(menuKey,match.url)
  //
  //   this.managerParams = {...this.managerParams,...{user:user}}
  //   const nextLocation = {
  //     pathname: targetPath,
  //     state: this.managerParams
  //   }
  //   history.push(nextLocation)
  // }

  handleSwitchMenu = ({item,key,keyPath}) => {
      this.setState({
        curMenuKey: key,
        rootMenuKey: keyPath[1]
      })
  }

  render() {
    const {location,match,menuKey} = this.props
    const {uName,uId} = location.state.user
    const {rootMenuName,curMenuKey} = this.state
    const apiDocData = {
      name: 'react'
    }
    return (
      <Layout className='manager-wrapper'>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{ background: '#fff' }}
        >
          <div className="logo" />
          <Menu
            theme="light"
            mode="inline"
            // onClick={this.handleMenuClick}
            onClick={this.handleSwitchMenu}
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="members" >
              <Icon type="user" />
              <span>成员管理</span>
            </Menu.Item>
            <Menu.Item key="addApiDoc">
              <Icon type="new" />
              <span>新建API文档</span>
            </Menu.Item>
            <Menu.Item key="showApiDoc">
              <Icon type="new" />
              <span>查看API文档</span>
            </Menu.Item>
            <SubMenu key="APIDocuments" title={<span><Icon type="appstore" /><span>API 文档管理</span></span>}>
              <Menu.Item key="react">react</Menu.Item>
              <Menu.Item key="vue">vue</Menu.Item>
              <SubMenu key="sub1-2" title="Submenu">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="setting" /><span>Navigation Four</span></span>}>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
            </SubMenu>
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
          <Content style={{ margin: '24px 16px 0', overflowY: 'auto' ,display:'flex'}}>
            <div style={{ padding: 24, background: '#fff',flex:'auto',overflowY:'auto'}}>
              {/*<Route path={`${match.url}/members`} component={MembersManager}/>*/}
              {/*<Route path={`${match.url}/addAPIDoc`} component={AddAPIDocument}/>*/}
              {/*<Route path={`${match.url}/showAPIDoc`} component={APIDocumentList}/>*/}
              {/*<Route path={`${match.url}/apiOperation`} component={APIDocOperation}/>*/}
              {
              curMenuKey==='members'?
              <MembersManager/>:
              curMenuKey==='react'?
              <DocumentsManager
              data={apiDocData}
              rootMenuName={rootMenuName}
              />:
              curMenuKey==='addApiDoc'?
              <AddAPIDocument/>:
              curMenuKey==='showApiDoc'?
              <APIDocumentList/>:
              null
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
