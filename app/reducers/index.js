// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import home from './home'
import login from './login'
import register from './register'

const rootReducer = combineReducers({
  home,
  counter,
  router,
  login,
  register
});

export default rootReducer;
