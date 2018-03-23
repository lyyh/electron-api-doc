/**
 * @author liuyanhao
 * @date 2018-03-23
 * @Description:
 */
const {apiHttp} = require('../../utils/api')

exports.apiRequest = async(ctx,next) => {
  const {url,method,params} = ctx.request.body
  const httpOptions = {
    url
  }
  const result = await apiHttp(httpOptions,method,params)
  ctx.body = result
  if(!result.success) return next
  await next()
}
