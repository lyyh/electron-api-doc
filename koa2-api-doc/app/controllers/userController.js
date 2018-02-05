/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */
const UserEntity = require('../dbs/entities/userEntity')
const uuid = require('uuid')
const {ERROR_STATUS} = require('../configs/statusConfig')

// signup user account
exports.signup = async (ctx,next) => {
  const {name,account,password} = ctx.request.body
  const key = name
  const user = await UserEntity.findByKey(key)
  if(user){
    ctx.body = ERROR_STATUS
    return next
  }else{
    const accessToken = uuid.v1()
    const insertData = {key,name,auth:{account,password,accessToken}}
    const result = await UserEntity.insert(insertData)
    ctx.body = result
  }

  await next()
}

// signIn user account
exports.signIn = async (ctx,next) => {
  const {account,password,accessToken} = ctx.request.body
  if(account && password){
    const result = await UserEntity.findByAccount({auth:{account}})
    if(result.auth.password == password){
      ctx.body = result
    }else{
      ctx.body = ERROR_STATUS
      return next
    }
  }else{
    return next
  }

  await next()
}


exports.getUserByKey = async (ctx,next) => {
  // ctx.body = {
  //   data: ctx.params
  // }
  await next()
  // const {key} = ctx.query
}
