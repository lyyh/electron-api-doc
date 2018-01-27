/**
 * @author liuyanhao
 * @date 2018-01-26
 * @Description:
 */
// @flow
import { LOADING_STATUS, SUCCESS_STATUS, ERROR_STATUS } from '../mixins/statusMixins';

/*
export type counterStateType = {
  +counter: number
};

type actionType = {
  +type: string
};

export default function counter(state: number = 0, action: actionType) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
*/
const user = {
  name: 'liu',
  id: 111
}
const homeReducer = (state=user,action) => {
  switch (action){
    case LOADING_STATUS:
      return 'loading'
    case ERROR_STATUS:
      return 'error'
    case SUCCESS_STATUS:
      return user
    default:
      return user
  }
}

export default homeReducer
