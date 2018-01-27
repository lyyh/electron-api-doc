import React from 'react'
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Home from './containers/Home/Home'
import LoginContainer from './containers/Login/Login'

export default () => (
  <App>
    <Switch>
      <Route path="/login" component={LoginContainer}/>
      <Route path="/home" component={Home}/>
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
