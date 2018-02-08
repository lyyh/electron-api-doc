/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
import {REGISTER_ACTION} from 'actions/register'
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "../mixins/statusMixins";

export default (state = {},action) => {
  switch (action.type){
    case REGISTER_ACTION: { // registering
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
