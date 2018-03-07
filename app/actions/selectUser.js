/**
 * @author liuyanhao
 * @date 2018-03-07
 * @Description:
 */
import {httpAction} from "./common";

export const FETCH_SIMILAR_USERS_ACTION = 'FETCH_SIMILAR_USERS_ACTION'
export const fetchSimilarUsers = (params) => (dispatch) => {
  const {queryParams,userName} = params
  const httpParams = {
    url: '/users',
    method: 'get',
    actionType: FETCH_SIMILAR_USERS_ACTION,
    query: {
      params: {
        queryParams,
        userName,
        select: '1'
      }
    }
  }
  httpAction(httpParams,dispatch)
}
