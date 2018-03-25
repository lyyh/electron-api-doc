const router = require('koa-router')()
const AuthController = require('../app/controllers/auth')
const {apiRequest,processUrlParam} = require('../app/controllers/api')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/signup',AuthController.signup)
router.post('/signIn',AuthController.signIn)

// router.prefix('/api/')
router.post('/api',processUrlParam,apiRequest)

module.exports = router
