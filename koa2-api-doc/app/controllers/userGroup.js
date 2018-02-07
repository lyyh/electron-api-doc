/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
const userGroupEntity = require('../dbs/entities/userGroupEntity')

// create a user group
exports.create = async (ctx,next) => {
  const requestData = ctx.request.body
  const insertData = {
    ...requestData,
    key: requestData.name,
    users: JSON.parse(requestData.users)
  }
  const result = await userGroupEntity.create(insertData)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// find a user group by key
exports.findByKey = async (ctx,next) => {
  const {key} = ctx.params
  const result = await userGroupEntity.findByKey({key})
  ctx.body = result
  if(!result.success) return next
  await next()
}

// update user group
exports.update = async (ctx,next) => {
  const {key} = ctx.params
  const updateData = ctx.request.body
  const result = await userGroupEntity.update({key},updateData)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// add user
exports.addUser = async (ctx,next) => {
  const {key} = ctx.params
  const reqData = ctx.request.body
  const users = JSON.parse(reqData.users)
  const processDataFn = doc => {
    return doc.users = [...doc.users,...users]
  }
  const result = await userGroupEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// delete user
exports.deleteUser = async(ctx,next) => {
  const {key} = ctx.params
  const reqData = ctx.request.body
  const users = JSON.parse(reqData.users)
  const processDataFn = doc => {
    return doc.users = doc.users.filter(ele => !(users.indexOf(ele.key) >= 0))
  }
  const result = await userGroupEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// add apidoc
exports.addApiDoc = async(ctx,next) => {
  const {key} = ctx.params
  const reqData = ctx.request.body
  const apiDocs = JSON.parse(reqData.apiDocs)
  const processDataFn = doc => {
    return doc.apiDocs = [...doc.apiDocs,...apiDocs]
  }
  const result = await userGroupEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// delete apidoc
exports.deleteApiDoc = async(ctx,next)=>{
  const {key} = ctx.params
  const reqData = ctx.request.body
  const apiDocs = JSON.parse(reqData.apiDocs)
  const processDataFn = doc => {
    return doc.apiDocs = doc.apiDocs.filter(ele => !(apiDocs.indexOf(ele) >= 0))
  }
  const result = await userGroupEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}
