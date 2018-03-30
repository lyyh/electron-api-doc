/**
 * @author liuyanhao
 * @date 2018-03-23
 * @Description:
 */
const {apiHttp} = require('../../utils/api')
const {initUrlAndParams} = require('../../utils/url')

// process url and param
exports.processUrlParam = async (ctx,next) => {
  const {url,params} = ctx.request.body
  const filterdObj = initUrlAndParams(url,params)
  ctx.state = filterdObj
  await next()
}

// do api request
exports.apiRequest = async(ctx,next) => {
  const {uri,params} = ctx.state
  const {method} = ctx.request.body
  const httpOptions = {
    uri:uri
  }
  const result = await apiHttp(httpOptions,method,params)
  ctx.body = result
  if(!result.success) return next
  await next()
}
