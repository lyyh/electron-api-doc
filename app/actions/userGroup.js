/**
 * @author liuyanhao
 * @date 2018-02-09
 * @Description:
 */
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "mixins/statusMixins";
import http from '../utils/http'
import {message} from "antd";

export const NEW_USERGROUP_ACTION = 'REGISTER_ACTION'
// executing register
export const doNewUserGroup = (params) => (dispatch) => {
  dispatch({
    type: NEW_USERGROUP_ACTION,
    state: LOADING_STATUS
  })
  http.post('/userGroup',params)
    .then((res)=>{
      const {data} = res
      if(data && data.success){
        message.success('新建成功!')
        dispatch({
          type: NEW_USERGROUP_ACTION,
          state: SUCCESS_STATUS,
          data: data.data
        })
      }else{
        message.error(data.err.errors || data.err.message)
        dispatch({
          type: NEW_USERGROUP_ACTION,
          state: ERROR_STATUS,
          error: data.err
        })
      }
    })
    .catch((res) => {
      message.error(res.message || res.stack)
      dispatch({
        type:NEW_USERGROUP_ACTION,
        state:ERROR_STATUS,
        error: res.message || res.stack
      })
    })
}
