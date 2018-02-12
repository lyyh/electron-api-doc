/**
 * @author liuyanhao
 * @date 2018-02-09
 * @Description:
 */
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "mixins/statusMixins";
import {httpAction} from "./common";
import {message} from "antd";

export const FETCH_ALL_USERS_ACTION = 'FETCH_ALL_USERS_ACTION'
export const FETCH_USER_ACTION = 'FETCH_USER_ACTION'
export const FETCH_SIMILAR_USERS_ACTION = 'FETCH_SIMILAR_USERS_ACTION'
export const FETCH_USERS_OVER_ACTION = 'FETCH_USERS_OVER_ACTION'

export const fetchSimilarUsers = (params) => (dispatch) => {
  const httpParams = {
    url: '/users',
    method: 'get',
    actionType: FETCH_SIMILAR_USERS_ACTION,
    query: {
      params: params
    }
  }
  httpAction(httpParams,dispatch)
}