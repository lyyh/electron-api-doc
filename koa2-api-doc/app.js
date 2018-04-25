const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session2')
const dbServer = require('./app/dbs/dbServer')
const {checkToken} = require('./app/controllers/auth')
const index = require('./routes/index')
const users = require('./routes/users')
const userGroups = require('./routes/userGroup')
const apiDocs = require('./routes/apiDocs')
const {ERROR_STATUS} = require('./app/configs/statusConfig')
const {domainUrl} = require('./configs/app')
// const RedisStore = require('./store')
// 连接数据库
dbServer.connect()

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger(),(err,ctx)=>{
  console.log(err)
})
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// error hanlder
app.use(async (ctx,next)=>{
  try{
    await next()
  }catch(err){
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      ...ERROR_STATUS,
      err: {
        errors: err.message,
        message: (err.statusCode || err.status)?err.errMsg:'系统错误'
      }
    }
    ctx.app.emit('error',err,ctx)
  }
})

app.use(session({
  key: 'tokenId',
  secure: false,
  httpOnly: false,
  domain: "localhost"
}))


// Accsess-Control-Allow
app.use(async (ctx,next) => {
  ctx.set("Access-Control-Allow-Origin", domainUrl);
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Allow-Max-Age",86400)
  if(ctx.request.method == 'OPTIONS'){
    ctx.status = 200
  }
  await next()
})

// routes
app.use(index.routes(), index.allowedMethods())
// app.use(checkToken)
app.use(users.routes(), users.allowedMethods())
app.use(userGroups.routes(), users.allowedMethods())
app.use(apiDocs.routes(),apiDocs.allowedMethods())

// onerror
app.on('error', (err, ctx) => {
  console.error('app.js onError,error:', err.message)
  console.error('-----------------------------------')
  console.error(err)
});

module.exports = app
