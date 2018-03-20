/**
 * @author liuyanhao
 * @date 2018-03-11
 * @Description:
 */
import {CREATE_APIDOC_ACTION,FETCH_APIDOC_ACTION,ADD_APIDOC_ACTION} from "actions/apiDoc";
import {commonReducer} from './common'

export default (initialState = {},action) => {
  switch (action.type){
    case CREATE_APIDOC_ACTION:{
      return commonReducer(action,initialState)
    }
    case ADD_APIDOC_ACTION: {
      return commonReducer(action,initialState)
    }
    case FETCH_APIDOC_ACTION: {
      return commonReducer(action,initialState)
    }
    default: {
      return initialState
    }
  }
}
