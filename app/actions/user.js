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
export const FETCH_USER_GROUPS_ACTION = 'FETCH_USER_GROUPS_ACTION'
export const FETCH_USER_INFORMATION_ACTION = 'FETCH_USER_INFORMATION_ACTION'
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

export const fetchUserInfo = (params) => (dispatch) => {
  const {key,userGroupKey} = params
  const httpParams = {
    url: `/users/${key}`,
    method: 'get',
    query: {
      params: {
        userGroupKey
      }
    },
    actionType: FETCH_USER_INFORMATION_ACTION
  }
  httpAction(httpParams,dispatch)
}
