/**
 * @author liuyanhao
 * @date 2018-03-23
 * @Description:
 */
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "mixins/statusMixins";
import {message} from "antd";
import {httpAction} from "./common";

export const API_POST_ACTION = 'API_POST_ACTION'

// api post action
export const apiPost = (options) => (dispatch) => {
  const httpOptions = {
    ...options,
    actionType: API_POST_ACTION
  }
  // const actionMaps = {
  //   successAction: () => {
  //     message.success('添加成功!')
  //   },
  //   errorAction: () => {
  //     message.error('添加失败!')
  //   }
  // }
  httpAction(httpOptions,dispatch)
}
