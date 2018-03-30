/**
 * @author liuyanhao
 * @date 2018-03-11
 * @Description:
 */
import {CREATE_APIDOC_ACTION,FETCH_APIDOC_ACTION,ADD_APIDOC_ACTION,RESET_APIDOC_STATE_ACTION,DELETE_APIDOC_ACTION} from "actions/apiDoc";
import {OPERATION_SUCCESS_STATUS} from '../mixins/statusMixins'
// import Immutable from 'immutable'
import {commonReducer} from './common'
import {deleteArrayElement} from "./helper";
// import {DELETE_APIDOC_ACTION} from "../actions/apiDoc";

// initialState is the state of current apiDoc
export default (initialState = {},action) => {
  // const immutableState = Immutable.fromJS()
  switch (action.type){
    case CREATE_APIDOC_ACTION:{
      return commonReducer(action,initialState,{
        success: OPERATION_SUCCESS_STATUS
      })
    }
    case ADD_APIDOC_ACTION: {
      return commonReducer(action,initialState)
    }
    case FETCH_APIDOC_ACTION: {
      return commonReducer(action,initialState)
    }
    case RESET_APIDOC_STATE_ACTION: {
      return commonReducer(action,initialState)
    }
    case DELETE_APIDOC_ACTION: {
      const {data} = action
      let State = {}
      if(data){
        State['data'] = deleteArrayElement(initialState.data,data.key)
      }

      return commonReducer(action,initialState,State)
    }
    default: {
      return initialState
    }
  }
}
