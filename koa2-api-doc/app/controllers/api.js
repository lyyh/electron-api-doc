/**
 * @author liuyanhao
 * @date 2018-03-23
 * @Description:
 */
const {apiHttp} = require('../../utils/api')
const {filterUrlAndParams} = require('../../utils/url')

exports.processUrlParam = async (ctx,next) => {
  const {url,params} = ctx.request.body
    // const urlTplString = '`'+ ctx.request.body.url+'`'
  const filterdObj = filterUrlAndParams(url,params)
  ctx.state = filterdObj
  await next()
}

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
