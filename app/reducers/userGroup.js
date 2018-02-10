/**
 * @author liuyanhao
 * @date 2018-02-09
 * @Description:
 */
import {NEW_USERGROUP_ACTION} from 'actions/userGroup'
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "../mixins/statusMixins";

export default (state = {},action) => {
  switch (action.type){
    case NEW_USERGROUP_ACTION: { // new userGroup
      let nextState = {}
      if(action.state == SUCCESS_STATUS){
        nextState = {
          state: SUCCESS_STATUS,
          data: action.data
        }
      }else if(action.state == ERROR_STATUS){
        nextState = {
          state: ERROR_STATUS,
          error: action.error
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
    default: {
      return state
    }
  }
}

