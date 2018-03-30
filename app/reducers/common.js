/**
 * @author liuyanhao
 * @date 2018-02-10
 * @Description:
 */
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS,OPERATION_SUCCESS_STATUS} from "../mixins/statusMixins";

// common reducer
export const commonReducer = (action,initialState,State) => {
  let nextState = {}
  let replaceState = {}

  if(action.state == SUCCESS_STATUS){
    if(State && State.success) replaceState = {
      state: State.success
    }
    if(State && State.data) replaceState = {
      ...replaceState,
      data: State.data
    }

    nextState = {
      state: SUCCESS_STATUS,
      data: action.data,
      error: null,
      ...replaceState
    }
  }else if(action.state == ERROR_STATUS){
    if(State && State.error) replaceState = {
      state: State.error
    }
    if(State && State.data) replaceState = {
      ...replaceState,
      data: State.data
    }

    nextState = {
      state: ERROR_STATUS,
      error: action.error,
      data: null,
      ...replaceState
    }
  }else {
    nextState = {
      ...initialState,
      state: LOADING_STATUS,
      // data: null,
      // error: null
    }
  }
  return {
    ...initialState,
    ...nextState
  }
}
