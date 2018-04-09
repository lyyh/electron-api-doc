/**
 * @author liuyanhao
 * @date 2018-02-09
 * @Description:
 */
import {CREATE_USERGROUP_ACTION,FETCH_USERGROUPS_ACTION,FETCH_USERS_ACTION,ADD_USERS_ACTION} from 'actions/userGroup'
import {commonReducer} from './common'
import {pushArrayElement} from "./helper";

export default (initialState = {},action) => {
  switch (action.type){
    case CREATE_USERGROUP_ACTION: { // create a userGroup
      return commonReducer(action,initialState)
    }
    case FETCH_USERS_ACTION: { // fetch users of usergroup
      return commonReducer(action,initialState)
    }
    case FETCH_USERGROUPS_ACTION: { // fetch user groups
      return commonReducer(action,initialState)
    }
    case ADD_USERS_ACTION: { // add users
      const {data} = action
      let State = {}
      // if(data){
      //   State['data'] = pushArrayElement(initialState.data,data)
      // }
      return commonReducer(action,initialState)
    }
    default: {
      return initialState
    }
  }
}

