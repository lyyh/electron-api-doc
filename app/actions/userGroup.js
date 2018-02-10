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

// executing register
export const createUserGroup = (params) => (dispatch) => {
  const httpOptions = {
    url: '/userGroups',
    method: 'post',
    actionType: CREATE_USERGROUP_ACTION,
    body: params
  }
  httpAction(httpOptions,dispatch)
}
