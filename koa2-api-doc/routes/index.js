const router = require('koa-router')()
const AuthController = require('../app/controllers/auth')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/signup',AuthController.signup)
router.post('/signIn',AuthController.signIn)
// router.get('/user/key/:key',UserController.getUserByKey)
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
