/**
 * @author liuyanhao
 * @date 2018-02-10
 * @Description:
 */
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "../mixins/statusMixins";

// common reducer
export const commonReducer = (action,initialState) => {
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
    ...initialState,
    ...nextState
  }
}
