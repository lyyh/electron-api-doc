/**
 * @author liuyanhao
 * @date 2018-03-11
 * @Description:
 */
import {CREATE_APIDOC_ACTION,FETCH_APIDOC_ACTION,ADD_APIDOC_ACTION,RESET_APIDOC_STATE_ACTION} from "actions/apiDoc";
import {OPERATION_SUCCESS_STATUS} from '../mixins/statusMixins'
import {commonReducer} from './common'

export default (initialState = {},action) => {
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
    default: {
      return initialState
    }
  }
}
