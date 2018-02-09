/**
 * @author liuyanhao
 * @date 2018-02-09
 * @Description:
 */
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "mixins/statusMixins";
import http from '../utils/http'
import {message} from "antd";

export const LOGIN_ACTION = 'LOGIN_ACTION'
// executing login
export const doLogin = (params,history) => (dispatch) => {
  dispatch({
    type: LOGIN_ACTION,
    state: LOADING_STATUS
  })
  http.post('/signIn',params)
    .then((res)=>{
      const {data} = res
      if(data && data.success){
        // message.success('登录成功!')
        // dispatch({
        //   type: LOGIN_ACTION,
        //   state: SUCCESS_STATUS,
        //   data: data.data
        // })
        const location = {
          pathname: '/userGroup',
          state: {
            user: {
              key: data.data.key,
              name: data.data.name
            }
          }
        }

        history.push(location)
      }else{
        message.error(data.err.errors || data.err.message)
        dispatch({
          type: LOGIN_ACTION,
          state: ERROR_STATUS,
          error: data.err
        })
      }
    })
    .catch((res) => {
      message.error(res.message || res.stack)
      dispatch({
        type:LOGIN_ACTION,
        state:ERROR_STATUS,
        error: res.message || res.stack
      })
    })
}
