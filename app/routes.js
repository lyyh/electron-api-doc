import React from 'react'
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Home from './containers/Home/Home'
import LoginContainer from './containers/Login/Login'
import UserGroupContainer from './containers/UserGroup/UserGroup'
import ManagerContainer from './containers/Manager/Manager'

export default () => (
  <App>
    <Switch>
      <Route path="/manager" component={ManagerContainer}/>
      <Route path="/userGroup" component={UserGroupContainer}/>
      <Route path="/login" component={LoginContainer}/>
      <Route path="/home" component={Home}/>
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
