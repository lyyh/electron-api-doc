// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import home from './home'

const rootReducer = combineReducers({
  home,
  counter,
  router,
});

export default rootReducer;
