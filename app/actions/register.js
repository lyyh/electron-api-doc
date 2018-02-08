/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "mixins/statusMixins";
import http from '../utils/http'
import {message} from "antd";

export const REGISTER_ACTION = 'REGISTER_ACTION'
// executing register
export const doRegister = (params) => (dispatch) => {
  dispatch({
    type: REGISTER_ACTION,
    state: LOADING_STATUS
  })
  http.post('/signup',params)
    .then((res)=>{
      const {data} = res
      if(data && data.success){
        message.success('注册成功!')
        dispatch({
          type: REGISTER_ACTION,
          state: SUCCESS_STATUS,
          data: data.data
        })
      }else{
        message.error(data.err.errors || data.err.message)
        dispatch({
          type: REGISTER_ACTION,
          state: ERROR_STATUS,
          error: data.err
        })
      }
    })
    .catch((res) => {
      message.error(res.message || res.stack)
      dispatch({
        type:REGISTER_ACTION,
        state:ERROR_STATUS,
        error: res.message || res.stack
      })
  })
}
