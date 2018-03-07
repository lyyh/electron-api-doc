/**
 * @author liuyanhao
 * @date 2018-03-07
 * @Description:
 */
import {
  FETCH_SIMILAR_USERS_ACTION
} from "actions/selectUser";
import {commonReducer} from "./common";

export default (initialState = {},action) => {
  switch (action.type){
    case FETCH_SIMILAR_USERS_ACTION: {
      return commonReducer(action,initialState)
    }
    default: {
      return initialState
    }
  }
}
