/**
 * @author liuyanhao
 * @date 2018-02-09
 * @Description:
 */
import {CREATE_USERGROUP_ACTION,FETCH_USERS_ACTION} from 'actions/userGroup'
import {commonReducer} from './common'

export default (initialState = {},action) => {
  switch (action.type){
    case CREATE_USERGROUP_ACTION: { // new userGroup
      return commonReducer(action,initialState)
    }
    case FETCH_USERS_ACTION: { // fetch a userGroup
      return commonReducer(action,initialState)
    }
    default: {
      return initialState
    }
  }
}

