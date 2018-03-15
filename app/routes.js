import React from 'react'
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Home from './containers/Home/Home'
import LoginContainer from './containers/Login';
import RegisterContainer from './containers/Register'
import UserGroupContainer from './containers/UserGroup/UserGroup';
import ManagerContainer from './containers/Manager'
import APIDocOperaContainer from './containers/Manager/DocumentsManager/APIDocumentOperation'
import EditAPIDocument from './containers/Document/EditAPIDocument'

export default () => (
  <App>
    <Switch>
      <Route path='/editApiDocument' component={EditAPIDocument} />
      <Route path="/apiDocOperation" component={APIDocOperaContainer} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/manager" component={ManagerContainer}/>
      <Route path="/userGroup" component={UserGroupContainer}/>
      <Route path="/register" component={RegisterContainer}/>
      <Route path="/login" component={LoginContainer}/>
      <Route path="/" component={LoginContainer} />
    </Switch>
  </App>
);
