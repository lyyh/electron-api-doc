/**
 * @author liuyanhao
 * @date 2018-02-06
 * @Description:
 */
const router = require('koa-router')()

router.prefix('/userGroups')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


module.exports = router
