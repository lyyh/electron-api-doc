// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import home from './home'
import login from './login'
import register from './register'
import userGroup from './userGroup'
import user from './user'
import selectUser from './selectUser'

const rootReducer = combineReducers({
  home,
  counter,
  router,
  login,
  register,
  userGroup,
  user,
  selectUser
});

export default rootReducer;
