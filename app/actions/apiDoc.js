/**
 * @author liuyanhao
 * @date 2018-03-11
 * @Description:
 */
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "mixins/statusMixins";
import {message} from "antd";
import {httpAction} from "./common";

export const CREATE_APIDOC_ACTION = 'CREATE_APIDOC_ACTION'

// create apidoc
export const createApiDoc = (params) => (dispatch) =>{
  const httpOptions = {
    url: '/apiDocs',
    method: 'post',
    actionType: CREATE_APIDOC_ACTION,
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
