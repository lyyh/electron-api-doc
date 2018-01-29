/**
 * @author liuyanhao
 * @date 2018-01-29
 * @Description:
 */
import React from 'react'
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Home from './containers/Home/Home'
import LoginContainer from './containers/Login/Login';
import UserGroupContainer from './containers/UserGroup/UserGroup';
import ManagerContainer from './containers/Manager'
import APIDocOperaContainer from './containers/Manager/DocumentsManager/APIDocumentOperation'

export default () => (
  <App>
    <Switch>
      <Route path="/apiDocOperation" component={APIDocOperaContainer} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/manager" component={ManagerContainer}/>
      <Route path="/userGroup" component={UserGroupContainer}/>
      <Route path="/login" component={LoginContainer}/>
      <Route path="/" component={LoginContainer} />
    </Switch>
  </App>
)
