/**
 * @author liuyanhao
 * @date 2018-02-09
 * @Description:
 */
import {CREATE_USERGROUP_ACTION} from 'actions/userGroup'
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "../mixins/statusMixins";
import {commonReducer} from './common'

export default (initialState = {},action) => {
  switch (action.type){
    case CREATE_USERGROUP_ACTION: { // new userGroup
      return commonReducer(action,initialState)
    }
    default: {
      return initialState
    }
  }
}

