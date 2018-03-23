/**
 * @author liuyanhao
 * @date 2018-03-23
 * @Description:
 */
import {API_POST_ACTION} from 'actions/api'
import {commonReducer} from './common'

export default (initialState = {},action) => {
  switch (action.type){
    case API_POST_ACTION: {
      return commonReducer(action,initialState)
    }
    default: {
      return initialState
    }
  }
}
