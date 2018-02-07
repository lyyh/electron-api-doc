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

exports.addUser = async (ctx,next) => {
  const {key} = ctx.params
  const reqData = ctx.request.body
  const users = JSON.parse(reqData.users)
  const processDataFn = doc => {
    return doc.users = [...doc.users,...users]
  }
  const result = await userGroupEntity.updateUsers({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}
