/**
 * @author liuyanhao
 * @date 2018-02-09
 * @Description:
 */
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "mixins/statusMixins";
import http from '../utils/http'
import {message} from "antd";
import {httpAction} from "./common";
import {FETCH_SIMILAR_USERS_ACTION} from "./user";

export const CREATE_USERGROUP_ACTION = 'REGISTER_ACTION'
export const FETCH_USERS_ACTION = 'FETCH_USERS_ACTION'
// executing register
export const createUserGroup = (params) => (dispatch) => {
  const httpOptions = {
    url: '/userGroups',
    method: 'post',
    actionType: CREATE_USERGROUP_ACTION,
    body: params
  }
  const actionMaps = {
    successAction: () => {
      message.success('创建成功!')
    },
    errorAction: () => {

    }
  }
  httpAction(httpOptions,dispatch,actionMaps)
}

// fetch users
export const fetchUser = (params) => (dispatch) => {
  const {key} = params
  const httpOptions = {
    url: `/userGroups/${key}`,
    method: 'get',
    actionType: FETCH_USERS_ACTION,
  }
  httpAction(httpOptions,dispatch)
}

