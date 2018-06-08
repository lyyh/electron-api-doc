/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */
const UserEntity = require('../dbs/entities/userEntity')
const uuid = require('uuid')
const {ERROR_STATUS,SUCCESS_STATUS} = require('../configs/statusConfig')

// register user account
exports.signup = async (ctx,next) => {
  const {name,account,password} = ctx.request.body
  const key = name
  const queryResult = await UserEntity.findByKey({key})
  if(queryResult.data){
    ctx.body = {
      ...ERROR_STATUS,
      err: {
        errors: '',
        message: '姓名或者账号存在!'
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

// login user account
exports.signIn = async (ctx,next) => {
  const {account,password,accessToken} = ctx.request.body
  // ctx.cookies.set('tokenId','111',{domain:'localhost',httpOnly:false,key:'tokenId',secure:false})

  if(account && password) {
    const result = await UserEntity.findByAccount({'auth.account': account})
    if (result.data && result.data.auth && result.data.auth.password == password) {
      ctx.body = result
      ctx.session.sign = true

      return next
    } else {
      ctx.status = 401
      ctx.body = {
        ERROR_STATUS,
        err: {
          errors: '',
          message: '账号或者密码错误!'
        }
      }
    }
  }
  await next()
}

// 检查token是否过期
exports.checkToken = async (ctx,next) => {
  if(!ctx.session.isLogin){
    ctx.body = {
      ERROR_STATUS,
      err: {
        errors: '',
        message: 'token 过期，请登录!'
      }
    }
  }
  return next
}
