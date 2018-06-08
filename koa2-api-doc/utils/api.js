/**
 * @author liuyanhao
 * @date 2018-03-23
 * @Description:
 */
const request = require('request')
const {SUCCESS_STATUS,ERROR_STATUS} = require('../app/configs/statusConfig')
// 请求参数Helper
const requestParamsHelper = (params) => {
  return {qs:params}
}
// 请求体Helper
const requestBodyHelper = (params) => {
  return {body:params,json:true}
}

// 请求方法与Helper的映射关系
const methodMapper = {
  get: requestParamsHelper,
  head: requestParamsHelper,
  options: requestParamsHelper,
  patch: requestParamsHelper,
  delete: requestParamsHelper,
  post: requestBodyHelper,
  put: requestBodyHelper
}

// 请求转发核心代码
const apiHttpCore = (options) => {
  // 封装成promise参数
  return new Promise((resolve, reject) => {
    request[options.method](options.uri,{...options}, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve({
          ...SUCCESS_STATUS,
          data: body
        })
      } else if (error) {
        resolve({
          ...ERROR_STATUS,
          err: {
            errors: error.message,
            message: error.message
          }
        })
      } else {
        resolve({
          ...ERROR_STATUS,
          err: {
            errors: response.statusCode,
            message: response.statusCode
          }
        })
      }
    })
  })
}

// apiHttp方法，对apiHttpCore的封装
exports.apiHttp = async (requestOptions,method,params) => {
  const apiParams = methodMapper[method](params)
  // 解析参数
  const apiResponse = await apiHttpCore({
    ...requestOptions,
    ...apiParams,
    method
  })
  return apiResponse
}

