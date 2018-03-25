/**
 * @author liuyanhao
 * @date 2018-03-23
 * @Description:
 */
const rp = require('request-promise')
const request = require('request')
const {SUCCESS_STATUS,ERROR_STATUS} = require('../app/configs/statusConfig')
// handle request params by method
const methodMapper = {
  get: (params) =>{
    return {
      qs: params
    }
  },
  post: (params) =>{
    return {
      form: params
    }
  }
}

const apiHttpCore = (options) => {
  return new Promise((resolve, reject) => {
    request(options.uri,{options}, (error, response, body) => {
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
        response({
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
    ...apiParams
  })
  return apiResponse
}

