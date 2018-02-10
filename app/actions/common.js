/**
 * @author liuyanhao
 * @date 2018-02-10
 * @Description:
 */
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "mixins/statusMixins";
import http from '../utils/http'
import {message} from "antd";

export const httpAction = (options,dispatch) => {
  const {url,method,actionType,query,body} = options
  dispatch({
    type: actionType,
    state: LOADING_STATUS
  })
  http[method](url,query || body)
    .then((res)=>{
      const {data} = res
      if(data && data.success){
        dispatch({
          type: actionType,
          state: SUCCESS_STATUS,
          data: data.data
        })
      }else{
        message.error(data.err.errors || data.err.message)
        dispatch({
          type: actionType,
          state: ERROR_STATUS,
          error: data.err
        })
      }
    })
    .catch((res) => {
      message.error(res.message || res.stack)
      dispatch({
        type:actionType,
        state:ERROR_STATUS,
        error: res.message || res.stack
      })
    })
}
