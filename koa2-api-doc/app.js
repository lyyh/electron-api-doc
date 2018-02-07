const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const dbServer = require('./app/dbs/dbServer')
const index = require('./routes/index')
const users = require('./routes/users')
const userGroups = require('./routes/userGroup')
const apiDocs = require('./routes/apiDocs')
const {ERROR_STATUS} = require('./app/configs/statusConfig')

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

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(userGroups.routes(), users.allowedMethods())
app.use(apiDocs.routes(),apiDocs.allowedMethods())

// handle error event
// onerror(app)

// // error-handling
app.on('error', (err, ctx,next) => {
  // ctx.body = {
  //   ERROR_STATUS,
  //   err: {
  //     errors: err.message,
  //     message: ''
  //   }
  // }
  ctx.message = err
  console.error('server error', err, ctx)
});

module.exports = app
