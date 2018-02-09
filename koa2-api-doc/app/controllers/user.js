/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */
const UserEntity = require('../dbs/entities/userEntity')
const {ERROR_STATUS,SUCCESS_STATUS} = require('../configs/statusConfig')

// add user group
exports.addUserGroup = async (ctx,next) => {
  const {userGroup} = ctx.request.body
  const {key} = ctx.params
  const userData = await UserEntity.findByKey({key:key})
  const updateData = userData.data.userGroup.concat(userGroup)
  const result = await UserEntity.update({key},{userGroup:updateData})
  if(!result.success || !result.data) {
    ctx.body = ERROR_STATUS
    return next
  }
  ctx.body = result
  await next()
}

// delete user group
exports.deleteUserGroup = async(ctx,next) => {
  const {userGroup} = ctx.request.body
  const {key} = ctx.params
  const userData = await UserEntity.findByKey({key:key})
  const updateData = userData.data.userGroup.filter(element => element !== userGroup)
  const result = await UserEntity.update({key},{userGroup:updateData})
  if(!result.success || !result.data) {
    ctx.body = ERROR_STATUS
    return next
  }
  ctx.body = result
  await next()
}

exports.getUserByKey = async (ctx,next) => {
  // ctx.body = {
  //   data: ctx.params
  // }
  await next()
  // const {key} = ctx.query
}

// update user
exports.updateUser = async (ctx,next) => {
  const {key} = ctx.params
  const data = ctx.request.body
  const result = await UserEntity.update({key},data)
  if(!result.success || !result.data){
    ctx.body = ERROR_STATUS
    return next
  }
  ctx.body = result
  await next()
}
