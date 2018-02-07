/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
const apiDocEntity = require('../dbs/entities/apiDocEntity')

// find a apidoc by key
exports.findByKey = async (ctx,next) => {
  const {key} = ctx.params
  const result = await apiDocEntity.findByKey({key})
  ctx.body = result
  if(!result.success) return next
  await next()
}

// create a apidoc
exports.create = async (ctx,next) => {
  const requestData = ctx.request.body
  const insertData = {
    ...requestData,
    key: requestData.name,
    owners: JSON.parse(requestData.owners),
    apis: JSON.parse(requestData.apis)
  }
  const result = await apiDocEntity.create(insertData)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// add owner
exports.addOwner = async(ctx,next) => {
  const {key} = ctx.params
  const reqData = ctx.request.body
  const owners = JSON.parse(reqData.owners)
  const processDataFn = doc => {
    return doc.owners = [...doc.owners,...owners]
  }
  const result = await apiDocEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// delete owner
exports.deleteOwner = async(ctx,next)=>{
  const {key} = ctx.params
  const reqData = ctx.request.body
  const owners = JSON.parse(reqData.owners)
  const processDataFn = doc => {
    return doc.owners = doc.owners.filter(ele => !(owners.indexOf(ele.key) >= 0))
  }
  const result = await apiDocEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// add apis
exports.addApis = async(ctx,next) => {
  const {key} = ctx.params
  const reqData = ctx.request.body
  const apis = JSON.parse(reqData.apis)
  const processDataFn = doc => {
    return doc.apis = [...doc.apis,...apis]
  }
  const result = await apiDocEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// delete apis
exports.deleteApis = async(ctx,next)=>{
  const {key} = ctx.params
  const reqData = ctx.request.body
  const apis = JSON.parse(reqData.apis)
  const processDataFn = doc => {
    return doc.apis = doc.apis.filter(ele => !(apis.indexOf(ele.key) >= 0))
  }
  const result = await apiDocEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}
