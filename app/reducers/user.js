/**
 * @author liuyanhao
 * @date 2018-02-09
 * @Description:
 */
import {FETCH_USERS_ACTION,FETCH_ALL_USERS_ACTION} from 'actions/user'
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "../mixins/statusMixins";
import {FETCH_SIMILAR_USERS_ACTION,FETCH_USERS_OVER_ACTION} from "../actions/user";

export default (state = null,action) => {
  switch (action.type){
    case FETCH_ALL_USERS_ACTION: { // new userGroup
      let nextState = {}
      if(action.state == SUCCESS_STATUS){
        nextState = {
          state: SUCCESS_STATUS,
          data: action.data,
          error: null
        }
      }else if(action.state == ERROR_STATUS){
        nextState = {
          state: ERROR_STATUS,
          error: action.error,
          data: null
        }
      }else {
        nextState = {
          state: LOADING_STATUS
        }
      }
      return {
        ...state,
        ...nextState
      }
    }
    case FETCH_SIMILAR_USERS_ACTION: {
      let nextState = {}
      if(action.state == SUCCESS_STATUS){
        nextState = {
          state: SUCCESS_STATUS,
          data: action.data,
          error: null
        }
      }else if(action.state == ERROR_STATUS){
        nextState = {
          state: ERROR_STATUS,
          error: action.error,
          data: null
        }
      }else {
        nextState = {
          state: LOADING_STATUS,
          data: null,
          error: null
        }
      }
      return {
        ...state,
        ...nextState
      }
    }
    case FETCH_USERS_OVER_ACTION: {
      const nextState = {
        state: SUCCESS_STATUS,
        data: [],
        error: null
      }
      return {
        ...state,
        ...nextState
      }
    }
    default: {
      return state
    }
  }
}
