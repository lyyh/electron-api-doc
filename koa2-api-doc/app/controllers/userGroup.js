/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
const {ERROR_STATUS} = require('../configs/statusConfig')
const userGroupEntity = require('../dbs/entities/userGroupEntity')
const userEntity = require('../dbs/entities/userEntity')
// create a user group
exports.create = async (ctx,next) => {
  const requestData = ctx.request.body
  const insertData = {
    ...requestData,
    key: requestData.name,
    users: JSON.parse(JSON.stringify(ctx.state.users))
  }
  const result = await userGroupEntity.create(insertData)
  ctx.body = result
  if(!result.success)return next

  // ctx.request.body = {
  //   userGroup: insertData,
  // }
  // ctx.params = {
  //   key:
  // }
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

exports.getUsers = async (ctx,next) => {
  const {users,creator} = ctx.request.body
  ctx.state.users = []
  for(let user of users){
    let result = await userEntity.findByKey({key:user.name})
    if(!result.success){
      ctx.body = {
        ...ERROR_STATUS,
      }
      return next
    }
    const userData = result.data
    ctx.state.users.push({
      ...result.data._doc,
      permission: user.permission
    })
  }
  await next()
}
// find by name with create
exports.verifyName = async(ctx,next) => {
  const {name} = ctx.request.body
  const key = name
  const result = await userGroupEntity.findByKey({key})
  if(result.success){
    ctx.body =  {
      ...ERROR_STATUS,
      err: {
        errors: '',
        message: '名称存在！'
      }
    }
    return next
  }
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
