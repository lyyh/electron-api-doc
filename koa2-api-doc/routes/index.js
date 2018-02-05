const router = require('koa-router')()
const UserController = require('../app/controllers/userController')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/signup',UserController.signup)
router.post('/signIn',UserController.signIn)
router.get('/user/key/:id',UserController.getUserByKey)
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
