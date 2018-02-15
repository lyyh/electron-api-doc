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
  const result = await UserEntity.update({key},{userGroups:updateData})
  if(!result.success || !result.data) {
    ctx.body = ERROR_STATUS
    return next
  }
  ctx.body = result
  await next()
}

// get userGroups and userKey
exports.preCreateUserGroup = async(ctx,next) => {
  const requestData = ctx.request.body
  const insertData = {
    ...requestData,
    key: requestData.name,
    users: JSON.parse(JSON.stringify(ctx.state.users))
  }
  ctx.state.userGroup = insertData
  ctx.state.creator = requestData.creator
  await next()
}

// create a user group
exports.createUserGroup = async(ctx,next) => {
  const {userGroup,creator} = ctx.state
  const userData = await UserEntity.findByKey({key:creator})
  const updateData = userData.data.userGroups.concat(userGroup)
  const result = await UserEntity.update({key:creator},{userGroups:updateData})
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

// find all user
exports.findAllUsers = async (ctx,next) => {
  const result = await UserEntity.findAllUsers()
  ctx.body = result
  if(!result.success)return next
  await next()
}

// find users by condition
const findSelectUsers = async (ctx,next) => {
  let condition = {}
  let {queryParams,userName} = ctx.query
  queryParams = JSON.parse(queryParams)
  for(let key of Object.keys(queryParams)){
    condition[key] = new RegExp(queryParams[key],'i')
  }
  const result = await UserEntity.findUsers(condition)
  if(!result.success)return next

  const filterResult = result.data.filter((ele,index)=>{
    console.log(ele.name == userName)
    if(ele.name == userName)return false
    else return true
  })
  // return filterResult
  ctx.body = {
    ...SUCCESS_STATUS,
    data: filterResult
  }
}

// find users by condition
exports.findUsers = async (ctx,next) => {
  let condition = {}
  const query = ctx.query
  if(query.select){
    await findSelectUsers(ctx,next)
    await next()
    return
  }

  for(let key of Object.keys(query)){
    condition[key] = new RegExp(query[key],'i')
  }
  const result = await UserEntity.findUsers(condition)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// find user group by key
exports.getUserGroups = async(ctx,next) => {
  const {key} = ctx.params
  const result = await UserEntity.findByKey({key})
  const userGroups = result.data.get('userGroups')
  if(result.success){
    ctx.body = {
      ...SUCCESS_STATUS,
      data: userGroups
    }
  }else{
    ctx.body = result
    return next
  }
  await next()
}
