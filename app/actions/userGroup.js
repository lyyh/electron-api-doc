/**
 * @author liuyanhao
 * @date 2018-02-09
 * @Description:
 */
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "mixins/statusMixins";
import http from '../utils/http'
import {message} from "antd";
import {httpAction} from "./common";
import {FETCH_SIMILAR_USERS_ACTION, FETCH_USER_GROUPS_ACTION} from "./user";

export const CREATE_USERGROUP_ACTION = 'REGISTER_ACTION'
export const FETCH_USERGROUPS_ACTION = 'FETCH_USERGROUPS_ACTION'
export const FETCH_USERS_ACTION = 'FETCH_USERS_ACTION'
export const ADD_USERS_ACTION = 'ADD_USERS_ACTION'

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
      message.error('创建失败!')
    }
  }
  httpAction(httpOptions,dispatch,actionMaps)
}

// add user in user group
export const addUser = (params,key) => (dispatch) => {
  const httpOptions = {
    url: `/userGroups/${key}`,
    method: 'post',
    actionType: ADD_USERS_ACTION,
    body: params
  }
  httpAction(httpOptions,dispatch)
}

// fetch users
export const fetchUsers = (params) => (dispatch) => {
  const {key} = params
  const httpOptions = {
    url: `/userGroups/${key}`,
    method: 'get',
    actionType: FETCH_USERS_ACTION,
  }
  httpAction(httpOptions,dispatch)
}

export const fetchUserGroups = (params) => (dispatch) => {
  const httpParams = {
    url: `/users/${params.key}/userGroups`,
    method:'get',
    actionType:FETCH_USERGROUPS_ACTION
  }
  httpAction(httpParams,dispatch)
}

// export const fetchUserGroup = (params) => (dispatch) => {
//   const {key} = params
//   const httpParams = {
//     url: `/userGroups/${key}`,
//     method: 'get',
//     actionType: FETCH_USER_GROUP_ACTION
//   }
// }
