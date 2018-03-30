const router = require('koa-router')()
const {signIn,signup} = require('../app/controllers/auth')
const {apiRequest,processUrlParam} = require('../app/controllers/api')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/signup',signup)
router.post('/signIn',signIn)
router.post('/api',processUrlParam,apiRequest)

module.exports = router
