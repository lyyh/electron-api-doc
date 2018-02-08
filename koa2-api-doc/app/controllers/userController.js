/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */
const UserEntity = require('../dbs/entities/userEntity')
const uuid = require('uuid')
const {ERROR_STATUS,SUCCESS_STATUS} = require('../configs/statusConfig')

// signup user account
exports.signup = async (ctx,next) => {
  const {name,account,password} = ctx.request.body
  const key = name
  const queryResult = await UserEntity.findByKey({key})
  if(queryResult.data){
    ctx.body = {
      ...ERROR_STATUS,
      err: {
        errors: '',
        message: 'name or account has existed'
      }
    }
    return next
  }else{
    const accessToken = uuid.v1()
    const insertData = {key,name,auth:{account,password,accessToken}}
    const result = await UserEntity.create(insertData)
    ctx.body = result
  }

  await next()
}

// signIn user account
exports.signIn = async (ctx,next) => {
  const {account,password,accessToken} = ctx.request.body
  if(account && password){
    const result = await UserEntity.findByAccount({'auth.account':account})
    if(result.data.auth.password == password){
      ctx.body = SUCCESS_STATUS
    }else{
      ctx.body = ERROR_STATUS
      return next
    }
  }else{
    return next
  }

  await next()
}

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
