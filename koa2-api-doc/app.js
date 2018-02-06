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

// handle error event
// onerror(app)

// // error-handling
app.on('error', (err, ctx,next) => {
  console.error('server error', err, ctx)
});

module.exports = app
