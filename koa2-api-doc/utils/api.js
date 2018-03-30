/**
 * @author liuyanhao
 * @date 2018-03-23
 * @Description:
 */
const request = require('request')
const {SUCCESS_STATUS,ERROR_STATUS} = require('../app/configs/statusConfig')

const requestParamsHelper = (params) => {
  return {qs:params}
}
const requestBodyHelper = (params) => {
  return {body:params,json:true}
}

// handle request params by method
// make method mapping request params or request body
const methodMapper = {
  get: requestParamsHelper,
  head: requestParamsHelper,
  options: requestParamsHelper,
  patch: requestParamsHelper,
  delete: requestParamsHelper,
  post: requestBodyHelper,
  put: requestBodyHelper
}

const apiHttpCore = (options) => {
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

exports.apiHttp = async (requestOptions,method,params) => {
  const apiParams = methodMapper[method](params)
  const apiResponse = await apiHttpCore({
    ...requestOptions,
    ...apiParams,
    method
  })
  return apiResponse
}

