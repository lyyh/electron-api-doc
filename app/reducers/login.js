/**
 * @author liuyanhao
 * @date 2018-01-26
 * @Description:
 */
// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
//
// export type counterStateType = {
//   +counter: number
// };
//
// type actionType = {
//   +type: string
// };
//
// export default function counter(state: number = 0, action: actionType) {
//   switch (action.type) {
//     case INCREMENT_COUNTER:
//       return state + 1;
//     case DECREMENT_COUNTER:
//       return state - 1;
//     default:
//       return state;
//   }
// }

import {LOGIN_ACTION} from 'actions/login'
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "../mixins/statusMixins";

export default (state = {},action) => {
  switch (action.type){
    case LOGIN_ACTION: { // login
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

