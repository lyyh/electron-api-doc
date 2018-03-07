/**
 * @author liuyanhao
 * @date 2018-02-09
 * @Description:
 */
import {FETCH_USERS_ACTION,FETCH_ALL_USERS_ACTION} from 'actions/user'
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "../mixins/statusMixins";
import {
  FETCH_SIMILAR_USERS_ACTION,
  FETCH_USERS_OVER_ACTION,
  FETCH_USER_GROUPS_ACTION,
  FETCH_USER_INFORMATION_ACTION} from "../actions/user";
import {commonReducer} from "./common";

export default (initialState = {},action) => {
  switch (action.type){
    case FETCH_ALL_USERS_ACTION: {
      return commonReducer(action,initialState)
    }
    // case FETCH_SIMILAR_USERS_ACTION: {
    //   return commonReducer(action,initialState)
    // }
    case FETCH_USERS_OVER_ACTION: {
      const nextState = {
        state: SUCCESS_STATUS,
        data: [],
        error: null
      }
      return {
        ...initialState,
        ...nextState
      }
    }
    case FETCH_USER_GROUPS_ACTION: {
      return commonReducer(action,initialState)
    }
    case FETCH_USER_INFORMATION_ACTION: {
      return commonReducer(action,initialState)
    }
    default: {
      return initialState
    }
  }
}
